import { useEffect, useState } from 'react';
import {
  CONTACT_FIELDS,
  MAX_REPS,
  isValidEmail,
  isValidPhone,
  loadContact,
  newRepId,
  saveContact,
} from '../../lib/contact.js';
import { formatDate } from '../../lib/enquiries.js';
import { inputClass } from '../../components/form.jsx';

const card = 'max-w-3xl rounded-xl bg-white p-6 ring-1 ring-gray-200';

const FIELD_LABELS = {
  phone: 'Main phone number',
  email: 'Email address',
  building: 'Building',
  street: 'Street',
  locality: 'Town',
  region: 'County',
  eircode: 'Eircode',
};

const REQUIRED = ['phone', 'email', 'locality', 'region'];

function validateDetails(d) {
  const errors = {};
  for (const key of REQUIRED) if (!d[key]?.trim()) errors[key] = `Please enter the ${FIELD_LABELS[key].toLowerCase()}.`;
  if (d.phone?.trim() && !isValidPhone(d.phone)) errors.phone = 'Use digits, spaces and an optional + (at least 7 digits).';
  if (d.email?.trim() && !isValidEmail(d.email)) errors.email = 'Please enter a valid email address.';
  if (d.eircode && d.eircode.trim().length > 10) errors.eircode = 'Eircode is too long.';
  return errors;
}

function validateRep(r) {
  const errors = {};
  if (!r.name.trim()) errors.name = 'Please enter a name.';
  else if (r.name.trim().length > 100) errors.name = 'Name is too long.';
  if (!isValidPhone(r.phone)) errors.phone = 'Use digits, spaces and an optional + (at least 7 digits).';
  return errors;
}

const saveErrorText = (err) =>
  err?.code === 'permission-denied'
    ? 'Not saved: permission denied. Make sure the latest firestore.rules are published in Firebase.'
    : 'Not saved. Please try again.';

/**
 * Admin > Settings: contact details and sales representatives.
 * Both live in the same Firestore document (settings/contact), so they share
 * the saved copy and every save writes the whole document.
 */
export default function ContactSettings() {
  const [saved, setSaved] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | denied | error

  useEffect(() => {
    loadContact()
      .then(({ contact, updatedAt: at }) => {
        setSaved(contact);
        setUpdatedAt(at);
        setState('ready');
      })
      .catch((err) => {
        console.error(err);
        setState(err?.code === 'permission-denied' ? 'denied' : 'error');
      });
  }, []);

  /** Saves `next` (full contact) and updates the shared saved copy. */
  const persist = async (next) => {
    const clean = await saveContact(next);
    setSaved(clean);
    setUpdatedAt(new Date());
  };

  if (state === 'loading') return <p role="status">Loading contact details…</p>;
  if (state !== 'ready') {
    return (
      <div className={card}>
        <h2 className="text-xl font-extrabold text-brand-blue">Could not load contact details</h2>
        <p className="mt-2">
          {state === 'denied'
            ? 'Permission denied. Make sure the latest firestore.rules are published in Firebase and this email is on the admin list.'
            : 'Check your connection and refresh the page.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <DetailsForm saved={saved} updatedAt={updatedAt} persist={persist} />
      <SalesRepsManager saved={saved} persist={persist} />
    </>
  );
}

function DetailsForm({ saved, updatedAt, persist }) {
  const [details, setDetails] = useState(() => Object.fromEntries(CONTACT_FIELDS.map((k) => [k, saved[k]])));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: true });

  const changed = CONTACT_FIELDS.some((k) => (details[k] ?? '') !== (saved[k] ?? ''));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateDetails(details);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    try {
      await persist({ ...saved, ...details });
      setMessage({ text: 'Saved. The website now shows the new contact details.', ok: true });
    } catch (err) {
      console.error(err);
      setMessage({ text: saveErrorText(err), ok: false });
    } finally {
      setBusy(false);
    }
  };

  const field = (key, props = {}) => (
    <div className={props.wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={`contact-${key}`} className="block font-bold">
        {FIELD_LABELS[key]}
        {REQUIRED.includes(key) && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`contact-${key}`}
        type={props.type ?? 'text'}
        value={details[key] ?? ''}
        autoComplete="off"
        maxLength={props.maxLength ?? 100}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `contact-${key}-error` : props.hint ? `contact-${key}-hint` : undefined}
        onChange={(e) => {
          setDetails((d) => ({ ...d, [key]: e.target.value }));
          setMessage({ text: '', ok: true });
        }}
        className={inputClass}
      />
      {props.hint && !errors[key] && (
        <p id={`contact-${key}-hint`} className="mt-1 text-sm text-gray-700">
          {props.hint}
        </p>
      )}
      {errors[key] && (
        <p id={`contact-${key}-error`} className="mt-1 text-sm font-semibold text-red-700">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className={card}>
      <h2 className="text-xl font-extrabold text-brand-blue">Contact details</h2>
      <p className="mt-1 text-sm text-gray-700">
        Shown in the header, footer, Contact page and on every Call button.
        {updatedAt && ` Last saved ${formatDate(updatedAt)}.`}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {field('phone', { type: 'tel', maxLength: 40, hint: 'e.g. +353 87 917 6881' })}
        {field('email', { type: 'email', maxLength: 320 })}
        {field('building')}
        {field('street')}
        {field('locality')}
        {field('region', { hint: 'e.g. Co. Monaghan' })}
        {field('eircode', { maxLength: 10, hint: 'Leave blank to hide it.' })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!changed || busy} className="btn btn-primary disabled:opacity-50">
          {busy ? 'Saving…' : 'Save contact details'}
        </button>
        {changed && <span className="text-sm font-semibold text-gray-700">Unsaved changes</span>}
      </div>
      <p role="status" className={`mt-3 font-semibold ${message.ok ? 'text-brand-green-deep' : 'text-red-700'}`}>
        {message.text}
      </p>
    </form>
  );
}

const emptyRep = () => ({ id: '', name: '', phone: '' });

function SalesRepsManager({ saved, persist }) {
  const reps = saved.salesReps;
  const [editingId, setEditingId] = useState(null); // rep id, 'new', or null
  const [draft, setDraft] = useState(emptyRep);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: true });

  const startAdd = () => {
    setEditingId('new');
    setDraft(emptyRep());
    setErrors({});
    setMessage({ text: '', ok: true });
  };
  const startEdit = (rep) => {
    setEditingId(rep.id);
    setDraft({ ...rep });
    setErrors({});
    setMessage({ text: '', ok: true });
  };
  const cancel = () => {
    setEditingId(null);
    setErrors({});
  };

  const run = async (nextReps, successText) => {
    setBusy(true);
    try {
      await persist({ ...saved, salesReps: nextReps });
      setEditingId(null);
      setMessage({ text: successText, ok: true });
    } catch (err) {
      console.error(err);
      setMessage({ text: saveErrorText(err), ok: false });
    } finally {
      setBusy(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const found = validateRep(draft);
    setErrors(found);
    if (Object.keys(found).length) return;
    const rep = { ...draft, name: draft.name.trim(), phone: draft.phone.trim() };
    if (editingId === 'new') {
      run([...reps, { ...rep, id: newRepId() }], `${rep.name} added.`);
    } else {
      run(
        reps.map((r) => (r.id === editingId ? rep : r)),
        `${rep.name} updated.`,
      );
    }
  };

  const onDelete = (rep) => {
    if (!window.confirm(`Remove ${rep.name} from the website?`)) return;
    run(
      reps.filter((r) => r.id !== rep.id),
      `${rep.name} removed.`,
    );
  };

  const repForm = (
    <form onSubmit={onSave} noValidate className="grid gap-3 rounded-lg bg-brand-green-tint p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
      <div>
        <label htmlFor="rep-name" className="block text-sm font-bold">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="rep-name"
          value={draft.name}
          maxLength={100}
          autoComplete="off"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'rep-name-error' : undefined}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          className={inputClass}
        />
        {errors.name && (
          <p id="rep-name-error" className="mt-1 text-sm font-semibold text-red-700">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="rep-phone" className="block text-sm font-bold">
          Phone number <span aria-hidden="true">*</span>
        </label>
        <input
          id="rep-phone"
          type="tel"
          value={draft.phone}
          maxLength={40}
          autoComplete="off"
          placeholder="+353 87 000 0000"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'rep-phone-error' : undefined}
          onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
          className={inputClass}
        />
        {errors.phone && (
          <p id="rep-phone-error" className="mt-1 text-sm font-semibold text-red-700">
            {errors.phone}
          </p>
        )}
      </div>
      <div className="flex gap-2 sm:mt-7">
        <button type="submit" disabled={busy} className="btn btn-primary min-h-10 px-4 py-2 text-sm disabled:opacity-50">
          {busy ? 'Saving…' : editingId === 'new' ? 'Add' : 'Save'}
        </button>
        <button type="button" onClick={cancel} className="btn min-h-10 px-4 py-2 text-sm ring-1 ring-gray-300">
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <section aria-labelledby="reps-heading" className={card}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="reps-heading" className="text-xl font-extrabold text-brand-blue">
            Sales representatives
          </h2>
          <p className="mt-1 text-sm text-gray-700">Shown on the Contact page and in the website footer.</p>
        </div>
        {editingId === null && reps.length < MAX_REPS && (
          <button type="button" onClick={startAdd} className="btn btn-secondary min-h-10 px-4 py-2 text-sm">
            + Add sales person
          </button>
        )}
      </div>

      {editingId === 'new' && <div className="mt-4">{repForm}</div>}

      {reps.length === 0 && editingId !== 'new' ? (
        <p className="mt-4 rounded-lg bg-gray-50 p-4 text-center text-gray-700">
          No sales representatives. The website hides this section until you add one.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-100">
          {reps.map((rep) => (
            <li key={rep.id} className="py-3">
              {editingId === rep.id ? (
                repForm
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{rep.name}</p>
                    <p className="text-gray-700">{rep.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEdit(rep)}
                    disabled={editingId !== null || busy}
                    className="btn min-h-9 px-4 py-1.5 text-sm ring-1 ring-gray-300 disabled:opacity-50"
                  >
                    Edit<span className="sr-only"> {rep.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(rep)}
                    disabled={editingId !== null || busy}
                    className="btn min-h-9 px-4 py-1.5 text-sm text-red-700 ring-1 ring-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    Delete<span className="sr-only"> {rep.name}</span>
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <p role="status" className={`mt-3 font-semibold ${message.ok ? 'text-brand-green-deep' : 'text-red-700'}`}>
        {message.text}
      </p>
    </section>
  );
}

