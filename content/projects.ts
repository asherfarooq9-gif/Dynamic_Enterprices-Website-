export type Discipline =
  | 'Interior'
  | 'Supplies'
  | 'Corporate Films'
  | 'Scrub & Uniforms';

export interface Project {
  id: string;
  code: string;
  name: string;
  category: string;
  discipline: Discipline;
  year: number;
  location: string;
  summary: string;
  placeholder: 'slate' | 'brass' | 'ink' | 'amber' | 'dusk' | 'gilt';
  /** REPLACE: real photo path. Falls back to the gradient placeholder. */
  image?: string;
}

/** REPLACE: project names, years and locations are placeholders pending the
 *  client's real portfolio. Codes are the two/three-letter marks shown in the
 *  marquee and on the Work grid. */
export const PROJECTS: readonly Project[] = [
  {
    id: 'bahria-heights',
    code: 'BH',
    name: 'Bahria Heights',
    category: 'Interior',
    discipline: 'Interior',
    year: 2024,
    location: 'Islamabad',
    summary:
      'Forty-two residences finished to a single specification without a single repeated room.',
    placeholder: 'slate',
    image: '/images/work-gallery/1.jpg',
  },
  {
    id: 'serena-suites',
    code: 'SS',
    name: 'Serena Suites',
    category: 'Hospitality',
    discipline: 'Interior',
    year: 2024,
    location: 'Islamabad',
    summary:
      'Brass, walnut and low light — a suite programme built around the hour after sunset.',
    placeholder: 'brass',
    image: '/images/work-gallery/2.jpg',
  },
  {
    id: 'centaurus-lounge',
    code: 'CL',
    name: 'Centaurus Lounge',
    category: 'Film',
    discipline: 'Interior',
    year: 2024,
    location: 'Islamabad',
    summary:
      'A three-minute film cut from two nights of shooting, in a room that changes character every hour.',
    placeholder: 'ink',
    image: '/images/work-gallery/3.jpg',
  },
  {
    id: 'dha-villa',
    code: 'DV',
    name: 'DHA Villa',
    category: 'Residential',
    discipline: 'Interior',
    year: 2023,
    location: 'Lahore',
    summary:
      'A private house where every piece of joinery was drawn twice and made once.',
    placeholder: 'amber',
    image: '/images/work-gallery/4.jpeg',
  },
  {
    id: 'islamabad-club',
    code: 'IC',
    name: 'Islamabad Club',
    category: 'Hospitality',
    discipline: 'Interior',
    year: 2023,
    location: 'Islamabad',
    summary:
      'A heritage room restored without erasing the fifty years already in it.',
    placeholder: 'dusk',
    image: '/images/work-gallery/5.jpeg',
  },
  {
    id: 'marriott-studio',
    code: 'MS',
    name: 'Marriott Studio',
    category: 'Film',
    discipline: 'Interior',
    year: 2024,
    location: 'Islamabad',
    summary:
      'A brand film shot across a working hotel without closing a single floor.',
    placeholder: 'gilt',
    image: '/images/work-gallery/6.jpeg',
  },
  {
    id: 'emirates-tower',
    code: 'ET',
    name: 'Emirates Tower',
    category: 'Corporate',
    discipline: 'Interior',
    year: 2023,
    location: 'Islamabad',
    summary:
      'Eleven floors of FF&E sourced, inspected and installed inside a fixed handover window.',
    placeholder: 'slate',
    image: '/images/work-gallery/7.jpeg',
  },
  {
    id: 'al-habib-manor',
    code: 'AHM',
    name: 'Al Habib Manor',
    category: 'Residential',
    discipline: 'Interior',
    year: 2023,
    location: 'Rawalpindi',
    summary:
      'Marble from Khyber, textile from Multan, and a client who noticed both.',
    placeholder: 'brass',
    image: '/images/work-gallery/8.jpeg',
  },
  {
    id: 'gulberg-pavilion',
    code: 'GP',
    name: 'Gulberg Pavilion',
    category: 'Events',
    discipline: 'Interior',
    year: 2024,
    location: 'Lahore',
    summary:
      'A launch pavilion built in nine days and struck in one, to interior tolerances.',
    placeholder: 'ink',
    image: '/images/work-gallery/9.jpeg',
  },
  {
    id: 'clifton-residence',
    code: 'CR',
    name: 'Clifton Residence',
    category: 'Residential',
    discipline: 'Interior',
    year: 2022,
    location: 'Karachi',
    summary:
      'Sea light, leather and a plan that stopped fighting the view and started framing it.',
    placeholder: 'dusk',
    image: '/images/work-gallery/10.jpeg',
  },
  {
    id: 'f7-gallery',
    code: 'F7',
    name: 'F-7 Gallery',
    category: 'Events',
    discipline: 'Interior',
    year: 2022,
    location: 'Islamabad',
    summary:
      'An exhibition build where the lighting rig was designed before the walls were.',
    placeholder: 'gilt',
    image: '/images/work-gallery/11.jpeg',
  },
  {
    id: 'ravi-workshop',
    code: 'RW',
    name: 'Ravi Workshop',
    category: 'Film',
    discipline: 'Interior',
    year: 2022,
    location: 'Chiniot',
    summary:
      'A documentary on the woodturners we have worked with for twelve years.',
    placeholder: 'amber',
    image: '/images/work-gallery/12.jpg',
  },
] as const;

export const DISCIPLINE_FILTERS = [
  'All',
  'Interior',
  'Supplies',
  'Corporate Films',
  'Scrub & Uniforms',
] as const;
