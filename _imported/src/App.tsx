import React from 'react';
import { Hero } from './components/Hero';
import { OpeningHook } from './components/OpeningHook';
import { Problem } from './components/Problem';
import { WhyFailed } from './components/WhyFailed';
import { Mechanism } from './components/Mechanism';
import { WhatYouGet } from './components/WhatYouGet';
import { WhoFor } from './components/WhoFor';
import { HowItWorks } from './components/HowItWorks';
import { Proof } from './components/Proof';
import { FAQ } from './components/FAQ';
import { Offer } from './components/Offer';
import { Footer } from './components/Footer';
export function App() {
  return (
    <div className="min-h-screen bg-ivory selection:bg-gold/30 selection:text-emerald-900">
      <main>
        <Hero />
        <OpeningHook />
        <Problem />
        <WhyFailed />
        <Mechanism />
        <WhatYouGet />
        <WhoFor />
        <HowItWorks />
        <Proof />
        <FAQ />
        <Offer />
      </main>
      <Footer />
    </div>);

}