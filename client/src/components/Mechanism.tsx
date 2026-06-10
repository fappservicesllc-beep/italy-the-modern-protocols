import { FadeIn } from "./ui/FadeIn";

export function Mechanism() {
  return (
    <section
      className="py-24 bg-emerald-900 text-ivory relative overflow-hidden"
      data-testid="section-mechanism"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gold" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gold" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gold" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <FadeIn>
          <span className="text-gold font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
            The Unique Mechanism
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gold mb-10">
            The Heritage Intelligence Stack
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl font-serif italic text-ivory/90 mb-8 max-w-2xl mx-auto">
            This isn&rsquo;t just a language guide; it&rsquo;s a cultural DNA
            transplant.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-lg text-ivory/80 font-sans font-light leading-relaxed max-w-3xl mx-auto">
            Built on the &ldquo;Respect-First&rdquo; linguistic framework, this
            protocol focuses on the{" "}
            <strong className="text-gold font-normal">
              &ldquo;Trinity of Connection&rdquo;: Tone, Timing, and Title.
            </strong>{" "}
            It teaches you how to speak from your chest, catch a waiter&rsquo;s
            eye without being rude, and use specific &ldquo;honorific&rdquo;
            anchors that signal you are a person of substance.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
