// Regenerates public/robots.txt, public/sitemap.xml and public/site.webmanifest
// from src/config/site.js. Runs automatically before `npm run dev` and `npm run build`.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildManifest, buildRobots, buildSitemap } from '../src/config/seo.js';

const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

writeFileSync(out('robots.txt'), buildRobots());
writeFileSync(out('sitemap.xml'), buildSitemap());
writeFileSync(out('site.webmanifest'), buildManifest());

console.log('Generated robots.txt, sitemap.xml and site.webmanifest');
