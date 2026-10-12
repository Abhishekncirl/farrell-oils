/**
 * Contact details and sales representatives, stored in Firestore at
 * settings/contact. Staff edit them in Admin > Settings. Until the first save,
 * the defaults from src/config/site.js are used. Shape must match
 * isValidContact() in firestore.rules.
 */
import { site, isTodo } from '../config/site.js';
import { getDb } from './firebase.js';
import { getPublicDoc } from './firestoreRest.js';

export const MAX_REPS = 20;

export const DEFAULT_CONTACT = {
  phone: site.contact.phoneDisplay,
  email: site.contact.email,
  building: site.address.building,
  street: site.address.street,
  locality: site.address.locality,
  region: site.address.region,
  eircode: isTodo(site.address.postalCode) ? '' : site.address.postalCode,
  salesReps: [{ id: 'sean', name: site.contact.person, phone: site.contact.phoneDisplay }],
};

export const CONTACT_FIELDS = ['phone', 'email', 'building', 'street', 'locality', 'region', 'eircode'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^\+?[\d\s()-]+$/;

export const isValidPhone = (p) => typeof p === 'string' && PHONE_CHARS_RE.test(p.trim()) && p.replace(/\D/g, '').length >= 7;
export const isValidEmail = (e) => typeof e === 'string' && EMAIL_RE.test(e.trim());

/** '+353 87 917 6881' -> 'tel:+353879176881' */
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** One-line address, skipping empty parts. */
export const formatAddress = (c) =>
  [c.building, c.street, c.locality, c.region, c.eircode, site.address.country].filter(Boolean).join(', ');

export const newRepId = () => Math.random().toString(36).slice(2, 10);

function isValidRep(r) {
  return r && typeof r.id === 'string' && typeof r.name === 'string' && r.name.trim() && isValidPhone(r.phone);
}

/** Keeps only well-formed data; anything missing or broken falls back to the defaults. */
export function normaliseContact(data) {
  if (!data) return DEFAULT_CONTACT;
  const out = { ...DEFAULT_CONTACT };
  for (const key of CONTACT_FIELDS) if (typeof data[key] === 'string') out[key] = data[key];
  if (!isValidPhone(out.phone)) out.phone = DEFAULT_CONTACT.phone;
  if (!isValidEmail(out.email)) out.email = DEFAULT_CONTACT.email;
  if (!out.locality) out.locality = DEFAULT_CONTACT.locality;
  if (!out.region) out.region = DEFAULT_CONTACT.region;
  if (Array.isArray(data.salesReps)) out.salesReps = data.salesReps.filter(isValidRep).slice(0, MAX_REPS);
  return out;
}

let publicPromise;

/** Live contact details for public pages; defaults on any problem. */
export function fetchPublicContact() {
  publicPromise ??= getPublicDoc('settings/contact')
    .then(normaliseContact)
    .catch(() => DEFAULT_CONTACT);
  return publicPromise;
}

const fs = () => import('firebase/firestore/lite');

/** Admin: saved contact details (or defaults if never saved). */
export async function loadContact() {
  const [db, { doc, getDoc }] = await Promise.all([getDb(), fs()]);
  const snap = await getDoc(doc(db, 'settings', 'contact'));
  const data = snap.exists() ? snap.data() : null;
  return { contact: normaliseContact(data), updatedAt: data?.updatedAt?.toDate?.() ?? null };
}

/** Admin: save the whole contact document (details + sales reps). */
export async function saveContact(contact) {
  const [db, { doc, setDoc, serverTimestamp }] = await Promise.all([getDb(), fs()]);
  const clean = Object.fromEntries(CONTACT_FIELDS.map((k) => [k, String(contact[k] ?? '').trim()]));
  clean.salesReps = contact.salesReps.map((r) => ({ id: r.id, name: r.name.trim(), phone: r.phone.trim() }));
  await setDoc(doc(db, 'settings', 'contact'), { ...clean, updatedAt: serverTimestamp() });
  publicPromise = undefined;
  return clean;
}
