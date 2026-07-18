import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { MANAGEMENT_TEAM } from '@/content/about';

/**
 * Five names, no photos yet — the studio's own signature block from
 * FounderStory established the pattern (name set in navy, role in a muted
 * tracked caps line beneath); this reuses that same typographic move at
 * team-grid scale instead of a two-person spread.
 */
export function ManagementTeam() {
  return (
    <section aria-label="Management team" className="section-y bg-white">
      <div className="shell">
        <SectionHeading eyebrow="Who runs it" title={'MANAGEMENT\nTEAM'} />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {MANAGEMENT_TEAM.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 0.06}
              className="border-t border-navy/10 pt-6"
            >
              <p className="text-subtitle text-navy">{member.name}</p>
              <p className="mt-2 text-[0.625rem] uppercase tracking-[0.25em] text-navy/50">
                {member.role}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
