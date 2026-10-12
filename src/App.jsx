import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import GetAQuote from './pages/GetAQuote.jsx';
import Contact from './pages/Contact.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="get-a-quote" element={<GetAQuote />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
