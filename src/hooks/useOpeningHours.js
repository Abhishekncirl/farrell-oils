import { useEffect, useState } from 'react';
import { DEFAULT_HOURS, fetchPublicHours } from '../lib/settings.js';

/** Opening hours for public pages: defaults first, then the live hours set in admin. */
export function useOpeningHours() {
  const [hours, setHours] = useState(DEFAULT_HOURS);
  useEffect(() => {
    let active = true;
    fetchPublicHours().then((h) => active && setHours(h));
    return () => {
      active = false;
    };
  }, []);
  return hours;
}
