import { site } from '../config/site.js';
import { useEnquiryForm } from '../hooks/useEnquiryForm.js';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { Field, FormFooter, Honeypot } from '../components/form.jsx';

export default function GetAQuote() {
  const { status, errors, handleSubmit, isConfigured, reset } = useEnquiryForm({
    type: 'quote',
    detailFields: ['product', 'quantity', 'address', 'eircode'],
  });

  return (
    <>
      <Seo path="/get-a-quote" />
      <PageHeader title="Get a Quote" intro={site.copy.quoteIntro} />

      <div className="container-page py-16">
        <form onSubmit={handleSubmit} noValidate className="relative mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
          <Honeypot />
          <Field name="name" label="Full name" required autoComplete="name" error={errors.name} />
          <Field name="phone" label="Phone" required type="tel" autoComplete="tel" error={errors.phone} />
          <Field
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email}
            className="sm:col-span-2"
          />
          <Field
            name="address"
            label="Delivery address"
            autoComplete="street-address"
            maxLength={300}
            className="sm:col-span-2"
          />
          <Field name="eircode" label="Eircode" autoComplete="postal-code" maxLength={10} />
          <Field name="product" label="Product" as="select" defaultValue="">
            <option value="">Choose a product</option>
            {site.products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </Field>
          <Field name="quantity" label="Quantity (litres)" type="number" min="0" inputMode="numeric" />
          <Field
            name="message"
            label="Anything else?"
            as="textarea"
            rows={4}
            maxLength={5000}
            className="sm:col-span-2"
          />
          <FormFooter status={status} isConfigured={isConfigured} submitLabel="Request Quote" onReset={reset} />
        </form>
      </div>
    </>
  );
}
