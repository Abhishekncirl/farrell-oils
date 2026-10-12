/**
 * Opening hours helpers. Plain JS (no React, no Vite env) so the build-time
 * SEO script can use them too.
 *
 * Shape: { mon: { closed: false, opens: '10:00', closes: '17:00' }, ..., sun: {...} }
 */
export const DAYS = [
  ['mon', 'Monday'],
  ['tue', 'Tuesday'],
  ['wed', 'Wednesday'],
  ['thu', 'Thursday'],
  ['fri', 'Friday'],
  ['sat', 'Saturday'],
  ['sun', 'Sunday'],
];

export const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

/** '17:00' -> '5:00 PM' */
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

/** True if `hours` has all 7 days with valid times and opens before closes. */
export function isValidHours(hours) {
  return DAYS.every(([key]) => {
    const d = hours?.[key];
    if (!d || typeof d.closed !== 'boolean') return false;
    if (!TIME_RE.test(d.opens) || !TIME_RE.test(d.closes)) return false;
    return d.closed || d.opens < d.closes;
  });
}

const sameHours = (a, b) => a.closed === b.closed && (a.closed || (a.opens === b.opens && a.closes === b.closes));

/**
 * Groups consecutive days with the same hours:
 * [{ days: ['Monday', ..., 'Saturday'], label: 'Monday – Saturday', text: '10:00 AM – 5:00 PM', ... }]
 */
export function groupHours(hours) {
  const groups = [];
  for (const [key, name] of DAYS) {
    const d = hours[key];
    const last = groups[groups.length - 1];
    if (last && sameHours(last.hours, d)) {
      last.days.push(name);
    } else {
      groups.push({ days: [name], hours: d });
    }
  }
  return groups.map(({ days, hours: d }) => ({
    days,
    label: days.length > 1 ? `${days[0]} – ${days[days.length - 1]}` : days[0],
    closed: d.closed,
    opens: d.opens,
    closes: d.closes,
    text: d.closed ? 'Closed' : `${formatTime(d.opens)} – ${formatTime(d.closes)}`,
  }));
}
