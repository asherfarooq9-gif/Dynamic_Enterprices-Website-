import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhotoSlot } from '@/components/ui/PhotoSlot';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Scrub & Uniforms-only: a single product photo, no caption. Mirrors the
 * Supplies products section's PhotoSlot + Reveal move at a one-tile scale.
 */
export function ScrubUniformsProductsGrid() {
  return (
    <section aria-label="Scrub & Uniforms products" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="The range"
          title={'WHAT WE\nSUPPLY'}
          align="center"
          className="mx-auto"
        />

        <div className="relative mx-auto mt-16 max-w-xl">
          <Reveal>
            <PhotoSlot
              ratio="4:5"
              aspectRatio="1538/1024"
              src="/images/services/scrub-uniforms-products/1.jpg"
              alt="Medical scrub and hospitality uniform range supplied by Dynamic Enterprises"
              zoom
              sizes="(max-width: 768px) 100vw, 32rem"
              className="rounded-lg shadow-large"
            />
          </Reveal>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg bg-navy-deeper/65"
          />

          <p className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-cream">
            Medical Scrubs · Lab Coats · Corporate Uniforms · Hospitality Uniforms · Security Uniforms
          </p>
        </div>
      </div>
    </section>
  );
}
