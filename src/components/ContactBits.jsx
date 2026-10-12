import { useContact } from '../context/ContactContext.jsx';
import { telHref } from '../lib/contact.js';

/** Address on separate lines; empty lines (e.g. no Eircode yet) are skipped. */
export function AddressLines() {
  const c = useContact();
  const lines = [c.building, c.street, [c.locality, c.region].filter(Boolean).join(', '), c.eircode].filter(Boolean);
  return lines.map((line, i) => (
    <span key={line} className="block">
      {line}
      {i < lines.length - 1 && <span className="sr-only">,</span>}
    </span>
  ));
}

/** Sales representatives with click-to-call numbers. Renders nothing if there are none. */
export function SalesReps({ className = '', linkClassName = '' }) {
  const { salesReps } = useContact();
  if (!salesReps.length) return null;
  return (
    <ul className={className}>
      {salesReps.map((r) => (
        <li key={r.id}>
          <span className="block font-bold">{r.name}</span>
          <a href={telHref(r.phone)} className={linkClassName}>
            {r.phone}
          </a>
        </li>
      ))}
    </ul>
  );
}
