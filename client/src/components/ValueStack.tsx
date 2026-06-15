import { FadeIn } from "./ui/FadeIn";
import { Button } from "./ui/Button";

export function ValueStack() {
  const handleAddToCart = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name:
          "The Italy Insider Protocol Guide + Tourist Trap Map",
        content_ids: ["47838889804002"],
        content_type: "product",
        value: 10.95,
        currency: "USD",
      });
    }
  };

  return (
    <section
      id="offer"
      className="py-8 md:py-12 px-4 md:px-6"
      data-testid="section-value-stack"
    >
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="bg-ivory-100 border-2 border-emerald-900 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-10 h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-10 h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />

            {/* ============ TOP: BONUS ============ */}
            <div
              className="px-6 sm:px-8 md:px-12 pt-6 md:pt-8 pb-4 md:pb-5"
              data-testid="value-stack-bonus"
            >
              <div className="text-center mb-3 md:mb-4">
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-6 md:w-8 bg-gold" />
                  <span className="text-gold font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                    Free Bonus Included
                  </span>
                  <div className="h-px w-6 md:w-8 bg-gold" />
                </div>
              </div>

              <p
                className="text-lg sm:text-xl md:text-2xl font-serif font-black text-emerald-900 leading-tight text-center mb-1.5 tracking-tight"
                data-testid="text-bonus-headline"
              >
                <span aria-hidden="true">🗺️ </span>
                The Tourist Trap Map
              </p>
              <p className="text-center text-[11px] md:text-xs font-sans tracking-[0.2em] uppercase text-charcoal/70 mb-4 md:mb-5">
                Value:{" "}
                <span className="line-through decoration-1 text-charcoal/50">
                  $17.00
                </span>{" "}
                <span className="text-emerald-900 font-bold not-italic">
                  (FREE Today)
                </span>
              </p>

              <ul className="space-y-2 md:space-y-2.5 max-w-xl mx-auto">
                <li className="flex gap-3 text-sm md:text-base text-charcoal/85 font-sans leading-snug">
                  <span className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <span className="font-bold text-emerald-900">
                      Avoid overpaying:
                    </span>{" "}
                    How to spot &ldquo;Tourist Menus&rdquo; from a block away.
                  </span>
                </li>
                <li className="flex gap-3 text-sm md:text-base text-charcoal/85 font-sans leading-snug">
                  <span className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <span className="font-bold text-emerald-900">
                      Earn respect:
                    </span>{" "}
                    The simple social shifts that change how locals treat you.
                  </span>
                </li>
                <li className="flex gap-3 text-sm md:text-base text-charcoal/85 font-sans leading-snug">
                  <span className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <span className="font-bold text-emerald-900">
                      First-trip insurance:
                    </span>{" "}
                    The 24-hour arrival checklist for a seamless start.
                  </span>
                </li>
              </ul>
            </div>

            {/* ============ DIVIDER ============ */}
            <div className="flex items-center justify-center gap-3 px-6 md:px-12 my-2 md:my-3">
              <div className="h-px flex-1 bg-gold/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div className="h-px flex-1 bg-gold/30" />
            </div>

            {/* ============ BOTTOM: PRICE + CTA ============ */}
            <div
              className="px-6 sm:px-8 md:px-12 pt-4 md:pt-5 pb-6 md:pb-8"
              data-testid="value-stack-offer"
            >
              <div className="flex items-baseline justify-center gap-3 md:gap-4 mb-1">
                <span
                  className="font-serif text-2xl md:text-3xl text-charcoal/40 line-through decoration-1"
                  data-testid="text-price-original"
                >
                  $99
                </span>
                <span
                  className="font-serif text-5xl md:text-6xl text-emerald-900 font-bold tracking-tight"
                  data-testid="text-price-current"
                >
                  $10.95
                </span>
              </div>
              <p className="text-center text-[10px] md:text-xs text-charcoal/60 font-sans uppercase tracking-[0.2em] mb-4 md:mb-5">
                USD · One-Time Investment
              </p>

              <div className="text-center">
                <Button
                  href="https://www.themodernprotocols.com/cart/47838889804002:1"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto text-base md:text-xl py-4 md:py-5 px-8 md:px-14 mb-3 uppercase tracking-[0.15em]"
                  style={{ color: "#C9A961" }}
                  testId="button-unlock-access"
                >
                  Unlock My Insider Access Now
                </Button>

                <p className="text-[11px] md:text-xs text-charcoal/60 font-sans tracking-wider">
                  Immediate digital delivery
                </p>
                <p className="text-xs md:text-sm text-charcoal/60 font-sans tracking-wider text-center mt-1.5">
                  Travelers from New York, Miami, and Chicago are already using
                  this protocol before their Italy trips.
                </p>
              </div>
              <p className="text-xs md:text-sm text-charcoal/60 font-sans text-center mt-2.5 italic">
                30-Day Money-Back Guarantee. If you don&rsquo;t feel more
                confident navigating Italy after using this protocol, email us
                and we&rsquo;ll refund every penny. No questions asked.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[10px] text-charcoal/50 font-sans uppercase tracking-[0.2em] pt-5 mt-5 border-t border-gold/15">
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> Secure
                  Checkout
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> Lifetime
                  Access
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" /> Mobile
                  Optimized
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
