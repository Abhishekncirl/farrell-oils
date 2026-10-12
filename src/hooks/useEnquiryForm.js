import { useState } from 'react';
import { submitEnquiry } from '../lib/enquiries.js';
import { isFirebaseConfigured } from '../lib/firebase.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates the form's values. Returns { fieldName: message } (empty when valid). */
function validate(values, { requireMessage }) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please enter your name.';
  if ((values.phone ?? '').replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.';
  if (values.email?.trim() && !EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (requireMessage && !values.message?.trim()) errors.message = 'Please enter a message.';
  return errors;
}

/**
 * Shared submit logic for the enquiry and quote forms.
 * status: 'idle' | 'sending' | 'sent' | 'error'
 */
export function useEnquiryForm({ type, detailFields = [], requireMessage = false }) {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    // Honeypot: real people never see or fill this field.
    if (values.website) {
      setStatus('sent');
      return;
    }

    const found = validate(values, { requireMessage });
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const details = Object.fromEntries(detailFields.map((k) => [k, values[k]]));
      await submitEnquiry({ type, ...values, details });
      form.reset();
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return { status, errors, handleSubmit, isConfigured: isFirebaseConfigured, reset: () => setStatus('idle') };
}
