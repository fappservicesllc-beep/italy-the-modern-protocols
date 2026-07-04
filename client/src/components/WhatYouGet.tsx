import { FadeIn } from "./ui/FadeIn";
import { SectionHeader } from "./ui/SectionHeader";
import {
  BookOpenIcon,
  HeadphonesIcon,
  HeartPulseIcon,
  ScrollIcon,
} from "lucide-react";

const deliverables = [
  {
    icon: BookOpenIcon,
    title: "The Italy Insider Protocol eBook",
    desc: "The complete 6-chapter tactical manual covering first impressions, transit, dining, and emergencies.",
  },
  {
    icon: HeadphonesIcon,
    title: 'The "High-Status" Audio Masterclass',
    desc: '48 minutes of "concierge-style" training you can listen to on the plane to lock in your tone and confidence.',
  },
  {
    icon: HeartPulseIcon,
    title: "The Emergency & Pharmacy Cheat Sheet",
    desc: 'Exactly what to say to get medical help fast without the "foreigner" confusion.',
  },
  {
    icon: ScrollIcon,
    title: 'The "No-Tax" Script Vault',
    desc: "Word-for-word scripts for taxis, hotels, and restaurants to ensure you get fair, local-level pricing.",
  },
];

export function WhatYouGet() {
  return (
    <section
      className="py-24 max-w-6xl mx-auto px-6"
      data-testid="section-what-you-get"
    >
      <SectionHeader
        eyebrow="What You Get"
        title="The Complete Protocol"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {deliverables.map((item, index) => {
          const Icon = item.icon;
          return (
            <FadeIn key={index} delay={0.1 * index} direction="up">
              <div
                className="bg-white p-8 border border-gold/20 rounded-sm hover:border-gold/50 transition-colors h-full flex flex-col items-center text-center group"
                data-testid={`card-deliverable-${index}`}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-900 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-emerald-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-lg md:text-base text-charcoal/70 font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
