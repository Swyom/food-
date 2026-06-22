import React from "react";
import { ChevronsDown } from "lucide-react";
import { SplitText } from "../components/SplitText";
import { Magnet } from "../components/Magnet";

interface HeroProps {
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background Image with Zoom and Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_steak_gourmet_1781958560784.jpg"
          alt="Gourmet Dining Background"
          className="w-full h-full object-cover scale-105 filter brightness-45 contrast-105 transform-gpu"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant radial/linear black gradients */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/70 to-neutral-950/95" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Sub-label banner */}
        <div className="mb-4 overflow-hidden">
          <span className="block font-sans text-xs tracking-[0.4em] uppercase text-amber-500/90 font-medium animate-pulse">
            ✦ HIGH-END GASTRONOMY EXPERIENCE ✦
          </span>
        </div>

        {/* Good Food */}
        <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-amber-500/90 tracking-wide mb-1 leading-none font-medium">
          <SplitText
            text="Good Food"
            duration={1.2}
            delay={0.2}
            stagger={0.05}
          />
        </h2>

        {/* GOOD MOOD */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-widest uppercase leading-tight mb-6 select-none">
          <SplitText
            text="GOOD MOOD"
            duration={1.5}
            delay={0.6}
            stagger={0.06}
          />
        </h1>

        {/* Line divider with Crossed Fork/Knife or elegant icon */}
        <div
          className="flex items-center gap-4 mb-6 w-full max-w-sm justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent to-amber-500/50 flex-1" />
          <span className="text-amber-500/80 text-xl font-serif">⚜</span>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-amber-500/50 flex-1" />
        </div>

        {/* Description */}
        <p
          className="font-sans text-sm sm:text-base text-neutral-300 max-w-xl mb-10 leading-relaxed font-light tracking-wide opacity-0 animate-slide-up"
          style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
        >
          Welcome to Ayushman’s Kitchen, where every meal is made to bring you
          the comfort of ghar ka khana even on your busiest days. Whether you’re
          a college student missing home, a working professional with no time to
          cook, or someone simply craving fresh, wholesome food, we serve
          homestyle meals prepared with care, warmth, and the familiar taste of
          home
        </p>

        {/* Action Button */}
        <div
          className="opacity-0 animate-slide-up"
          style={{ animationDelay: "1.7s", animationFillMode: "forwards" }}
        >
          <Magnet range={35} sensitivity={0.35}>
            <button
              onClick={onExploreMenu}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-[0.2em] rounded-md transition-all uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] cursor-pointer"
            >
              EXPLORE OUR MENU
            </button>
          </Magnet>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        onClick={onExploreMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer group opacity-0 animate-fade-in"
        style={{ animationDelay: "2.1s", animationFillMode: "forwards" }}
      >
        <span className="font-sans text-[9px] tracking-[0.3em] text-neutral-500 uppercase font-medium group-hover:text-amber-500 transition-colors">
          SCROLL TO EXPLORE
        </span>
        <ChevronsDown className="w-5 h-5 text-neutral-500 group-hover:text-amber-500 group-hover:translate-y-1 transition-all duration-300 animate-bounce" />
      </div>
    </section>
  );
};
