/**
 * Builds SEO artefacts from site.js: JSON-LD, robots.txt, sitemap.xml and the
 * web manifest. Used by vite.config.js (index.html) and scripts/generate-seo-files.js.
 * Plain JS with no React imports so it can run in Node.
 */
import { site, routes, isTodo, routeMeta, pageTitle } from './site.js';

const known = (value) => (value && !isTodo(value) ? value : undefined);

export function buildJsonLd() {
  const { address, contact } = site;

  const openingHoursSpecification = site.openingHours.length
    ? site.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      }))
    : [{ '@type': 'OpeningHoursSpecification', description: site.openingHoursText }];

  const areaServed = site.areaServed.length
    ? site.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name }))
    : site.areaServedText;

  const sameAs = Object.values(site.social).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness'],
    '@id': `${site.url}/#business`,
    name: site.name,
    url: `${site.url}/`,
    description: routeMeta('/').description,
    image: `${site.url}${site.images.ogImage}`,
    logo: `${site.url}${site.images.logo}`,
    slogan: site.tagline,
    telephone: contact.phoneIntl,
    email: known(contact.email),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.building}, ${address.street}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: known(address.postalCode),
      addressCountry: address.countryCode,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      name: contact.person,
      contactType: 'sales',
      telephone: contact.phoneIntl,
      areaServed: 'IE',
      availableLanguage: 'English',
    },
    areaServed,
    openingHoursSpecification,
    makesOffer: site.products.map((p) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: p.brand ?? p.name,
        description: p.short,
        ...(p.brand && { brand: { '@type': 'Brand', name: p.brand.replace(/ AdBlue$/, '') } }),
      },
    })),
    ...(sameAs.length && { sameAs }),
  };
}

export function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;
}

export function buildSitemap() {
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${site.url}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildManifest() {
  return `${JSON.stringify(
    {
      name: site.name,
      short_name: site.name,
      description: routeMeta('/').description,
      lang: site.lang,
      start_url: './',
      scope: './',
      display: 'standalone',
      background_color: site.colors.white,
      theme_color: site.colors.brandBlue,
      icons: [
        { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2,
  )}\n`;
}

/** Values substituted into %TOKENS% in index.html. */
export function htmlTokens() {
  const home = routeMeta('/');
  return {
    LANG: site.lang,
    TITLE: pageTitle(home.name),
    DESCRIPTION: home.description,
    KEYWORDS: site.keywords.join(', '),
    THEME_COLOR: site.colors.brandBlue,
    SITE_URL: site.url,
    SITE_NAME: site.name,
    LOCALE: site.locale,
    OG_IMAGE: `${site.url}${site.images.ogImage}`,
    OG_IMAGE_ALT: site.images.ogImageAlt,
    JSON_LD: JSON.stringify(buildJsonLd(), null, 2).replace(/</g, '\\u003c'),
  };
}
