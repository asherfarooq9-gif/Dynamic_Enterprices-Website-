export interface CorporateFilm {
  title: string;
  src: string;
  poster: string;
}

export const CORPORATE_FILMS: readonly CorporateFilm[] = [
  {
    title: 'National Food Corporate',
    src: '/videos/corporate-films/work-1.mp4',
    poster: '/images/services/corporate-films-posters/work-1.jpg',
  },
  {
    title: 'Zong 4G',
    src: '/videos/corporate-films/work-2.mp4',
    poster: '/images/services/corporate-films-posters/work-2.jpg',
  },
  {
    title: "Loteal's",
    src: '/videos/corporate-films/work-3.mp4',
    poster: '/images/services/corporate-films-posters/work-3.jpg',
  },
  {
    title: 'Rahbar Programme',
    src: '/videos/corporate-films/work-4.mp4',
    poster: '/images/services/corporate-films-posters/work-4.jpg',
  },
  {
    title: 'At Karachi Eat Gala',
    src: '/videos/corporate-films/work-5.mp4',
    poster: '/images/services/corporate-films-posters/work-5.jpg',
  },
] as const;
