import { Link, useParams } from 'react-router-dom';
import { PRODUCTS_SECTION, site } from '../config/site.js';
import { productPage } from '../data/productPages.js';
import Seo from '../components/Seo.jsx';
import Wave from '../components/Wave.jsx';
import CTASection from '../components/CTASection.jsx';
import ProductSizes from '../components/ProductSizes.jsx';
import NotFound from './NotFound.jsx';
import { CheckIcon, DropIcon, PhoneIcon } from '../components/icons.jsx';
import { useContact } from '../context/ContactContext.jsx';

const base = import.meta.env.BASE_URL;

/** Short accent bar above section headings. */
const Accent = ({ center = false }) => (
  <span aria-hidden="true" className={`block h-1 w-14 rounded-full bg-brand-green ${center ? 'mx-auto' : ''}`} />
);

export default function ProductPage() {
  const { slug } = useParams();
  const product = site.products.find((p) => p.slug === slug);
  const page = productPage(slug);
  const contact = useContact();
  if (!product || !page) return <NotFound />;

  const displayName = product.brand ?? product.name;
  const others = site.products.filter((p) => p.slug !== slug);

  return (
    <>
      <Seo path={`/products/${slug}`} />

      {/* Banner (optional faint background photo, like a watermark) */}
      <div className="relative overflow-hidden bg-brand-blue text-white">
        {page.bannerImage && (
          <img
            src={`${base}${page.bannerImage}`}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}
        {page.bannerImage && <div aria-hidden="true" className="absolute inset-0 bg-brand-blue/70" />}
        {page.bannerLogo && (
          <img
            src={`${base}${page.bannerLogo}`}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[-10%] bottom-[22%] w-[52%] max-w-3xl opacity-15 sm:top-1/2 sm:right-0 sm:bottom-auto sm:w-[55%] sm:-translate-y-1/2"
          />
        )}
        <div className="relative container-page py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap gap-2 text-white/90">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <span aria-hidden="true"> /</span>
              </li>
              <li>
                <Link to={PRODUCTS_SECTION} className="hover:underline">
                  Products
                </Link>
                <span aria-hidden="true"> /</span>
              </li>
              <li aria-current="page" className="font-bold text-white">
                {product.name}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-wide sm:text-5xl">{product.name}</h1>
          {product.brand && <p className="mt-2 text-xl font-bold text-white">{product.brand}</p>}
        </div>
        <Wave className="relative" />
      </div>

      {/* Intro */}
      <section aria-labelledby="intro-heading" className="container-page py-14 text-center">
        <Accent center />
        <h2 id="intro-heading" className="mt-4 text-3xl font-extrabold uppercase text-ink sm:text-4xl">
          {product.name} by {site.name}
        </h2>
        <p className="mt-2 text-xl font-bold text-brand-blue sm:text-2xl">{page.subtitle}</p>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed">{page.intro}</p>
      </section>

      {/* Feature */}
      <section aria-labelledby="feature-heading" className="bg-brand-green-tint">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2">
          <ProductVisual product={product} image={page.image} imageAlt={page.imageAlt} />
          <div>
            <Accent />
            <h2 id="feature-heading" className="mt-4 text-2xl font-extrabold uppercase text-ink sm:text-3xl">
              {page.featureTitle}
            </h2>
            {page.feature.map((para) => (
              <p key={para.slice(0, 24)} className="mt-4 leading-relaxed">
                {para}
              </p>
            ))}
            <h3 className="mt-6 font-extrabold text-brand-blue">Ideal for</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {page.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-green-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {page.sizes && <ProductSizes sizes={page.sizes} productName={displayName} />}

      {/* Why choose us */}
      <section aria-labelledby="benefits-heading" className="container-page py-14">
        <Accent />
        <h2 id="benefits-heading" className="mt-4 text-2xl font-extrabold uppercase text-ink sm:text-3xl">
          Why choose {site.name} for {displayName}
        </h2>
        <p className="mt-3 text-lg">Here's what you get when you order from us:</p>
        <ol className="mt-6 grid gap-3 lg:grid-cols-2">
          {page.benefits.map((b, i) => (
            <li key={b.title}>
              <details className="group rounded-lg bg-brand-blue text-white open:bg-brand-blue-dark">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 font-extrabold [&::-webkit-details-marker]:hidden">
                  <span className="w-6 shrink-0">{i + 1}.</span>
                  <span className="flex-1">{b.title}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-xl leading-none text-brand-blue transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 pl-15 leading-relaxed">{b.text}</p>
              </details>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-lg leading-relaxed">{page.closing}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/get-a-quote" className="btn btn-primary">
            Get a Quote
          </Link>
          <a href={contact.phoneHref} className="btn btn-secondary">
            <PhoneIcon className="h-5 w-5" />
            {contact.phone}
          </a>
        </div>
      </section>

      {/* Other products */}
      <nav aria-labelledby="others-heading" className="border-t border-gray-100">
        <div className="container-page py-12">
          <h2 id="others-heading" className="text-xl font-extrabold text-brand-blue">
            Our other products
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold text-brand-blue ring-1 ring-gray-300 hover:ring-brand-blue"
                >
                  <DropIcon className={`h-5 w-3.5 ${p.accent === 'blue' ? 'text-brand-blue' : 'text-brand-green'}`} />
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CTASection heading={site.copy.urgentHeading} text={site.copy.urgentText} />
    </>
  );
}

/** Product photo if supplied, otherwise a branded graphic. */
function ProductVisual({ product, image, imageAlt }) {
  if (image) {
    return (
      <img
        src={`${base}${image}`}
        alt={imageAlt ?? `${product.name} from ${site.name}`}
        className="h-auto w-full rounded-2xl shadow-sm"
      />
    );
  }
  const green = product.accent !== 'blue';
  return (
    <div
      aria-hidden="true"
      className={`relative flex min-h-72 w-full flex-col items-center justify-center overflow-hidden rounded-2xl px-6 pt-8 pb-16 sm:aspect-[4/3] ${
        green ? 'bg-brand-green-dark' : 'bg-brand-blue'
      } text-white shadow-sm`}
    >
      <DropIcon className={`h-28 w-18 ${green ? 'text-brand-green-light' : 'text-white'}`} />
      <p className="mt-4 text-3xl font-extrabold uppercase tracking-wide">{product.name}</p>
      {product.points && (
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {product.points.map((pt) => (
            <li key={pt} className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              {pt.split(':')[0]}
            </li>
          ))}
        </ul>
      )}
      <Wave className="absolute inset-x-0 bottom-0 h-10 opacity-90" fill="transparent" />
    </div>
  );
}
