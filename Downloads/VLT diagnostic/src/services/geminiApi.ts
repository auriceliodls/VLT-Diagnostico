import { auth } from './auth';

export async function generateGeminiContent(contents: unknown, config?: unknown): Promise<{ text: string }> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('É necessário estar autenticado para usar a IA online.');
  }

  const idToken = await user.getIdToken();
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents, config }),
  });

  const result = await response.json() as { text?: string; error?: string };
  if (!response.ok || typeof result.text !== 'string') {
    throw new Error(result.error || `Gemini request failed (${response.status}).`);
  }
  return { text: result.text };
}

export async function getGeminiStatus(): Promise<boolean> {
  const response = await fetch('/api/status');
  if (!response.ok) {
    throw new Error(`AI status request failed (${response.status}).`);
  }
  const status = await response.json() as { geminiEnabled?: boolean };
  return status.geminiEnabled === true;
}
