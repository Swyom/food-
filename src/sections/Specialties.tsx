import React from 'react';
import { Sparkles, Check, Plus } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data';
// @ts-ignore
import { SubscriptionPlan } from '../types';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnet } from '../components/Magnet';

interface SpecialtiesProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onSelectPlan }) => {
  const plans = SUBSCRIPTION_PLANS;

  return (
    <section id="subscriptions" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-amber-500" />
              <span className="font-sans text-xs tracking-[0.3em] text-amber-500 font-semibold uppercase">
                OUR SUBSCRIPTIONS
              </span>
              <span className="w-6 h-[1px] bg-amber-500" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-4">
              Monthly Subscription Plans
            </h2>

            <p className='text-neutral-400 text-sm tracking-wider pb-4 max-w-xl mx-auto'>
              Subscribe to our monthly plans and enjoy exclusive premium dishes, discounts, and priority delivery options.
            </p>
            
            <div className="flex justify-center items-center gap-2">
              <div className="h-[1px] w-12 bg-neutral-800" />
              <span className="text-amber-500 text-sm font-serif">❦</span>
              <div className="h-[1px] w-12 bg-neutral-800" />
            </div>
          </AnimatedSection>
        </div>

        {/* Subscription Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <AnimatedSection
              key={plan.id}
              animation="fade-up"
              duration={0.7}
              delay={0.05 + (i % 3) * 0.12}
              className="h-full"
            >
              <div 
                className={`bg-neutral-950 border ${
                  plan.isPopular ? 'border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'border-neutral-900'
                } rounded-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.01]`}
                id={`plan-${plan.id}`}
              >
                {/* Card Image Cover Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Popular Pill */}
                  {plan.isPopular && (
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="bg-amber-500 text-neutral-950 font-bold font-sans text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* Savings Percent Badge */}
                  {plan.savingsPercent > 0 && (
                    <div className="absolute bottom-4 right-4 z-10 pointer-events-none bg-neutral-950/80 backdrop-blur-md border border-neutral-800/80 py-1 px-2.5 rounded-full text-[9px] text-amber-400 font-sans font-bold">
                      SAVE {plan.savingsPercent}%
                    </div>
                  )}
                </div>

                {/* Card Body - Flex Container splits top content and bottom buttons perfectly */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  
                  {/* Top Block: Title, Subtitle, and Features */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-serif text-xl font-bold text-center text-white tracking-wide mb-2 group-hover:text-amber-500 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="font-sans text-neutral-400 text-center text-xs font-light leading-relaxed mb-6 px-2 min-h-[36px]">
                      {plan.description}
                    </p>

                    <div className="h-[1px] w-full bg-neutral-900 mb-6" />

                    {/* Features List Wrapper - Centers the list block while keeping text neat & left-aligned */}
                    <div className="flex-1 flex items-start justify-center mb-8">
                      <ul className="space-y-3.5 max-w-xs w-full px-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light leading-snug">
                            <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Block: Aligned Price and Interactive Actions */}
                  <div className="pt-4 border-t border-neutral-900/50 mt-auto">
                    <div className="text-center mb-4">
                      <span className="font-serif text-amber-500 text-2xl font-bold tracking-wider">
                        ${plan.price.toFixed(2)}
                      </span>
                      <span className="text-neutral-500 font-sans text-xs lowercase"> / mo</span>
                    </div>

                    {/* Full Width Magnet Component Alignment */}
                    <div className="w-full flex justify-center">
                      <Magnet range={20} className="w-full">
                        <button
                          onClick={() => onSelectPlan(plan)}
                          className="w-full py-3 px-4 border border-amber-500/20 group-hover:border-amber-500/80 group-hover:bg-amber-500 text-amber-500 group-hover:text-neutral-950 font-sans font-bold text-[10px] tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          SUBSCRIBE NOW
                        </button>
                      </Magnet>
                    </div>
                  </div>

                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
      </div>
    </section>
  );
};