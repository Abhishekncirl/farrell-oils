import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import { fillPhone, useContact } from '../context/ContactContext.jsx';
import { PhoneIcon } from './icons.jsx';

/** Call-to-action band with click-to-call. */
export default function CTASection({ heading = site.copy.ctaHeading, text = site.copy.ctaText }) {
  const contact = useContact();
  return (
    <section aria-labelledby="cta-heading" className="bg-brand-green-dark text-white">
      <div className="container-page flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-heading" className="text-2xl font-extrabold sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 text-lg">{fillPhone(text, contact)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={contact.phoneHref} className="btn bg-white text-brand-green-deep hover:bg-brand-green-tint">
            <PhoneIcon className="h-5 w-5" />
            {contact.phone}
          </a>
          <Link to="/get-a-quote" className="btn btn-outline">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
