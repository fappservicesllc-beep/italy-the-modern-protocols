import { useState } from "react";
import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon } from "lucide-react";

const faqs = [
  {
    q: "Do I need to be fluent?",
    a: "No. This focuses on the 5% of communication that yields 95% of the respect.",
  },
  {
    q: "Will this work in all of Italy?",
    a: 'Yes, the guide specifically covers the "Vibe Shift" between the North and South.',
  },
  {
    q: "Is this just for men?",
    a: "No, the Protocol is designed for any professional traveler who wants to lead with authority.",
  },
  {
    q: "Does it work on my phone?",
    a: "Yes, both the PDF and Audio are mobile-optimized for easy access in the street.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-24 max-w-3xl mx-auto px-6"
      data-testid="section-faq"
    >
      <SectionHeader eyebrow="Common Questions" title="FAQ" centered />

      <div className="mt-12 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <FadeIn key={index} delay={0.1 * index} direction="up">
              <div className="border border-gold/20 bg-white rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  data-testid={`button-faq-${index}`}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg text-emerald-900">
                    {faq.q}
                  </span>
                  <span className="text-gold flex-shrink-0 ml-4">
                    {isOpen ? (
                      <MinusIcon className="w-5 h-5" />
                    ) : (
                      <PlusIcon className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className="px-6 pb-6 pt-0 text-charcoal/70 font-sans font-light leading-relaxed"
                        data-testid={`text-faq-answer-${index}`}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
