import { site, isTodo } from '../config/site.js';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '../components/icons.jsx';

export default function Contact() {
  const { address, contact } = site;
  return (
    <>
      <Seo path="/contact" />
      <PageHeader title="Contact" intro={`Call ${contact.person}, ${contact.role}.`} />

      <div className="container-page grid gap-10 py-16 md:grid-cols-2">
        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="text-2xl font-extrabold text-brand-blue">
            Get in touch
          </h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-3">
              <PhoneIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <a href={contact.phoneHref} className="text-lg font-bold text-brand-blue hover:underline">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              {isTodo(contact.email) ? (
                <span>{contact.email}</span>
              ) : (
                <a href={`mailto:${contact.email}`} className="font-bold text-brand-blue hover:underline">
                  {contact.email}
                </a>
              )}
            </li>
            <li className="flex gap-3">
              <MapPinIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <address className="not-italic">
                {address.building}
                <br />
                {address.street}
                <br />
                {address.locality}, {address.region}
                <br />
                {address.postalCode}
              </address>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <span>{site.openingHoursText}</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="map-heading">
          <h2 id="map-heading" className="text-2xl font-extrabold text-brand-blue">
            Find us
          </h2>
          <div className="placeholder mt-6 flex aspect-video items-center justify-center text-center">
            [TODO: map embed once Eircode is confirmed]
          </div>
        </section>
      </div>
    </>
  );
}
