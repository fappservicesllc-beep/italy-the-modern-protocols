import { Star } from "lucide-react";
import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";

const testimonials = [
  {
    quote:
      "I used the honorific script at a restaurant in Florence and the waiter literally changed his entire attitude. We got a table by the window without asking. Worth every penny.",
    name: "James R.",
    city: "Chicago, IL",
  },
  {
    quote:
      "I've been to Italy three times and always felt like a tourist. This time I felt like a local. The café owner in Rome asked me if I lived nearby. That had never happened before.",
    name: "Maria C.",
    city: "Miami, FL",
  },
  {
    quote:
      "The airport section alone saved me from a fake taxi situation at FCO. I knew exactly where to walk, what to say, and what the fixed fare was. Saved at least €60 on day one.",
    name: "David K.",
    city: "Austin, TX",
  },
];

export function Testimonials() {
  return (
    <section
      className="py-24 bg-ivory"
      data-testid="section-testimonials"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="What People Are Saying"
          title="Real Results from Real Travelers."
          centered
        />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={0.1 * (i + 1)} direction="up">
              <article
                className="h-full flex flex-col bg-white border border-gold/20 rounded-sm p-8 shadow-sm"
                data-testid={`card-testimonial-${i}`}
              >
                <div
                  className="flex items-center gap-1 mb-5"
                  aria-label="5 out of 5 stars"
                  data-testid={`stars-testimonial-${i}`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-gold fill-gold"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <blockquote
                  className="font-serif italic text-xl md:text-lg leading-relaxed text-charcoal/85 flex-1"
                  data-testid={`quote-testimonial-${i}`}
                >
                  “{t.quote}”
                </blockquote>

                <div className="mt-6 pt-5 border-t border-gold/20">
                  <div
                    className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-emerald-900"
                    data-testid={`name-testimonial-${i}`}
                  >
                    {t.name}
                  </div>
                  <div
                    className="font-sans text-xs tracking-[0.18em] uppercase text-gold/90 mt-1"
                    data-testid={`city-testimonial-${i}`}
                  >
                    {t.city}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
