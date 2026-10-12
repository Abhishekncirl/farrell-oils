import { Link } from 'react-router-dom';
import { fullAddress, site } from '../../config/site.js';
import Seo from '../../components/Seo.jsx';
import LegalPage, { ContactLinks, LegalSection } from './LegalPage.jsx';

export default function Terms() {
  return (
    <>
      <Seo path="/terms" />
      <LegalPage title="Terms and Conditions" draft>
        <LegalSection heading="1. About us">
          <p>
            This website is operated by {site.name}, {fullAddress} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            [CLIENT TO REVIEW WITH SOLICITOR: legal entity name, company registration number and VAT number.]
          </p>
        </LegalSection>

        <LegalSection heading="2. Using this website">
          <p>
            By using this website you agree to these terms. The content is general information about our products and
            services and may change without notice.
          </p>
        </LegalSection>

        <LegalSection heading="3. Enquiries and quotes">
          <p>
            Sending an enquiry or quote request through this website does not create a contract or reserve fuel. Fuel
            prices change with the market, so any quote is valid only for the period we state when we give it. An order
            is confirmed only when we agree it with you directly. [CLIENT TO REVIEW WITH SOLICITOR.]
          </p>
        </LegalSection>

        <LegalSection heading="4. Deliveries">
          <p>
            Delivery dates and times are estimates. Please make sure there is safe access for our tanker and that your
            tank is in good condition, correctly labelled and has room for the amount ordered. We may postpone a
            delivery if access is unsafe or the tank is unsuitable. [CLIENT TO REVIEW WITH SOLICITOR: delivery, risk and
            ownership terms.]
          </p>
        </LegalSection>

        <LegalSection heading="5. Marked fuels">
          <p>
            Marked gas oil and HVO Green may only be used for the purposes allowed by Irish law (for example
            agricultural and off-road use) and must not be used in road vehicles. The customer is responsible for using
            fuel lawfully.
          </p>
        </LegalSection>

        <LegalSection heading="6. Payment">
          <p>
            Payment terms are agreed with you when you order. [CLIENT TO REVIEW WITH SOLICITOR: payment terms, credit
            accounts and late payment.]
          </p>
        </LegalSection>

        <LegalSection heading="7. Your information">
          <p>
            <strong>Information you give us through this website is used for contact and business purposes only:</strong>{' '}
            to reply to you, quote, arrange deliveries and keep the records the law requires. We do not sell it or use it
            for marketing without your agreement. Full details are in our{' '}
            <Link to="/privacy" className="font-bold text-brand-blue underline">
              Privacy Policy
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection heading="8. Limitation of liability">
          <p>
            To the extent permitted by law, we are not liable for any loss arising from reliance on the content of this
            website. Nothing in these terms limits your statutory rights as a consumer or any liability that cannot be
            limited under Irish law. [CLIENT TO REVIEW WITH SOLICITOR.]
          </p>
        </LegalSection>

        <LegalSection heading="9. Governing law">
          <p>These terms are governed by the laws of Ireland. [CLIENT TO REVIEW WITH SOLICITOR.]</p>
        </LegalSection>

        <LegalSection heading="10. Contact">
          <p>
            Questions about these terms: <ContactLinks />.
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
