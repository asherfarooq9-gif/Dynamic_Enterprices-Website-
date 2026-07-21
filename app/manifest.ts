import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e6',
    theme_color: '#004346',
    icons: [{ src: '/icon.jpg', sizes: '512x512', type: 'image/jpeg' }],
  };
}
