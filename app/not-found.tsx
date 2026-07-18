import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-hero-radial px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,183,74,0.10),transparent_55%)]"
      />

      <div className="relative">
        <p className="text-[clamp(5rem,3rem+8vw,10rem)] font-bold leading-none tracking-[-0.04em] text-white">
          404
        </p>
        <p className="mt-6 text-subtitle text-cream/70">
          This page doesn&#39;t exist — {SITE.name} keeps a tighter site map than
          that.
        </p>

        <div className="mt-10">
          <Button href="/" variant="outline" className="!text-white !ring-white/30 hover:!bg-mustard hover:!text-navy hover:!ring-mustard">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
