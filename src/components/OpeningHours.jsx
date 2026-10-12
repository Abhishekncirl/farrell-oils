import { useOpeningHours } from '../hooks/useOpeningHours.js';
import { groupHours } from '../lib/openingHours.js';

/** Opening hours list, e.g. "Monday – Saturday  10:00 AM – 5:00 PM". */
export default function OpeningHours({ className = '' }) {
  const groups = groupHours(useOpeningHours());
  return (
    <dl className={className}>
      {groups.map((g) => (
        <div key={g.label} className="flex flex-wrap justify-between gap-x-4">
          <dt className="font-bold">{g.label}</dt>
          <dd>{g.text}</dd>
        </div>
      ))}
    </dl>
  );
}
