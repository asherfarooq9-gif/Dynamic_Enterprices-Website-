import type { IconType } from 'react-icons';
import {
  LuArmchair,
  LuBath,
  LuBriefcase,
  LuChefHat,
  LuDoorOpen,
  LuHammer,
  LuHeartPulse,
  LuLayers,
  LuLightbulb,
  LuPalette,
  LuSailboat,
  LuTreePine,
  LuWarehouse,
  LuWifi,
  LuWrench,
} from 'react-icons/lu';
import { SplitText } from '@/components/motion/SplitText';
import { Reveal } from '@/components/motion/Reveal';

interface Category {
  label: string;
  Icon: IconType;
}

const CATEGORIES: readonly Category[] = [
  { label: 'Furniture', Icon: LuArmchair },
  { label: 'Kitchen', Icon: LuChefHat },
  { label: 'Bathroom', Icon: LuBath },
  { label: 'Lighting', Icon: LuLightbulb },
  { label: 'Outdoor', Icon: LuTreePine },
  { label: 'Office', Icon: LuBriefcase },
  { label: 'Wellness', Icon: LuHeartPulse },
  { label: 'Decor', Icon: LuPalette },
  { label: 'Building material', Icon: LuWarehouse },
  { label: 'Cladding', Icon: LuLayers },
  { label: 'Doors and windows', Icon: LuDoorOpen },
  { label: 'Carpentry', Icon: LuHammer },
  { label: 'Metalwork', Icon: LuWrench },
  { label: 'Home automation', Icon: LuWifi },
  { label: 'Lifestyle', Icon: LuSailboat },
] as const;

/**
 * Interior-only: the full scope of what "turnkey" covers, as a 15-item icon
 * grid. Dark navy bed (the site's own gradient, not a borrowed palette) —
 * the one other dark act on this page besides the video hero.
 */
export function InteriorCategoryGrid() {
  return (
    <section className="section-y relative overflow-hidden bg-hero-radial">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,183,74,0.08),transparent_45%)]"
      />

      <div className="shell relative">
        <SplitText
          as="h2"
          text={'BESPOKE INTERIORS,\nONE ACCOUNTABLE STUDIO'}
          className="text-section mx-auto max-w-3xl text-center font-bold uppercase text-white"
        />

        <Reveal delay={0.15} className="mt-10 text-center">
          <p className="mx-auto max-w-prose text-lead text-cream/60">
            Furniture, joinery, finishes and every fixed or loose element in
            between — specified, made and installed by the same team that
            drew the concept, so nothing is lost between design and site.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ label, Icon }, i) => (
            <Reveal
              key={label}
              delay={Math.min(i * 0.03, 0.4)}
              className="flex flex-col items-center justify-center gap-4 rounded-lg border border-white/10 px-4 py-10 text-center transition-colors duration-500 ease-expo hover:border-mustard/50 hover:bg-white/[0.03]"
            >
              <Icon aria-hidden className="h-7 w-7 text-cream/70" strokeWidth={1.25} />
              <span className="text-small text-cream/85">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
