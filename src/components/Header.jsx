import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { PRODUCTS_SECTION } from '../config/site.js';
import { useContact } from '../context/ContactContext.jsx';
import Logo from './Logo.jsx';
import { PhoneIcon, MailIcon, MenuIcon, CloseIcon, LockIcon } from './icons.jsx';

const isProducts = (l) => (l.pathname === '/' && l.hash === '#products') || l.pathname.startsWith('/products/');

const navItems = [
  { to: '/', label: 'Home', isActive: (l) => l.pathname === '/' && !isProducts(l) },
  { to: PRODUCTS_SECTION, label: 'Products', isActive: isProducts },
  { to: '/contact', label: 'Contact', isActive: (l) => l.pathname === '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const contact = useContact();

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  const navLinkClass = ({ isActive }) =>
    `block rounded-md px-3 py-2 font-semibold transition-colors hover:text-brand-blue-dark ${
      isActive ? 'text-brand-blue underline decoration-brand-green decoration-3 underline-offset-8' : 'text-ink'
    }`;

  return (
    <header className="header-material sticky top-0 z-40 shadow-sm">
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
              <li key={item.label}>
                <MenuLink item={item} location={location} className={navLinkClass} />
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
      {/* Mobile nav: slides down from the header and back up the same way. */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-out motion-reduce:transition-opacity lg:hidden ${
          open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <ul
            className={`container-page space-y-1 border-t border-gray-100 py-3 transition-transform duration-200 ease-out motion-reduce:transition-none ${
              open ? 'translate-y-0' : '-translate-y-2'
            }`}
          >
          {navItems.map((item) => (
            <li key={item.label}>
              <MenuLink item={item} location={location} className={navLinkClass} />
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
        </div>
      </nav>
    </header>
  );
}

/** Menu link whose active state also understands #hash sections. */
function MenuLink({ item, location, className }) {
  const isActive = item.isActive(location);
  return (
    <Link to={item.to} aria-current={isActive ? 'page' : undefined} className={className({ isActive })}>
      {item.label}
    </Link>
  );
}
