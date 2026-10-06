import express, { type NextFunction, type Request, type Response } from 'express';
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer, loadEnv } from 'vite';

const mode = process.argv[2] === 'development' ? 'development' : 'production';
const env = loadEnv(mode, process.cwd(), '');
for (const [key, value] of Object.entries(env)) {
  if (process.env[key] === undefined) process.env[key] = value;
}

const firebaseConfig = JSON.parse(
  readFileSync(resolve(process.cwd(), 'firebase-applet-config.json'), 'utf8')
) as { projectId: string };
const projectId = process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId;
const firebaseJwks = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com')
);
const authorizedEmails = new Set(
  (process.env.AUTHORIZED_EMAILS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
);
const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean)
);
const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const gemini = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
const app = express();

interface AuthenticatedRequest extends Request {
  authUser?: JWTPayload & { email: string; uid: string };
}

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60_000;

app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use(express.json({ limit: '8mb' }));

async function requireFirebaseUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorization = req.header('authorization');
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  try {
    const { payload } = await jwtVerify(match[1], firebaseJwks, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });
    if (typeof payload.sub !== 'string' || typeof payload.email !== 'string' || payload.email_verified !== true) {
      res.status(401).json({ error: 'A verified Firebase account is required.' });
      return;
    }
    req.authUser = { ...payload, uid: payload.sub } as JWTPayload & { email: string; uid: string };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

function requireAuthorizedUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const email = req.authUser?.email.toLowerCase();
  if (!email || !authorizedEmails.has(email)) {
    res.status(403).json({ error: 'This account is not authorized for the application.' });
    return;
  }
  next();
}

function checkGeminiRateLimit(uid: string, now = Date.now()) {
  const current = requestCounts.get(uid);
  if (!current || current.resetAt <= now) {
    requestCounts.set(uid, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}

app.get('/api/status', (_req, res) => {
  res.json({ geminiEnabled: Boolean(gemini) });
});

app.get('/api/access', requireFirebaseUser, requireAuthorizedUser, (req: AuthenticatedRequest, res) => {
  const email = req.authUser!.email.toLowerCase();
  res.json({ authorized: true, isAdmin: adminEmails.has(email) });
});

app.post(
  '/api/gemini',
  requireFirebaseUser,
  requireAuthorizedUser,
  async (req: AuthenticatedRequest, res) => {
    if (!gemini || !geminiApiKey) {
      res.status(503).json({ error: 'Online AI is not configured on the server.' });
      return;
    }

    const body: unknown = req.body;
    if (
      !body ||
      typeof body !== 'object' ||
      !('contents' in body) ||
      !('config' in body || Object.keys(body).length === 1)
    ) {
      res.status(400).json({ error: 'Invalid AI request.' });
      return;
    }

    const { contents, config } = body as { contents: unknown; config?: unknown };
    if (
      (typeof contents !== 'string' && !Array.isArray(contents)) ||
      (config !== undefined && (!config || typeof config !== 'object' || Array.isArray(config)))
    ) {
      res.status(400).json({ error: 'Invalid AI request.' });
      return;
    }

    const uid = req.authUser!.uid;
    if (!checkGeminiRateLimit(uid)) {
      res.status(429).json({ error: 'Too many AI requests. Try again shortly.' });
      return;
    }

    let lastError: unknown;
    for (const model of GEMINI_MODELS) {
      try {
        const response = await gemini.models.generateContent({
          model,
          contents,
          config,
        } as Parameters<typeof gemini.models.generateContent>[0]);
        if (response.text) {
          res.json({ text: response.text });
          return;
        }
      } catch (error) {
        lastError = error;
        console.warn(`Gemini request failed for model ${model}.`);
      }
    }

    console.error('All configured Gemini models failed.', lastError);
    res.status(502).json({ error: 'The online AI service is temporarily unavailable.' });
  }
);

async function startServer() {
  if (authorizedEmails.size === 0) {
    console.warn('AUTHORIZED_EMAILS is empty. Application access is disabled until it is configured.');
  }

  if (mode === 'development') {
    const vite = await createViteServer({
      configFile: resolve(process.cwd(), 'vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'custom',
      mode,
    });
    app.use(vite.middlewares);
  } else {
    const distPath = resolve(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (_req, res) => res.sendFile(resolve(distPath, 'index.html')));
  }

  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`VLT app server listening on port ${port} (${mode}).`);
  });
}

void startServer().catch(error => {
  console.error('Unable to start the VLT app server.', error);
  process.exitCode = 1;
});
