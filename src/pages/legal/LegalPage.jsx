import { site } from '../../config/site.js';
import PageHeader from '../../components/PageHeader.jsx';

/** Shared layout for the legal pages (Terms, Privacy). */
export default function LegalPage({ title, children }) {
  return (
    <>
      <PageHeader title={title} intro={`Last updated: ${site.legalUpdated}`} />
      <div className="container-page py-12">
        <div className="placeholder mb-8 max-w-3xl">
          <strong>Draft for review.</strong> This document is a starting template and is <em>not legally complete</em>.
          Points marked <strong>[CLIENT TO REVIEW WITH SOLICITOR]</strong> should be checked with a qualified solicitor.
        </div>
        <article className="max-w-3xl space-y-8">{children}</article>
      </div>
    </>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="text-xl font-extrabold text-brand-blue">{heading}</h2>
      <div className="mt-2 space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

/** Email and phone as links, for "contact us" lines. */
export function ContactLinks() {
  const { email, phoneDisplay, phoneHref } = site.contact;
  return (
    <>
      <a href={`mailto:${email}`} className="font-bold text-brand-blue underline">
        {email}
      </a>{' '}
      or{' '}
      <a href={phoneHref} className="font-bold text-brand-blue underline">
        {phoneDisplay}
      </a>
    </>
  );
}
