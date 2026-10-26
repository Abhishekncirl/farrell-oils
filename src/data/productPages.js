/**
 * Content for each product page (/products/<slug>). Keyed by the product slug
 * in src/config/site.js. Text is original to Farrell Oils.
 *
 * Optional images (paths in /public, e.g. 'products/derv.webp'):
 * - `image`: photo in the feature panel instead of the branded graphic.
 * - `bannerImage`: faint background photo behind the page banner.
 * - `brandLogo`: { src, alt } brand logo shown in original colours in the banner.
 * - `imageAlt` / `imageCaption`: describe the photo / small note under it.
 * Only use photos you have the rights to (your own, or properly licensed).
 */

// Reasons that apply to every product; each page adds its own first.
const sharedBenefits = [
  {
    title: 'One name, one number',
    text: 'You deal with Sean directly. No call centre, no being passed around. Ring, tell us what you need, and it gets sorted.',
  },
  {
    title: 'Straight, competitive pricing',
    text: 'Fuel prices move with the market. We give you a clear quote for your order, with no hidden extras.',
  },
  {
    title: 'Delivered across Ireland',
    text: 'From our base in Carrickmacross we deliver all over Ireland, north and south, to farms, yards, depots and homes.',
  },
  {
    title: 'Easy to order',
    text: 'Call us, or send a quote request online in under a minute and we will come back to you with a price.',
  },
  {
    title: 'A local business',
    text: "We're based on Main Street, Carrickmacross. Our customers are our neighbours, and we work hard to keep it that way.",
  },
];

export const productPages = {
  derv: {
    // Farrell Oils' own tanker.
    image: 'products/derv.webp',
    imageAlt: 'Farrell Oils fuel tanker lorry in Farrell Oils livery under a blue sky',
    subtitle: 'Keeping Ireland moving',
    intro:
      'Derv is road diesel, the fuel that keeps cars, vans, trucks and buses on the road. Farrell Oils supplies derv in bulk to hauliers, fleets, contractors, farms and businesses, delivered straight into your own storage tank anywhere in Ireland.',
    featureTitle: 'Reliable road diesel for your fleet',
    feature: [
      'If your business runs on wheels, running out of fuel costs you time and money. Keeping your own tank topped up means your drivers fill up in the yard instead of at the forecourt, and you always know what fuel is going into your vehicles.',
      "Tell us the size of your tank and how much you use, and we'll arrange deliveries that fit the way you work.",
    ],
    idealFor: ['Haulage and delivery fleets', 'Vans and company vehicles', 'Contractors and plant hire', 'Farms with road vehicles'],
    benefits: [
      {
        title: 'Bulk deliveries to your tank',
        text: 'Fill your own storage tank and fuel your vehicles on site, on your schedule.',
      },
    ],
    closing:
      'Keep your vehicles on the road with derv from Farrell Oils. Call us or request a quote today.',
  },

  petrol: {
    // Freepik Premium licence (Farrell Oils subscription).
    image: 'products/petrol.webp',
    bannerImage: 'products/petrol-banner.webp',
    subtitle: 'Unleaded petrol, supplied locally',
    intro:
      'Farrell Oils supplies unleaded petrol for cars, small vehicles and petrol-powered equipment. Talk to us about what you need and we will find the best way to supply you.',
    featureTitle: 'Petrol for work and everyday use',
    feature: [
      'From lawnmowers and generators to chainsaws, quads and site equipment, plenty of machines still run on petrol. We can help keep your business or farm supplied.',
      'Petrol must be stored safely and only in containers or tanks approved for it. If you are not sure what storage you need, ask us before you order.',
    ],
    idealFor: ['Small machinery and garden equipment', 'Generators and pumps', 'Quads and small vehicles', 'Businesses with petrol vehicles'],
    benefits: [
      {
        title: 'Advice on safe supply',
        text: "Petrol needs the right storage. We'll talk you through what's needed before we supply.",
      },
    ],
    closing: 'For unleaded petrol from a supplier you can talk to, call Farrell Oils or request a quote.',
  },

  'gas-oil': {
    image: 'products/gas-oil.webp',
    imageAlt: 'Green tractor pulling a cultivator across a stubble field',
    subtitle: 'Marked gas oil for farms, plant and machinery',
    intro:
      'Gas oil, often called green diesel, is marked fuel for agricultural and off-road use. Farrell Oils delivers gas oil to farms, contractors and businesses all across Ireland, keeping tractors, plant and machinery working.',
    featureTitle: 'Built for farms and sites',
    feature: [
      'From busy silage and harvest seasons to winter feeding, your machinery needs fuel when the work needs doing. Keep your farm or yard tank topped up with gas oil from Farrell Oils and stay ahead of the busy times.',
      'Marked gas oil may only be used for permitted purposes, such as agricultural and off-road use. It must not be used in road vehicles.',
    ],
    idealFor: ['Tractors and farm machinery', 'Diggers, loaders and construction plant', 'Generators and off-road equipment', 'Agricultural contractors'],
    benefits: [
      {
        title: 'Ready for the busy season',
        text: 'Order ahead of silage, harvest and winter, and keep your yard tank full when you need it most.',
      },
    ],
    closing: 'Keep your farm and machinery working with gas oil from Farrell Oils. Call us or request a quote today.',
  },

  hvo: {
    image: 'products/hvo.webp',
    imageAlt: 'HVO renewable diesel pump with a green HVO nozzle and a lorry in the background',
    // The photo shows "Up to 90% lower CO2 emissions*", so explain the asterisk.
    imageCaption:
      '*Lifecycle CO₂ emissions compared with fossil diesel. Actual savings depend on how the HVO is produced.',
    subtitle: 'A renewable alternative to diesel',
    intro:
      "HVO (Hydrotreated Vegetable Oil) is a renewable diesel made from vegetable oils, waste fats and residues. It works in many diesel engines in place of conventional diesel, and it is one of the simplest ways for farms and businesses to reduce their carbon footprint. Farrell Oils supplies both HVO Green and HVO White.",
    featureTitle: 'HVO Green and HVO White',
    feature: [
      'HVO Green is marked HVO for agricultural and off-road use, an alternative to marked gas oil. HVO White is for road vehicles, an alternative to derv.',
      "Depending on how it is produced, HVO can greatly reduce lifecycle carbon emissions compared with fossil diesel. Many engine makers approve HVO for their engines; check your manufacturer's guidance, and ask us if you have any questions about switching.",
    ],
    idealFor: [
      'Businesses reducing their carbon footprint',
      'Farms and contractors (HVO Green)',
      'Fleets and road vehicles (HVO White)',
      'Generators and machinery',
    ],
    benefits: [
      {
        title: 'Green and white available',
        text: 'Marked HVO Green for off-road use and HVO White for the road, both from one supplier.',
      },
    ],
    closing: 'Ready to make the switch to HVO? Talk to Farrell Oils about HVO Green and HVO White today.',
  },

  adblue: {
    image: 'products/adblue.webp',
    imageAlt: 'BluePlus AdBlue in 5 litre, 10 litre and 18 litre containers',
    // Brand logo in its original colours, shown in the banner.
    brandLogo: { src: 'products/blueplus-logo.png', alt: 'BluePlus' },
    subtitle: 'From 5 litre containers to bulk tanker deliveries',
    intro:
      'AdBlue is a high-purity urea solution used by modern diesel vehicles and machinery with SCR (Selective Catalytic Reduction) systems to cut harmful NOx emissions. Farrell Oils supplies BluePlus AdBlue in 5, 10 and 18 litre containers, 1,000 litre IBCs and bulk by tanker.',
    featureTitle: 'The right amount for every user',
    feature: [
      'If your trucks, tractors or machinery use AdBlue, running out can stop them working. Pick up handy 5, 10 or 18 litre containers for vans and smaller machines, or keep a fleet or farm supplied with 1,000 litre IBCs or bulk deliveries by tanker.',
      'Store AdBlue out of direct sunlight in a clean, sealed container, away from extreme heat and frost, so it stays in good condition.',
    ],
    idealFor: ['Haulage fleets and trucks', 'Tractors and farm machinery', 'Vans and company cars', 'Construction plant'],
    // Shown as illustrated pack sizes. kind: can | ibc | tanker
    sizes: [
      { kind: 'can', litres: 5, label: '5 litre' },
      { kind: 'can', litres: 10, label: '10 litre' },
      { kind: 'can', litres: 18, label: '18 litre' },
      { kind: 'ibc', label: '1,000 litre IBC' },
      { kind: 'tanker', label: 'Bulk by tanker' },
    ],
    benefits: [
      {
        title: 'Every size from 5 litres to a tanker',
        text: '5, 10 and 18 litre containers, 1,000 litre IBCs, or bulk delivered by tanker into your storage.',
      },
    ],
    closing: 'Keep your fleet clean and compliant with BluePlus AdBlue from Farrell Oils. Call us or request a quote.',
  },
};

/** Content for one product, with the shared reasons appended. */
export function productPage(slug) {
  const page = productPages[slug];
  if (!page) return null;
  return { ...page, benefits: [...page.benefits, ...sharedBenefits] };
}
