# Shiloh Website Full SEO Audit

Audit date: 2026-06-17  
Target reviewed: `http://127.0.0.1:5173` local Shiloh site, production target `https://shilohseason.com`  
Business type: Event/conference website with ecommerce merchandise and pass workflows  
Cache status: No cached SEO data found; this audit used fresh local analysis.

Implementation note: after this audit, `/partners` was removed from the public index plan and should redirect to `/merch` rather than being added to the sitemap.

## Executive Summary

The Shiloh site has a strong visual identity, a clear event proposition, open crawling, a good production security header set, and a useful `llms.txt` foundation. The main SEO risk is that the site is a client-rendered React SPA: route metadata is patched after JavaScript runs, but the built HTML and fallback route response still ship the homepage canonical, title, description, and Event schema first. Search engines can render JavaScript, but this setup is weaker for canonical discovery, social previews, AI crawlers, and any crawler with partial rendering.

The highest-impact fixes are to make route-level metadata and schema crawlable without relying only on client-side mutation, update the sitemap and `llms.txt` to include all indexable routes, add unique SEO for `/schedule`, remove `/partners` from the public index plan, expand thin pages, and add ecommerce/Product schema for the merchandise and Baptism product pages.

## Scores

| Area | Score | Notes |
| --- | ---: | --- |
| Overall | 72/100 | Good event foundation, but route discovery and schema need work. |
| Technical SEO | 76/100 | Robots, HTTPS headers, and SPA fallback are in place; sitemap and direct HTML need upgrades. |
| On-page SEO | 68/100 | Core titles/descriptions are mostly good; `/schedule` needed route SEO, and `/partners` should be removed rather than indexed. |
| Content Quality | 63/100 | Homepage is adequate; several important pages are below content-depth thresholds. |
| Schema/Structured Data | 50/100 | Only global Event JSON-LD is present across pages. |
| Performance Risk | 62/100 | No field data available; heavy remote imagery, videos, and iframe content create risk. |
| Image SEO | 70/100 | Rendered images mostly have alt handling; file sizes/dimensions need optimization. |
| AI Search/GEO | 78/100 | `llms.txt` exists and is helpful, but it omits several current routes and product pages. |

## Methodology

Evidence sources:

- Local render at `http://127.0.0.1:5173`
- Production build output in `dist/index.html`
- Source inspection of `src/App.tsx`, `index.html`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, `public/_headers`, and `vercel.json`
- Rendered route checks for title, meta description, canonical, headings, word count, images, videos, and schema types
- SEO skill reference thresholds for Core Web Vitals, schema, E-E-A-T, and quality gates

Limitations:

- The bundled SEO analyzer scripts block private hosts such as `127.0.0.1`, so this audit used local-safe crawl/render checks instead of those scripts.
- No Google API credentials were configured, so Search Console, URL Inspection, PageSpeed Insights, CrUX field data, and GA4 organic data were unavailable.
- Backlink tooling was limited to the basic/free tier; no authoritative link profile was retrieved.
- Production behavior should be rechecked after deployment, especially headers, indexation, and Core Web Vitals.

## Crawlability And Indexation

What is working:

- `public/robots.txt` allows all crawlers and points to `https://shilohseason.com/sitemap.xml`.
- The SPA fallback is configured in `vercel.json`, so direct route visits should resolve instead of 404ing.
- `index.html` includes a `noscript` fallback with core event details.
- Production headers in `vercel.json` include HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, and a CSP.

Issues:

1. The sitemap only lists five URLs: `/`, `/journey`, `/vip`, `/passes`, and `/contact`.
2. Current indexable routes missing from sitemap include `/merch`, `/merch/baptism-gown`, and `/schedule`. `/partners` should be removed and redirected instead of indexed.
3. The production HTML shell has the homepage canonical and homepage Open Graph data. Route-specific values are only applied in the browser by `useEffect` in `src/App.tsx`.
4. Because `vercel.json` rewrites all non-asset routes to `/index.html`, direct requests for pages like `/merch/baptism-gown` initially receive homepage metadata until JavaScript executes.

Recommendations:

- Add all indexable routes to `public/sitemap.xml`, including merchandise and product URLs.
- Add unique route SEO for `/schedule` in `src/App.tsx`.
- Use pre-rendering, SSR, or route-specific static HTML output so each route serves its own title, description, canonical, Open Graph metadata, and JSON-LD before JavaScript.
- Keep SPA fallback for UX, but do not rely on client-side meta mutation as the only source of crawlable route metadata.

## On-page SEO

Rendered route review:

| Route | Title/Canonical Status | Word Count | Main Issue |
| --- | --- | ---: | --- |
| `/` | Good rendered homepage metadata | 537 | Heading duplication/noisy animated text should be cleaned up. |
| `/journey` | Good rendered metadata | 481 | Slightly thin for a planning page. |
| `/vip` | Good rendered metadata | 471 | Needs more benefit/eligibility/detail copy. |
| `/passes` | Good rendered metadata | 170 | Very thin because core content is inside `component2.html` iframe. |
| `/contact` | Good rendered metadata | 321 | Below typical contact/support depth target. |
| `/merch` | Good rendered metadata | 230 | Thin for an ecommerce category page; missing from sitemap. |
| `/merch/baptism-gown` | Good rendered product metadata | 215 | Thin product copy; missing Product schema. |
| `/schedule` | Falls back to homepage title/canonical | 306 | Needs route-specific SEO and sitemap entry. |
| `/partners` | Removed from index plan | 266 before removal | Redirect to `/merch`; do not include in sitemap. |

Recommendations:

- Add `/schedule` to the `routeSeo` map and redirect `/partners` to `/merch`.
- Expand `/passes`, `/merch`, `/merch/baptism-gown`, `/schedule`, and `/contact` with useful, visible copy.
- Make heading structure cleaner: one primary H1 per route, then descriptive H2/H3 sections. Avoid duplicate hidden and visible H1s where possible.
- Avoid depending on iframe content as the main SEO content for `/passes`; add crawlable native page content summarizing pass types, prices, eligibility, and CTAs.

## Content Quality And E-E-A-T

Strengths:

- The homepage clearly states the event name, dates, and locations.
- The site uses official language and has strong brand recognition.
- Contact/support content exists, which helps trust.
- `llms.txt` gives AI systems a current official summary.

Gaps:

- Several pages are below common content-depth quality gates:
  - Product/category pages should generally have at least 400 words of useful content.
  - Major planning/support pages should usually exceed 500 words when they are intended to rank.
- The site should make trust signals more explicit: organizer identity, official support channels, refund/pass terms, accessibility guidance, venue logistics, and official merchandise fulfillment details.
- Product pages need more buyer-facing detail: sizing, fabric/ceremonial use, variation availability, shipping/collection, returns, and official source confirmation.

Recommendations:

- Add concise but substantial sections for "What this page covers", "Who this is for", "How to prepare", "Support", and "Official source" where relevant.
- For the Baptism product, add visible details for price `$35`, available sizes, and variation IDs:
  - `#30738` size S
  - `#30740` size M
  - `#30742` size L
  - `#32694` size XL
- Add organization/about copy that makes GoodNews World and Shiloh Season ownership/authority explicit.

## Structured Data

Current state:

- `index.html` contains one JSON-LD block with `@type: Event`.
- Rendered checks show only `Event` schema across all reviewed routes, including merchandise/product routes.
- The Event schema includes event dates, location, image, organizer, and `eventStatus`.

Issues:

- Product pages are missing `Product`, `Offer`, and preferably `ProductGroup` schema for size variants.
- Category/collection pages are missing `CollectionPage`/`ItemList` style structured data.
- Most pages are missing page-specific `WebPage` and `BreadcrumbList` schema.
- A standalone `Organization` schema and `WebSite` schema are not present.
- `/passes` could use Event `offers` or page-specific pass/ticket structured data if the passes are official offers.

Recommendations:

- Add a schema graph per route:
  - Sitewide: `Organization`, `WebSite`
  - Every route: `WebPage`, `BreadcrumbList`
  - Event routes: enhanced `Event`
  - Merchandise category: `CollectionPage`, `ItemList`
  - Product pages: `ProductGroup`, `Product`, `Offer`
- For Baptism product schema, include price `35`, currency `USD`, canonical URL, image, description, brand/organization, availability, and variant IDs/sizes.
- Keep JSON-LD server-rendered or pre-rendered where possible.

## Ecommerce SEO

Strengths:

- The merchandise page exists, has current product cards, and now includes a Baptism section.
- Product pages have product-style Open Graph type after JavaScript renders.
- Product images have descriptive visual content.

Issues:

- `/merch` and `/merch/baptism-gown` are not in `public/sitemap.xml`.
- Product page word count is too low for a competitive ecommerce product page.
- Product schema is missing.
- Images are pulled from remote sources at large natural dimensions, such as 2160x2160 and 2560x2560.
- The Baptism product should expose size variants and IDs clearly for product page and checkout consistency.

Recommendations:

- Create or maintain indexable URLs for every product meant to rank.
- Add product copy blocks: description, ceremonial use, size guide, fulfillment, care, official event connection, and support.
- Add `ProductGroup` schema with `hasVariant` or individual `Product` variants for sizes S/M/L/XL.
- Use optimized local or CDN-transformed images with responsive `srcset`, AVIF/WebP formats, and width/height attributes.

## Performance And Core Web Vitals Risk

No field CWV data was available because CrUX/PageSpeed credentials were not configured for this local audit. Use the 2026 thresholds as targets:

- LCP good: <= 2.5s
- INP good: <= 200ms
- CLS good: <= 0.1

Observed risk areas:

- Built JS bundle: approximately 444 KB uncompressed.
- Built CSS bundle: approximately 72 KB uncompressed.
- Local image asset: approximately 344 KB.
- Remote product imagery uses very large source dimensions.
- Hero and merchandise sections include multiple videos.
- `/passes` relies on an iframe (`public/component2.html`), which can complicate performance, accessibility, and SEO measurement.
- The Fort Moriah map image was observed at a very large natural size.

Recommendations:

- Compress and transform large images into responsive AVIF/WebP outputs.
- Lazy-load offscreen images and videos, but keep the LCP image/video poster optimized.
- Add explicit `width`, `height`, or CSS aspect-ratio for media elements to reduce CLS risk.
- Consider code-splitting routes so merch/product/cart logic is not part of the initial homepage bundle.
- Run Lighthouse/PageSpeed and CrUX after production deployment.

## Image SEO And Accessibility

Strengths:

- Rendered checks did not show obvious missing alt text counts on primary pages.
- Some decorative images use empty alt text, which can be correct when intentionally decorative.

Issues:

- Some important images are remote and oversized.
- Product imagery should have alt text that includes product name and relevant variant/context.
- Social/OG image defaults are event-branded, but product pages should use product-specific images in the initial HTML, not only after JavaScript.

Recommendations:

- Use descriptive alt text for product and route-defining images.
- Keep decorative media `alt=""` only when it is genuinely decorative.
- Generate responsive image sets for product cards and hero sections.
- Make product OG images route-specific in pre-rendered/static metadata.

## AI Search And GEO

Strengths:

- `public/llms.txt` exists and provides a clear official summary.
- It explicitly tells AI systems to prefer `shilohseason.com` over older Shiloh 2025 or WordPress-era pages.
- Robots are open.

Issues:

- `llms.txt` omits `/merch`, `/merch/baptism-gown`, and `/schedule`; `/partners` should be listed only as removed if mentioned at all.
- Product, pass, schedule, and support pages need more extractable answer-style passages.
- Structured data is too limited for strong AI extraction.

Recommendations:

- Update `llms.txt` whenever new public routes are added.
- Add short, factual answer blocks for dates, venues, pass types, merchandise, Baptism gowns, support, and travel.
- Add complete schema so AI systems can cross-check entities, dates, products, offers, and official URLs.

## Security And Headers

Strengths:

- `vercel.json` and `public/_headers` define a useful security header set:
  - Content-Security-Policy
  - Strict-Transport-Security
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
  - X-Frame-Options
- Static assets receive immutable caching.

Notes:

- The local Vite server did not serve production headers, which is expected.
- CSP currently allows `'unsafe-inline'` for scripts and styles. This may be required for current embeds/forms, but it weakens the CSP.

Recommendations:

- Verify headers on the deployed production domain.
- Where possible, replace inline scripts/styles with hashed or nonce-based CSP rules.
- Keep third-party domains in CSP as narrow as possible.

## Priority Findings

1. High: Route metadata and schema are client-rendered only; direct HTML still ships homepage canonical and Event schema.
2. High: Sitemap and `llms.txt` are missing current public routes including `/merch`, product pages, and `/schedule`.
3. High: `/schedule` falls back to homepage SEO metadata, while `/partners` should be removed and redirected.
4. High: Product/category structured data is missing for ecommerce pages.
5. Medium: Several pages are thin, especially `/passes`, `/merch`, and `/merch/baptism-gown`.
6. Medium: Large remote images and video-heavy hero sections create performance risk.
7. Medium: `/passes` relies on iframe content for important page substance.
8. Low: CSP includes inline allowances that should be tightened when feasible.

## Best Next Step

Start with crawlable route metadata: sitemap, `llms.txt`, route SEO for `/schedule`, a `/partners` redirect, and pre-rendered/static metadata for `/merch` and `/merch/baptism-gown`. That single workstream improves search discovery, social previews, AI extraction, product SEO, and confidence in canonical URLs.
