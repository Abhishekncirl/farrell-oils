import { useEnquiryForm } from '../hooks/useEnquiryForm.js';
import { Field, FormFooter, Honeypot } from './form.jsx';

/** General customer enquiry form. Saves to Firestore as type 'general'. */
export default function EnquiryForm() {
  const { status, errors, handleSubmit, isConfigured, reset } = useEnquiryForm({
    type: 'general',
    requireMessage: true,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
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
        name="message"
        label="How can we help?"
        required
        as="textarea"
        rows={5}
        maxLength={5000}
        error={errors.message}
        className="sm:col-span-2"
      />
      <FormFooter status={status} isConfigured={isConfigured} submitLabel="Send Enquiry" onReset={reset} />
    </form>
  );
}
