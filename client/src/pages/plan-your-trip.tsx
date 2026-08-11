import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  MinusIcon,
  Check,
  ArrowLeft,
  Gauge,
  Map,
  Clock,
  Train,
  Wine,
  Compass,
  AlertTriangle,
} from "lucide-react";

/**
 * Shopify product page for the $79 Italy Trip Review, provided by the owner.
 * The ™ is percent-encoded (%E2%84%A2) so the URL stays valid in an href.
 * If this is ever emptied, every CTA falls back to the enquiry mailto below
 * so no lead is dropped.
 */
const TRIP_REVIEW_CHECKOUT_URL =
  "https://themodernprotocols.com/products/the-italy-trip-review%E2%84%A2";

const ENQUIRY_EMAIL = "themodernprotocols@gmail.com";
const CHECKOUT_FALLBACK = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
  "Italy Trip Review — Founding Customer ($79)"
)}&body=${encodeURIComponent(
  "Hi — I'd like to book the Italy Trip Review.\n\nTravel dates:\nCities I've planned:\nLink or paste of my current itinerary:\n"
)}`;

const WAITLIST_MAILTO = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
  "Priority List — The Italy Pronunciation Lab"
)}&body=${encodeURIComponent(
  "Hi — please add me to the priority list for The Italy Pronunciation Lab.\n"
)}`;

const checkoutHref = TRIP_REVIEW_CHECKOUT_URL || CHECKOUT_FALLBACK;

const reviewPillars = [
  {
    icon: Gauge,
    label: "Pace",
    copy: "Are you trying to fit too much into too little time?",
  },
  {
    icon: Map,
    label: "Route",
    copy: "Does the order of your destinations make geographical and practical sense?",
  },
  {
    icon: Clock,
    label: "Timing",
    copy: "Are your days and major activities arranged intelligently?",
  },
  {
    icon: Train,
    label: "Logistics",
    copy: "We'll look for potential issues involving transportation, transfers, driving, arrivals, departures, and movement between destinations.",
  },
  {
    icon: Wine,
    label: "Experience",
    copy: "Does the itinerary leave enough room to actually experience Italy rather than simply race through a sightseeing checklist?",
  },
  {
    icon: Compass,
    label: "Missed Opportunities",
    copy: "Are there worthwhile experiences or adjustments relevant to the trip that the traveler may have overlooked?",
  },
  {
    icon: AlertTriangle,
    label: "Red Flags",
    copy: "Identify decisions that may create unnecessary stress, wasted time, inefficient travel, or other avoidable problems.",
  },
];

const deliverables = [
  {
    label: "Keep",
    copy: "What you've planned well and should keep exactly as it is.",
    accent: "text-emerald-900",
    rule: "bg-emerald-900",
  },
  {
    label: "Change",
    copy: "What we strongly recommend reconsidering — with an explanation of why, not just a verdict.",
    accent: "text-[#C0562F]",
    rule: "bg-[#C0562F]",
  },
  {
    label: "Consider",
    copy: "Optional improvements and opportunities based on your specific itinerary and preferences.",
    accent: "text-gold-600",
    rule: "bg-gold",
  },
];

const offerIncludes = [
  "Personalized itinerary review",
  "Pace, route, timing and logistics assessment",
  "Experience and missed-opportunity review",
  "KEEP / CHANGE / CONSIDER recommendations",
  "Top 5 recommendations before departure",
  "Digital delivery within 3 business days",
  "One follow-up email for clarification",
];

const faqs = [
  {
    q: "Are you planning my entire trip?",
    a: "No. You provide an itinerary you've already created. The Italy Trip Review™ reviews and helps optimize the existing plan.",
  },
  {
    q: "Will you book hotels, restaurants, trains, tours, or activities for me?",
    a: "No. This is an advisory itinerary-review service, not a travel-booking service.",
  },
  {
    q: "Can you completely rebuild my itinerary?",
    a: "Major itinerary design and extensive replanning are outside the scope of the standard Italy Trip Review™.",
  },
  {
    q: "How quickly will I receive my review?",
    a: "Within 3 business days after receiving the completed itinerary and questionnaire.",
  },
  {
    q: "Can I ask questions afterward?",
    a: "The Founding Customer offer includes one follow-up email for clarification.",
  },
  {
    q: "Why wouldn't I just use ChatGPT or Reddit?",
    a: "Both can be useful planning resources. The Italy Trip Review™ provides a structured review of your specific itinerary through the perspective behind the Italy Insider Protocol™ — including pacing, routing, timing, logistics, experience quality, missed opportunities, and potential problems.",
  },
];

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-16 bg-gradient-to-r from-gold to-gold/0 ${className}`}
      aria-hidden="true"
    />
  );
}

function ReviewCta({
  label,
  testId,
  className = "",
}: {
  label: string;
  testId: string;
  className?: string;
}) {
  return (
    <a
      href={checkoutHref}
      className={`inline-flex items-center justify-center bg-emerald-900 text-ivory hover:bg-emerald-950 px-8 py-5 md:py-4 rounded-sm font-serif text-xl md:text-lg tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-emerald-900/20 ${className}`}
      data-testid={testId}
    >
      {label}
    </a>
  );
}

export default function PlanYourTrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Quiet way back to the main funnel — never a dead end */}
      <div className="w-full bg-emerald-950 border-b border-gold/20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2.5">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-ivory/60 hover:text-gold transition-colors"
            data-testid="link-back-to-protocol"
          >
            <ArrowLeft className="w-3 h-3" />
            The Italy Insider Protocol
          </a>
        </div>
      </div>

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative pt-10 pb-14 md:pt-24 md:pb-24 overflow-hidden bg-paper"
          data-testid="section-trip-review-hero"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute top-[-12%] right-[-6%] w-[52%] h-[52%] rounded-full bg-gold/5 blur-[120px]" />
            <div className="absolute bottom-[-12%] left-[-6%] w-[52%] h-[52%] rounded-full bg-emerald-900/5 blur-[120px]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="order-2 lg:order-1">
                <FadeIn delay={0.1}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-px w-12 bg-gold" />
                    <span className="text-gold font-sans text-[11px] md:text-xs font-bold tracking-[0.2em] uppercase">
                      Personalized Italy Travel Help
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <h1
                    className="text-5xl md:text-5xl lg:text-6xl font-serif text-emerald-900 leading-[1.05] mb-5"
                    data-testid="text-trip-review-headline"
                  >
                    The Italy Trip Review&trade;
                  </h1>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <p
                    className="font-serif italic text-2xl md:text-2xl text-emerald-900/75 leading-snug mb-6"
                    data-testid="text-trip-review-subheadline"
                  >
                    You planned the trip. Now give it a second set of
                    experienced eyes.
                  </p>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <p className="text-lg md:text-base text-charcoal/75 font-sans font-light leading-relaxed mb-8 max-w-xl">
                    Before you get on the plane, we&rsquo;ll personally review
                    your Italy itinerary for pacing, routing, timing, logistics,
                    missed opportunities, and the little decisions that can make
                    the difference between simply seeing Italy and actually
                    experiencing it.
                  </p>
                </FadeIn>

                <FadeIn delay={0.5}>
                  <ReviewCta
                    label="Review My Italy Trip"
                    testId="button-hero-review-my-trip"
                    className="w-full sm:w-auto"
                  />
                </FadeIn>
              </div>

              <div className="order-1 lg:order-2">
                <FadeIn delay={0.3} direction="left">
                  <figure className="max-w-[440px] mx-auto lg:max-w-none">
                    <div className="relative rounded-sm overflow-hidden ring-1 ring-gold/25 shadow-[0_30px_70px_-30px_rgba(28,42,34,0.45)]">
                      <div className="aspect-[5/6] md:aspect-[4/5] w-full">
                        <img
                          src="/italy-trip-review-hero.png"
                          alt="A printed Italy Trip Review on a marble table — a 10-day Rome, Florence and Venice itinerary marked up with Keep, Change and Consider notes, beside an espresso and an Italian passport."
                          className="w-full h-full object-cover [object-position:76%_center]"
                          loading="eager"
                          decoding="async"
                          data-testid="img-trip-review-sample"
                        />
                      </div>
                      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-ivory/20" />
                    </div>
                    <figcaption className="mt-3 text-center font-sans text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-charcoal/45">
                      A sample review &mdash; Rome &middot; Florence &middot;
                      Venice, 10 days
                    </figcaption>
                  </figure>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ── YOU'VE ALREADY DONE THE HARD PART ────────────────── */}
        <section
          className="py-20 md:py-24 bg-ivory-100 border-y border-gold/15"
          data-testid="section-hard-part"
        >
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn delay={0.1}>
              <span className="text-gold font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                You&rsquo;ve Already Done The Hard Part
              </span>
              <GoldRule className="mt-4 mb-6" />
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 leading-tight mb-8">
                Your itinerary is planned. But does it actually work?
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-5 text-lg md:text-base text-charcoal/75 font-sans font-light leading-relaxed">
                <p>
                  You&rsquo;ve researched the cities. Chosen where to stay.
                  Looked at trains, restaurants, attractions, and experiences.
                </p>
                <p>Maybe you&rsquo;ve already planned almost every day.</p>
                <p>
                  But there&rsquo;s one question that&rsquo;s difficult to
                  answer from behind a screen:
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <blockquote className="my-9 pl-6 border-l-2 border-gold">
                <p
                  className="font-serif italic text-3xl md:text-4xl text-emerald-900 leading-snug"
                  data-testid="text-core-question"
                >
                  Does this trip actually make sense once you&rsquo;re in Italy?
                </p>
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-lg md:text-base text-charcoal/75 font-sans font-light leading-relaxed">
                The Italy Trip Review&trade; gives your itinerary a personalized
                second look before you go.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── WHAT WE REVIEW ──────────────────────────────────── */}
        <section
          className="py-20 md:py-28 bg-paper"
          data-testid="section-what-we-review"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <FadeIn delay={0.1}>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-8 bg-gold" />
                  <span className="text-gold font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                    What We Review
                  </span>
                  <div className="h-px w-8 bg-gold" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 leading-tight">
                  Seven lenses on your itinerary
                </h2>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
              {reviewPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <FadeIn key={pillar.label} delay={0.06 * i}>
                    <div
                      className="flex gap-5 py-6 border-b border-gold/15"
                      data-testid={`pillar-${pillar.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-ivory-100">
                          <Icon className="w-[18px] h-[18px] text-gold-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-900 mb-2">
                          {pillar.label}
                        </h3>
                        <p className="text-base md:text-[15px] text-charcoal/70 font-sans font-light leading-relaxed">
                          {pillar.copy}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU RECEIVE ────────────────────────────────── */}
        <section
          className="py-20 md:py-28 bg-emerald-950 text-ivory"
          data-testid="section-what-you-receive"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <FadeIn delay={0.1}>
                <div className="flex items-center justify-center gap-4 mb-5">
                  <div className="h-px w-8 bg-gold/60" />
                  <span className="text-gold font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                    What You Receive
                  </span>
                  <div className="h-px w-8 bg-gold/60" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-serif text-ivory leading-tight">
                  A clear second opinion&mdash;not another generic itinerary.
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-6 text-lg md:text-base text-ivory/65 font-sans font-light leading-relaxed max-w-2xl mx-auto">
                  Every review is written for your trip and organized into three
                  plain-English sections, so you know exactly what to leave
                  alone and exactly what to fix.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {deliverables.map((item, i) => (
                <FadeIn key={item.label} delay={0.1 * i}>
                  <div
                    className="h-full bg-ivory rounded-sm p-7 border border-gold/25"
                    data-testid={`deliverable-${item.label.toLowerCase()}`}
                  >
                    <div className={`h-[3px] w-10 mb-5 ${item.rule}`} />
                    <h3
                      className={`font-sans text-xs font-bold uppercase tracking-[0.22em] mb-3 ${item.accent}`}
                    >
                      {item.label}
                    </h3>
                    <p className="text-[15px] text-charcoal/70 font-sans font-light leading-relaxed">
                      {item.copy}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2}>
              <div className="border border-gold/30 rounded-sm p-8 md:p-10 text-center bg-emerald-900/40">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-gold mb-4">
                  Plus
                </p>
                <p
                  className="font-serif text-3xl md:text-4xl text-ivory leading-snug"
                  data-testid="text-top-five"
                >
                  Your Top 5 Recommendations Before You Go
                </p>
                <div className="mx-auto mt-6 h-px w-20 bg-gold/40" />
                <p className="mt-6 text-[15px] text-ivory/60 font-sans font-light leading-relaxed max-w-xl mx-auto">
                  Delivered digitally within 3 business days after we receive
                  your completed itinerary and questionnaire.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── WHY THIS IS DIFFERENT ───────────────────────────── */}
        <section
          className="py-20 md:py-28 bg-paper"
          data-testid="section-why-different"
        >
          <div className="max-w-3xl mx-auto px-6">
            <FadeIn delay={0.1}>
              <span className="text-gold font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                Why This Is Different
              </span>
              <GoldRule className="mt-4 mb-6" />
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 leading-tight mb-8">
                Why not just ask ChatGPT or Reddit?
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-5 text-lg md:text-base text-charcoal/75 font-sans font-light leading-relaxed">
                <p>
                  You absolutely can&mdash;and both can be useful starting
                  points.
                </p>
                <p className="font-serif italic text-2xl md:text-[26px] text-emerald-900/85 py-1">
                  The difference is perspective.
                </p>
                <p>
                  The Italy Insider Protocol&trade; was created from years of
                  returning to Italy not simply as a tourist, but through
                  Italian family, local routines, and firsthand experience of how
                  Italy actually feels when you&rsquo;re not rushing from
                  attraction to attraction.
                </p>
                <p>
                  The Italy Trip Review&trade; applies that perspective directly
                  to your specific trip.
                </p>
                <p>
                  AI can generate suggestions. Reddit can give you opinions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 border-t border-b border-gold/30 py-9 text-center">
                <p
                  className="font-serif text-3xl md:text-4xl lg:text-[42px] text-emerald-900 leading-[1.15]"
                  data-testid="text-differentiator"
                >
                  We give your specific itinerary a second set of experienced
                  eyes.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOUNDING CUSTOMER OFFER ─────────────────────────── */}
        <section
          id="offer"
          className="py-20 md:py-28 bg-ivory-100 border-y border-gold/15"
          data-testid="section-founding-offer"
        >
          <div className="max-w-2xl mx-auto px-6">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-sm border border-gold/30 shadow-xl overflow-hidden">
                <div className="h-[3px] w-full bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

                <div className="p-8 md:p-12">
                  <div className="text-center">
                    <span className="inline-block font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold-600 border border-gold/40 bg-gold/10 rounded-full px-4 py-1.5">
                      Founding Customer Offer
                    </span>

                    <h2 className="mt-7 font-serif text-4xl md:text-5xl text-emerald-900 leading-tight">
                      The Italy Trip Review&trade;
                    </h2>

                    <div className="mt-7 flex flex-col items-center">
                      <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-charcoal/45">
                        Founding Customer Price
                      </span>
                      <span
                        className="font-serif text-6xl md:text-7xl text-emerald-900 leading-none mt-2"
                        data-testid="text-trip-review-price"
                      >
                        $79
                      </span>
                    </div>

                    <p
                      className="mt-5 font-sans text-[13px] font-medium tracking-wide text-[#C0562F]"
                      data-testid="text-limited-to-five"
                    >
                      Limited to the first 5 reviews.
                    </p>
                  </div>

                  <div className="my-9 h-px w-full bg-gold/20" />

                  <ul className="space-y-4">
                    {offerIncludes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3"
                        data-testid={`include-${item
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")}`}
                      >
                        <Check className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                        <span className="text-[15px] md:text-base text-charcoal/75 font-sans font-light leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <ReviewCta
                      label="Review My Italy Trip — $79"
                      testId="button-offer-review-my-trip"
                      className="w-full"
                    />
                    <p className="mt-4 text-center font-sans text-xs text-charcoal/45 font-light leading-relaxed">
                      After checkout you&rsquo;ll receive a short questionnaire
                      and a link to send your itinerary.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-24 max-w-3xl mx-auto px-6"
          data-testid="section-trip-review-faq"
        >
          <div className="text-center mb-12">
            <FadeIn delay={0.1}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-8 bg-gold" />
                <span className="text-gold font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                  Common Questions
                </span>
                <div className="h-px w-8 bg-gold" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-serif text-emerald-900 leading-tight">
                Before you book
              </h2>
            </FadeIn>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <FadeIn key={faq.q} delay={0.06 * index}>
                  <div className="border border-gold/20 bg-white rounded-sm overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      data-testid={`button-trip-faq-${index}`}
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-xl md:text-lg text-emerald-900 pr-4">
                        {faq.q}
                      </span>
                      <span className="text-gold shrink-0">
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
                            className="px-6 pb-6 text-base md:text-[15px] text-charcoal/70 font-sans font-light leading-relaxed"
                            data-testid={`text-trip-faq-answer-${index}`}
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

        {/* ── COMING SOON ─────────────────────────────────────── */}
        <section
          className="pb-24 max-w-3xl mx-auto px-6"
          data-testid="section-coming-soon"
        >
          <FadeIn delay={0.1}>
            <div className="rounded-sm border border-dashed border-gold/40 bg-paper p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="md:pr-8">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                    Coming Soon
                  </span>
                  <h3 className="mt-3 font-serif text-3xl md:text-[34px] text-emerald-900 leading-tight">
                    The Italy Pronunciation Lab&trade;
                  </h3>
                  <p className="mt-4 text-base md:text-[15px] text-charcoal/70 font-sans font-light leading-relaxed">
                    A live, small-group experience for travelers who want to
                    practice saying the Italian they&rsquo;ll actually use on
                    their trip with greater confidence.
                  </p>
                  <p className="mt-3 font-sans text-[13px] tracking-wide text-emerald-900/70">
                    Maximum 5 travelers per session.
                  </p>
                </div>

                <div className="shrink-0">
                  <a
                    href={WAITLIST_MAILTO}
                    className="inline-flex items-center justify-center w-full md:w-auto border border-emerald-900/30 text-emerald-900 hover:bg-emerald-900 hover:text-ivory px-7 py-4 rounded-sm font-sans text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300"
                    data-testid="button-join-priority-list"
                  >
                    Join the Priority List
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </>
  );
}
