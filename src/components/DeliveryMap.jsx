import { IRELAND_PATH, PLACES, VIEWBOX } from '../data/irelandMap.js';

// Extra room on the right and top so the base label is not clipped.
const [, , W, H] = VIEWBOX.split(' ').map(Number);
const PADDED_VIEWBOX = `0 -10 ${W + 70} ${H + 20}`;

const BASE = PLACES.Carrickmacross;
const TOWNS = ['Donegal', 'Sligo', 'Galway', 'Athlone', 'Dublin', 'Limerick', 'Kerry', 'Cork', 'Waterford'];

// Gentle curve from the base to a town, bowed to one side.
function route([x1, y1], [x2, y2]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M${x1} ${y1}Q${mx - dy * 0.2} ${my + dx * 0.2} ${x2} ${y2}`;
}

/** Map of Ireland showing delivery routes out from Carrickmacross. */
export default function DeliveryMap({ className = '' }) {
  return (
    <figure className={className}>
      <svg
        viewBox={PADDED_VIEWBOX}
        role="img"
        aria-labelledby="delivery-map-title"
        className="delivery-map h-auto w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="delivery-map-title">
          Map of Ireland. Farrell Oils is based in Carrickmacross, Co. Monaghan and delivers all across Ireland.
        </title>

        <path d={IRELAND_PATH} fill="var(--color-brand-green-light)" stroke="var(--color-brand-green-dark)" strokeWidth="1.2" strokeLinejoin="round" />

        <g fill="none" stroke="var(--color-brand-blue)" strokeWidth="2" strokeLinecap="round">
          {TOWNS.map((town, i) => (
            <path
              key={town}
              d={route(BASE, PLACES[town])}
              className="delivery-route"
              pathLength="1"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </g>

        {TOWNS.map((town) => {
          const [x, y] = PLACES[town];
          const labelLeft = x > 250;
          return (
            <g key={town}>
              <circle cx={x} cy={y} r="5" fill="#FFFFFF" stroke="var(--color-brand-blue)" strokeWidth="2.5" />
              <text
                x={labelLeft ? x - 9 : x + 9}
                y={y + 4.5}
                textAnchor={labelLeft ? 'end' : 'start'}
                fontSize="13"
                fontWeight="700"
                fill="var(--color-ink)"
                paintOrder="stroke"
                stroke="#FFFFFF"
                strokeWidth="3.5"
              >
                {town}
              </text>
            </g>
          );
        })}

        {/* Base: oil-drop pin at Carrickmacross */}
        <g transform={`translate(${BASE[0]} ${BASE[1]})`}>
          <circle r="16" fill="var(--color-brand-green)" opacity="0.25" className="delivery-pulse" />
          <path d="M0 -30C0 -30 -11 -16 -11 -8a11 11 0 0 0 22 0C11 -16 0 -30 0 -30Z" fill="var(--color-brand-green-dark)" stroke="#FFFFFF" strokeWidth="2" />
          <circle cy="-8" r="4.5" fill="#FFFFFF" />
          <text
            x="16"
            y="-12"
            fontSize="14"
            fontWeight="800"
            fill="var(--color-brand-blue-dark)"
            paintOrder="stroke"
            stroke="#FFFFFF"
            strokeWidth="4"
          >
            Carrickmacross
          </text>
          <text x="16" y="4" fontSize="12" fontWeight="700" fill="var(--color-brand-green-deep)" paintOrder="stroke" stroke="#FFFFFF" strokeWidth="4">
            Our base
          </text>
        </g>
      </svg>
      <figcaption className="sr-only">Towns shown are examples. We deliver anywhere in Ireland.</figcaption>
    </figure>
  );
}
