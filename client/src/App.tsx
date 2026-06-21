import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Hero } from "@/components/Hero";
import { SocialProofBar } from "@/components/SocialProofBar";
import { OpeningHook } from "@/components/OpeningHook";
import { Problem } from "@/components/Problem";
import { WhyFailed } from "@/components/WhyFailed";
import { Mechanism } from "@/components/Mechanism";
import { WhatYouGet } from "@/components/WhatYouGet";
import { WhoFor } from "@/components/WhoFor";
import { HowItWorks } from "@/components/HowItWorks";
import { Proof } from "@/components/Proof";
import { FAQ } from "@/components/FAQ";
import { ValueStack } from "@/components/ValueStack";
import { Footer } from "@/components/Footer";
import { RecentPurchaseToast } from "@/components/RecentPurchaseToast";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory selection:bg-gold/30 selection:text-emerald-900">
      <AnnouncementBar />
      <main className="pt-10 md:pt-10">
        <Hero />
        <SocialProofBar />
        <OpeningHook />
        <Problem />
        <WhyFailed />
        <Mechanism />
        <WhatYouGet />
        <WhoFor />
        <HowItWorks />
        <Proof />
        <FAQ />
        <ValueStack />
      </main>
      <Footer />
      <RecentPurchaseToast />
    </div>
  );
}
