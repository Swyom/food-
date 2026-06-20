import { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, CheckCircle } from 'lucide-react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { AboutUs } from './sections/AboutUs';
import { Specialties } from './sections/Specialties';
import { Gallery } from './sections/Gallery';
import { Reservation } from './sections/Reservation';
import { Reviews } from './sections/Reviews';
import { Footer } from './sections/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Dish } from './types';

interface CartItem {
  dish: Dish;
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Real-time toast states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Cart operations
  const handleAddToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.dish.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { dish, quantity: 1 }];
    });

    // Trigger feedback notification
    setToastMessage(`"${dish.name}" added to your gourmet order.`);
    setShowToast(true);
  };

  const handleUpdateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(dishId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Auto-expire notification banner
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleScrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Dynamic Glow Cursor overlay (subtle fine-dining highlight) */}
      <div className="pointer-events-none fixed -inset-px z-50 overflow-hidden opacity-30 sm:block hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Floating Add-to-Cart Toast */}
      {showToast && toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-neutral-950 border border-amber-500/30 text-white p-4 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3 animate-slide-left">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 shrink-0">
              <CheckCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="font-sans text-xs text-neutral-200 leading-relaxed font-light">
                {toastMessage}
              </p>
              <button
                onClick={() => {
                  setShowToast(false);
                  setIsCartOpen(true);
                }}
                className="text-[10px] text-amber-500 font-sans font-semibold tracking-wider uppercase mt-1 hover:underline cursor-pointer"
              >
                View Order tray
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-neutral-500 hover:text-white font-sans text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Interactive Floater Cart Trigger (visible when items are present and drawer is hidden) */}
      {cartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold p-4 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 group transition-transform duration-300"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2.5 -right-2.5 bg-neutral-950 text-amber-500 border border-amber-500/20 font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="font-sans text-xs max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold tracking-wider uppercase">
            VIEW ORDER
          </span>
        </button>
      )}

      {/* 1. Header Navigation */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartItemsCount={cartCount} />

      {/* 2. Hero Landing Fold */}
      <Hero onExploreMenu={handleScrollToMenu} />

      {/* 3. About Us Heritage Block */}
      <AboutUs />

      {/* 4. Specialties Active Dining Menu */}
      <Specialties onAddToCart={handleAddToCart} />

      {/* 5. Impressive Gallery Visual Panel */}
      <Gallery />

      {/* 6. Reservation Seating Booker */}
      <Reservation />

      {/* 7. Reviews Customer Opinion Slider */}
      <Reviews />

      {/* 8. Footer Contacts & Hours */}
      <Footer />

      {/* 9. Interactive Order Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
