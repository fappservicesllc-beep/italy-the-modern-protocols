import { FadeIn } from "./ui/FadeIn";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section
      className="relative pt-8 pb-12 md:pt-32 md:pb-32 overflow-hidden bg-paper"
      data-testid="section-hero"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-900/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1 w-full max-w-none lg:max-w-2xl">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold font-sans text-base md:text-xs font-bold tracking-[0.2em] uppercase">
                  The Italy Insider Protocol
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1
                className="text-6xl md:text-5xl lg:text-6xl font-serif text-emerald-900 leading-[1.02] md:leading-[1.05] mb-5 md:mb-6"
                data-testid="text-hero-headline"
              >
                Travel Italy with the Authority of a Local
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p
                className="text-xl md:text-xl text-charcoal/80 leading-relaxed font-sans font-light mb-6 md:mb-8"
                data-testid="text-hero-subheadline"
              >
                Stop planning like a confused tourist. Get the definitive
                digital system designed to execute a flawless, zero-stress
                Italian journey. Access the complete master package
                immediately.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="hidden lg:block">
                <Button
                  className="w-full sm:w-auto !bg-gold hover:!bg-gold-600 !text-emerald-900 !border-gold-600/60 !text-xl md:!text-lg !leading-tight text-center"
                  testId="button-hero-get-protocol"
                >
                  Claim The Italy Insider Bundle
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 relative">
            <FadeIn delay={0.3} direction="left">
              {/* Value Stack Mockup — iPad + iPhone showing the Protocol's own
                  itinerary map and guide pages, staged on a darkened Italian
                  backdrop so the devices read as the product you receive. */}
              <div
                className="relative mx-auto max-w-[320px] md:max-w-[440px] lg:max-w-none"
                data-testid="img-hero-protocol"
              >
                <div className="absolute inset-0 border border-gold/30 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 rounded-sm -z-10" />

                <div className="relative aspect-[4/5] rounded-sm shadow-2xl overflow-hidden ring-1 ring-gold/25">
                  <img
                    src="/hero-bundle-backdrop.jpg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover [object-position:70%_center]"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/85 via-emerald-900/55 to-emerald-900/25" />
                  <div className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-gold/15 blur-3xl" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[86%] pb-[16%]">
                      {/* iPad — the master itinerary + route map */}
                      <div className="relative rounded-[14px] md:rounded-[18px] bg-charcoal p-[5px] md:p-[7px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75)] ring-1 ring-gold/25">
                        <div className="overflow-hidden rounded-[9px] md:rounded-[12px] bg-ivory">
                          <img
                            src="/hero-device-map.jpg"
                            alt="The Italy Insider Protocol open on an iPad, showing a marked-up Rome, Florence and Venice route map"
                            className="block w-full aspect-[3/2] object-contain object-center"
                            loading="eager"
                            fetchPriority="high"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-[14px] md:rounded-[18px] bg-gradient-to-tr from-white/0 via-white/10 to-white/25 mix-blend-screen" />
                      </div>

                      {/* iPhone — the pocket guide, overlapping the tablet */}
                      <div className="absolute -bottom-[2%] right-[-4%] w-[30%] md:w-[29%]">
                        <div className="relative rounded-[12px] md:rounded-[16px] bg-charcoal p-[3px] md:p-[4px] shadow-[0_20px_35px_-10px_rgba(0,0,0,0.8)] ring-1 ring-gold/30">
                          <div className="relative overflow-hidden rounded-[9px] md:rounded-[13px] bg-ivory">
                            <img
                              src="/hero-device-guide.jpg"
                              alt="The Italy Insider Protocol guide open on an iPhone at an Italian espresso bar"
                              className="block w-full aspect-[9/19] object-cover object-center"
                              loading="eager"
                            />
                            <div className="absolute top-[3%] left-1/2 -translate-x-1/2 h-[3px] w-[34%] rounded-full bg-charcoal/70" />
                          </div>
                          <div className="pointer-events-none absolute inset-0 rounded-[12px] md:rounded-[16px] bg-gradient-to-tr from-white/0 via-white/10 to-white/25 mix-blend-screen" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instant-access caption — no new claim, mirrors the offer's
                      existing "Immediate digital delivery" line. */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    <div className="flex items-center justify-center gap-2 md:gap-3 rounded-sm border border-gold/35 bg-emerald-950/70 px-3 py-2 backdrop-blur-sm">
                      <span className="h-px w-4 md:w-6 bg-gold/70" />
                      <span
                        className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-ivory text-center"
                        data-testid="text-hero-delivery-note"
                      >
                        The Complete Master Package &middot; Instant Access
                      </span>
                      <span className="h-px w-4 md:w-6 bg-gold/70" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="lg:hidden mt-5">
                <Button
                  className="w-full !bg-gold hover:!bg-gold-600 !text-emerald-900 !border-gold-600/60 !text-xl !leading-tight text-center"
                  testId="button-hero-get-protocol-mobile"
                >
                  Claim The Italy Insider Bundle
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Footnote — clarifies that the Trip Review is a separate service,
            kept deliberately quiet so it never competes with the gold CTA. */}
        <FadeIn delay={0.55}>
          <div className="mt-7 md:mt-12 flex flex-col items-center">
            <div
              className="h-px w-16 bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0"
              aria-hidden="true"
            />
            <p
              className="mt-4 max-w-xl text-center font-sans text-[12px] font-light leading-relaxed text-emerald-900/60"
              data-testid="text-hero-trip-review-footnote"
            >
              *Please note: The Italy Trip Review&trade; is an exclusive expert
              service sold separately.{" "}
              <a
                href="/planyourtripwithus"
                className="text-emerald-900/85 underline decoration-gold/40 decoration-1 underline-offset-[3px] transition-colors hover:text-emerald-900 hover:decoration-gold"
                data-testid="link-hero-trip-review-info"
              >
                Click here for more info &amp; availability &rarr;
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
