import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";

const steps = [
  {
    num: "01",
    title: "Download",
    desc: "Get the Protocol and Audio Masterclass instantly to your phone or tablet.",
  },
  {
    num: "02",
    title: "Review",
    desc: "Listen to the 48-minute audio on your way to Italy or during your first evening.",
  },
  {
    num: "03",
    title: "Execute",
    desc: 'Use the "Respect-First" scripts the moment you step off the plane and watch the country open up for you.',
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-24 max-w-5xl mx-auto px-6"
      data-testid="section-how-it-works"
    >
      <SectionHeader
        eyebrow="The Process"
        title="How It Works"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 relative">
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gold/30 -z-10" />

        {steps.map((step, index) => (
          <FadeIn key={index} delay={0.2 * index} direction="up">
            <div
              className="flex flex-col items-center text-center"
              data-testid={`step-${step.num}`}
            >
              <div className="w-24 h-24 rounded-full bg-ivory border-2 border-gold flex items-center justify-center mb-6 shadow-sm">
                <span className="font-serif text-3xl text-emerald-900">
                  {step.num}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-emerald-900 mb-4">
                {step.title}
              </h3>
              <p className="text-charcoal/70 font-sans font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
