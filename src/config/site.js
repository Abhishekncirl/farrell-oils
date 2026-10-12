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

export const site = {
  name: 'Farrell Oils',
  tagline: todo('confirm tagline'),

  // Placeholder domain (example.com is reserved for documentation).
  // [TODO: confirm domain name] Replace with the real domain, no trailing slash.
  url: 'https://example.com',

  locale: 'en_IE',
  lang: 'en-IE',

  contact: {
    person: 'Sean Farrell',
    role: 'Sales Representative',
    phoneDisplay: '087 917 6881',
    phoneIntl: '+353 87 917 6881',
    phoneHref: 'tel:+353879176881',
    email: todo('confirm email address'),
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

  // [TODO: confirm opening hours] Replace with entries like
  // { days: ['Monday', 'Tuesday'], opens: '08:00', closes: '18:00' }
  openingHours: [],
  openingHoursText: todo('confirm opening hours'),

  // [TODO: confirm delivery area] e.g. ['Co. Monaghan', 'Co. Louth', 'Co. Cavan']
  areaServed: [],
  areaServedText: todo('confirm delivery area'),

  // [TODO: confirm social media links] Add full URLs, leave empty to hide.
  social: {
    facebook: '',
    instagram: '',
    x: '',
    linkedin: '',
  },

  images: {
    logo: todo('supply real logo file'),
    // Must be a 1200x630 PNG/JPG once supplied; social sites do not accept SVG.
    ogImage: '/og-image.png', // [TODO: supply OG image]
    ogImageAlt: 'Farrell Oils, fuel supplier in Carrickmacross, Co. Monaghan',
  },

  products: [
    {
      slug: 'derv',
      name: 'Derv',
      short: 'Road diesel for cars, vans, trucks and fleets.',
      description: todo('Derv product description'),
    },
    {
      slug: 'petrol',
      name: 'Petrol',
      short: 'Unleaded petrol.',
      description: todo('Petrol product description'),
    },
    {
      slug: 'gas-oil',
      name: 'Gas Oil',
      short: 'Marked gas oil (green diesel) for agricultural and off-road use.',
      description: todo('Gas Oil product description'),
    },
    {
      slug: 'adblue',
      name: 'AdBlue',
      brand: 'BluePlus AdBlue',
      short: 'BluePlus AdBlue for diesel engines with SCR systems.',
      description: todo('AdBlue product description'),
    },
  ],

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
    'BluePlus AdBlue',
    'agricultural fuel',
    'commercial fuel',
  ],
};

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
      'Farrell Oils, Carrickmacross, Co. Monaghan. Supplier of derv, petrol, gas oil and BluePlus AdBlue. Call 087 917 6881 for a fuel quote.',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/products',
    name: 'Products',
    nav: 'Products',
    description:
      'Derv, petrol, gas oil (green diesel) and BluePlus AdBlue from Farrell Oils in Carrickmacross, Co. Monaghan. Agricultural and commercial fuel.',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/get-a-quote',
    name: 'Get a Quote',
    nav: 'Get a Quote',
    description:
      'Request a fuel quote from Farrell Oils for derv, petrol, gas oil or AdBlue. Serving Carrickmacross and Co. Monaghan. Or call 087 917 6881.',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/contact',
    name: 'Contact',
    nav: 'Contact',
    description:
      "Contact Farrell Oils, O'Duffy Centre, Main Street, Carrickmacross, Co. Monaghan. Call Sean Farrell on 087 917 6881.",
    changefreq: 'yearly',
    priority: '0.7',
  },
  {
    path: '/terms',
    name: 'Terms and Conditions',
    nav: null,
    description: 'Terms and conditions of sale and delivery for Farrell Oils, Carrickmacross, Co. Monaghan.',
    changefreq: 'yearly',
    priority: '0.3',
  },
];

export const routeMeta = (path) => routes.find((r) => r.path === path);
