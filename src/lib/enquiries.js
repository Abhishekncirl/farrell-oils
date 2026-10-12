/**
 * Customer enquiries, stored in the Firestore `enquiries` collection.
 * The shape here must match isValidEnquiry() in firestore.rules.
 */
import { getDb } from './firebase.js';

export const ENQUIRIES = 'enquiries';

export const ENQUIRY_TYPES = {
  quote: 'Quote request',
  general: 'General enquiry',
};

// Fields a quote request may carry in `details`. Keep in sync with firestore.rules.
export const DETAIL_FIELDS = {
  product: 'Product',
  quantity: 'Quantity (litres)',
  address: 'Delivery address',
  eircode: 'Eircode',
};

const clean = (value, max) => String(value ?? '').trim().slice(0, max);

const fs = () => import('firebase/firestore/lite');

/** Save a new enquiry. Anyone can do this; only admins can read them back. */
export async function submitEnquiry({ type, name, phone, email, message, details = {} }) {
  const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([getDb(), fs()]);

  const cleanDetails = {};
  for (const key of Object.keys(DETAIL_FIELDS)) {
    const v = clean(details[key], 300);
    if (v) cleanDetails[key] = v;
  }

  await addDoc(collection(db, ENQUIRIES), {
    type,
    name: clean(name, 200),
    phone: clean(phone, 40),
    email: clean(email, 320),
    message: clean(message, 5000),
    details: cleanDetails,
    isRead: false,
    isActioned: false,
    notes: '',
    createdAt: serverTimestamp(),
  });
}

export async function listEnquiries() {
  const [db, { collection, getDocs, orderBy, query }] = await Promise.all([getDb(), fs()]);
  const snap = await getDocs(query(collection(db, ENQUIRIES), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      details: data.details ?? {},
      notes: data.notes ?? '',
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  });
}

/** Admin-only: update isRead / isActioned / notes. */
export async function updateEnquiry(id, changes) {
  const [db, { doc, updateDoc }] = await Promise.all([getDb(), fs()]);
  await updateDoc(doc(db, ENQUIRIES, id), changes);
}

export async function deleteEnquiry(id) {
  const [db, { doc, deleteDoc }] = await Promise.all([getDb(), fs()]);
  await deleteDoc(doc(db, ENQUIRIES, id));
}

export const formatDate = (date) =>
  date
    ? new Intl.DateTimeFormat('en-IE', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
    : 'Just now';

/** CSV of the given enquiries (opens in Excel). Guards against formula injection. */
export function toCsv(enquiries) {
  const cols = [
    ['Date', (e) => formatDate(e.createdAt)],
    ['Type', (e) => ENQUIRY_TYPES[e.type] ?? e.type],
    ['Name', (e) => e.name],
    ['Phone', (e) => e.phone],
    ['Email', (e) => e.email],
    ...Object.entries(DETAIL_FIELDS).map(([key, label]) => [label, (e) => e.details[key]]),
    ['Message', (e) => e.message],
    ['Read', (e) => (e.isRead ? 'Yes' : 'No')],
    ['Actioned', (e) => (e.isActioned ? 'Yes' : 'No')],
    ['Notes', (e) => e.notes],
  ];
  const cell = (v) => {
    let s = String(v ?? '');
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = [cols.map(([h]) => cell(h)), ...enquiries.map((e) => cols.map(([, get]) => cell(get(e))))];
  return `﻿${rows.map((r) => r.join(',')).join('\r\n')}`;
}
