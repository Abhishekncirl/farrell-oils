import { useOpeningHours } from '../hooks/useOpeningHours.js';
import { groupHours } from '../lib/openingHours.js';

/** Opening hours list: each day range with its times on the line below. */
export default function OpeningHours({ className = '' }) {
  const groups = groupHours(useOpeningHours());
  return (
    <dl className={className}>
      {groups.map((g) => (
        <div key={g.label}>
          <dt className="font-bold">{g.label}</dt>
          <dd>{g.text}</dd>
        </div>
      ))}
    </dl>
  );
}
