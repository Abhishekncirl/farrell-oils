/**
 * Temporary text-based logo: "Farrell" + oil-drop "O" + "ils".
 * [TODO: supply real logo file] Swap this SVG for the supplied artwork.
 */
export default function Logo({ className = '', inverted = false }) {
  const text = inverted ? '#FFFFFF' : 'var(--color-brand-blue-light)';
  return (
    <svg
      className={className}
      viewBox="0 0 250 64"
      role="img"
      aria-label="Farrell Oils"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="0" y="50" fill={text} fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="44">
        Farrell
      </text>
      <g transform="translate(150 2)">
        <path
          d="M19 0C19 0 0 24 0 40a19 19 0 0 0 38 0C38 24 19 0 19 0Z"
          fill="var(--color-brand-green)"
        />
        <circle cx="19" cy="40" r="8" fill="#FFFFFF" />
      </g>
      <text x="192" y="50" fill={text} fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="44">
        ils
      </text>
    </svg>
  );
}
