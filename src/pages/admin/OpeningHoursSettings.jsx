import { useEffect, useState } from 'react';
import { DAYS, groupHours, isValidHours } from '../../lib/openingHours.js';
import { DEFAULT_HOURS, loadHours, saveHours } from '../../lib/settings.js';
import { formatDate } from '../../lib/enquiries.js';

const timeInput =
  'rounded-lg border border-gray-400 px-2 py-1.5 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:bg-gray-100 disabled:text-gray-500';

/** Admin > Settings: opening hours. */
export default function OpeningHoursSettings() {
  const [hours, setHours] = useState(null);
  const [saved, setSaved] = useState(null); // last saved version, to detect changes
  const [updatedAt, setUpdatedAt] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | saving | error | denied
  const [message, setMessage] = useState({ text: '', ok: true });

  useEffect(() => {
    loadHours()
      .then(({ hours: h, updatedAt: at }) => {
        setHours(h);
        setSaved(h);
        setUpdatedAt(at);
        setState('ready');
      })
      .catch((err) => {
        console.error(err);
        setState(err?.code === 'permission-denied' ? 'denied' : 'error');
      });
  }, []);

  if (state === 'loading') return <p role="status">Loading opening hours…</p>;
  if (state === 'denied' || state === 'error') {
    return (
      <div className="max-w-3xl rounded-xl bg-white p-6 ring-1 ring-gray-200">
        <h2 className="text-xl font-extrabold text-brand-blue">Could not load opening hours</h2>
        <p className="mt-2">
          {state === 'denied'
            ? 'This account is not allowed to change settings, or the latest firestore.rules have not been published yet.'
            : 'Check your connection and refresh the page.'}
        </p>
      </div>
    );
  }

  const setDay = (key, changes) => {
    setHours((h) => ({ ...h, [key]: { ...h[key], ...changes } }));
    setMessage({ text: '', ok: true });
  };

  const dayError = (d) => (!d.closed && d.opens >= d.closes ? 'Closing time must be after opening time.' : '');
  const valid = isValidHours(hours);
  const changed = JSON.stringify(hours) !== JSON.stringify(saved);

  const onSave = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setState('saving');
    try {
      await saveHours(hours);
      setSaved(hours);
      setUpdatedAt(new Date());
      setMessage({ text: 'Saved. The website now shows the new opening hours.', ok: true });
      setState('ready');
    } catch (err) {
      console.error(err);
      setMessage({
        text:
          err?.code === 'permission-denied'
            ? 'Not saved: permission denied. Make sure the latest firestore.rules are published in Firebase.'
            : 'Not saved. Please try again.',
        ok: false,
      });
      setState('ready');
    }
  };

  return (
    <>
      <form onSubmit={onSave} className="max-w-3xl rounded-xl bg-white p-6 ring-1 ring-gray-200">
        <h2 className="text-xl font-extrabold text-brand-blue">Opening hours</h2>
        <p className="mt-1 text-sm text-gray-700">
          Shown in the website footer and on the Contact page.
          {updatedAt && ` Last saved ${formatDate(updatedAt)}.`}
        </p>

        <div className="mt-5 divide-y divide-gray-100">
          <div aria-hidden="true" className="hidden grid-cols-[8rem_minmax(0,1fr)_minmax(0,1fr)_8rem] gap-3 pb-2 text-sm font-semibold text-gray-700 sm:grid">
            <span>Day</span>
            <span>Opens</span>
            <span>Closes</span>
            <span>Closed all day</span>
          </div>
          {DAYS.map(([key, name]) => {
            const d = hours[key];
            const error = dayError(d);
            const errorProps = error ? { 'aria-invalid': true, 'aria-describedby': `${key}-error` } : {};
            return (
              <fieldset key={key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 py-3 sm:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1fr)_8rem]">
                <legend className="float-left col-span-3 font-bold sm:col-span-1">{name}</legend>
                <label className="block min-w-0">
                  <span className="block text-xs font-semibold text-gray-700 sm:sr-only">{name} opens</span>
                  <input
                    id={`${key}-opens`}
                    type="time"
                    value={d.opens}
                    disabled={d.closed}
                    required
                    {...errorProps}
                    onChange={(e) => setDay(key, { opens: e.target.value })}
                    className={`${timeInput} time-input w-full min-w-0`}
                  />
                </label>
                <label className="block min-w-0">
                  <span className="block text-xs font-semibold text-gray-700 sm:sr-only">{name} closes</span>
                  <input
                    id={`${key}-closes`}
                    type="time"
                    value={d.closes}
                    disabled={d.closed}
                    required
                    {...errorProps}
                    onChange={(e) => setDay(key, { closes: e.target.value })}
                    className={`${timeInput} time-input w-full min-w-0`}
                  />
                </label>
                <label className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                  <span className="text-xs font-semibold text-gray-700 sm:sr-only">Closed</span>
                  <input
                    type="checkbox"
                    checked={d.closed}
                    onChange={(e) => setDay(key, { closed: e.target.checked })}
                    className="h-5 w-5 accent-brand-blue"
                  />
                </label>
                {error && (
                  <p id={`${key}-error`} className="col-span-3 text-sm font-semibold text-red-700 sm:col-span-4">
                    {error}
                  </p>
                )}
              </fieldset>
            );
          })}
        </div>

        <div className="mt-6 rounded-lg bg-brand-green-tint p-4">
          <p className="text-sm font-bold text-brand-green-deep">Preview: how it appears on the website</p>
          <dl className="mt-2 max-w-sm space-y-2">
            {groupHours(hours).map((g) => (
              <div key={g.label}>
                <dt className="font-bold">{g.label}</dt>
                <dd>{g.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!valid || !changed || state === 'saving'}
            className="btn btn-primary disabled:opacity-50"
          >
            {state === 'saving' ? 'Saving…' : 'Save opening hours'}
          </button>
          <button
            type="button"
            onClick={() => {
              setHours(DEFAULT_HOURS);
              setMessage({ text: '', ok: true });
            }}
            className="btn ring-1 ring-gray-300"
          >
            Reset to default
          </button>
          {changed && <span className="text-sm font-semibold text-gray-700">Unsaved changes</span>}
        </div>
        <p role="status" className={`mt-3 font-semibold ${message.ok ? 'text-brand-green-deep' : 'text-red-700'}`}>
          {message.text}
        </p>
      </form>
    </>
  );
}
