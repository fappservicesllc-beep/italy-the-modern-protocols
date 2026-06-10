import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";

export function Problem() {
  return (
    <section
      className="py-24 max-w-4xl mx-auto px-6"
      data-testid="section-problem"
    >
      <SectionHeader
        eyebrow="The Problem"
        title="The Invisible Barrier"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <FadeIn delay={0.1} direction="up">
          <div className="p-8 bg-white shadow-sm border border-gold/10 rounded-sm h-full">
            <p className="text-charcoal/80 font-sans font-light leading-relaxed">
              Most travelers land in Italy armed with &ldquo;polite&rdquo;
              snippets from a green owl app, only to find themselves invisible.
              You wait twenty minutes for a menu that never comes. You get hit
              with &ldquo;tourist taxes&rdquo; in taxis. You feel that stabbing
              pang of anxiety when a minor logistical hiccup happens because
              you don&rsquo;t know the social code to fix it.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <div className="p-8 bg-emerald-900 text-ivory shadow-sm rounded-sm h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
            <p className="font-serif text-lg leading-relaxed relative z-10">
              The reality is that Italy doesn&rsquo;t run on grammar; it runs
              on relationships and &ldquo;Bella Figura.&rdquo; If you
              don&rsquo;t know how to carry yourself and acknowledge the social
              hierarchy, you will always be treated like a source of revenue
              rather than a welcome guest.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
