import { Link } from 'react-router-dom';
import { DropIcon } from './icons.jsx';

export default function ProductCard({ product }) {
  const iconColour = product.accent === 'blue' ? 'text-brand-blue' : 'text-brand-green';
  return (
    <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <DropIcon className={`h-12 w-8 ${iconColour}`} />
      <h3 className="mt-4 text-xl font-extrabold text-brand-blue">{product.name}</h3>
      {product.brand && <p className="text-sm font-bold text-brand-green-dark">{product.brand}</p>}
      <p className="mt-2 flex-1 text-sm">{product.short}</p>
      <Link
        to={`/products#${product.slug}`}
        className="mt-4 font-bold text-brand-blue underline-offset-4 hover:text-brand-blue-dark hover:underline"
      >
        Read more<span className="sr-only"> about {product.name}</span> &rarr;
      </Link>
    </article>
  );
}
