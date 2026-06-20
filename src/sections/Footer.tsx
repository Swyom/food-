import React from 'react';
import { ChefHat, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Magnet } from '../components/Magnet';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8 relative overflow-hidden">
      
      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
        
        {/* Branch 1: Branding block */}
        <div className="md:col-span-4 flex flex-col justify-start">
          <div
            onClick={handleScrollToTop}
            className="flex items-center gap-2 mb-4 cursor-pointer group w-fit"
          >
            <div className="p-2 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-all">
              <ChefHat className="text-amber-500 w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-wider text-amber-500 block font-bold">
                Flavoro
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 block -mt-1 font-sans">
                RESTAURANT
              </span>
            </div>
          </div>
          <p className="font-sans text-neutral-400 text-xs leading-relaxed mb-6 font-light max-w-sm">
            Experience the culinary apex of luxury fine dining. Flavoro features bespoke seating allotments, premium organic harvests, and a wine list curated by master sommeliers.
          </p>
          
          {/* Social icons */}
          <div className="flex gap-4">
            <Magnet range={15}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-400 hover:text-white rounded-full transition-colors inline-block"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </Magnet>
            <Magnet range={15}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-400 hover:text-white rounded-full transition-colors inline-block"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </Magnet>
          </div>
        </div>

        {/* Branch 2: Operational Timing */}
        <div className="md:col-span-4">
          <h4 className="font-serif text-white font-bold text-sm tracking-widest uppercase mb-4 pb-1 border-b border-neutral-900 w-fit">
            OPERATING HOURS ⏱️
          </h4>
          <ul className="space-y-3 font-sans text-xs text-neutral-400 font-light leading-relaxed">
            <li className="flex justify-between border-b border-neutral-900/50 pb-2">
              <span>Monday — Friday</span>
              <strong className="text-neutral-200">11:30 AM — 10:00 PM</strong>
            </li>
            <li className="flex justify-between border-b border-neutral-900/50 pb-2">
              <span>Saturday</span>
              <strong className="text-neutral-200">12:00 PM — 11:00 PM</strong>
            </li>
            <li className="flex justify-between pb-2">
              <span>Sunday (Brunch & Dinner)</span>
              <strong className="text-neutral-200">10:30 AM — 9:00 PM</strong>
            </li>
          </ul>
        </div>

        {/* Branch 3: Contact Details & Location */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-serif text-white font-bold text-sm tracking-widest uppercase mb-2 pb-1 border-b border-neutral-900 w-fit">
            VISIT THE SANCTUARY
          </h4>
          <div className="space-y-3 font-sans text-xs text-neutral-400 font-light">
            <div className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>188 Gastronomy Blvd, Metropia, NY 10012, USA</span>
            </div>
            
            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+1 (555) 794-0200</span>
            </div>

            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>reservations@flavoro.com</span>
            </div>
          </div>
        </div>

      </div>

      {/* Under copyright block */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-900 text-center font-sans text-[10px] text-neutral-500 tracking-wider flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {currentYear} Flavoro Restaurant. All rights gourmet reserved. Dedicated to fine-dining enthusiasts.</p>
        <p className="flex gap-4">
          <span className="hover:text-amber-500 transition-colors cursor-pointer">Privacy Statement</span>
          <span className="hover:text-amber-500 transition-colors cursor-pointer">Sourcing Policy</span>
        </p>
      </div>

    </footer>
  );
};
