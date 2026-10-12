import { Link } from 'react-router-dom';
import { site } from '../config/site.js';

export const inputClass =
  'mt-1 block w-full rounded-lg border border-gray-400 px-3 py-2.5 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue aria-[invalid=true]:border-red-700';

/** Labelled input/select/textarea with an accessible error message. */
export function Field({ name, label, required = false, error, as: As = 'input', className = '', children, ...props }) {
  const errorId = `${name}-error`;
  return (
    <div className={className}>
      <label htmlFor={name} className="block font-bold">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <As
        id={name}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass}
        {...props}
      >
        {children}
      </As>
      {error && (
        <p id={errorId} className="mt-1 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden spam trap. Bots fill every field; people never see this one. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Submit button plus the sending / sent / error / not-configured messages. */
export function FormFooter({ status, isConfigured, submitLabel, onReset }) {
  const phone = (
    <a href={site.contact.phoneHref} className="font-bold underline">
      {site.contact.phoneDisplay}
    </a>
  );

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-lg border-2 border-brand-green-dark bg-brand-green-tint p-4 sm:col-span-2">
        <p className="font-bold text-brand-green-deep">Thank you, your enquiry has been sent.</p>
        <p className="mt-1">We will be in touch soon. For anything urgent, call {phone}.</p>
        <button type="button" onClick={onReset} className="mt-3 font-bold text-brand-blue underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:col-span-2">
      <p className="text-sm">
        <span aria-hidden="true">*</span> Required. We only use your details to reply to this enquiry. See our{' '}
        <Link to="/terms" className="font-bold text-brand-blue underline">
          terms
        </Link>
        .
      </p>
      {!isConfigured && (
        <p className="placeholder">The online form is not connected yet. Please call {phone}.</p>
      )}
      <button type="submit" className="btn btn-primary w-full sm:w-auto disabled:opacity-60" disabled={status === 'sending' || !isConfigured}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
      <div role="alert">
        {status === 'error' && (
          <p className="rounded-lg border-2 border-red-700 bg-red-50 p-4 text-red-800">
            Sorry, something went wrong and your enquiry was not sent. Please try again or call {phone}.
          </p>
        )}
      </div>
    </div>
  );
}
