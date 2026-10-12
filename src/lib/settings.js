/**
 * Site settings stored in Firestore at settings/site (currently opening hours).
 * Public pages read it with one small REST request (no SDK download);
 * admin pages read and write it with the Firestore SDK.
 */
import { site } from '../config/site.js';
import { getDb, isFirebaseConfigured } from './firebase.js';
import { DAYS, isValidHours } from './openingHours.js';

export const DEFAULT_HOURS = site.openingHours;

const SETTINGS = 'settings';
const SITE_DOC = 'site';

const fs = () => import('firebase/firestore/lite');

let publicHoursPromise;

/** Live opening hours for public pages. Falls back to the defaults on any problem. */
export function fetchPublicHours() {
  if (!isFirebaseConfigured) return Promise.resolve(DEFAULT_HOURS);
  publicHoursPromise ??= (async () => {
    const project = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    const key = import.meta.env.VITE_FIREBASE_API_KEY;
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/${SETTINGS}/${SITE_DOC}?key=${key}`,
    );
    if (!res.ok) return DEFAULT_HOURS; // 404 until staff first save settings
    const json = await res.json();
    const days = json.fields?.hours?.mapValue?.fields ?? {};
    const hours = Object.fromEntries(
      DAYS.map(([k]) => {
        const f = days[k]?.mapValue?.fields ?? {};
        return [k, { closed: f.closed?.booleanValue, opens: f.opens?.stringValue, closes: f.closes?.stringValue }];
      }),
    );
    return isValidHours(hours) ? hours : DEFAULT_HOURS;
  })().catch(() => DEFAULT_HOURS);
  return publicHoursPromise;
}

/** Admin: current saved hours (or defaults if never saved). */
export async function loadHours() {
  const [db, { doc, getDoc }] = await Promise.all([getDb(), fs()]);
  const snap = await getDoc(doc(db, SETTINGS, SITE_DOC));
  const data = snap.exists() ? snap.data() : null;
  return {
    hours: data && isValidHours(data.hours) ? data.hours : DEFAULT_HOURS,
    updatedAt: data?.updatedAt?.toDate?.() ?? null,
  };
}

/** Admin: save hours. Must match isValidSettings() in firestore.rules. */
export async function saveHours(hours) {
  const [db, { doc, setDoc, serverTimestamp }] = await Promise.all([getDb(), fs()]);
  const clean = Object.fromEntries(
    DAYS.map(([k]) => [k, { closed: Boolean(hours[k].closed), opens: hours[k].opens, closes: hours[k].closes }]),
  );
  await setDoc(doc(db, SETTINGS, SITE_DOC), { hours: clean, updatedAt: serverTimestamp() });
  publicHoursPromise = undefined;
}
