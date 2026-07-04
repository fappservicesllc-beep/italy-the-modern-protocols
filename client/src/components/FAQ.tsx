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
    q: "Is this only useful for first-time visitors to Italy?",
    a: "Not at all. Most of our buyers have already been to Italy once or twice — and that's exactly why they want this. They've experienced the awkward silences, the tourist menus, and the feeling of being tolerated instead of welcomed. The Protocol is designed for anyone who wants to move through Italy with real confidence, whether it's your first trip or your fifth.",
  },
  {
    q: "How is this different from a regular travel guidebook?",
    a: "A guidebook tells you what to see. The Italy Insider Protocol tells you how to behave. It covers the unwritten social codes, the exact phrases that signal respect, the honorifics that open doors, and the cultural timing rules that no Lonely Planet will ever print. It's the difference between visiting Italy and experiencing it.",
  },
  {
    q: "When do I receive the protocol after purchase?",
    a: "Immediately. The moment your payment is confirmed, you receive a download link by email. No waiting, no shipping. You can have the full protocol on your phone within 60 seconds of purchase.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Then you pay nothing. The Italy Insider Protocol comes with a 30-day no-questions-asked guarantee. If you go through the material and feel it didn't deliver, email us and we refund you in full. We're confident enough in what's inside that we take all the risk.",
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
                  <span className="font-serif text-2xl md:text-lg text-emerald-900">
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
                        className="px-6 pb-6 pt-0 text-xl md:text-base text-charcoal/70 font-sans font-light leading-relaxed"
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
