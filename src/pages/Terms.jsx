import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function Terms() {
  return (
    <>
      <Seo path="/terms" />
      <PageHeader title="Terms and Conditions" />
      <div className="container-page max-w-3xl py-16">
        <div className="placeholder">[TODO: terms and conditions text, to be supplied by Farrell Oils]</div>
      </div>
    </>
  );
}
