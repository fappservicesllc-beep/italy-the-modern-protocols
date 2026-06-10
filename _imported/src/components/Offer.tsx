import React from 'react';
import { FadeIn } from './ui/FadeIn';
import { Button } from './ui/Button';
export function Offer() {
  return (
    <section id="offer" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="bg-ivory-100 border-2 border-emerald-900 p-6 sm:p-8 md:p-14 rounded-sm shadow-2xl relative overflow-hidden">
            {/* Decorative corners — gold accents */}
            <div className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 border-t-2 border-l-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-10 h-10 md:w-12 md:h-12 border-b-2 border-l-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-10 h-10 md:w-12 md:h-12 border-b-2 border-r-2 border-gold m-2 md:m-3 opacity-60 pointer-events-none" />

            {/* Eyebrow */}
            <div className="text-center mb-5 md:mb-6">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-6 md:w-8 bg-gold" />
                <span className="text-gold font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                  A Private Invitation
                </span>
                <div className="h-px w-6 md:w-8 bg-gold" />
              </div>
            </div>

            {/* Product Title */}
            <h2 className="text-2xl md:text-3xl font-serif text-emerald-900 mb-3 md:mb-4 leading-tight text-center">
              The Italy Insider Protocol Guide
            </h2>

            {/* Feature list */}
            <p className="text-xs sm:text-sm md:text-base text-charcoal/70 font-sans font-light mb-6 md:mb-8 text-center max-w-xl mx-auto leading-relaxed">
              Digital Tactical Guide · The "No-Tax" Script Vault · Cultural
              Heritage Framework
            </p>

            {/* Pricing — kept exactly as is */}
            <div className="flex items-baseline justify-center gap-3 md:gap-4 mb-2">
              <span className="font-serif text-2xl md:text-3xl text-charcoal/40 line-through decoration-1">
                $99
              </span>
              <span className="font-serif text-5xl md:text-7xl text-emerald-900 font-bold tracking-tight">
                $10.95
              </span>
            </div>
            <p className="text-center text-[10px] md:text-xs text-charcoal/60 font-sans uppercase tracking-[0.2em] mb-6 md:mb-8">
              USD · One-Time Investment
            </p>

            {/* CTA — now above the fold */}
            <div className="text-center">
              <Button
                href="https://themodernprotocols.com/cart/47838889804002:1"
                className="w-full sm:w-auto text-base md:text-xl py-4 md:py-5 px-8 md:px-14 mb-4 uppercase tracking-[0.15em]"
                style={{
                  color: '#C9A961'
                }}>
                
                Unlock My Insider Access Now
              </Button>

              <p className="text-[11px] md:text-xs text-charcoal/60 font-sans tracking-wider">
                Immediate digital delivery
              </p>
            </div>

            {/* Thin gold divider — now a separator before supporting copy */}
            <div className="flex items-center justify-center gap-3 my-8 md:my-10">
              <div className="h-px w-16 bg-gold/40" />
              <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
              <div className="h-px w-16 bg-gold/40" />
            </div>

            {/* Cost framing intro — moved below as supporting body copy */}
            <p className="text-sm md:text-base text-charcoal/75 font-serif italic leading-relaxed text-center max-w-2xl mx-auto mb-8 md:mb-10">
              The cost of an "un-protocol" trip is high. It's the €50 "tourist
              surcharge" on a taxi, the €100 spent on a dinner that felt like a
              transaction rather than an event, and the hours of stress
              navigating a system that feels designed to keep you on the
              outside.
            </p>

            {/* Trust badges */}
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
    </section>);

}