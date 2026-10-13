import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import GetAQuote from './pages/GetAQuote.jsx';
import Contact from './pages/Contact.jsx';
import Terms from './pages/legal/Terms.jsx';
import Privacy from './pages/legal/Privacy.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin is split into its own bundle so public visitors never download it.
const AdminApp = lazy(() => import('./pages/admin/AdminApp.jsx'));

export default function App() {
  return (
    <Routes>
      <Route
        path="admin/*"
        element={
          <Suspense fallback={<p className="p-8 text-center">Loading…</p>}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* The old Products page now lives on the home page. */}
        <Route path="products" element={<Navigate to="/#products" replace />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="get-a-quote" element={<GetAQuote />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
