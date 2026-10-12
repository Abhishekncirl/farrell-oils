import { site } from '../config/site.js';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import CTASection from '../components/CTASection.jsx';
import { CheckIcon, DropIcon } from '../components/icons.jsx';

export default function Products() {
  return (
    <>
      <Seo path="/products" />
      <PageHeader title="Products" intro={`${site.products.map((p) => p.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}. ${site.copy.productsIntro}`} />

      <div className="container-page space-y-12 py-16">
        {site.products.map((p) => (
          <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-heading`}>
            <div className="flex items-start gap-4">
              <DropIcon className={`h-12 w-8 shrink-0 ${p.accent === 'blue' ? 'text-brand-blue' : 'text-brand-green'}`} />
              <div className="flex-1">
                <h2 id={`${p.slug}-heading`} className="text-2xl font-extrabold text-brand-blue">
                  {p.name}
                </h2>
                {p.brand && <p className="font-bold text-brand-green-dark">{p.brand}</p>}
                <p className="mt-2">{p.short}</p>
                {p.points && (
                  <ul className="mt-3 space-y-1.5">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-green-dark" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTASection heading={site.copy.urgentHeading} text={site.copy.urgentText} />
    </>
  );
}
