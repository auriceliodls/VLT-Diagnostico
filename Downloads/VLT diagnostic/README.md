<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

The app uses a Node server for authenticated API access. Gemini credentials are
kept server-side and Firestore is disabled; user data remains in the browser.

View your app in AI Studio: https://ai.studio/apps/d581bdcf-cf05-4ac6-aa03-87a1f0f75a89

## Configure and run

**Prerequisites:** Node.js

1. Copy `.env.example` to `.env.local`.
2. Configure `GEMINI_API_KEY` (server-side only), `FIREBASE_PROJECT_ID`,
   `AUTHORIZED_EMAILS`, and `ADMIN_EMAILS` in `.env.local`.
3. Install dependencies with `npm install`.
4. Run locally with `npm run dev`.
5. Build with `npm run build` and deploy the Node server with `npm start`.

The production host must run the Node server and provide the environment
variables above. Do not expose `GEMINI_API_KEY` as a `VITE_` variable. Any key
previously included in a frontend build should be revoked and replaced in
Google AI Studio.

Firebase Authentication is used for identity. The server verifies Firebase ID
tokens and checks the email against `AUTHORIZED_EMAILS`; `ADMIN_EMAILS`
controls administrative UI access. Firestore rules deny all reads and writes.
