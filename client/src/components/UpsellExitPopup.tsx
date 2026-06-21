import { useEffect, useRef } from "react";

interface UpsellExitPopupProps {
  open: boolean;
  onClose: () => void;
  /** URL to send the user to if they accept the upsell (full bundle). */
  acceptUrl: string;
  /** URL to send the user to if they decline (main product only). */
  declineUrl: string;
  /** Fires when the user clicks the accept CTA (for Meta Pixel etc). */
  onAccept?: () => void;
  /** Fires when the user clicks the decline link. */
  onDecline?: () => void;
}

// Pricing constants — kept here so the popup is self-contained and
// renders the same numbers shown on the page.
const MAIN_PRICE = 10.95;
const BUMP_PRICE = 8.99;
const BUMP_COUNT = 2;
const BUMPS_TOTAL = BUMP_PRICE * BUMP_COUNT; // 17.98
const DISCOUNT_RATE = 0.3;
const BUMPS_DISCOUNTED = BUMPS_TOTAL * (1 - DISCOUNT_RATE); // 12.586
const BUNDLE_FULL = MAIN_PRICE + BUMPS_TOTAL; // 28.93
const BUNDLE_DISCOUNTED = MAIN_PRICE + BUMPS_DISCOUNTED; // 23.536
const SAVINGS = BUNDLE_FULL - BUNDLE_DISCOUNTED; // 5.394

const fmt = (n: number) => `$${n.toFixed(2)}`;

export function UpsellExitPopup({
  open,
  onClose,
  acceptUrl,
  declineUrl,
  onAccept,
  onDecline,
}: UpsellExitPopupProps) {
  const acceptRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll while popup is open + focus the primary CTA + close on Esc.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Focus the accept button shortly after mount so screen readers + keyboard
    // users land on the primary action.
    const t = window.setTimeout(() => {
      acceptRef.current?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleAcceptClick = () => {
    onAccept?.();
    // Let the native anchor navigation proceed (target="_top").
  };

  const handleDeclineClick = () => {
    onDecline?.();
    // Let the native anchor navigation proceed (target="_top") — do NOT
    // call preventDefault, and do NOT try to set window.top.location
    // manually, because in cross-origin iframes that throws SecurityError
    // and silently kills the navigation.
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upsell-popup-title"
      data-testid="upsell-exit-popup"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close upsell"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
        data-testid="button-upsell-backdrop"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-ivory border-2 border-emerald-900 rounded-sm shadow-2xl"
        data-testid="upsell-popup-panel"
      >
        {/* Decorative gold corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold m-2 opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold m-2 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold m-2 opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold m-2 opacity-60 pointer-events-none" />

        {/* Close (X) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 transition-colors"
          data-testid="button-upsell-close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="px-6 sm:px-10 pt-8 pb-6">
          {/* Eyebrow */}
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-6 bg-gold" />
              <span className="text-gold font-sans text-[10px] font-bold tracking-[0.25em] uppercase">
                Wait — One-Time Offer
              </span>
              <div className="h-px w-6 bg-gold" />
            </div>
          </div>

          {/* Headline */}
          <h2
            id="upsell-popup-title"
            className="font-serif text-2xl sm:text-3xl text-emerald-900 font-bold text-center leading-tight"
            data-testid="text-upsell-headline"
          >
            Before you check out…
          </h2>
          <p className="font-serif italic text-charcoal/80 text-center mt-2 text-base sm:text-lg leading-snug">
            Add both insider companions and{" "}
            <span className="text-emerald-900 font-semibold">save 30%</span>{" "}
            — only on this page, only right now.
          </p>

          {/* Bumps preview */}
          <div className="mt-5 space-y-2.5">
            <div
              className="flex items-start gap-3 p-3 bg-ivory-100 border border-gold/30 rounded-sm"
              data-testid="upsell-line-culinary"
            >
              <span className="text-gold text-lg leading-none mt-0.5" aria-hidden="true">
                ✓
              </span>
              <div className="flex-1 text-sm">
                <p className="font-serif font-bold text-emerald-900 leading-tight">
                  🍝 The Culinary Intelligence Vault
                </p>
                <p className="text-charcoal/75 text-xs mt-0.5 leading-snug">
                  Hidden trattorias, the gelato rule, regional food secrets.
                </p>
              </div>
              <div className="text-right text-xs tabular-nums whitespace-nowrap">
                <span className="text-charcoal/50 line-through">
                  {fmt(BUMP_PRICE)}
                </span>{" "}
                <span className="font-bold text-emerald-900">
                  {fmt(BUMP_PRICE * (1 - DISCOUNT_RATE))}
                </span>
              </div>
            </div>

            <div
              className="flex items-start gap-3 p-3 bg-ivory-100 border border-gold/30 rounded-sm"
              data-testid="upsell-line-phrases"
            >
              <span className="text-gold text-lg leading-none mt-0.5" aria-hidden="true">
                ✓
              </span>
              <div className="flex-1 text-sm">
                <p className="font-serif font-bold text-emerald-900 leading-tight">
                  🇮🇹 The Golden 50 Phrases
                </p>
                <p className="text-charcoal/75 text-xs mt-0.5 leading-snug">
                  The exact phrases that unlock respect, tables, and rare wines.
                </p>
              </div>
              <div className="text-right text-xs tabular-nums whitespace-nowrap">
                <span className="text-charcoal/50 line-through">
                  {fmt(BUMP_PRICE)}
                </span>{" "}
                <span className="font-bold text-emerald-900">
                  {fmt(BUMP_PRICE * (1 - DISCOUNT_RATE))}
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-5 px-3 py-3 border-t border-b border-gold/30">
            <div className="flex justify-between text-xs text-charcoal/70 font-sans">
              <span>Regular bundle total</span>
              <span className="tabular-nums line-through">
                {fmt(BUNDLE_FULL)}
              </span>
            </div>
            <div className="flex justify-between items-baseline mt-1">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-emerald-900 font-bold">
                Today, with 30% off
              </span>
              <span
                className="font-serif text-3xl text-emerald-900 font-bold tabular-nums"
                data-testid="text-upsell-bundle-price"
              >
                {fmt(BUNDLE_DISCOUNTED)}
              </span>
            </div>
            <p className="text-right text-[11px] text-gold font-sans font-bold tracking-wider mt-0.5">
              You save {fmt(SAVINGS)}
            </p>
          </div>

          {/* CTA */}
          <a
            ref={acceptRef}
            href={acceptUrl}
            target="_top"
            rel="noopener noreferrer"
            onClick={handleAcceptClick}
            className="mt-5 inline-flex w-full items-center justify-center bg-emerald-900 hover:bg-emerald-900/90 px-6 py-4 rounded-sm font-serif text-base sm:text-lg tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-emerald-900/20 cursor-pointer"
            style={{ color: "#C9A961" }}
            data-testid="button-upsell-accept"
          >
            Yes — Add Both &amp; Save 30%
          </a>

          {/* Decline */}
          <div className="text-center mt-3">
            <a
              href={declineUrl}
              target="_top"
              rel="noopener noreferrer"
              onClick={handleDeclineClick}
              className="text-xs text-charcoal/55 hover:text-charcoal/80 font-sans underline underline-offset-2 transition-colors"
              data-testid="link-upsell-decline"
            >
              No thanks — continue with the Protocol only ({fmt(MAIN_PRICE)})
            </a>
          </div>

          <p className="text-[10px] text-charcoal/50 font-sans text-center mt-3 uppercase tracking-[0.2em]">
            One-time offer · Not shown again
          </p>
        </div>
      </div>
    </div>
  );
}
