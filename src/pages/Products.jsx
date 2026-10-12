import { site } from '../config/site.js';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import CTASection from '../components/CTASection.jsx';
import { DropIcon } from '../components/icons.jsx';

export default function Products() {
  return (
    <>
      <Seo path="/products" />
      <PageHeader title="Products" intro="Derv, Petrol, Gas Oil and AdBlue." />

      <div className="container-page space-y-12 py-16">
        {site.products.map((p, i) => (
          <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-heading`} className="scroll-mt-40">
            <div className="flex items-start gap-4">
              <DropIcon className={`h-12 w-8 shrink-0 ${i % 2 ? 'text-brand-blue' : 'text-brand-green'}`} />
              <div className="flex-1">
                <h2 id={`${p.slug}-heading`} className="text-2xl font-extrabold text-brand-blue">
                  {p.name}
                </h2>
                {p.brand && <p className="font-bold text-brand-green-dark">{p.brand}</p>}
                <p className="mt-2">{p.short}</p>
                <div className="placeholder mt-4">{p.description}</div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTASection heading="Not sure what you need?" />
    </>
  );
}
