<h1 align="center">disconnect.</h1>

<p align="center">Website for <a href="https://disconnect.ro">Disconnect</a> — a digital studio for small and mid-sized businesses.</p>

Built with [Astro](https://astro.build) and Tailwind CSS. Static pages, zero JavaScript by default, one serverless function for the contact form. Project visuals are React components rendered at build time, so they ship no JavaScript either. Targets 100 on every Lighthouse category, on mobile and desktop.

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into .vercel/output
npm run check      # type-check .astro and .ts files
```

## Deploying to Vercel

Import the repository in Vercel. The Astro preset is detected automatically; no build settings are needed. Optional environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Delivers contact form messages through [Resend](https://resend.com). Without it the form still validates and filters spam, but asks visitors to email you directly. |
| `CONTACT_TO_EMAIL` | Inbox for form messages. Defaults to `site.email`. |
| `CONTACT_FROM_EMAIL` | Sender address; its domain must be verified in Resend. Defaults to `noreply@disconnect.ro`. |

## Where things live

| What | File |
| --- | --- |
| Company details, phone, WhatsApp, socials, analytics IDs | `src/config/site.ts` |
| Page titles, descriptions, keywords (SEO metadata) | `src/config/seo.ts` |
| URLs per language | `src/config/routes.ts` |
| Shared UI strings (menu, footer, cookies) | `src/i18n/ui.ts` |
| Services and website features | `src/data/services.ts` |
| FAQ | `src/data/faq.ts` |
| Blog posts | `src/content/blog/{ro,en}/*.md` |
| Portfolio projects | `src/content/portfolio/*.json` |
| Project visuals (covers and galleries drawn from each project) | `src/components/portfolio/` |
| Job openings | `src/content/careers/{ro,en}/*.md` |
| Page copy | `src/views/*View.astro` (each view holds its RO and EN text) |
| Terms and privacy policy | `src/views/legal/` |

Empty values in `site.ts` hide the related UI: set `phone` to show click-to-call, `whatsapp` to show the sticky WhatsApp button, `company.*` and `address.*` to fill in the legal pages and structured data.

### Content

- **Blog:** add `src/content/blog/ro/my-post.md` and its translation in `en/`, both with the same `translationKey`. The slug comes from the file name.
- **Portfolio:** add a JSON file to `src/content/portfolio/`. `comingSoon: true` labels a project that has not launched. The cover is generated from `colors`, unless the project has its own visuals in `src/components/portfolio/` (wired up in `ProjectCover.astro` and `ProjectGallery.astro`).
- **Careers:** roles with `draft: true` are not published. With no open roles the page shows an open application call to action.

### Adding a page

1. Add its paths to `routes` in `src/config/routes.ts` and its metadata to `seo.pages` in `src/config/seo.ts`.
2. Create a view in `src/views/` and two thin pages in `src/pages/` (Romanian path and `en/` path).

Sitemap, hreflang, Open Graph image, `llms.txt` and breadcrumbs pick it up automatically.

## What's built in

- **Languages:** Romanian at `/`, English at `/en`, with translated URLs, `hreflang`, and a language switch that keeps you on the same page.
- **SEO:** per-page titles and descriptions, canonical URLs, `sitemap.xml` with language alternates, `robots.txt`, RSS (`/rss.xml`, `/en/rss.xml`).
- **AEO / GEO:** JSON-LD for Organization, WebSite, Breadcrumbs, Services, FAQ, BlogPosting and JobPosting; `llms.txt` and `llms-full.txt` generated from the content; AI crawlers allowed.
- **Open Graph images:** generated at build time for every page, post and project (`/og/...png`).
- **Accessibility:** semantic landmarks, skip link, visible focus, keyboard-friendly menu (native `<dialog>`), AA contrast in both themes, reduced-motion support.
- **Dark mode:** follows the OS, with a toggle that remembers the choice.
- **Privacy:** Google Analytics, Meta Pixel and TikTok Pixel load only after cookie consent.
- **Contact form:** honeypot, timing check and link filtering against spam; works without JavaScript.
- **Icons:** `npm run icons` regenerates favicons and app icons from the logo mark.
