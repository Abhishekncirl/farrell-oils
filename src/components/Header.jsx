import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { routes } from '../config/site.js';
import { useContact } from '../context/ContactContext.jsx';
import Logo from './Logo.jsx';
import { PhoneIcon, MailIcon, MenuIcon, CloseIcon, LockIcon } from './icons.jsx';

const navItems = routes.filter((r) => r.nav && r.path !== '/get-a-quote');

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const contact = useContact();

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const navLinkClass = ({ isActive }) =>
    `block rounded-md px-3 py-2 font-semibold transition-colors hover:text-brand-blue-dark ${
      isActive ? 'text-brand-blue underline decoration-brand-green decoration-3 underline-offset-8' : 'text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      {/* Top bar: click-to-call and email */}
      <div className="bg-brand-blue text-sm text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
          <p className="hidden sm:block">
            {contact.locality}, {contact.region}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 font-bold hover:underline">
              <PhoneIcon className="h-4 w-4" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:underline">
                <MailIcon className="h-4 w-4" />
                {contact.email}
              </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-page flex items-center justify-between gap-4 py-2">
        <Link to="/" className="shrink-0" aria-label="Farrell Oils home">
          <Logo className="h-16 w-auto sm:h-20 lg:h-24" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end className={navLinkClass}>
                  {item.nav}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/admin" className={navLinkClass}>
                <span className="inline-flex items-center gap-1.5">
                  <LockIcon className="h-4 w-4" />
                  Admin
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a href={contact.phoneHref} className="btn btn-secondary">
            <PhoneIcon className="h-5 w-5" />
            Call Now
          </a>
          <Link to="/get-a-quote" className="btn btn-primary">
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-brand-blue lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-gray-100 lg:hidden">
        <ul className="container-page space-y-1 py-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end className={navLinkClass}>
                {item.nav}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/admin" className={navLinkClass}>
              <span className="inline-flex items-center gap-1.5">
                <LockIcon className="h-4 w-4" />
                Admin
              </span>
            </NavLink>
          </li>
          <li className="flex flex-col gap-2 pt-2 sm:hidden">
            <a href={contact.phoneHref} className="btn btn-secondary">
              <PhoneIcon className="h-5 w-5" />
              Call Now: {contact.phone}
            </a>
            <Link to="/get-a-quote" className="btn btn-primary">
              Get a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
