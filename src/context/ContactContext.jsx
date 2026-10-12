import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CONTACT, fetchPublicContact, telHref } from '../lib/contact.js';

const ContactContext = createContext(null);

const withLinks = (c) => ({ ...c, phoneHref: telHref(c.phone) });

/** Provides live contact details (from Admin > Settings) to the whole site. */
export function ContactProvider({ children }) {
  const [contact, setContact] = useState(() => withLinks(DEFAULT_CONTACT));
  useEffect(() => {
    let active = true;
    fetchPublicContact().then((c) => active && setContact(withLinks(c)));
    return () => {
      active = false;
    };
  }, []);
  return <ContactContext.Provider value={contact}>{children}</ContactContext.Provider>;
}

/** { phone, phoneHref, email, building, street, locality, region, eircode, salesReps } */
export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContact must be used inside ContactProvider');
  return ctx;
}

/** Replaces {phone} in a copy string with the live phone number. */
export const fillPhone = (text, contact) => text.replaceAll('{phone}', contact.phone);
