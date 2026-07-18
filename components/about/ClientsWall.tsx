import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { CLIENTS } from '@/content/about';

/**
 * A text wall, not a logo grid — the client hasn't supplied logo files yet,
 * and a wall of names set in the same disciplined caps as the rest of the
 * site reads as confident rather than unfinished. Swap for real marks once
 * supplied, same grid.
 */
export function ClientsWall() {
  return (
    <section aria-label="Clients" className="section-y bg-cream">
      <div className="shell">
        <SectionHeading eyebrow="Trusted by" title={'CLIENTS WE\nHAVE SERVED'} />

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-navy/10 pt-10 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((client, i) => (
            <Reveal key={client} delay={Math.min(i * 0.03, 0.3)}>
              <p className="text-subtitle font-bold text-navy/70">{client}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
