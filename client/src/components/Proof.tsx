import { FadeIn } from "./ui/FadeIn";

const milestones = [
  {
    when: "By day one,",
    what: "your transit is seamless. You exit the airport with a fixed-rate taxi, a local SIM, and zero chaos.",
  },
  {
    when: "By day three,",
    what: "the waiter at your local café greets you by name — because you used the right honorific the first time.",
  },
  {
    when: "By day seven,",
    what: "you are navigating regional social cues that most expats spend years trying to learn — and you did it in a weekend.",
  },
];

export function Proof() {
  return (
    <section
      className="py-24 bg-emerald-900 text-ivory"
      data-testid="section-proof"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <span className="text-gold font-sans text-sm md:text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
            Proof / Believability
          </span>
          <h2 className="text-4xl md:text-4xl font-serif text-gold mb-12">
            What changes in 7 days:
          </h2>
        </FadeIn>

        <div className="space-y-8 text-left max-w-2xl mx-auto">
          {milestones.map((m, i) => (
            <FadeIn key={i} delay={0.1 * (i + 1)} direction="up">
              <div
                className={`flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 ${
                  i < milestones.length - 1
                    ? "border-b border-gold/20 pb-6"
                    : "pb-2"
                }`}
                data-testid={`milestone-${i}`}
              >
                <span className="font-serif text-2xl md:text-xl text-gold min-w-[100px]">
                  {m.when}
                </span>
                <p className="text-lg md:text-lg font-sans font-light text-ivory/90">
                  {m.what}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
