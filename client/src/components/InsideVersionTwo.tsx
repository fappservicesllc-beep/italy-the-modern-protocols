import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";
import { Button } from "./ui/Button";

// Compact V2.0 value section. Sits high on the page (after Problem, before
// WhyFailed) to make the expanded value proposition concrete for cold traffic.
// Reuses the existing SectionHeader / FadeIn / Button primitives so it inherits
// the approved cream / dark green / muted gold system with zero new styling.
const ITEMS = [
  {
    number: "01",
    title: "The Rhythm of the Day",
    body: "Why breakfast, lunch breaks, store hours and evening life may operate very differently from what you expect.",
  },
  {
    number: "02",
    title: "How Italians Actually Communicate",
    body: "Greetings, gestures, regional personalities and why an interaction that feels abrupt to an American may not be rude at all.",
  },
  {
    number: "03",
    title: "Hotels Are Not American Hotels",
    body: "What to check for before booking — including air conditioning, elevators, room size, stairs and transportation access.",
  },
  {
    number: "04",
    title: "Driving Without Expensive Surprises",
    body: "What travelers need to understand about narrow streets, parking, tolls and restricted ZTL zones before renting a car.",
  },
  {
    number: "05",
    title: "When To Reserve — And When Not To",
    body: "Which experiences deserve advance planning and when flexibility can actually create a better trip.",
  },
  {
    number: "06",
    title: "The Italy Beyond the Itinerary",
    body: "How to experience neighborhoods, smaller towns, local rhythms and spontaneous moments without trying to turn every hour into a checklist.",
  },
];

export function InsideVersionTwo() {
  return (
    <section
      className="py-16 md:py-24 bg-ivory-100 border-y border-gold/20"
      data-testid="section-inside-version-two"
    >
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Inside Version 2.0"
          title="What Most Italy Guides Don't Tell You"
          centered
          className="mb-8 md:mb-10"
        />

        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <p className="text-2xl md:text-xl font-serif text-emerald-900 leading-relaxed mb-4">
              Italy is easy to visit. Understanding how it actually works is
              different.
            </p>
            <p
              className="text-lg md:text-base text-charcoal/80 font-sans font-light leading-relaxed"
              data-testid="text-v2-intro"
            >
              The Italy Insider Protocol&trade; goes beyond landmarks and
              itineraries to prepare you for the cultural details, practical
              realities and unwritten rules travelers often discover only after
              they arrive.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ITEMS.map((item, i) => (
            <FadeIn key={item.number} delay={0.1 + i * 0.05} direction="up">
              <div
                className="h-full bg-white border border-gold/15 rounded-sm p-5 md:p-7 shadow-sm"
                data-testid={`card-v2-item-${item.number}`}
              >
                <div className="flex items-baseline gap-3 mb-2 md:mb-3">
                  <span className="font-serif text-gold text-lg md:text-xl leading-none shrink-0">
                    {item.number}
                  </span>
                  <h3
                    className="font-sans text-[13px] md:text-xs font-bold tracking-[0.14em] uppercase text-emerald-900 leading-snug"
                    data-testid={`text-v2-title-${item.number}`}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-base md:text-base text-charcoal/75 font-sans font-light leading-relaxed">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 md:mt-14 text-center">
            <p
              className="font-serif text-xl md:text-2xl text-emerald-900 leading-relaxed max-w-2xl mx-auto mb-7 md:mb-8"
              data-testid="text-v2-closing"
            >
              These are the details that can change how Italy feels once
              you&rsquo;re actually there.
            </p>

            <div className="flex justify-center">
              <Button
                className="w-full sm:w-auto"
                testId="button-v2-get-protocol"
              >
                Get The Protocol &mdash; $17
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
