import { ArrowRight } from "lucide-react";

/**
 * Site-wide announcement bar for The Italy Trip Review™.
 *
 * Stays pinned to the top of the viewport while the visitor scrolls
 * (`sticky top-0 z-50`) so the invitation remains visible on these long pages.
 * Sticky — not fixed — so it occupies real layout space and can never overlap
 * the hero or the countdown bar beneath it.
 *
 * Deliberately separate from <AnnouncementBar /> (the launch countdown) so the
 * existing funnel component is untouched. No dismiss logic, no timers, no
 * popups — it is a quiet, editorial invitation, not a promo shout.
 */
export function TripReviewBar() {
  return (
    <div
      className="sticky top-0 z-50 w-full bg-emerald-950 border-b border-gold/30 shadow-[0_2px_16px_rgba(0,0,0,0.18)]"
      data-testid="bar-trip-review"
    >
      <a
        href="/planyourtripwithus"
        className="group block max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-[18px]"
        data-testid="link-trip-review-learn-more"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-center">
          <p className="font-sans text-[15px] md:text-[17px] font-light tracking-wide text-ivory/90 leading-snug">
            <span className="text-ivory">Planning your Italy trip?</span>{" "}
            Don&rsquo;t risk costly mistakes. Get a professional{" "}
            <span className="font-serif italic font-medium text-gold text-[20px] md:text-[23px] align-baseline">
              Trip Review&trade;
            </span>{" "}
            before you go.
          </p>

          <span
            className="hidden sm:inline-block h-5 w-px bg-ivory/25"
            aria-hidden="true"
          />

          <span className="inline-flex items-center gap-1.5 font-sans text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em] text-gold border-b border-gold/40 group-hover:border-gold pb-0.5 transition-colors duration-300">
            Learn More
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </div>
  );
}
