export interface CorporateFilm {
  title: string;
  src: string;
  poster: string;
}

const VIDEO_CDN_BASE = 'https://dynamic-enterprises-videos-2026.s3.eu-north-1.amazonaws.com';

export const CORPORATE_FILMS: readonly CorporateFilm[] = [
  {
    title: 'National Food Corporate',
    src: `${VIDEO_CDN_BASE}/work-1.mp4`,
    poster: '/images/services/corporate-films-posters/work-1.jpg',
  },
  {
    title: 'Zong 4G',
    src: `${VIDEO_CDN_BASE}/work-2.mp4`,
    poster: '/images/services/corporate-films-posters/work-2.jpg',
  },
  {
    title: "Loteal's",
    src: `${VIDEO_CDN_BASE}/work-3.mp4`,
    poster: '/images/services/corporate-films-posters/work-3.jpg',
  },
  {
    title: 'Rahbar Programme',
    src: `${VIDEO_CDN_BASE}/work-4.mp4`,
    poster: '/images/services/corporate-films-posters/work-4.jpg',
  },
  {
    title: 'At Karachi Eat Gala',
    src: `${VIDEO_CDN_BASE}/work-5.mp4`,
    poster: '/images/services/corporate-films-posters/work-5.jpg',
  },
] as const;
