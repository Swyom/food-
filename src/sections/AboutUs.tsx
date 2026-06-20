import React, { useState } from 'react';
import { Sparkles, Calendar, Award, ShieldCheck, X } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnet } from '../components/Magnet';

export const AboutUs: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 bg-neutral-900 border-t border-b border-neutral-800 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Descriptive Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatedSection animation="fade-up" delay={0.1}>
              {/* Little Section Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-amber-500" />
                <span className="font-sans text-xs tracking-[0.3em] text-amber-500 font-semibold uppercase">
                  ABOUT US
                </span>
                <span className="w-6 h-[1px] bg-amber-500" />
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6 leading-tight">
                Welcome to <span className="font-serif italic text-amber-500">Flavoro</span>
              </h2>

              {/* Multi-staged prose paragraphs */}
              <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                At Flavoro, we believe that dining is not merely about sustenance, but a fully curated sensory journey. Our culinary approach centers around the celebration of raw ingredients, meticulous presentation techniques, and flavor combinations that excite the palate.
              </p>
              
              <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed mb-8 font-light">
                Led by world-recognized culinary artisans, we operate with an unwavering commitment to sustainable sourcing. Every cut of meat is certified organic, herbs are hand-picked daily from neighborhood glasshouses, and wines are aged to absolute perfection. Here, comfort meets innovation.
              </p>

              {/* Read More button */}
              <div>
                <Magnet range={25}>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-6 py-3 bg-neutral-950 border border-neutral-800 text-amber-500 hover:text-neutral-950 hover:bg-amber-500 hover:border-amber-500 font-bold text-xs tracking-widest uppercase roundedtransition-all cursor-pointer font-sans"
                  >
                    READ OUR STORY
                  </button>
                </Magnet>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Restaurant Interior Visual Panel */}
          <div className="lg:col-span-7 relative">
            <AnimatedSection animation="scale-in" duration={1} delay={0.2}>
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 border border-amber-500/10 rounded-2xl pointer-events-none transform rotate-1 hidden sm:block" />
              
              {/* Main Image Frame */}
              <div className="relative z-10 p-2.5 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden aspect-video transform-gpu hover:scale-[1.01] transition-transform duration-500">
                <img
                  src="/src/assets/images/restaurant_interior_1781958580832.jpg"
                  alt="Cozy Ambient Bistro Dining Room"
                  className="w-full h-full object-cover rounded-xl brightness-90 saturate-[1.05]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded luxury stats banner */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-neutral-950/90 backdrop-blur-md border border-neutral-800/80 rounded-lg flex justify-around items-center gap-4 shadow-xl">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-amber-500 font-serif">15+</span>
                    <span className="block text-[8px] tracking-wider text-neutral-400 uppercase font-sans">YEARS ACTIVE</span>
                  </div>
                  <div className="h-8 w-[1px] bg-neutral-800" />
                  <div className="text-center">
                    <span className="block text-xl font-bold text-amber-500 font-serif">28</span>
                    <span className="block text-[8px] tracking-wider text-neutral-400 uppercase font-sans">MICHELIN MENTIONS</span>
                  </div>
                  <div className="h-8 w-[1px] bg-neutral-800" />
                  <div className="text-center">
                    <span className="block text-xl font-bold text-amber-500 font-serif">100%</span>
                    <span className="block text-[8px] tracking-wider text-neutral-400 uppercase font-sans">ORGANIC FARMED</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>

      {/* Info Modal / Our Heritage */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-neutral-950 border border-neutral-800 max-w-2xl w-full rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white text-neutral-400 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3 animate-spin-slow" />
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                The Heritage of <span className="text-amber-500 italic">Flavoro</span>
              </h3>
              <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Our Journey, Philosophy, and Sourcing</p>
            </div>

            {/* Grid options */}
            <div className="space-y-6 text-neutral-300 text-sm font-light">
              <div className="flex gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800/60">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500 shrink-0 h-fit">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-base mb-1">Epicurean Masters</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Our kitchen is guided by executive chef Alexander Rossi, who spent over a decade refining culinary arts across Florence, Paris, and Tokyo. His designs blend traditional wood grilling with modern culinary molecular science.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800/60">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500 shrink-0 h-fit">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-base mb-1">Ethical Micro-Farm Partnerships</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    We bypass wholesale aggregators. Our seafood is sourced exclusively from certified ocean-friendly dayboats, and we receive our beef cuts directly from pasture-raised organic ranches in the rolling green meadows.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800/60">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500 shrink-0 h-fit">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-white text-base mb-1">Sensory Ambiance Design</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    Designed with raw dark natural walnut, soundproof acoustic architecture, and carefully engineered warmth scales (2200K Kelvin illumination lights) to stimulate deep relaxation and dining conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* Close footer CTA */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setModalOpen(false)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-wider uppercase rounded font-sans cursor-pointer"
              >
                Close & Explore Menu
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
