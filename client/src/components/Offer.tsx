import { FadeIn } from "./ui/FadeIn";
import { Button } from "./ui/Button";

export function Offer() {
  return (
    <section
      id="offer"
      className="py-16 md:py-24 px-4 md:px-6"
      data-testid="section-offer"
    >
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="bg-ivory-100 border-2 border-emerald-900 p-6 sm:p-8 md:p-14 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-10 h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-10 h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />

            <div className="text-center mb-5 md:mb-6">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-6 md:w-8 bg-gold" />
                <span className="text-gold font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                  A Private Invitation
                </span>
                <div className="h-px w-6 md:w-8 bg-gold" />
              </div>
            </div>

            <h2
              className="text-2xl md:text-3xl font-serif text-emerald-900 mb-3 md:mb-4 leading-tight text-center"
              data-testid="text-offer-title"
            >
              The Italy Insider Protocol Guide
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-charcoal/70 font-sans font-light mb-6 md:mb-8 text-center max-w-xl mx-auto leading-relaxed">
              Digital Tactical Guide · The &ldquo;No-Tax&rdquo; Script Vault ·
              Cultural Heritage Framework
            </p>

            <div className="flex items-baseline justify-center gap-3 md:gap-4 mb-2">
              <span
                className="font-serif text-2xl md:text-3xl text-charcoal/40 line-through decoration-1"
                data-testid="text-price-original"
              >
                $99
              </span>
              <span
                className="font-serif text-5xl md:text-7xl text-emerald-900 font-bold tracking-tight"
                data-testid="text-price-current"
              >
                $10.95
              </span>
            </div>
            <p className="text-center text-[10px] md:text-xs text-charcoal/60 font-sans uppercase tracking-[0.2em] mb-6 md:mb-8">
              USD · One-Time Investment
            </p>

            <div className="text-center">
              <Button
                href="https://www.themodernprotocols.com/cart/47838889804002:1"
                onClick={() => {
                  if (typeof window !== "undefined" && window.fbq) {
                    window.fbq("track", "AddToCart", {
                      content_name: "The Italy Insider Protocol Guide",
                      content_ids: ["47838889804002"],
                      content_type: "product",
                      value: 10.95,
                      currency: "USD",
                    });
                  }
                }}
                className="w-full sm:w-auto text-base md:text-xl py-4 md:py-5 px-8 md:px-14 mb-4 uppercase tracking-[0.15em]"
                style={{ color: "#C9A961" }}
                testId="button-unlock-access"
              >
                Unlock My Insider Access Now
              </Button>

              <p className="text-[11px] md:text-xs text-charcoal/60 font-sans tracking-wider">
                Immediate digital delivery
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 my-8 md:my-10">
              <div className="h-px w-16 bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div className="h-px w-16 bg-gold/40" />
            </div>

            <p className="text-sm md:text-base text-charcoal/75 font-serif italic leading-relaxed text-center max-w-2xl mx-auto mb-8 md:mb-10">
              The cost of an &ldquo;un-protocol&rdquo; trip is high. It&rsquo;s
              the €50 &ldquo;tourist surcharge&rdquo; on a taxi, the €100
              spent on a dinner that felt like a transaction rather than an
              event, and the hours of stress navigating a system that feels
              designed to keep you on the outside.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] text-charcoal/50 font-sans uppercase tracking-[0.2em] pt-6 border-t border-gold/15">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" /> Secure Checkout
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" /> Lifetime Access
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" /> Mobile
                Optimized
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
