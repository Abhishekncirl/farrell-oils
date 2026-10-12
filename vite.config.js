import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { htmlTokens } from './src/config/seo.js';
import { basePath } from './src/config/site.js';

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Fills %TOKENS% in index.html from src/config/site.js. */
function siteMetadata() {
  return {
    name: 'site-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const tokens = htmlTokens();
        return html.replace(/%([A-Z_]+)%/g, (match, key) => {
          if (!(key in tokens)) return match;
          return key === 'JSON_LD' ? tokens[key] : escapeAttr(tokens[key]);
        });
      },
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), siteMetadata()],
});
