export const SITE = {
  name: 'Dynamic Enterprises',
  shortName: 'DYNAMIC',
  // REPLACE: confirm production domain before launch.
  url: 'https://www.dynamicenterprises.pk',
  founded: 2017,
  foundedRoman: 'MMXVII',
  city: 'Karachi',
  country: 'Pakistan',
  tagline: 'Business must be dynamic, not static.',
  description:
    'A multi-service studio from Karachi delivering interior, supplies, corporate films and uniforms — dynamic services, well-planned strategies, and the discipline to meet deadlines and budgets every time.',
  email: 'dynamicenterprises1@outlook.com',
  phone: '+92 334 319 1198',
  address: 'Office no. 3, Al-Noor Garden, Sharfabad, Karachi, Sindh, Pakistan',
  social: {
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
] as const;

export const DISCIPLINES = [
  'Interior',
  'Supplies',
  'Corporate Films',
  'Scrub & Uniforms',
] as const;
