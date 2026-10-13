import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import { useContact } from '../context/ContactContext.jsx';
import Seo from '../components/Seo.jsx';
import Wave from '../components/Wave.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CTASection from '../components/CTASection.jsx';
import DeliveryMap from '../components/DeliveryMap.jsx';
import { CheckIcon, PhoneIcon } from '../components/icons.jsx';

export default function Home() {
  const contact = useContact();
  return (
    <>
      <Seo path="/" />

      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-brand-blue text-white">
        <div className="container-page py-16 sm:py-24">
          <p className="text-xl font-bold text-brand-green-light">
            {site.name} · {contact.locality}, {contact.region}
          </p>
          <h1 id="hero-heading" className="mt-2 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {site.copy.heroHeading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg">{site.copy.heroIntro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/get-a-quote" className="btn bg-white text-brand-blue hover:bg-brand-green-tint">
              Get a Quote
            </Link>
            <a href={contact.phoneHref} className="btn btn-outline">
              <PhoneIcon className="h-5 w-5" />
              Call {contact.phone}
            </a>
          </div>
        </div>
        <Wave />
      </section>

      {/* Our story */}
      <section aria-labelledby="story-heading" className="container-page py-16 text-center">
        <span aria-hidden="true" className="mx-auto block h-1 w-14 rounded-full bg-brand-green" />
        <h2 id="story-heading" className="mt-4 text-3xl font-extrabold text-brand-blue sm:text-4xl">
          {site.copy.storyHeading}
        </h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-5 text-lg leading-relaxed">
          {site.copy.story.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" aria-labelledby="products-heading" className="container-page py-16">
        <h2 id="products-heading" className="text-3xl font-extrabold text-brand-blue">
          Our products
        </h2>
        <p className="mt-2 text-lg font-semibold text-brand-green-dark">{site.copy.productsIntro}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {site.products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-heading" className="bg-brand-green-tint">
        <div className="container-page py-16">
          <h2 id="why-heading" className="text-3xl font-extrabold text-brand-blue">
            Why choose {site.name}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.copy.whyChooseUs.map((item) => (
              <li key={item.title} className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm">
                <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-brand-green-dark" />
                <div>
                  <h3 className="font-extrabold text-brand-blue">{item.title}</h3>
                  <p className="mt-1">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery area */}
      <section aria-labelledby="area-heading" className="container-page grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <h2 id="area-heading" className="text-3xl font-extrabold text-brand-blue">
            Delivery area
          </h2>
          <p className="mt-3 text-2xl font-bold text-brand-green-dark">{site.areaServedText}</p>
          <p className="mt-3 text-lg">
            From our base in {contact.locality}, {contact.region}, we deliver to farms, businesses and homes
            in every county.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/get-a-quote" className="btn btn-primary">
              Get a Quote
            </Link>
            <a href={contact.phoneHref} className="btn btn-secondary">
              <PhoneIcon className="h-5 w-5" />
              {contact.phone}
            </a>
          </div>
        </div>
        <DeliveryMap className="mx-auto w-full max-w-md" />
      </section>

      <CTASection />
    </>
  );
}
