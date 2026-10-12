import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DETAIL_FIELDS,
  ENQUIRY_TYPES,
  deleteEnquiry,
  formatDate,
  listEnquiries,
  toCsv,
  updateEnquiry,
} from '../../lib/enquiries.js';
import { inputClass } from '../../components/form.jsx';

const FILTERS = {
  all: { label: 'All', test: () => true },
  new: { label: 'New', test: (e) => !e.isRead },
  open: { label: 'To do', test: (e) => !e.isActioned },
  quote: { label: 'Quotes', test: (e) => e.type === 'quote' },
  general: { label: 'General', test: (e) => e.type === 'general' },
  done: { label: 'Actioned', test: (e) => e.isActioned },
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | denied | error
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    setState('loading');
    try {
      setEnquiries(await listEnquiries());
      setState('ready');
    } catch (err) {
      console.error(err);
      setState(err?.code === 'permission-denied' ? 'denied' : 'error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const patch = async (id, changes) => {
    setEnquiries((list) => list.map((e) => (e.id === id ? { ...e, ...changes } : e)));
    try {
      await updateEnquiry(id, changes);
    } catch (err) {
      console.error(err);
      alert('Could not save that change. Please refresh and try again.');
    }
  };

  const remove = async (enquiry) => {
    if (!window.confirm(`Permanently delete the enquiry from ${enquiry.name}? This cannot be undone.`)) return;
    try {
      await deleteEnquiry(enquiry.id);
      setEnquiries((list) => list.filter((e) => e.id !== enquiry.id));
    } catch (err) {
      console.error(err);
      alert('Could not delete the enquiry. Please try again.');
    }
  };

  const toggleOpen = (enquiry) => {
    const next = openId === enquiry.id ? null : enquiry.id;
    setOpenId(next);
    if (next && !enquiry.isRead) patch(enquiry.id, { isRead: true });
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enquiries.filter(FILTERS[filter].test).filter((e) => {
      if (!q) return true;
      return [e.name, e.phone, e.email, e.message, ...Object.values(e.details)].join(' ').toLowerCase().includes(q);
    });
  }, [enquiries, filter, search]);

  const downloadCsv = () => {
    const url = URL.createObjectURL(new Blob([toCsv(visible)], { type: 'text/csv;charset=utf-8' }));
    const a = Object.assign(document.createElement('a'), {
      href: url,
      download: `farrell-oils-enquiries-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    a.click();
    URL.revokeObjectURL(url);
  };

  if (state === 'denied') {
    return (
      <Notice title="No access">
        This account is not on the admin list. Ask the site owner to add your email to the admin list in{' '}
        <code>firestore.rules</code>.
      </Notice>
    );
  }
  if (state === 'error') {
    return (
      <Notice title="Could not load enquiries">
        Check your connection and{' '}
        <button type="button" onClick={load} className="font-bold text-brand-blue underline">
          try again
        </button>
        .
      </Notice>
    );
  }

  const counts = {
    total: enquiries.length,
    new: enquiries.filter(FILTERS.new.test).length,
    open: enquiries.filter(FILTERS.open.test).length,
    quote: enquiries.filter(FILTERS.quote.test).length,
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-brand-blue">Enquiries</h1>
        <div className="flex gap-2">
          <button type="button" onClick={load} className="btn border-2 border-brand-blue text-brand-blue hover:bg-white">
            Refresh
          </button>
          <button type="button" onClick={downloadCsv} disabled={!visible.length} className="btn btn-secondary disabled:opacity-50">
            Export CSV
          </button>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total" value={counts.total} />
        <Stat label="New (unread)" value={counts.new} highlight={counts.new > 0} />
        <Stat label="To do" value={counts.open} />
        <Stat label="Quote requests" value={counts.quote} />
      </dl>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter enquiries" className="flex flex-wrap gap-2">
          {Object.entries(FILTERS).map(([key, f]) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold ${
                filter === key ? 'bg-brand-blue text-white' : 'bg-white text-ink ring-1 ring-gray-300 hover:ring-brand-blue'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="md:w-72">
          <label htmlFor="search" className="sr-only">
            Search enquiries
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search name, phone, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} mt-0`}
          />
        </div>
      </div>

      {state === 'loading' ? (
        <p role="status" className="mt-8">
          Loading enquiries…
        </p>
      ) : visible.length === 0 ? (
        <p className="mt-8 rounded-xl bg-white p-8 text-center ring-1 ring-gray-200">
          {enquiries.length ? 'No enquiries match this filter.' : 'No enquiries yet. They will appear here when customers use the website forms.'}
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((e) => (
            <EnquiryRow
              key={e.id}
              enquiry={e}
              open={openId === e.id}
              onToggle={() => toggleOpen(e)}
              onPatch={(changes) => patch(e.id, changes)}
              onDelete={() => remove(e)}
            />
          ))}
        </ul>
      )}
    </>
  );
}

function EnquiryRow({ enquiry: e, open, onToggle, onPatch, onDelete }) {
  const [notes, setNotes] = useState(e.notes);
  const panelId = `enquiry-${e.id}`;
  const details = Object.entries(DETAIL_FIELDS).filter(([key]) => e.details[key]);

  return (
    <li className={`rounded-xl bg-white ring-1 ${e.isRead ? 'ring-gray-200' : 'ring-2 ring-brand-blue'}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 p-4 text-left"
      >
        <span className="flex-1 font-extrabold">
          {e.name}
          {!e.isRead && <span className="ml-2 rounded bg-brand-blue px-2 py-0.5 text-xs text-white">NEW</span>}
        </span>
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-bold ${
            e.type === 'quote' ? 'bg-brand-green-tint text-brand-green-deep' : 'bg-blue-50 text-brand-blue-dark'
          }`}
        >
          {ENQUIRY_TYPES[e.type] ?? e.type}
        </span>
        {e.isActioned && <span className="text-xs font-bold text-brand-green-deep">✓ Actioned</span>}
        <span className="text-sm text-gray-700">{formatDate(e.createdAt)}</span>
      </button>

      <div id={panelId} hidden={!open} className="border-t border-gray-100 p-4">
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          <Item label="Phone">
            <a href={`tel:${e.phone.replace(/[^\d+]/g, '')}`} className="font-bold text-brand-blue underline">
              {e.phone}
            </a>
          </Item>
          <Item label="Email">
            {e.email ? (
              <a href={`mailto:${e.email}`} className="font-bold text-brand-blue underline">
                {e.email}
              </a>
            ) : (
              'Not given'
            )}
          </Item>
          {details.map(([key, label]) => (
            <Item key={key} label={label}>
              {e.details[key]}
            </Item>
          ))}
          {e.message && (
            <Item label="Message" wide>
              <span className="whitespace-pre-wrap">{e.message}</span>
            </Item>
          )}
        </dl>

        <div className="mt-4">
          <label htmlFor={`notes-${e.id}`} className="block text-sm font-bold">
            Internal notes (only visible to admins)
          </label>
          <textarea
            id={`notes-${e.id}`}
            rows={2}
            maxLength={2000}
            value={notes}
            onChange={(ev) => setNotes(ev.target.value)}
            className={inputClass}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onPatch({ notes })}
            disabled={notes === e.notes}
            className="btn btn-primary min-h-9 px-4 py-1.5 text-sm disabled:opacity-50"
          >
            Save notes
          </button>
          <button
            type="button"
            onClick={() => onPatch({ isActioned: !e.isActioned })}
            className="btn btn-secondary min-h-9 px-4 py-1.5 text-sm"
          >
            {e.isActioned ? 'Mark as to do' : 'Mark as actioned'}
          </button>
          <button
            type="button"
            onClick={() => onPatch({ isRead: !e.isRead })}
            className="btn min-h-9 px-4 py-1.5 text-sm ring-1 ring-gray-300"
          >
            Mark as {e.isRead ? 'unread' : 'read'}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="btn ml-auto min-h-9 px-4 py-1.5 text-sm text-red-700 ring-1 ring-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

function Item({ label, wide = false, children }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="text-sm font-bold text-gray-700">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Stat({ label, value, highlight = false }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-brand-blue text-white' : 'bg-white ring-1 ring-gray-200'}`}>
      <dt className="text-sm font-semibold">{label}</dt>
      <dd className="text-3xl font-extrabold">{value}</dd>
    </div>
  );
}

function Notice({ title, children }) {
  return (
    <div className="mx-auto max-w-lg rounded-xl bg-white p-6 ring-1 ring-gray-200">
      <h1 className="text-xl font-extrabold text-brand-blue">{title}</h1>
      <p className="mt-2">{children}</p>
    </div>
  );
}
