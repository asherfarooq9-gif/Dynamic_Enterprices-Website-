import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { SERVICES } from '@/content/services';

// Fixed dates, not `new Date()` — a live timestamp on every request/build
// tells Google nothing about actual freshness. Bump a route's date only
// when that page's real content changes.
const STATIC_ROUTES: {
  path: string;
  lastModified: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}[] = [
  { path: '', lastModified: '2026-07-21', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services', lastModified: '2026-07-21', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/work', lastModified: '2026-07-21', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', lastModified: '2026-07-21', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', lastModified: '2026-07-21', changeFrequency: 'yearly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.id}`,
    lastModified: '2026-07-21',
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
