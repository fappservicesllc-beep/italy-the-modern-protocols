import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";
import { CheckIcon, XIcon } from "lucide-react";

const isFor = [
  'Professionals 35+ who value their time and want a "frictionless" travel experience.',
  "Travelers tired of being treated like an outsider and wanting a deeper, more authentic connection to Italy.",
  "Anyone who wants to feel like the most confident person in the room, from Milan to Sicily.",
];

const isNotFor = [
  "Budget backpackers looking for the cheapest hostels.",
  "Students who want to learn academic Italian grammar for a degree.",
  'Travelers who prefer staying inside the "tourist bubble" and eating at chain restaurants.',
];

export function WhoFor() {
  return (
    <section
      className="py-24 bg-ivory-100 border-y border-gold/10"
      data-testid="section-who-for"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionHeader eyebrow="The Audience" title="Who This Is For" />
            <div className="space-y-6 mt-8">
              {isFor.map((text, i) => (
                <FadeIn key={i} delay={0.1 * i} direction="left">
                  <div
                    className="flex items-start gap-4"
                    data-testid={`item-is-for-${i}`}
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/10 flex items-center justify-center">
                      <CheckIcon
                        className="w-4 h-4 text-emerald-900"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-xl md:text-base text-charcoal/80 font-sans font-light leading-relaxed">
                      {text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="The Exclusion"
              title="Who This Is Not For"
            />
            <div className="space-y-6 mt-8">
              {isNotFor.map((text, i) => (
                <FadeIn key={i} delay={0.1 * i} direction="right">
                  <div
                    className="flex items-start gap-4 opacity-70"
                    data-testid={`item-is-not-for-${i}`}
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-900/5 flex items-center justify-center">
                      <XIcon
                        className="w-4 h-4 text-red-900/60"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-xl md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
                      {text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
