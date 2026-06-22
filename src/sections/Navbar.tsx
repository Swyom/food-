import React, { useState, useEffect } from 'react';
import { ChefHat, Menu, X, ShoppingBag, User as UserIcon, LogOut } from 'lucide-react';
import { Magnet } from '../components/Magnet';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenCart: () => void;
  cartItemsCount: number;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, cartItemsCount, onOpenAuth }) => {
  const [navBackground, setNavBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'HOME', target: 'home' },
    { name: 'ABOUT US', target: 'about' },
    { name: 'SUBSCRIPTIONS', target: 'subscriptions' },
    { name: 'GALLERY', target: 'gallery' },
    { name: 'RESERVATION', target: 'reservation' },
    { name: 'REVIEWS', target: 'reviews' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          navBackground
            ? 'bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 shadow-lg py-4'
            : 'bg-gradient-to-b from-black/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-all">
              <ChefHat className="text-amber-500 w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-wider text-amber-500 block font-bold">
                Ayushman's 
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 block -mt-1 font-sans">
                Kitchen
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnet key={link.name} range={25} sensitivity={0.25}>
                <button
                  onClick={() => scrollToSection(link.target)}
                  className="text-xs tracking-widest text-neutral-300 hover:text-amber-500 transition-colors cursor-pointer font-sans font-medium"
                >
                  {link.name}
                </button>
              </Magnet>
            ))}
          </div>

          {/* Interactive Actions */}
          <div className="hidden lg:flex items-center gap-4">
            
            {user ? (
              <div className="flex items-center gap-3 mr-2">
                <div className="text-right">
                  <p className="text-xs font-semibold text-amber-500">{profile?.name || 'User'}</p>
                  <button onClick={logout} className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider">Logout</button>
                </div>
              </div>
            ) : (
              <Magnet range={20}>
                <button
                  onClick={onOpenAuth}
                  className="p-2.5 text-neutral-300 hover:text-amber-500 transition-colors bg-neutral-900 border border-neutral-800 rounded-full cursor-pointer flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" />
                </button>
              </Magnet>
            )}

            {/* Cart Icon Toggle
            <Magnet range={20}>
              <button
                onClick={onOpenCart}
                className="relative p-2.5 text-neutral-300 hover:text-amber-500 transition-colors bg-neutral-900 border border-neutral-800 rounded-full cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </Magnet> */}

            {/* Book table */}
            <Magnet range={30} sensitivity={0.3}>
              <button
                onClick={() => scrollToSection('reservation')}
                className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-widest px-6 py-3 rounded-md transition-all shadow-md active:scale-95 cursor-pointer font-sans"
              >
                BOOK YOUR MEAL  
              </button>
            </Magnet>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            {!user ? (
              <button
                onClick={onOpenAuth}
                className="p-2.5 text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-full"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={logout}
                className="p-2.5 text-amber-500 bg-neutral-900 border border-neutral-800 rounded-full"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-full"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-neutral-300 hover:text-amber-500 transition-colors bg-neutral-900 border border-neutral-800 rounded-full"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col justify-between p-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChefHat className="text-amber-500 w-6 h-6" />
              <div>
                <span className="font-serif text-xl tracking-wider text-amber-500 block font-bold">
                  Flavoro
                </span>
                <span className="text-[10px] tracking-widest text-neutral-400 block -mt-1 font-sans">
                  RESTAURANT
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 my-auto">
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.target)}
                className="text-lg tracking-widest text-neutral-100 hover:text-amber-500 font-sans font-medium transition-all"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('reservation');
              }}
              className="bg-amber-500 text-neutral-950 font-sans font-bold text-center tracking-widest p-4 rounded-md w-full"
            >
              BOOK A TABLE
            </button>
            <p className="text-center font-sans text-xs text-neutral-500">
              For inquiries: reservations@flavoro.com
            </p>
          </div>
        </div>
      )}
    </>
  );
};
