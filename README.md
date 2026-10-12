# Farrell Oils

Website for **Farrell Oils**, fuel supplier in Carrickmacross, Co. Monaghan, Ireland.
Products: Derv, Petrol, Gas Oil, AdBlue (BluePlus AdBlue).

Status: Phase 1 (project setup, skeleton pages and metadata) plus customer enquiries and admin.

## Stack

React 18 + Vite 6 + Tailwind CSS 4 + React Router 6, with `react-helmet-async` for per-page metadata.
Firebase (Firestore + Auth) stores customer enquiries; staff manage them at `/admin`.
See **[SETUP-FIREBASE.md](SETUP-FIREBASE.md)** to connect the database.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
```

`npm run dev` and `npm run build` first run `npm run seo`, which regenerates
`public/robots.txt`, `public/sitemap.xml` and `public/site.webmanifest`.

## Updating business details

All business details live in **`src/config/site.js`**: name, phone, address, products,
colours, domain, routes and page descriptions. Components, `index.html` metadata, JSON-LD,
robots.txt, sitemap.xml and the web manifest all read from it.

Anything still unknown is marked `[TODO: ...]`. To list them:

```bash
grep -rn "TODO" src index.html public
```

## Brand colours

Defined as Tailwind tokens and CSS variables in `src/index.css` (`bg-brand-blue`,
`var(--color-brand-blue)`, ...). Contrast notes are in that file: the card's mid-green,
text-green and light blue are kept to large text and decoration because they are below
WCAG AA 4.5:1 for body text on white.
