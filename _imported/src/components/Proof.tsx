import React from 'react';
import { FadeIn } from './ui/FadeIn';
export function Proof() {
  return (
    <section className="py-24 bg-emerald-900 text-ivory">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <span className="text-gold font-sans text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
            Proof / Believability
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-gold mb-12">
            What changes in 7 days:
          </h2>
        </FadeIn>

        <div className="space-y-8 text-left max-w-2xl mx-auto">
          <FadeIn delay={0.1} direction="up">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-gold/20 pb-6">
              <span className="font-serif text-xl text-gold min-w-[100px]">
                By day one,
              </span>
              <p className="text-lg font-sans font-light text-ivory/90">
                your transit is seamless.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-gold/20 pb-6">
              <span className="font-serif text-xl text-gold min-w-[100px]">
                By day three,
              </span>
              <p className="text-lg font-sans font-light text-ivory/90">
                you are being greeted by name at your local café.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} direction="up">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-2">
              <span className="font-serif text-xl text-gold min-w-[100px]">
                By day seven,
              </span>
              <p className="text-lg font-sans font-light text-ivory/90">
                you are navigating regional social cues that most expats take
                years to learn.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>);

}