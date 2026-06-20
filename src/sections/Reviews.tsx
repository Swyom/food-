import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '../data';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnet } from '../components/Magnet';

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const activeReview = REVIEWS[activeIndex];

  return (
    <section id="reviews" className="py-24 bg-neutral-900 border-t border-b border-neutral-800 relative overflow-hidden">
      {/* Decorative Blur and Accent vector lines */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-amber-500" />
              <span className="font-sans text-xs tracking-[0.3em] text-amber-500 font-semibold uppercase block">
                TESTIMONIALS
              </span>
              <span className="w-6 h-[1px] bg-amber-500" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Selected Guest Appreciations
            </h2>
          </AnimatedSection>
        </div>

        {/* Carousel slide card */}
        <AnimatedSection animation="scale-in" duration={0.8} delay={0.2}>
          <div className="relative bg-neutral-950 border border-neutral-800/80 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Massive transparent quotes behind content */}
            <Quote className="absolute right-8 top-8 w-32 h-32 text-neutral-800/10 -rotate-12 pointer-events-none" />

            <div className="flex flex-col items-center text-center">
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-6 text-amber-400">
                {Array.from({ length: activeReview.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4.5 h-4.5 fill-amber-400 text-amber-400 animate-pulse" />
                ))}
              </div>

              {/* Review copy */}
              <p className="font-sans text-base sm:text-lg text-neutral-200 font-light leading-relaxed mb-8 max-w-2xl italic">
                "{activeReview.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 text-left">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.author}
                  className="w-12 h-12 rounded-full object-cover border border-amber-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-bold text-white text-base tracking-wide">
                    {activeReview.author}
                  </h4>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500/80 font-semibold">
                    {activeReview.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Slide Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-8 sm:mt-10">
              <Magnet range={15}>
                <button
                  onClick={handlePrev}
                  className="p-3 bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer shadow active:scale-95"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
              </Magnet>

              <div className="flex items-center gap-2 px-2 text-[10px] text-neutral-500 font-sans tracking-widest mt-1">
                <span>{activeIndex + 1}</span>
                <span className="h-[1px] w-4 bg-neutral-800" />
                <span>{REVIEWS.length}</span>
              </div>

              <Magnet range={15}>
                <button
                  onClick={handleNext}
                  className="p-3 bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer shadow active:scale-95"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </Magnet>
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};
