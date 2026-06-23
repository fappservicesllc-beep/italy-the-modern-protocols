import { useState } from "react";
import { FadeIn } from "./ui/FadeIn";
import { Button } from "./ui/Button";
import { UpsellExitPopup } from "./UpsellExitPopup";

// Shopify variant IDs (used for Meta Pixel content_ids only — checkout
// permalinks below are pre-built bundle URLs provided by the merchant).
const MAIN_VARIANT_ID = "47838889804002";
const CULINARY_VAULT_VARIANT_ID = "47904170868962";
const GOLDEN_PHRASES_VARIANT_ID = "47904166871266";
const BUNDLE_BOTH_VARIANT_ID = "47904162939106";

// Pre-built Shopify checkout permalinks — one per selection combo.
const CHECKOUT_URL_MAIN_ONLY =
  "https://e4xyke-kt.myshopify.com/cart/47838889804002:1?channel=buy_button";
const CHECKOUT_URL_MAIN_PLUS_CULINARY =
  "https://www.themodernprotocols.com/cart/47904170868962:1";
const CHECKOUT_URL_MAIN_PLUS_PHRASES =
  "https://www.themodernprotocols.com/cart/47904166871266:1";
const CHECKOUT_URL_MAIN_PLUS_BOTH =
  "https://www.themodernprotocols.com/cart/47904162939106:1";
// All three bumps (Culinary + Phrases + Airport) — full bundle permalink.
const CHECKOUT_URL_MAIN_PLUS_ALL_THREE =
  "https://www.themodernprotocols.com/cart/47920323494114:1";
// Main + Culinary + Airport (Phrases NOT selected).
const CHECKOUT_URL_MAIN_PLUS_CULINARY_AIRPORT =
  "https://www.themodernprotocols.com/cart/47920328409314:1";
// Main + Phrases + Airport (Culinary NOT selected).
const CHECKOUT_URL_MAIN_PLUS_PHRASES_AIRPORT =
  "https://www.themodernprotocols.com/cart/47920329261282:1";
// Main + Airport only (Culinary and Phrases NOT selected).
const CHECKOUT_URL_MAIN_PLUS_AIRPORT =
  "https://www.themodernprotocols.com/cart/47920322117858:1";
// Exit-popup-only: bundle with 30% off pre-applied at this Shopify permalink.
const CHECKOUT_URL_UPSELL_DISCOUNTED =
  "https://www.themodernprotocols.com/cart/47912373911778:1";
// Exit-popup-only: "No thanks" decline path — main product only on primary domain.
const CHECKOUT_URL_UPSELL_DECLINE =
  "https://www.themodernprotocols.com/cart/47838889804002:1";

export function ValueStack() {
  const [bumpCulinary, setBumpCulinary] = useState(true);
  const [bumpPhrases, setBumpPhrases] = useState(true);
  const [bumpAirport, setBumpAirport] = useState(true);
  const [upsellOpen, setUpsellOpen] = useState(false);
  // Once the user has been shown the popup and declined (or accepted), don't
  // re-trigger it again on subsequent clicks during the same session.
  const [upsellShown, setUpsellShown] = useState(false);

  const basePrice = 27;
  const bumpPrice = 8.99;
  const totalPrice =
    basePrice +
    (bumpCulinary ? bumpPrice : 0) +
    (bumpPhrases ? bumpPrice : 0) +
    (bumpAirport ? bumpPrice : 0);

  const buildCheckoutUrl = () => {
    if (bumpCulinary && bumpPhrases && bumpAirport)
      return CHECKOUT_URL_MAIN_PLUS_ALL_THREE;
    if (bumpCulinary && bumpAirport && !bumpPhrases)
      return CHECKOUT_URL_MAIN_PLUS_CULINARY_AIRPORT;
    if (bumpPhrases && bumpAirport && !bumpCulinary)
      return CHECKOUT_URL_MAIN_PLUS_PHRASES_AIRPORT;
    if (bumpCulinary && bumpPhrases) return CHECKOUT_URL_MAIN_PLUS_BOTH;
    if (bumpCulinary) return CHECKOUT_URL_MAIN_PLUS_CULINARY;
    if (bumpPhrases) return CHECKOUT_URL_MAIN_PLUS_PHRASES;
    if (bumpAirport) return CHECKOUT_URL_MAIN_PLUS_AIRPORT;
    return CHECKOUT_URL_MAIN_ONLY;
  };

  // Intercepts a checkout button click. If the user has NOT selected any
  // order bump, we prevent navigation and open the exit-intent upsell popup
  // instead. If any bump is checked, we let the click proceed normally and
  // just fire the AddToCart pixel event.
  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const noBumpsSelected = !bumpCulinary && !bumpPhrases && !bumpAirport;
    if (noBumpsSelected && !upsellShown) {
      e.preventDefault();
      setUpsellShown(true);
      setUpsellOpen(true);
      return;
    }
    handleAddToCart();
  };

  // Fires the upsell's "Yes, add both" CTA — track an AddToCart for the full
  // bundle before the popup's anchor takes the user to the bundle permalink.
  const handleUpsellAccept = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: "Italy Insider Protocol — Full Bundle (Upsell)",
        content_ids: [BUNDLE_BOTH_VARIANT_ID],
        content_type: "product",
        value: 23.54,
        currency: "USD",
      });
    }
  };

  // Fires when the user declines the upsell — track an AddToCart for the
  // main product only before navigating to the main-only checkout.
  const handleUpsellDecline = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: "The Italy Insider Protocol Guide + Tourist Trap Map",
        content_ids: [MAIN_VARIANT_ID],
        content_type: "product",
        value: basePrice,
        currency: "USD",
      });
    }
  };

  const handleAddToCart = () => {
    if (typeof window !== "undefined" && window.fbq) {
      const contentIds: string[] = [];
      if (bumpCulinary && bumpPhrases) {
        contentIds.push(BUNDLE_BOTH_VARIANT_ID);
      } else if (bumpCulinary) {
        contentIds.push(CULINARY_VAULT_VARIANT_ID);
      } else if (bumpPhrases) {
        contentIds.push(GOLDEN_PHRASES_VARIANT_ID);
      } else {
        contentIds.push(MAIN_VARIANT_ID);
      }
      window.fbq("track", "AddToCart", {
        content_name: "The Italy Insider Protocol Guide + Tourist Trap Map",
        content_ids: contentIds,
        content_type: "product",
        value: totalPrice,
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

            {/* ============ TOP: DOUBLE BONUS ============ */}
            <div
              className="px-6 sm:px-8 md:px-12 pt-6 md:pt-8 pb-4 md:pb-5"
              data-testid="value-stack-bonus"
            >
              <div className="text-center mb-4 md:mb-5">
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-6 md:w-8 bg-gold" />
                  <span className="text-gold font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                    Two Free Bonuses Included
                  </span>
                  <div className="h-px w-6 md:w-8 bg-gold" />
                </div>
              </div>

              <ul className="space-y-3 md:space-y-4 max-w-xl mx-auto">
                <li
                  className="flex gap-3 text-sm md:text-base text-charcoal/85 font-sans leading-snug"
                  data-testid="bonus-item-1"
                >
                  <span
                    className="text-gold flex-shrink-0 mt-0.5 text-base md:text-lg"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    <span className="font-serif font-black text-emerald-900 text-base md:text-lg block leading-tight">
                      <span aria-hidden="true">🎁 </span>BONUS #1: The Tourist Trap Map (PDF)
                    </span>
                    <span className="block mt-1">
                      Visual guide to avoid the 10 biggest mistakes Americans
                      make in Italy.
                    </span>
                  </span>
                </li>
                <li
                  className="flex gap-3 text-sm md:text-base text-charcoal/85 font-sans leading-snug"
                  data-testid="bonus-item-2"
                >
                  <span
                    className="text-gold flex-shrink-0 mt-0.5 text-base md:text-lg"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    <span className="font-serif font-black text-emerald-900 text-base md:text-lg block leading-tight">
                      <span aria-hidden="true">🎧 </span>BONUS #2: Pronunciation &amp; Social Scripts Audio Guide (MP3)
                    </span>
                    <span className="block mt-1">
                      Master the rhythm of the language. Audio scripts for
                      restaurants, coffee bars, and greetings to sound like a
                      local.
                    </span>
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
              <p className="text-center text-[10px] md:text-xs text-charcoal/70 font-sans uppercase tracking-[0.25em] mb-1">
                {bumpCulinary || bumpPhrases || bumpAirport ? "Your Total" : "Current Offer"}
              </p>
              <div className="flex items-baseline justify-center gap-3 md:gap-4 mb-1">
                <span
                  className="font-serif text-5xl md:text-6xl text-emerald-900 font-bold tracking-tight transition-all duration-300"
                  data-testid="text-price-current"
                  key={totalPrice}
                >
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-center text-[10px] md:text-xs text-charcoal/60 font-sans uppercase tracking-[0.2em] mb-3 md:mb-4">
                {bumpCulinary || bumpPhrases || bumpAirport ? "Bundle Total" : "One-Time Payment"}
              </p>

              <p
                className="text-center font-serif italic text-base md:text-xl text-gold/90 mb-5 md:mb-6 px-4 leading-snug"
                data-testid="text-price-tagline"
              >
                Everything you need to navigate Italy like a local — for less than one bad meal in Rome.
              </p>

              {(bumpCulinary || bumpPhrases || bumpAirport) && (
                <div
                  className="max-w-sm mx-auto mb-5 md:mb-6 text-xs md:text-sm font-sans bg-ivory border border-gold/30 rounded-sm px-4 py-3 space-y-1.5"
                  data-testid="order-summary"
                >
                  <div className="flex justify-between text-charcoal/80">
                    <span>Italy Insider Protocol</span>
                    <span className="tabular-nums">$27.00</span>
                  </div>
                  {bumpCulinary && (
                    <div className="flex justify-between text-charcoal/80" data-testid="summary-line-culinary">
                      <span>+ Culinary Intelligence Vault</span>
                      <span className="tabular-nums">$8.99</span>
                    </div>
                  )}
                  {bumpPhrases && (
                    <div className="flex justify-between text-charcoal/80" data-testid="summary-line-phrases">
                      <span>+ The Golden 50 Phrases</span>
                      <span className="tabular-nums">$8.99</span>
                    </div>
                  )}
                  {bumpAirport && (
                    <div className="flex justify-between text-charcoal/80" data-testid="summary-line-airport">
                      <span>+ Airport Survival Guide</span>
                      <span className="tabular-nums">$8.99</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-emerald-900 pt-1.5 mt-1.5 border-t border-gold/30">
                    <span className="uppercase tracking-wider text-[11px] md:text-xs">Total</span>
                    <span className="tabular-nums text-sm md:text-base" data-testid="summary-total">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-3 mt-2 border-t border-gold/30">
                    <Button
                      href={buildCheckoutUrl()}
                      onClick={handleCheckoutClick}
                      className="w-full text-xs md:text-sm py-2.5 md:py-3 px-4 uppercase tracking-[0.15em]"
                      style={{ color: "#C9A961" }}
                      testId="button-checkout-summary"
                    >
                      Checkout — ${totalPrice.toFixed(2)}
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center">
                <Button
                  href={buildCheckoutUrl()}
                  onClick={handleCheckoutClick}
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

              {/* ============ ORDER BUMPS ============ */}
              <div className="mt-6 md:mt-8 space-y-4" data-testid="order-bumps">
                <div className="text-center mb-1">
                  <div className="inline-flex items-center gap-3">
                    <div className="h-px w-6 md:w-8 bg-gold/50" />
                    <span className="text-charcoal/60 font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                      One-Time Add-Ons
                    </span>
                    <div className="h-px w-6 md:w-8 bg-gold/50" />
                  </div>
                </div>

                {/* Order Bump #1: Airport Survival Guide */}
                <label
                  htmlFor="bump-airport"
                  className={`flex gap-3 md:gap-4 p-3 md:p-4 rounded-sm border-2 border-dashed cursor-pointer transition-colors ${
                    bumpAirport
                      ? "border-emerald-900 bg-emerald-900/5"
                      : "border-gold/60 bg-ivory hover:border-emerald-900/60 animate-bump-glow"
                  }`}
                  data-testid="order-bump-airport"
                >
                  <input
                    id="bump-airport"
                    type="checkbox"
                    checked={bumpAirport}
                    onChange={(e) => setBumpAirport(e.target.checked)}
                    className="mt-1 w-5 h-5 flex-shrink-0 accent-emerald-900 cursor-pointer"
                    data-testid="checkbox-bump-airport"
                  />
                  <img
                    src="/airport-guide.png"
                    alt="The Arrival Protocol — Airport Survival Guide"
                    className="hidden sm:block w-20 h-20 md:w-24 md:h-24 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-serif font-bold text-emerald-900 text-sm md:text-base leading-tight">
                      🛬 Don&rsquo;t land blind &mdash; Know before you go{" "}
                      <span className="text-gold">(Save 60%)</span>
                    </p>
                    <span
                      className="inline-block mt-1.5 text-[9px] md:text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-emerald-900 bg-gold/25 border border-gold/50 rounded-sm px-2 py-0.5"
                      data-testid="badge-airport-recommended"
                    >
                      ★ Highly Recommended
                    </span>
                    <p className="text-xs md:text-sm text-charcoal/80 font-sans mt-1.5 leading-snug">
                      Most travelers lose &euro;60+ in their first hour at the
                      airport. This guide shows you exactly how to exit FCO,
                      MXP, and NAP &mdash; fixed-rate taxis, local SIM cards,
                      train cut-off times, and how to spot fake drivers before
                      they spot you.
                    </p>
                    <p className="text-xs md:text-sm font-sans font-bold text-emerald-900 mt-2">
                      ✓ Add to my order for only{" "}
                      <span className="text-base md:text-lg">$8.99</span>
                    </p>
                  </div>
                </label>

                {/* Order Bump #2: The 50 Golden Phrases Guide */}
                <label
                  htmlFor="bump-phrases"
                  className={`flex gap-3 md:gap-4 p-3 md:p-4 rounded-sm border-2 border-dashed cursor-pointer transition-colors ${
                    bumpPhrases
                      ? "border-emerald-900 bg-emerald-900/5"
                      : "border-gold/60 bg-ivory hover:border-emerald-900/60 animate-bump-glow [animation-delay:1.3s]"
                  }`}
                  data-testid="order-bump-phrases"
                >
                  <input
                    id="bump-phrases"
                    type="checkbox"
                    checked={bumpPhrases}
                    onChange={(e) => setBumpPhrases(e.target.checked)}
                    className="mt-1 w-5 h-5 flex-shrink-0 accent-emerald-900 cursor-pointer"
                    data-testid="checkbox-bump-phrases"
                  />
                  <img
                    src="/golden-phrases.png"
                    alt="The 50 Golden Phrases Guide"
                    className="hidden sm:block w-20 h-20 md:w-24 md:h-24 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-serif font-bold text-emerald-900 text-sm md:text-base leading-tight flex items-center gap-2">
                      <span
                        aria-label="Italian flag"
                        className="inline-flex h-3.5 w-5 md:h-4 md:w-6 overflow-hidden rounded-[2px] border border-charcoal/20 flex-shrink-0"
                      >
                        <span className="flex-1 bg-[#009246]" />
                        <span className="flex-1 bg-white" />
                        <span className="flex-1 bg-[#ce2b37]" />
                      </span>
                      <span>Unlock Respect with the &ldquo;Golden 50&rdquo;</span>
                    </p>
                    <p className="text-xs md:text-sm text-charcoal/80 font-sans mt-1.5 leading-snug">
                      English is fine, but the right Italian phrase at the
                      right time changes everything. I&rsquo;ve curated the 50
                      specific phrases that unlock better tables, rare wine
                      bottles, and the respect of every waiter and shopkeeper
                      you meet. No grammar, no fluff&mdash;just the phonetics
                      of belonging. A must-have for your phone.
                    </p>
                    <p className="text-xs md:text-sm font-sans font-bold text-emerald-900 mt-2">
                      ✓ Add to my order for only{" "}
                      <span className="text-base md:text-lg">$8.99</span>
                    </p>
                  </div>
                </label>

                {/* Order Bump #3: Culinary Intelligence Vault */}
                <label
                  htmlFor="bump-culinary"
                  className={`flex gap-3 md:gap-4 p-3 md:p-4 rounded-sm border-2 border-dashed cursor-pointer transition-colors ${
                    bumpCulinary
                      ? "border-emerald-900 bg-emerald-900/5"
                      : "border-gold/60 bg-ivory hover:border-emerald-900/60 animate-bump-glow [animation-delay:2.6s]"
                  }`}
                  data-testid="order-bump-culinary"
                >
                  <input
                    id="bump-culinary"
                    type="checkbox"
                    checked={bumpCulinary}
                    onChange={(e) => setBumpCulinary(e.target.checked)}
                    className="mt-1 w-5 h-5 flex-shrink-0 accent-emerald-900 cursor-pointer"
                    data-testid="checkbox-bump-culinary"
                  />
                  <img
                    src="/culinary-vault.png"
                    alt="The Culinary Intelligence Vault"
                    className="hidden sm:block w-20 h-20 md:w-24 md:h-24 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-serif font-bold text-emerald-900 text-sm md:text-base leading-tight">
                      🍝 WAIT! Don&rsquo;t eat like a tourist...{" "}
                      <span className="text-gold">(Save 60%)</span>
                    </p>
                    <span
                      className="inline-block mt-1.5 text-[9px] md:text-[10px] font-sans font-bold tracking-[0.18em] uppercase text-emerald-900 bg-gold/25 border border-gold/50 rounded-sm px-2 py-0.5"
                      data-testid="badge-highly-recommended"
                    >
                      ★ Highly Recommended
                    </span>
                    <p className="text-xs md:text-sm text-charcoal/80 font-sans mt-1.5 leading-snug">
                      Most visitors fall into &ldquo;tourist traps&rdquo; with
                      frozen food and plastic menus. Add my{" "}
                      <em>Culinary Vault</em> to your order and get my private
                      map of hidden trattorias, the 3-step rule to spotting a
                      fake gelato shop, and the regional food secrets only
                      locals know. Eat like a king for a fraction of the price.
                    </p>
                    <p className="text-xs md:text-sm font-sans font-bold text-emerald-900 mt-2">
                      ✓ Add to my order for only{" "}
                      <span className="text-base md:text-lg">$8.99</span>
                    </p>
                  </div>
                </label>
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

      <UpsellExitPopup
        open={upsellOpen}
        onClose={() => setUpsellOpen(false)}
        acceptUrl={CHECKOUT_URL_UPSELL_DISCOUNTED}
        declineUrl={CHECKOUT_URL_UPSELL_DECLINE}
        onAccept={handleUpsellAccept}
        onDecline={handleUpsellDecline}
      />
    </section>
  );
}
