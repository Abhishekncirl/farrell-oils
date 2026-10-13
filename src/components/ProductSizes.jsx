/**
 * Illustrated pack sizes for a product page.
 * sizes: [{ kind: 'can' | 'ibc' | 'tanker', label, litres? }]
 * Drawings are original SVGs in the brand colours.
 */
export default function ProductSizes({ sizes, productName }) {
  const maxLitres = Math.max(...sizes.filter((s) => s.kind === 'can').map((s) => s.litres), 1);
  return (
    <section aria-labelledby="sizes-heading" className="container-page py-14">
      <span aria-hidden="true" className="block h-1 w-14 rounded-full bg-brand-green" />
      <h2 id="sizes-heading" className="mt-4 text-2xl font-extrabold uppercase text-ink sm:text-3xl">
        Sizes available
      </h2>
      <p className="mt-3 text-lg">Order {productName} in the size that suits you.</p>
      <ul className="mt-8 flex flex-wrap items-end justify-center gap-x-6 gap-y-10 lg:justify-between">
        {sizes.map((s) => (
          <li key={s.label} className={`flex flex-col items-center text-center ${s.kind === 'tanker' ? 'w-56' : 'w-36'}`}>
            <div className="flex h-36 items-end justify-center text-brand-blue">
              {s.kind === 'can' && <Can litres={s.litres} scale={0.55 + 0.45 * (s.litres / maxLitres)} />}
              {s.kind === 'ibc' && <Ibc />}
              {s.kind === 'tanker' && <Tanker />}
            </div>
            <p className="mt-3 font-extrabold text-brand-blue">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const svgProps = { 'aria-hidden': true, focusable: false, xmlns: 'http://www.w3.org/2000/svg' };

/** Jerry can, sized by volume. */
function Can({ litres, scale }) {
  const h = Math.round(140 * scale);
  return (
    <svg {...svgProps} viewBox="0 0 64 84" height={h} width={Math.round((h * 64) / 84)}>
      {/* handle with cut-out */}
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M28 4h26a5 5 0 0 1 5 5v12H23V9a5 5 0 0 1 5-5Zm4 5a2 2 0 0 0-2 2v4h22v-4a2 2 0 0 0-2-2Z"
      />
      {/* cap */}
      <rect x="6" y="6" width="13" height="10" rx="2.5" fill="var(--color-brand-blue-light)" />
      <rect x="8" y="14" width="9" height="5" fill="currentColor" />
      {/* body */}
      <rect x="3" y="18" width="58" height="64" rx="7" fill="currentColor" />
      {/* label band */}
      <rect x="9" y="34" width="46" height="30" rx="4" fill="var(--color-brand-blue-light)" />
      <text
        x="32"
        y="54.5"
        textAnchor="middle"
        fontFamily="Nunito, sans-serif"
        fontWeight="800"
        fontSize="16"
        fill="#FFFFFF"
      >
        {litres}L
      </text>
    </svg>
  );
}

/** 1,000 litre IBC: caged tank on a pallet. */
function Ibc() {
  return (
    <svg {...svgProps} viewBox="0 0 100 104" height="132" width="127">
      {/* top cap */}
      <rect x="40" y="2" width="20" height="8" rx="2" fill="currentColor" />
      {/* tank */}
      <rect x="8" y="10" width="84" height="70" rx="5" fill="var(--color-brand-blue-light)" />
      {/* cage */}
      <g stroke="currentColor" strokeWidth="4" fill="none">
        <rect x="8" y="10" width="84" height="70" rx="5" />
        <path d="M36 10v70M64 10v70M8 33h84M8 57h84" />
      </g>
      {/* label plate over the cage */}
      <rect x="22" y="24" width="56" height="40" rx="4" fill="currentColor" />
      <text x="50" y="41" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#FFFFFF">
        IBC
      </text>
      <text x="50" y="57" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="13" fill="#FFFFFF">
        1000L
      </text>
      {/* outlet valve */}
      <circle cx="50" cy="73" r="4" fill="currentColor" />
      {/* pallet */}
      <rect x="4" y="82" width="92" height="7" rx="1.5" fill="currentColor" />
      <rect x="8" y="89" width="12" height="9" fill="currentColor" />
      <rect x="44" y="89" width="12" height="9" fill="currentColor" />
      <rect x="80" y="89" width="12" height="9" fill="currentColor" />
    </svg>
  );
}

/** Bulk delivery tanker. */
function Tanker() {
  return (
    <svg {...svgProps} viewBox="0 0 170 84" height="100" width="202">
      {/* tank */}
      <rect x="50" y="10" width="114" height="46" rx="23" fill="var(--color-brand-blue-light)" />
      <rect x="50" y="10" width="114" height="46" rx="23" fill="none" stroke="currentColor" strokeWidth="4" />
      <rect x="90" y="4" width="16" height="7" rx="2" fill="currentColor" />
      <rect x="124" y="4" width="16" height="7" rx="2" fill="currentColor" />
      <text x="107" y="39" textAnchor="middle" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="15" fill="#FFFFFF">
        BULK
      </text>
      {/* cab */}
      <path d="M6 30a8 8 0 0 1 8-8h22l10 14v28H6Z" fill="currentColor" />
      <path d="M14 27h18l7 10H14Z" fill="#FFFFFF" opacity="0.9" />
      {/* chassis */}
      <rect x="6" y="58" width="160" height="8" rx="2" fill="currentColor" />
      {/* wheels */}
      {[24, 118, 146].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="70" r="11" fill="currentColor" />
          <circle cx={cx} cy="70" r="4" fill="#FFFFFF" />
        </g>
      ))}
    </svg>
  );
}
