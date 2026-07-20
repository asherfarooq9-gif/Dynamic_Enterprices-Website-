export type Ratio = '4:5' | '1:1' | '16:9' | '5:4' | '6:7';

export interface Service {
  id: string;
  index: string;
  title: string;
  short: string;
  body: string;
  /** Standalone SEO meta description for this service's detail page (120-160 chars, no shared suffix). */
  metaDescription: string;
  capabilities: readonly string[];
  ratio: Ratio;
  placeholder: 'slate' | 'brass' | 'ink' | 'amber';
  /** REPLACE: real photo path. Falls back to the gradient placeholder. */
  image?: string;
  /** REPLACE: photo for the service's own detail-page block. Falls back to `image`, then the placeholder. */
  sectionImage?: string;
  /** CSS aspect-ratio override for the home card, e.g. `'1024/1536'`, when `image`'s native ratio doesn't match `ratio`. */
  cardAspectRatio?: string;
  meta: { left: string; right: string };
  /** REPLACE: drop the file at this path — services without one get the
   * standard breadcrumb header instead of a video hero. */
  heroVideo?: string;
}

/** REPLACE: service copy is professional placeholder — confirm with client. */
export const SERVICES: readonly Service[] = [
  {
    id: 'interior',
    index: '01',
    title: 'Interior',
    short: 'Turnkey interiors, drawn and delivered by one accountable studio.',
    metaDescription:
      'Turnkey interior design and fit-out in Karachi — concept to handover under one accountable studio, from spatial design to bespoke joinery.',
    body: 'From first sketch to final handover we hold the whole line — concept, technical drawings, joinery, finishes, installation. One partner, one touchpoint, one signature on the result.',
    capabilities: [
      'Concept & spatial design',
      'Technical & production drawings',
      'Bespoke joinery',
      'Finishes & material specification',
      'Site supervision & handover',
    ],
    ratio: '4:5',
    placeholder: 'slate',
    image: '/images/services/interior-gallery/1.jpg',
    meta: { left: 'Karachi', right: '2024' },
    heroVideo: '/videos/interior-hero.mp4',
  },
  {
    id: 'supplies',
    index: '02',
    title: 'Supplies',
    short:
      'From interior fit-out to hospital floors, sourced and supplied without a gap in the chain.',
    metaDescription:
      'FF&E and facility supplies sourced, inspected and delivered across Pakistan — furniture, housekeeping, lab and medical products vetted for a decade.',
    body: 'Interior furniture and fixtures, cleaning and housekeeping supplies, laboratory and medical disposal products — sourced from makers and suppliers we have vetted for a decade, inspected, and delivered to the standard the site actually needs.',
    capabilities: [
      'FF&E procurement',
      'Artisan sourcing & vetting',
      'Quality inspection',
      'Logistics & installation',
      'Long-lead planning',
    ],
    ratio: '1:1',
    placeholder: 'brass',
    image: '/images/services/supplies-gallery/1.jpg',
    cardAspectRatio: '1024/1536',
    meta: { left: 'Sourced · PK', right: 'Featured' },
  },
  {
    id: 'corporate-films',
    index: '03',
    title: 'Corporate Films',
    short: 'Films that make the work look the way it felt to stand in it.',
    metaDescription:
      'Corporate and architectural films shot, cut and graded in Karachi — brand films, launch films and campaign work for clients like Zong and PepsiCo.',
    body: 'A finished space, a launch, a brand — each deserves more than a photograph. We shoot, cut and grade corporate and architectural films that carry the light, the texture and the intent to the people who were never in the room.',
    capabilities: [
      'Architectural cinematography',
      'Brand & campaign films',
      'Direction & storyboarding',
      'Colour grade & post',
      '4K delivery',
    ],
    ratio: '4:5',
    placeholder: 'ink',
    image: '/images/services/corporate-gallery/1.jpg',
    sectionImage: '/images/services/corporate-detail/1.jpg',
    meta: { left: '4K MP4', right: '2024' },
  },
  {
    id: 'scrub-uniforms',
    index: '04',
    title: 'Scrub & Uniforms',
    short: 'Uniforms specified like furniture — to a standard, not a guess.',
    metaDescription:
      'Medical scrubs, hospitality and corporate uniforms manufactured at scale in Pakistan — fabric sourcing, embroidery and size-run fulfilment in-house.',
    body: 'Medical scrubs, hospitality and corporate uniforms supplied at scale — fabric sourced for the shift it has to survive, sizing run properly, embroidery and branding handled in-house, delivered on the date the floor opens.',
    capabilities: [
      'Fabric sourcing & specification',
      'Bulk manufacturing',
      'Embroidery & branding',
      'Size-run fulfilment',
      'Reorder & inventory support',
    ],
    ratio: '1:1',
    placeholder: 'amber',
    image: '/images/services/scrub-uniforms-gallery/1.jpg',
    meta: { left: 'Karachi', right: '2024' },
  },
] as const;
