/**
 * Single source of truth for Farrell Oils business details.
 *
 * Every component, page, the index.html metadata, JSON-LD, robots.txt and
 * sitemap.xml read from this file. Update a value here once and it flows
 * everywhere (run `npm run build` to regenerate robots.txt / sitemap.xml).
 *
 * Anything still unknown is marked with todo('...') so it is easy to find:
 * search the project for "[TODO" to list every gap.
 */

export const todo = (what) => `[TODO: ${what}]`;
export const isTodo = (value) => typeof value === 'string' && value.startsWith('[TODO');

// Phone number shown on the site, in international format. Change it here only.
const PHONE = '+353 87 917 6881';

export const site = {
  name: 'Farrell Oils',
  tagline: 'Fueling, Powering, Delivering',

  // Live URL, no trailing slash. Currently the GitHub Pages address.
  // [TODO: confirm domain name] Replace with the real domain once bought,
  // e.g. 'https://www.example.ie'. The build's base path is derived from this.
  url: 'https://abhishekncirl.github.io/farrell-oils',

  locale: 'en_IE',
  lang: 'en-IE',

  contact: {
    person: 'Sean Farrell',
    role: 'Sales Representative',
    phoneDisplay: PHONE,
    phoneIntl: PHONE,
    phoneHref: `tel:${PHONE.replace(/\s/g, '')}`,
    email: 'farrelloils@gmail.com',
  },

  address: {
    building: "O'Duffy Centre",
    street: 'Main Street',
    locality: 'Carrickmacross',
    region: 'Co. Monaghan',
    postalCode: todo('confirm Eircode'),
    country: 'Ireland',
    countryCode: 'IE',
  },

  // Default opening hours (24h "HH:MM"). Staff can change the live hours in
  // Admin > Settings; these are the fallback and what search engines see at build.
  openingHours: {
    mon: { closed: false, opens: '10:00', closes: '17:00' },
    tue: { closed: false, opens: '10:00', closes: '17:00' },
    wed: { closed: false, opens: '10:00', closes: '17:00' },
    thu: { closed: false, opens: '10:00', closes: '17:00' },
    fri: { closed: false, opens: '10:00', closes: '17:00' },
    sat: { closed: false, opens: '10:00', closes: '17:00' },
    sun: { closed: false, opens: '11:00', closes: '17:00' },
  },

  // Confirmed by the client: delivery anywhere in Ireland.
  areaServed: ['Ireland'],
  areaServedText: 'We deliver all across Ireland.',

  // [TODO: confirm social media links] Add full URLs, leave empty to hide.
  social: {
    facebook: '',
    instagram: '',
    x: '',
    linkedin: '',
  },

  // Shown as "Last updated" on the Terms and Privacy pages.
  legalUpdated: '12 October 2026',

  images: {
    logo: '/logo.png',
    // 1200x630, generated from the logo. Social sites do not accept SVG.
    ogImage: '/og-image.png',
    ogImageAlt: 'Farrell Oils, fuel supplier in Carrickmacross, Co. Monaghan',
  },

  // Order here is the order on the site. `points` show as bullets on /products.
  products: [
    {
      slug: 'derv',
      name: 'Derv',
      accent: 'blue',
      short: 'Clean, reliable road diesel for cars, vans, trucks and fleets. Keep your business on the road.',
    },
    {
      slug: 'petrol',
      name: 'Petrol',
      accent: 'blue',
      short: 'Quality unleaded petrol for everyday driving and small machinery.',
    },
    {
      slug: 'gas-oil',
      name: 'Gas Oil',
      accent: 'green',
      short:
        "Marked gas oil (green diesel) for tractors, plant and off-road machinery. Built for Monaghan's farms and sites.",
    },
    {
      slug: 'hvo',
      name: 'HVO',
      accent: 'green',
      short: 'HVO (Hydrotreated Vegetable Oil), a renewable alternative to diesel. Available in green and white.',
      points: ['HVO Green: marked, for agricultural and off-road use', 'HVO White: for road vehicles'],
    },
    {
      slug: 'adblue',
      name: 'AdBlue',
      brand: 'BluePlus AdBlue',
      accent: 'blue',
      short: 'BluePlus AdBlue for modern diesel engines with SCR, keeping you compliant and running clean.',
      points: ['Bulk AdBlue delivered by tanker', '1,000 litre IBCs'],
    },
  ],

  // Marketing copy, approved by the client.
  copy: {
    heroHeading: 'Fuel you can count on, from people you know.',
    heroIntro:
      "Farrell Oils supplies Derv, Petrol, Gas Oil, HVO and BluePlus AdBlue to farms, businesses and homes from our base on Main Street, Carrickmacross. One call to Sean and it's sorted.",
    productsIntro: 'Delivered all across Ireland.',
    whyChooseUs: [
      { title: 'Local', text: "Based in the O'Duffy Centre, Main Street, Carrickmacross." },
      { title: 'One name, one number', text: 'You deal with Sean, not a switchboard.' },
      { title: 'Straight pricing', text: 'Clear quotes with no surprises.' },
      { title: 'Farm to fleet', text: 'From a top-up for the tractor to bulk diesel for your trucks.' },
      { title: 'Nationwide delivery', text: 'We deliver all across Ireland.' },
    ],
    ctaHeading: 'Running low?',
    // {phone} is replaced with the live number from Admin > Settings.
    ctaText: "Ring {phone} and we'll get you sorted.",
    urgentHeading: 'Need fuel fast?',
    urgentText: "Call {phone}. We'll do our best to get to you quickly.",
    quoteIntro:
      "Tell us the product, the quantity and where it's going, and we'll come back to you with a price. Prefer to talk? Call {phone}.",
  },

  // Mirrors the tokens in src/index.css (@theme). Used for meta theme-color,
  // the web manifest and anywhere JS needs a colour.
  colors: {
    brandBlue: '#2F55A4',
    brandBlueLight: '#4A78C2',
    brandBlueDark: '#1F3B75',
    brandGreen: '#3FA535',
    brandGreenDark: '#2B7A2B',
    brandGreenDeep: '#1F5E1F',
    brandGreenLight: '#A8D88A',
    brandTextGreen: '#4CA64C',
    white: '#FFFFFF',
    ink: '#1F2937',
  },

  keywords: [
    'Farrell Oils',
    'Carrickmacross',
    'Co. Monaghan',
    'fuel delivery Monaghan',
    'derv',
    'diesel',
    'petrol',
    'gas oil',
    'green diesel',
    'AdBlue',
    'HVO',
    'HVO fuel Ireland',
    'bulk AdBlue',
    'AdBlue IBC',
    'fuel delivery Ireland',
    'BluePlus AdBlue',
    'agricultural fuel',
    'commercial fuel',
  ],
};

/** Path the site is served under, e.g. '/farrell-oils/' on GitHub Pages or '/' on a domain. */
export const basePath = `${new URL(site.url).pathname.replace(/\/$/, '')}/`;

export const fullAddress = [
  site.address.building,
  site.address.street,
  site.address.locality,
  site.address.region,
  site.address.country,
].join(', ');

/** Per-route metadata. Title pattern: "Page Name | Farrell Oils | Carrickmacross, Co. Monaghan". */
export const titleSuffix = `${site.name} | ${site.address.locality}, ${site.address.region}`;
export const pageTitle = (pageName) => `${pageName} | ${titleSuffix}`;

export const routes = [
  {
    path: '/',
    name: 'Home',
    nav: 'Home',
    description:
      `Farrell Oils, Carrickmacross, Co. Monaghan. Derv, petrol, gas oil, HVO and BluePlus AdBlue delivered across Ireland. Call ${PHONE}.`,
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/products',
    name: 'Products',
    nav: 'Products',
    description:
      'Derv, petrol, gas oil, HVO green and white, and bulk BluePlus AdBlue (tanker or 1,000L IBC) from Farrell Oils. Delivered across Ireland.',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/get-a-quote',
    name: 'Get a Quote',
    nav: 'Get a Quote',
    description:
      `Request a fuel quote from Farrell Oils for derv, petrol, gas oil, HVO or AdBlue. Delivery across Ireland. Or call ${PHONE}.`,
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/contact',
    name: 'Contact',
    nav: 'Contact',
    description:
      `Contact Farrell Oils, O'Duffy Centre, Main Street, Carrickmacross, Co. Monaghan. Call Sean Farrell on ${PHONE}.`,
    changefreq: 'yearly',
    priority: '0.7',
  },
  {
    path: '/terms',
    name: 'Terms and Conditions',
    nav: null,
    description: 'Terms and conditions for the Farrell Oils website, enquiries, quotes and fuel deliveries.',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    nav: null,
    description:
      'How Farrell Oils uses the details you send us: for contact and business purposes only. Your GDPR rights and how to contact us.',
    changefreq: 'yearly',
    priority: '0.3',
  },
];

export const routeMeta = (path) => routes.find((r) => r.path === path);
