/**
 * Site settings stored in Firestore at settings/site (currently opening hours).
 * Public pages read it with one small REST request (see firestoreRest.js);
 * admin pages read and write it with the Firestore SDK.
 */
import { site } from '../config/site.js';
import { getDb } from './firebase.js';
import { getPublicDoc } from './firestoreRest.js';
import { DAYS, isValidHours } from './openingHours.js';

export const DEFAULT_HOURS = site.openingHours;

const SETTINGS = 'settings';
const SITE_DOC = 'site';

const fs = () => import('firebase/firestore/lite');

let publicHoursPromise;

/** Live opening hours for public pages. Falls back to the defaults on any problem. */
export function fetchPublicHours() {
  publicHoursPromise ??= getPublicDoc(`${SETTINGS}/${SITE_DOC}`)
    .then((data) => (data && isValidHours(data.hours) ? data.hours : DEFAULT_HOURS))
    .catch(() => DEFAULT_HOURS);
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
