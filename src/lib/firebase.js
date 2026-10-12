/**
 * Firebase (Firestore Lite + Auth), loaded on demand.
 *
 * Config comes from Vite env vars (.env locally, GitHub Actions secrets for the
 * live site; see SETUP-FIREBASE.md). The web config is public by design: it only
 * identifies the project. Security comes from firestore.rules.
 *
 * The SDK is imported lazily, so public pages only download it when a visitor
 * actually submits a form, and Auth is only loaded on the admin pages.
 */
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

if (!isFirebaseConfigured && import.meta.env.DEV) {
  console.warn('[Farrell Oils] Firebase is not configured. Copy .env.example to .env (see SETUP-FIREBASE.md).');
}

let appPromise;

function getApp() {
  if (!isFirebaseConfigured) {
    return Promise.reject(new Error('Firebase is not configured.'));
  }
  appPromise ??= import('firebase/app').then(({ initializeApp }) => initializeApp(config));
  return appPromise;
}

export async function getDb() {
  const [app, { getFirestore }] = await Promise.all([getApp(), import('firebase/firestore/lite')]);
  return getFirestore(app);
}

export async function getAuthInstance() {
  const [app, { getAuth }] = await Promise.all([getApp(), import('firebase/auth')]);
  return getAuth(app);
}
