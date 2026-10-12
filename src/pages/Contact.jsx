import { useContact } from '../context/ContactContext.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import OpeningHours from '../components/OpeningHours.jsx';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { AddressLines, SalesReps } from '../components/ContactBits.jsx';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, UserIcon } from '../components/icons.jsx';

export default function Contact() {
  const contact = useContact();
  return (
    <>
      <Seo path="/contact" />
      <PageHeader title="Contact" intro={`Call us on ${contact.phone}, or send us an enquiry below.`} />

      <div className="container-page grid gap-10 py-16 md:grid-cols-2">
        <section aria-labelledby="details-heading">
          <h2 id="details-heading" className="text-2xl font-extrabold text-brand-blue">
            Get in touch
          </h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-3">
              <PhoneIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <a href={contact.phoneHref} className="text-lg font-bold text-brand-blue hover:underline">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <a href={`mailto:${contact.email}`} className="font-bold text-brand-blue hover:underline">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPinIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <address className="not-italic">
                <AddressLines />
              </address>
            </li>
            {contact.salesReps.length > 0 && (
              <li className="flex gap-3">
                <UserIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
                <div className="w-full max-w-sm">
                  <h3 className="font-bold text-brand-blue">
                    {contact.salesReps.length > 1 ? 'Sales representatives' : 'Sales representative'}
                  </h3>
                  <SalesReps className="mt-1 space-y-2" linkClassName="font-semibold text-brand-blue hover:underline" />
                </div>
              </li>
            )}
            <li className="flex gap-3">
              <ClockIcon className="h-6 w-6 shrink-0 text-brand-green-dark" />
              <div className="w-full max-w-sm">
                <h3 className="font-bold text-brand-blue">Opening hours</h3>
                <OpeningHours className="mt-1 space-y-2" />
              </div>
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

      <section aria-labelledby="enquiry-heading" className="bg-brand-green-tint">
        <div className="container-page py-16">
          <div className="mx-auto max-w-2xl">
            <h2 id="enquiry-heading" className="text-2xl font-extrabold text-brand-blue">
              Send us an enquiry
            </h2>
            <p className="mt-2">Leave your details and we will get back to you.</p>
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
