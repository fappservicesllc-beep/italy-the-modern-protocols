import React from 'react';
import { FadeIn } from './ui/FadeIn';
export function OpeningHook() {
  return (
    <section className="py-20 bg-ivory-100 border-y border-gold/20 relative">
      {/* Subtle Greek key pattern watermark could go here if we had an SVG, using a simple border for now */}
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-xl md:text-2xl font-serif text-emerald-900 leading-relaxed mb-8">
            You've seen it happen. A crowded Roman Trattoria, a line out the
            door, and a frustrated host ignoring everyone. Then, a couple walks
            up, whispers two specific words, and is immediately ushered to the
            best table in the house.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-charcoal/80 font-sans font-light leading-relaxed">
            They aren't celebrities. They aren't "lucky." They simply know the
            Protocol. In Italy, the "Tourist Wall" is an invisible barrier that
            separates those who are tolerated from those who are respected. If
            you rely on translation apps and generic greetings, you've already
            lost.
          </p>
        </FadeIn>
      </div>
    </section>);

}