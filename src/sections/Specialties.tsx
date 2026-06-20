import React, { useState } from 'react';
import { Sparkles, Clock, Star, Plus } from 'lucide-react';
import { DISHES } from '../data';
import { Dish } from '../types';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnet } from '../components/Magnet';

interface SpecialtiesProps {
  onAddToCart: (dish: Dish) => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'drinks'>('all');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(true);

  // Filter logic
  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = activeCategory === 'all' ? true : dish.category === activeCategory;
    const matchesFeatured = showOnlyFeatured ? dish.isPopular : true;
    return matchesCategory && matchesFeatured;
  });

  const categories = [
    { label: 'ALL DISHES', value: 'all' },
    { label: 'STARTERS', value: 'starters' },
    { label: 'MAINS', value: 'mains' },
    { label: 'DESSERTS', value: 'desserts' },
    { label: 'DRINKS', value: 'drinks' },
  ] as const;

  return (
    <section id="menu" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-amber-500" />
              <span className="font-sans text-xs tracking-[0.3em] text-amber-500 font-semibold uppercase">
                OUR SPECIALTIES
              </span>
              <span className="w-6 h-[1px] bg-amber-500" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-4">
              {showOnlyFeatured ? 'Popular Dishes' : 'Explore Full Menu'}
            </h2>
            
            {/* Elegant wavy pattern or divider */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="h-[1px] w-12 bg-neutral-800" />
              <span className="text-amber-500 text-sm font-serif">❦</span>
              <div className="h-[1px] w-12 bg-neutral-800" />
            </div>

            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-neutral-900 border border-neutral-800 rounded-lg mb-8">
              <button
                onClick={() => {
                  setShowOnlyFeatured(true);
                  setActiveCategory('all');
                }}
                className={`px-4 py-2 rounded-md text-xs font-bold font-sans tracking-wider uppercase transition-all cursor-pointer ${
                  showOnlyFeatured
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Featured Specialties
              </button>
              <button
                onClick={() => {
                  setShowOnlyFeatured(false);
                }}
                className={`px-4 py-2 rounded-md text-xs font-bold font-sans tracking-wider uppercase transition-all cursor-pointer ${
                  !showOnlyFeatured
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Full A La Carte Menu
              </button>
            </div>
          </AnimatedSection>

          {/* Categories Tab Bar */}
          <AnimatedSection animation="fade-in" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-3xl mx-auto border-b border-neutral-900 pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] transition-all cursor-pointer font-sans border-b-2 hover:text-amber-500 capitalize ${
                    activeCategory === cat.value
                      ? 'border-amber-500 text-amber-500'
                      : 'border-transparent text-neutral-400 hover:border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish, i) => (
              <AnimatedSection
                key={dish.id}
                animation="fade-up"
                duration={0.7}
                delay={0.05 + (i % 4) * 0.12}
                className="h-full"
              >
                <div 
                  className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.01]"
                  id={`dish-${dish.id}`}
                >
                  <div className="relative aspect-square overflow-hidden bg-neutral-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating stats pills */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                      {dish.isPopular && (
                        <span className="bg-amber-500 text-neutral-950 font-bold font-sans text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                          CHEF'S FAVORITE
                        </span>
                      )}
                      
                      {dish.rating && (
                        <span className="bg-neutral-950/80 backdrop-blur-md text-amber-400 font-bold font-sans text-[9px] px-2 py-1 rounded-full shadow flex items-center gap-1.5 ml-auto border border-neutral-800">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          {dish.rating.toFixed(1)}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-neutral-950/70 backdrop-blur-md border border-neutral-800/50 py-1 px-2.5 rounded-full flex items-center gap-1 text-[9px] text-neutral-300 font-sans font-medium">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {dish.preparationTime || '12 mins'}
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white tracking-wide mb-2 group-hover:text-amber-500 transition-colors">
                        {dish.name}
                      </h3>
                      <p className="font-sans text-neutral-400 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    <div>
                      <span className="block font-serif text-amber-500 text-lg font-bold tracking-wider mb-4">
                        ${dish.price.toFixed(2)}
                      </span>

                      {/* Interactive Button */}
                      <Magnet range={20}>
                        <button
                          onClick={() => onAddToCart(dish)}
                          className="w-full py-2.5 border border-amber-500/20 group-hover:border-amber-500/80 group-hover:bg-amber-500 text-amber-500 group-hover:text-neutral-950 font-sans font-bold text-[10px] tracking-widest uppercase roundedtransition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          ORDER NOW
                        </button>
                      </Magnet>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-neutral-500 font-sans">No dishes found in this category.</p>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
};
