import { Link } from 'react-router-dom';
import { fullAddress, site } from '../../config/site.js';
import Seo from '../../components/Seo.jsx';
import LegalPage, { ContactLinks, LegalSection } from './LegalPage.jsx';

export default function Privacy() {
  return (
    <>
      <Seo path="/privacy" />
      <LegalPage title="Privacy Policy">
        <LegalSection heading="1. Who we are">
          <p>
            {site.name}, {fullAddress} (&quot;we&quot;, &quot;us&quot;) is the data controller for personal data
            collected through this website.
          </p>
        </LegalSection>

        <LegalSection heading="2. What we collect">
          <p>When you send an enquiry or request a quote, we collect only what you type into the form:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>your name and phone number;</li>
            <li>your email address, if you give it;</li>
            <li>delivery address and Eircode, if you give them;</li>
            <li>the product and quantity you are interested in, and your message.</li>
          </ul>
          <p>We do not ask for payment details on this website.</p>
        </LegalSection>

        <LegalSection heading="3. How we use your information">
          <p>
            <strong>Your information is used for contact and business purposes only.</strong> We use it to:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>reply to your enquiry and contact you about it;</li>
            <li>prepare and send you a quote;</li>
            <li>arrange and make deliveries you order;</li>
            <li>keep the business records we need for accounts, tax and other legal obligations.</li>
          </ul>
          <p>
            We do not sell, rent or trade your information. We do not use it for marketing, or pass it to anyone for
            their own marketing, unless you have clearly agreed to that.
          </p>
          <p>
            Our legal basis is taking steps at your request before entering a contract, performing a contract with
            you, our legitimate interest in running the business, and complying with the law.
          </p>
        </LegalSection>

        <LegalSection heading="4. Who can see it">
          <p>
            Enquiries are stored securely with Google Firebase (Google Cloud), which hosts our database. Only{' '}
            {site.name} staff with an admin login can read them. We may share the details needed to complete an order
            with a delivery or haulage partner, our accountant, or where the law requires it.
          </p>
        </LegalSection>

        <LegalSection heading="5. Cookies">
          <p>
            This website does not use advertising or analytics cookies and does not track you. Fonts are loaded from
            Google Fonts, which receives your device&apos;s IP address in order to deliver them.
          </p>
        </LegalSection>

        <LegalSection heading="6. How long we keep it">
          <p>
            We keep enquiries only as long as needed to deal with your request. Records of orders and deliveries are
            kept for as long as Irish tax and accounting law requires. Enquiries that do not lead to an order are
            deleted when no longer needed.
          </p>
        </LegalSection>

        <LegalSection heading="7. Your rights">
          <p>
            Under GDPR you can ask to see the information we hold about you, have it corrected or deleted, restrict or
            object to how we use it, or receive a copy of it. To do any of these, contact us at <ContactLinks />.
          </p>
          <p>
            If you are unhappy with how we handle your data, you can complain to the Data Protection Commission at{' '}
            <a
              href="https://www.dataprotection.ie"
              className="font-bold text-brand-blue underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              dataprotection.ie
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection heading="8. Contact">
          <p>
            Questions about this policy: <ContactLinks />. See also our{' '}
            <Link to="/terms" className="font-bold text-brand-blue underline">
              Terms and Conditions
            </Link>
            .
          </p>
        </LegalSection>
      </LegalPage>
    </>
  );
}
