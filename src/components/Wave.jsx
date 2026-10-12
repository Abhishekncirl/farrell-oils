/**
 * Decorative flowing green and blue wave, echoing the business card.
 * `fill` is the colour of the section the wave flows into.
 */
export default function Wave({ className = '', flip = false, fill = '#FFFFFF' }) {
  return (
    <svg
      className={`block w-full ${flip ? 'rotate-180' : ''} ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 40C240 110 480 0 720 40s480 80 720 0v80H0Z"
        fill="var(--color-brand-green-light)"
      />
      <path
        d="M0 60C260 120 520 20 760 60s440 60 680 0v60H0Z"
        fill="var(--color-brand-green)"
      />
      <path d="M0 80C280 130 540 50 780 80s420 40 660 10v30H0Z" fill={fill} />
    </svg>
  );
}
