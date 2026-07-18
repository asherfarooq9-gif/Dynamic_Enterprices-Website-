export interface Founder {
  name: string;
  role: string;
  /** REPLACE: script signature is a placeholder — swap for a scanned SVG. */
  signature: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  body: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  pad?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CoreValue {
  title: string;
  body: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export const FOUNDERS: readonly Founder[] = [
  {
    name: 'Mirza Abdul Rehman',
    role: 'Chief Executive Officer',
    signature: 'Mirza Abdul Rehman',
  },
] as const;

/** The founder story — approved copy from the prototype. */
export const FOUNDER_STORY: readonly string[] = [
  'We understand the poetry of your design — the proportions, the textures and the light behind every line.',
  'We deliver the engineering with discipline: one partner, one touchpoint, full responsibility.',
  'Made in Pakistan by master artisans, our work protects your vision, your timelines and your reputation.',
] as const;

export const STATS: readonly Stat[] = [
  { value: 4, suffix: '', label: 'Disciplines', pad: true },
  { value: 12, suffix: '', label: 'Master makers' },
  { value: 9, suffix: '', label: 'Years' },
  { value: 60, suffix: '+', label: 'Projects delivered' },
] as const;

/** REPLACE: testimonials are professional placeholders pending real quotes. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'They drew it once, built it once, and handed it over on the day they said they would. In this market that is not a service — it is a reputation.',
    author: 'Client, Bahria Heights',
    role: 'Developer · Karachi',
  },
  {
    quote:
      'The brass was made forty minutes from the site by a man whose father made the brass in my grandfather’s house. That is not a detail. That is the whole point.',
    author: 'Private client',
    role: 'Residence · Lahore',
  },
  {
    quote:
      'One number to call. When something moved, they had already moved with it.',
    author: 'Client, Emirates Tower',
    role: 'Corporate · Karachi',
  },
] as const;

/** REPLACE: timeline is a professional placeholder — confirm real milestones. */
export const TIMELINE: readonly TimelineEntry[] = [
  {
    year: '2017',
    title: 'The studio opens',
    body: 'Founded in Karachi, built on the belief that business must be dynamic, not static — one team drawing and building under the same roof rather than handing the work to a stranger.',
  },
  {
    year: '2019',
    title: 'The maker network',
    body: 'The first long partnerships — Chiniot wood, Lahore brass. Not suppliers. Makers we can call by name.',
  },
  {
    year: '2021',
    title: 'Turnkey delivery',
    body: 'Procurement and installation brought in-house. From that year forward, one accountability from concept to handover.',
  },
  {
    year: '2023',
    title: 'Films',
    body: 'A camera department, because a finished room deserves to be seen the way it feels to stand in it.',
  },
  {
    year: '2024',
    title: 'Four disciplines, one studio',
    body: 'Interior, supplies, films and events — held together by the same standard and the same signature.',
  },
] as const;

export const CORE_VALUES: readonly CoreValue[] = [
  {
    title: 'Integrity',
    body: 'The foundation of every relationship, whether with our customers, colleagues, partners or society. We act responsibly, honestly and fairly — always guided by what is ethical and right.',
  },
  {
    title: 'Adaptability',
    body: 'Market conditions, regulation and customer needs are not static. We see the positive side of change and adapt accordingly to maintain our mission and vision.',
  },
  {
    title: 'Client Focus',
    body: 'The customer’s success is directly linked to our own. We listen, respond rapidly with simple and suitable solutions, and foster relationships built on trust, respect and mutual understanding.',
  },
  {
    title: 'Team Work',
    body: 'Through mutual respect, effective communication and a willingness to collaborate, our team shares plans, goals and ideas to achieve one unified objective.',
  },
  {
    title: 'Reliability and Efficiency',
    body: 'We prioritise reliability and efficiency in everything we do. Consistent, high-quality solutions clients can depend on, delivered through streamlined, waste-minimising process.',
  },
  {
    title: 'Innovation',
    body: 'The way forward to overcome rapid changes in market dynamics and customer expectations — our pre-requisite for truly being customer-focused.',
  },
] as const;

export const MANAGEMENT_TEAM: readonly TeamMember[] = [
  { name: 'Mirza Abdul Rehman', role: 'Chief Executive Officer' },
  { name: 'Haris Khurram', role: 'Director Business Development' },
  { name: 'Ovais Ali', role: 'Director Sales & Marketing' },
  { name: 'Babar Talib', role: 'Director Operation' },
] as const;

export const CLIENTS: readonly string[] = [
  'Benitoz Homes',
  'Wood Emotions',
  "L'Oréal",
  'British Council',
  'World of Wonders',
  'Coke Studio',
  'National',
  'PepsiCo',
  'HBFC',
  'Lipton',
  'The Citizens Foundation',
  'Blitz',
  'Ideas',
  'Giraffe',
  "Young's",
  'Dr. Ziauddin Hospital',
] as const;

export const MISSION =
  'To help our busy clients source the right solutions and fulfil their objectives on time, with the aimed quality and budget.';

export const VISION =
  'To lead the market in whatever business we do, become the trusted choice of our customers, and give true value to our clients, partners and stakeholders.';
