import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";
import { XIcon } from "lucide-react";

const failures = [
  {
    title: "Language Apps",
    desc: "teach you how to pass a school test, but they ignore the high-stakes etiquette required in a real Italian business or social setting.",
  },
  {
    title: "Generic Phrasebooks",
    desc: "give you 1,000 words you'll never use and zero context on the 50 words that actually grant you access.",
  },
  {
    title: 'The "Customer is King" Mindset',
    desc: 'is an American concept that fails in Italy; here, the "Guest" is king, and entry is earned through specific rituals of respect.',
  },
];

export function WhyFailed() {
  return (
    <section
      className="py-24 bg-ivory-100"
      data-testid="section-why-failed"
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          eyebrow="Why What You Tried Didn't Work"
          title="The Flawed Approach"
        />

        <div className="mt-12 space-y-8">
          {failures.map((item, index) => (
            <FadeIn key={index} delay={0.1 * (index + 1)} direction="left">
              <div
                className="flex items-start gap-6 group"
                data-testid={`item-failure-${index}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900/5 flex items-center justify-center border border-red-900/10 group-hover:bg-red-900/10 transition-colors">
                  <XIcon
                    className="w-5 h-5 text-red-800/70"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-emerald-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/70 font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
