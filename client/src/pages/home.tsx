import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Hero } from "@/components/Hero";
import { SocialProofBar } from "@/components/SocialProofBar";
import { OpeningHook } from "@/components/OpeningHook";
import { Problem } from "@/components/Problem";
import { InsideVersionTwo } from "@/components/InsideVersionTwo";
import { WhyFailed } from "@/components/WhyFailed";
import { Mechanism } from "@/components/Mechanism";
import { WhatYouGet } from "@/components/WhatYouGet";
import { WhoFor } from "@/components/WhoFor";
import { HowItWorks } from "@/components/HowItWorks";
import { Proof } from "@/components/Proof";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ValueStack } from "@/components/ValueStack";
import { Footer } from "@/components/Footer";
import { RecentPurchaseToast } from "@/components/RecentPurchaseToast";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <main>
        <Hero />
        <SocialProofBar />
        <OpeningHook />
        <Problem />
        <InsideVersionTwo />
        <WhyFailed />
        <Mechanism />
        <WhatYouGet />
        <WhoFor />
        <HowItWorks />
        <Proof />
        <Testimonials />
        <FAQ />
        <ValueStack />
      </main>
      <Footer />
      <RecentPurchaseToast />
    </>
  );
}
