import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const shellPath = path.join(distDir, 'index.html');
const siteUrl = 'https://shilohseason.com';
const defaultImage = 'https://assets.cdn.filesafe.space/pVxIE30GROfdQAaVsJgi/media/6995a97ff02fa4d694442b64.webp';
const logo = defaultImage;

const products = [
  {
    slug: 'shiloh-season-jumper',
    name: 'Pre Order - Shiloh Season Jumper',
    price: 30,
    description:
      "Step into your Shiloh Season in style with the official Shiloh Season Jumper, a conference apparel item carrying the message that this is your Shiloh Season.",
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Jumper-Red-Gold.webp',
  },
  {
    slug: 'shiloh-season-long-sleeve-t-shirt',
    name: 'Pre Order - Shiloh Season Long Sleeve T-Shirt',
    price: 20,
    description:
      'Shop the official Shiloh Season Long Sleeve T-Shirt for Shiloh 2026, designed for conference wear, travel days, and cool evening sessions.',
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Longsleeve-Green-Gold.webp',
  },
  {
    slug: 'shiloh-season-silver-logo-t-shirt',
    name: 'Pre Order - Shiloh Season Silver Logo T-Shirt',
    price: 15,
    description:
      'Shop the official Shiloh Season Silver Logo T-Shirt for Shiloh 2026, part of the conference merchandise collection.',
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Shiloh-Maroon_Silver-Tee.webp',
  },
  {
    slug: 'shiloh-season-gold-logo-t-shirt',
    name: 'Pre Order - Shiloh Season Gold Logo T-Shirt',
    price: 15,
    description:
      'Shop the official Shiloh Season Gold Logo T-Shirt for Shiloh 2026, part of the GoodNews World conference apparel collection.',
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Shiloh-Purple_Gold-Tee.webp',
  },
  {
    slug: 'shiloh-season-blue-logo-t-shirt',
    name: 'Pre Order - Shiloh Season Blue Logo T-Shirt',
    price: 15,
    description:
      'Shop the official Shiloh Season Blue Logo T-Shirt for Shiloh 2026, available through the Shiloh merchandise collection.',
    image: 'https://uebertangel.org/wp-content/uploads/2026/06/Shiloh-Green-Blue_Gold-Tee.webp',
  },
  {
    slug: 'baptism-gown',
    name: 'Baptism Set',
    price: 35,
    description:
      'Order the official GoodNews World Baptism Set for Shiloh Season 2026. Includes gown, towel, slippers, sizes S-XL, and checkout for $35 USD.',
    image: 'https://uebertangel.org/wp-content/uploads/2024/08/Untitled-design-30-1-scaled.webp',
    sourceUrl: 'https://uebertangel.org/product/baptism-gown/',
    variants: [
      { id: '30738', size: 'S', price: 35 },
      { id: '30740', size: 'M', price: 35 },
      { id: '30742', size: 'L', price: 35 },
      { id: '32694', size: 'XL', price: 35 },
    ],
  },
  {
    slug: 'goodnews-beanie',
    name: 'GoodNews Beanie',
    price: 13.39,
    description:
      'Shop the GoodNews Beanie for Shiloh Season evenings, branded with the GoodNews World Wild Custard Apple Tree logo.',
    image: 'https://uebertangel.org/wp-content/uploads/2024/12/Untitled-design-91-scaled.webp',
  },
];

const routes = [
  {
    path: '/',
    title: 'Shiloh 2026 | Official Shiloh Season Conference',
    description:
      'Shiloh 2026 is the official Shiloh Season conference experience from August 31 to September 6, 2026 at Fort Moriah City and Harare Hippodrome in Zimbabwe.',
    canonical: `${siteUrl}/`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/journey',
    title: 'Plan Your Journey to Shiloh 2026',
    description:
      'Plan your Shiloh 2026 journey with event dates, Fort Moriah maps, travel guidance, recommended stays, taxis, support, and FAQs.',
    canonical: `${siteUrl}/journey`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/vip',
    title: 'VIP Experience | Shiloh 2026',
    description:
      'Explore the Shiloh 2026 VIP Experience for premium access, proximity, comfort, and dedicated guest support during Shiloh Season.',
    canonical: `${siteUrl}/vip`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/passes',
    title: 'Shiloh 2026 Passes | Shuttle, Parking, VIP Access',
    description:
      'View official Shiloh 2026 passes including shuttle registration, parking, Shiloh VIP access, and birthday celebration access.',
    canonical: `${siteUrl}/passes`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/contact',
    title: 'Shiloh 2026 Support and Contact',
    description:
      'Contact the official Shiloh 2026 support team for registration guidance, travel questions, hotlines, and guest assistance.',
    canonical: `${siteUrl}/contact`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/merch',
    title: 'Official Shiloh 2026 Merchandise',
    description:
      'Shop official Shiloh 2026 merchandise, Baptism sets, apparel, and GoodNews World items for the Shiloh Season conference experience.',
    canonical: `${siteUrl}/merch`,
    image: products[0].image,
    type: 'website',
  },
  {
    path: '/schedule',
    title: 'Shiloh 2026 Schedule | Dates and Events',
    description:
      "View the official Shiloh 2026 schedule for Prophetic Retreat, conference services, Sunday service, Baptism, and the Ra'ah Birthday Celebration.",
    canonical: `${siteUrl}/schedule`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/baptism',
    title: 'Baptism Registration | Shiloh 2026',
    description:
      'Register directly for the Shiloh Season 2026 baptism led by The Ra’ah, Prophet Uebert Angel, on September 5.',
    canonical: `${siteUrl}/baptism`,
    image: defaultImage,
    type: 'website',
  },
  {
    path: '/bus',
    title: 'Sponsor a Bus to Shiloh 2026',
    description:
      'Sponsor a seat or a bus to help bring someone to Shiloh 2026 at Fort Moriah City in Zimbabwe.',
    canonical: `${siteUrl}/bus`,
    image: defaultImage,
    type: 'website',
  },
  ...products.map((product) => ({
    path: `/merch/${product.slug}`,
    title: `${product.name} | Shiloh Season 2026 Merchandise`,
    description: product.description,
    canonical: `${siteUrl}/merch/${product.slug}`,
    image: product.image,
    type: 'product',
    product,
  })),
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'GoodNews World',
    url: siteUrl,
    logo,
    sameAs: ['https://uebertangel.org/', 'https://programs.uebertangel.org/'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Shiloh 2026 support',
        email: 'support@goodnewsworld.com',
        areaServed: 'Worldwide',
        availableLanguage: ['en'],
      },
    ],
  };
}

function eventSchema() {
  return {
    '@type': 'Event',
    '@id': `${siteUrl}/#event`,
    name: 'Shiloh 2026',
    alternateName: ['Shiloh Season 2026', 'Shiloh Conference 2026'],
    description:
      'Shiloh 2026 is the official Shiloh Season conference experience, taking place August 31 to September 6, 2026 at Fort Moriah City and Harare Hippodrome in Zimbabwe.',
    startDate: '2026-08-31',
    endDate: '2026-09-06',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    url: `${siteUrl}/`,
    image: defaultImage,
    location: [
      {
        '@type': 'Place',
        name: 'Fort Moriah City',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ZW',
        },
      },
      {
        '@type': 'Place',
        name: 'Harare Hippodrome',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Harare',
          addressCountry: 'ZW',
        },
      },
    ],
    organizer: {
      '@id': `${siteUrl}/#organization`,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Shiloh 2026 passes and registration',
        url: `${siteUrl}/passes`,
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
      },
    ],
    mainEntityOfPage: `${siteUrl}/`,
  };
}

function breadcrumbSchema(route) {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
  ];

  if (route.product) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Official Shiloh Merchandise',
      item: `${siteUrl}/merch`,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: route.product.name,
      item: route.canonical,
    });
  } else if (route.path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: route.title.replace(' | Shiloh 2026', ''),
      item: route.canonical,
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${route.canonical}#breadcrumb`,
    itemListElement: items,
  };
}

function productSchema(product) {
  if (product.slug === 'baptism-gown') {
    return {
      '@type': 'ProductGroup',
      '@id': `${siteUrl}/merch/${product.slug}#productgroup`,
      name: product.name,
      productGroupID: product.slug,
      variesBy: ['https://schema.org/size'],
      description: product.description,
      image: [product.image],
      brand: {
        '@id': `${siteUrl}/#organization`,
      },
      hasVariant: product.variants.map((variant) => ({
        '@type': 'Product',
        '@id': `${siteUrl}/merch/${product.slug}#variant-${variant.id}`,
        name: `${product.name} - Size ${variant.size}`,
        sku: variant.id,
        size: variant.size,
        image: [product.image],
        description: product.description,
        brand: {
          '@id': `${siteUrl}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          url: `https://uebertangel.org/checkout/?add-to-cart=${variant.id}&quantity=1`,
          price: String(variant.price),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@id': `${siteUrl}/#organization`,
          },
        },
      })),
    };
  }

  return {
    '@type': 'Product',
    '@id': `${siteUrl}/merch/${product.slug}#product`,
    name: product.name,
    sku: product.slug,
    image: [product.image],
    description: product.description,
    brand: {
      '@id': `${siteUrl}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/merch/${product.slug}`,
      price: String(product.price),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  };
}

function schemaForRoute(route) {
  const graph = [
    organizationSchema(),
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Shiloh 2026',
      url: siteUrl,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
    eventSchema(),
    {
      '@type': route.path === '/contact' ? 'ContactPage' : route.product ? 'ItemPage' : route.path === '/merch' ? 'CollectionPage' : 'WebPage',
      '@id': `${route.canonical}#webpage`,
      url: route.canonical,
      name: route.title,
      description: route.description,
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#event`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: route.image,
      },
      breadcrumb: {
        '@id': `${route.canonical}#breadcrumb`,
      },
    },
    breadcrumbSchema(route),
  ];

  if (route.path === '/merch') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${siteUrl}/merch#products`,
      name: 'Official Shiloh 2026 Merchandise',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/merch/${product.slug}`,
        name: product.name,
      })),
    });
  }

  if (route.product) {
    graph.push(productSchema(route.product));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function upsertMeta(html, selectorPattern, tag) {
  if (selectorPattern.test(html)) {
    return html.replace(selectorPattern, tag);
  }
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderRoute(shell, route) {
  const schema = JSON.stringify(schemaForRoute(route)).replace(/</g, '\\u003c');
  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = upsertMeta(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );
  html = upsertMeta(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/, '<meta name="robots" content="index, follow, max-image-preview:large" />');
  html = upsertMeta(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${route.canonical}" />`);
  html = upsertMeta(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
  html = upsertMeta(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  html = upsertMeta(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${route.type}" />`);
  html = upsertMeta(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${route.canonical}" />`);
  html = upsertMeta(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${route.image}" />`);
  html = upsertMeta(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
  html = upsertMeta(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  );
  html = upsertMeta(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${route.image}" />`);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json" data-seo-jsonld="true">${schema}</script>`);

  return html;
}

function routeOutputPath(routePath) {
  if (routePath === '/') {
    return shellPath;
  }
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

if (!fs.existsSync(shellPath)) {
  throw new Error(`Missing Vite build shell at ${shellPath}`);
}

const shell = fs.readFileSync(shellPath, 'utf8');

for (const route of routes) {
  const outputPath = routeOutputPath(route.path);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderRoute(shell, route));
}

const notFound = renderRoute(shell, {
  path: '/404',
  title: 'Page Not Found | Shiloh 2026',
  description: 'This Shiloh 2026 page is no longer available. Visit the official Shiloh website for current event information.',
  canonical: `${siteUrl}/`,
  image: defaultImage,
  type: 'website',
});
fs.writeFileSync(
  path.join(distDir, '404.html'),
  notFound.replace('<meta name="robots" content="index, follow, max-image-preview:large" />', '<meta name="robots" content="noindex, follow" />'),
);

console.log(`Pre-rendered SEO HTML for ${routes.length} public routes.`);
