import React, { useState } from 'react';
import { Maximize2, ExternalLink, X } from 'lucide-react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnet } from '../components/Magnet';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'dishes' | 'interior' | 'atmosphere'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filteredPhotos = GALLERY.filter(
    (photo) => activeTab === 'all' || photo.category === activeTab
  );

  const tabs = [
    { label: 'ALL IMAGES', value: 'all' },
    { label: 'OUR DISHES', value: 'dishes' },
    { label: 'RESTAURANT INTERIOR', value: 'interior' },
    { label: 'ATMOSPHERE', value: 'atmosphere' },
  ] as const;

  return (
    <section id="gallery" className="py-24 bg-neutral-900 border-t border-b border-neutral-800 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <AnimatedSection animation="fade-up" delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-amber-500" />
              <span className="font-sans text-xs tracking-[0.3em] text-amber-500 font-semibold uppercase">
                GALLERY
              </span>
              <span className="w-6 h-[1px] bg-amber-500" />
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6">
              Moments of <span className="font-serif italic text-amber-500">Fine Dining</span>
            </h2>

            {/* Gallery Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-xl mx-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer font-sans ${
                    activeTab === tab.value
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  {tab.label.replace('OUR ', '').replace('RESTAURANT ', '')}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, i) => (
            <AnimatedSection
              key={photo.id}
              animation="fade-up"
              duration={0.6}
              delay={0.05 + (i % 3) * 0.12}
            >
              <div
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-video sm:aspect-square overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800 group cursor-pointer shadow-lg hover:border-amber-500/40 transition-all duration-300 transform-gpu"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-95 saturate-[0.95] group-hover:saturate-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-x-0 bottom-0 top-0 h-full bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] tracking-widest font-sans font-semibold text-amber-500 uppercase block mb-1">
                      {photo.category}
                    </span>
                    <p className="font-sans text-xs text-neutral-200 font-light mb-3 line-clamp-2">
                      {photo.caption}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-sans font-bold tracking-widest uppercase">
                      <Maximize2 className="w-3.5 h-3.5" />
                      ENLARGE VIEW
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/95 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full flex flex-col gap-4">
            
            {/* Top Close Bar */}
            <div className="flex justify-between items-center text-neutral-400">
              <span className="text-xs tracking-wider capitalize font-sans">
                Category: <strong className="text-amber-500">{selectedPhoto.category}</strong>
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 hover:text-white bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Image Frame */}
            <div className="relative border border-neutral-800 p-2 bg-neutral-950 rounded-2xl overflow-hidden max-h-[70vh] flex items-center justify-center shadow-2xl">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[66vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lower Caption Frame */}
            <div className="text-center p-4 bg-neutral-950 border border-neutral-900 rounded-xl">
              <p className="font-serif italic text-amber-500 text-lg leading-relaxed">
                "{selectedPhoto.caption}"
              </p>
              <span className="inline-block h-1 w-8 bg-neutral-800 mt-2 rounded" />
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
