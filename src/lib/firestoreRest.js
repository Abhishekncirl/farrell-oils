/**
 * Tiny read-only Firestore REST client for public pages, so visitors don't
 * download the Firebase SDK just to show opening hours and contact details.
 */
import { isFirebaseConfigured } from './firebase.js';

function decode(v) {
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return new Date(v.timestampValue);
  if ('nullValue' in v) return null;
  if ('mapValue' in v) return decodeFields(v.mapValue.fields);
  if ('arrayValue' in v) return (v.arrayValue.values ?? []).map(decode);
  return undefined;
}

const decodeFields = (fields = {}) => Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decode(v)]));

/** Returns the document's fields, or null if it doesn't exist yet. Throws on other errors. */
export async function getPublicDoc(path) {
  if (!isFirebaseConfigured) return null;
  const project = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const key = import.meta.env.VITE_FIREBASE_API_KEY;
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/${path}?key=${key}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore read failed: ${res.status}`);
  return decodeFields((await res.json()).fields);
}
