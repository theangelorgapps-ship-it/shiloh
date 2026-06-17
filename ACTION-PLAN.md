# Shiloh SEO Action Plan

## Immediate Fixes

1. Update route discovery.
   - Add `/merch`, `/merch/baptism-gown`, `/schedule`, and active product routes to `public/sitemap.xml`.
   - Add those same public routes to `public/llms.txt`.
   - Do not index `/partners`; it has been removed and should redirect to `/merch`.

2. Add missing route SEO.
   - Add a `routeSeo` entry for `/schedule` in `src/App.tsx`.
   - Give each route a unique title, meta description, canonical, OG title, OG description, and OG image.
   - Keep titles around 30-60 characters and meta descriptions around 120-160 characters.

3. Make metadata crawlable before JavaScript.
   - Add pre-rendering, SSR, or route-specific static HTML generation for the main public pages.
   - Minimum routes to pre-render first: `/`, `/journey`, `/vip`, `/passes`, `/contact`, `/merch`, `/merch/baptism-gown`, `/schedule`.
   - Each generated route should ship its own canonical and schema in the first HTML response.

4. Add structured data.
   - Sitewide: `Organization` and `WebSite`.
   - Every page: `WebPage` and `BreadcrumbList`.
   - Event pages: enhanced `Event`.
   - Merch listing: `CollectionPage` and `ItemList`.
   - Baptism product: `ProductGroup`, `Product`, and `Offer`.

5. Add Baptism product SEO details.
   - Price: `$35 USD`.
   - Variants:
     - `#30738` size S
     - `#30740` size M
     - `#30742` size L
     - `#32694` size XL
   - Add copy for ceremonial use, sizing, checkout/collection, availability, and support.

## Next Sprint

1. Expand thin content.
   - `/passes`: add crawlable native content outside the iframe.
   - `/merch`: add category introduction, collection details, official merchandise trust copy, and product category links.
   - `/merch/baptism-gown`: expand to at least 400 words of useful product information.
   - `/schedule`: add event day summaries and helpful FAQ-style answer blocks.
   - `/contact`: add support categories, response expectations, and official contact guidance.

2. Improve heading structure.
   - Keep one primary H1 per route.
   - Reduce hidden duplicate H1s where they can create crawler noise.
   - Make animated text readable as normal text in the accessibility tree.

3. Optimize media.
   - Convert oversized product and venue images to responsive AVIF/WebP.
   - Add `srcset`, `sizes`, and explicit dimensions/aspect ratios.
   - Add posters and lazy loading for offscreen videos.
   - Code-split merch/product/cart logic from the homepage bundle.

4. Strengthen trust.
   - Add clear official organizer details.
   - Add support and fulfillment details for passes and merchandise.
   - Add terms/refund/collection notes where appropriate.

## After Deployment

1. Verify production headers.
   - Confirm CSP, HSTS, cache-control, robots, and sitemap are live on `https://shilohseason.com`.

2. Connect Google data.
   - Add Google Search Console.
   - Submit the sitemap.
   - Inspect key URLs: `/`, `/merch`, `/merch/baptism-gown`, `/schedule`, `/passes`.
   - Run PageSpeed Insights and check CrUX field data after traffic accumulates.

3. Monitor indexation and snippets.
   - Watch canonical selection in Search Console.
   - Track impressions/clicks by page.
   - Check that product pages generate accurate social previews and AI-search summaries.

## Acceptance Criteria

- Every public route has a sitemap entry or an intentional noindex decision.
- Every public route has route-specific title, description, canonical, OG, Twitter, and JSON-LD in the initial HTML.
- `/schedule` no longer uses homepage metadata.
- `/partners` is not indexable and redirects to `/merch`.
- `/merch/baptism-gown` has Product/ProductGroup/Offer schema with `$35 USD` and all size variations.
- `/passes`, `/merch`, and product pages meet minimum content-depth targets.
- Production Lighthouse/PageSpeed checks do not show avoidable LCP, CLS, or INP regressions.
