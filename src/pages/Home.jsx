import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import Seo from '../components/Seo.jsx';
import Wave from '../components/Wave.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CTASection from '../components/CTASection.jsx';
import { PhoneIcon } from '../components/icons.jsx';

export default function Home() {
  return (
    <>
      <Seo path="/" />

      {/* Hero */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-brand-blue text-white">
        <div className="container-page py-16 sm:py-24">
          <p className="text-lg font-bold text-brand-green-light">
            {site.address.locality}, {site.address.region}
          </p>
          <h1 id="hero-heading" className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg">[TODO: hero intro copy] Derv, Petrol, Gas Oil and AdBlue.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/get-a-quote" className="btn bg-white text-brand-blue hover:bg-brand-green-tint">
              Get a Quote
            </Link>
            <a href={site.contact.phoneHref} className="btn btn-outline">
              <PhoneIcon className="h-5 w-5" />
              Call {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
        <Wave />
      </section>

      {/* Products */}
      <section aria-labelledby="products-heading" className="container-page py-16">
        <h2 id="products-heading" className="text-3xl font-extrabold text-brand-blue">
          Our products
        </h2>
        <p className="mt-2 text-lg font-semibold text-brand-green-dark">[TODO: products intro copy]</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.products.map((p, i) => (
            <ProductCard key={p.slug} product={p} accent={i % 2 ? 'blue' : 'green'} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-heading" className="bg-brand-green-tint">
        <div className="container-page py-16">
          <h2 id="why-heading" className="text-3xl font-extrabold text-brand-blue">
            Why choose {site.name}
          </h2>
          <div className="placeholder mt-6">[TODO: why-choose-us points, e.g. local family business, delivery area, payment options]</div>
        </div>
      </section>

      {/* Delivery area */}
      <section aria-labelledby="area-heading" className="container-page py-16">
        <h2 id="area-heading" className="text-3xl font-extrabold text-brand-blue">
          Delivery area
        </h2>
        <div className="placeholder mt-6">{site.areaServedText}</div>
      </section>

      <CTASection />
    </>
  );
}
