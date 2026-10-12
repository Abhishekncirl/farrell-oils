import { Helmet } from 'react-helmet-async';
import { site, routeMeta, pageTitle } from '../config/site.js';

/**
 * Per-page metadata. Reads title/description for `path` from site.routes,
 * so every route gets a unique title, description, canonical and OG/Twitter tags.
 */
export default function Seo({ path, name, noindex = false }) {
  const meta = routeMeta(path);
  const title = pageTitle(name ?? meta?.name ?? site.name);
  const description = meta?.description ?? routeMeta('/').description;
  const url = `${site.url}${path === '/' ? '/' : path}`;
  const image = `${site.url}${site.images.ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
