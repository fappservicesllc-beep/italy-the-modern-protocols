import { ArrowRight } from "lucide-react";

/**
 * Slim, static announcement bar for The Italy Trip Review™.
 *
 * Deliberately separate from <AnnouncementBar /> (the launch countdown) so the
 * existing funnel component is untouched. No dismiss logic, no timers, no
 * popups — it is a quiet, editorial invitation, not a promo shout.
 */
export function TripReviewBar() {
  return (
    <div
      className="w-full bg-emerald-950 border-b border-gold/25"
      data-testid="bar-trip-review"
    >
      <a
        href="/planyourtripwithus"
        className="group block max-w-6xl mx-auto px-4 md:px-6 py-2.5 md:py-3"
        data-testid="link-trip-review-learn-more"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-center">
          <p className="font-sans text-[12px] md:text-[13px] font-light tracking-wide text-ivory/85 leading-snug">
            <span aria-hidden="true">🇮🇹</span>{" "}
            <span className="text-ivory/95">Already planned your Italy trip?</span>{" "}
            Get a personalized{" "}
            <span className="font-serif italic text-gold text-[14px] md:text-[15px]">
              Italy Trip Review&trade;
            </span>{" "}
            before you go.
          </p>

          <span className="hidden sm:inline-block h-4 w-px bg-ivory/20" aria-hidden="true" />

          <span className="inline-flex items-center gap-1.5 font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-gold border-b border-gold/40 group-hover:border-gold pb-0.5 transition-colors duration-300">
            Learn More
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </div>
  );
}
