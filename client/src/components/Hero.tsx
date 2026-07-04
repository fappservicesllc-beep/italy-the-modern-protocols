import { FadeIn } from "./ui/FadeIn";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section
      className="relative pt-14 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-paper"
      data-testid="section-hero"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-900/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1 max-w-2xl">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold font-sans text-base md:text-xs font-bold tracking-[0.2em] uppercase">
                  The Italy Insider Protocol
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1
                className="text-6xl md:text-5xl lg:text-6xl font-serif text-emerald-900 leading-[1.05] mb-6"
                data-testid="text-hero-headline"
              >
                Stop Being a &ldquo;Target&rdquo;: How to Navigate Italy with
                the Authority of a Local
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p
                className="text-2xl md:text-xl text-charcoal/80 leading-relaxed font-sans font-light mb-8"
                data-testid="text-hero-subheadline"
              >
                The exact system 847 travelers used to eat, move and speak like
                locals — without spending years learning Italian.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="hidden lg:block">
                <Button
                  className="w-full sm:w-auto"
                  testId="button-hero-get-protocol"
                >
                  Get The Protocol Now
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 relative">
            <FadeIn delay={0.3} direction="left">
              <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                <div className="absolute inset-0 border border-gold/30 translate-x-4 translate-y-4 rounded-sm -z-10" />
                <img
                  src="/protocol-hero.jpg"
                  alt="The Italy Insider Protocol on a smartphone at an Italian cafe"
                  className="w-full h-auto rounded-sm shadow-2xl object-cover aspect-[4/5] object-center"
                  data-testid="img-hero-protocol"
                  loading="eager"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="lg:hidden mt-6">
                <Button
                  className="w-full"
                  testId="button-hero-get-protocol-mobile"
                >
                  Get The Protocol Now
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
