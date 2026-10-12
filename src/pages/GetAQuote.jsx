import { useState } from 'react';
import { site } from '../config/site.js';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';

const field =
  'mt-1 block w-full rounded-lg border border-gray-400 px-3 py-2.5 text-ink focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue';
const label = 'block font-bold';

export default function GetAQuote() {
  const [submitted, setSubmitted] = useState(false);

  // [TODO: connect quote form to a backend / email service in a later phase]
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Seo path="/get-a-quote" />
      <PageHeader title="Get a Quote" intro={`Fill in the form, or call ${site.contact.phoneDisplay}.`} />

      <div className="container-page py-16">
        <form onSubmit={handleSubmit} className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Full name <span aria-hidden="true">*</span>
            </label>
            <input id="name" name="name" type="text" autoComplete="name" required className={field} />
          </div>
          <div>
            <label htmlFor="phone" className={label}>
              Phone <span aria-hidden="true">*</span>
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" required className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className={label}>
              Delivery address <span aria-hidden="true">*</span>
            </label>
            <input id="address" name="address" type="text" autoComplete="street-address" required className={field} />
          </div>
          <div>
            <label htmlFor="eircode" className={label}>
              Eircode
            </label>
            <input id="eircode" name="eircode" type="text" autoComplete="postal-code" className={field} />
          </div>
          <div>
            <label htmlFor="product" className={label}>
              Product <span aria-hidden="true">*</span>
            </label>
            <select id="product" name="product" required defaultValue="" className={field}>
              <option value="" disabled>
                Choose a product
              </option>
              {site.products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className={label}>
              Quantity (litres)
            </label>
            <input id="quantity" name="quantity" type="number" min="0" inputMode="numeric" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className={label}>
              Message
            </label>
            <textarea id="message" name="message" rows={4} className={field} />
          </div>
          <p className="text-sm sm:col-span-2">
            <span aria-hidden="true">*</span> Required field
          </p>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Request Quote
            </button>
          </div>
          <div role="status" aria-live="polite" className="sm:col-span-2">
            {submitted && (
              <p className="placeholder">
                [TODO: quote form not yet connected] Your request has not been sent. Please call {site.contact.phoneDisplay}.
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
