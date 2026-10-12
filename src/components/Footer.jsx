import { Link } from 'react-router-dom';
import { routes, site, isTodo } from '../config/site.js';
import Logo from './Logo.jsx';
import Wave from './Wave.jsx';
import OpeningHours from './OpeningHours.jsx';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from './icons.jsx';

export default function Footer() {
  const { address, contact } = site;
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="mt-auto">
      <Wave fill="var(--color-brand-blue)" />
      <div className="bg-brand-blue text-white">
        <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-block rounded-xl bg-white p-3">
              <Logo className="h-20 w-auto" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold">Visit us</h2>
            <address className="mt-3 flex gap-2 text-sm not-italic">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                {address.building}
                <br />
                {address.street}
                <br />
                {address.locality}, {address.region}
                <br />
                {address.postalCode}
              </span>
            </address>
          </div>

          <div>
            <h2 className="text-lg font-bold">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                {contact.person}, {contact.role}
              </li>
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-bold hover:underline">
                  <PhoneIcon className="h-5 w-5" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MailIcon className="h-5 w-5" />
                {isTodo(contact.email) ? (
                  contact.email
                ) : (
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                )}
              </li>
              <li className="flex items-start gap-2">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0" />
                <OpeningHours className="w-full max-w-64 space-y-2" />
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold">Quick links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {routes.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="hover:underline">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
            {socials.length > 0 && (
              <ul className="mt-4 flex gap-3 text-sm">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} className="capitalize hover:underline" rel="noopener noreferrer" target="_blank">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-white/20">
          <div className="container-page flex flex-col gap-2 py-4 text-xs sm:flex-row sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to="/terms" className="hover:underline">
                Terms and Conditions
              </Link>
              <Link to="/admin" className="hover:underline">
                Staff login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
