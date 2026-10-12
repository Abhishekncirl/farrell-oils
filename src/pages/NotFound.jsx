import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function NotFound() {
  return (
    <>
      <Seo path="/404" name="Page not found" noindex />
      <PageHeader title="Page not found" />
      <div className="container-page py-16">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </>
  );
}
