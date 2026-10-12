import { site } from '../config/site.js';

const base = import.meta.env.BASE_URL;

/** Farrell Oils tanker logo (public/logo.webp, PNG fallback). Navy artwork: place on a white background. */
export default function Logo({ className = '' }) {
  return (
    <picture>
      <source srcSet={`${base}logo.webp`} type="image/webp" />
      <img
        src={`${base}logo.png`}
        alt={`${site.name}: ${site.tagline}`}
        width="960"
        height="461"
        className={className}
      />
    </picture>
  );
}
