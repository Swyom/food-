import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CheckCircle, RefreshCw, Sparkles, CreditCard } from 'lucide-react';
import { Dish } from '../types';
import { Magnet } from './Magnet';

interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, quantity: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const tax = subtotal * 0.0825; // 8.25% NY restaurant tax
  const serviceCharge = subtotal > 0 ? 3.50 : 0; // Culinary delivery fee / table setup fee
  const total = subtotal + tax + serviceCharge;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);

    setTimeout(() => {
      setCheckingOut(false);
      setOrderId('ORD-' + Math.floor(100000 + Math.random() * 900000));
      setCheckoutComplete(true);
    }, 1800);
  };

  const handleReceived = () => {
    onClearCart();
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden ">
      {/* Background Dim Backdrop */}
      <div 
        onClick={checkingOut ? undefined : onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Drawer Panel Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-850 flex flex-col shadow-2xl h-full justify-between transform transition-transform duration-500 animate-slide-left text-white">
          
          {/* Main header block */}
          <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-lg text-white">Your Gourmet Order</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-white text-neutral-400 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!checkoutComplete ? (
            <>
              {/* Product list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-neutral-950/40">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div 
                      key={item.dish.id} 
                      className="flex gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-850/60 items-center justify-between hover:border-neutral-800 transition-all duration-300 animate-fade-in"
                    >
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-16 h-16 rounded-lg object-cover border border-neutral-800"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-white truncate mb-0.5">{item.dish.name}</h4>
                        <span className="block font-sans text-xs text-amber-500 font-medium mb-2">
                          ${item.dish.price.toFixed(2)} each
                        </span>
                        
                        {/* Adjust indicators */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                            className="p-1 text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                            className="p-1 text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 font-sans gap-3 py-20">
                    <div className="p-4 bg-neutral-900 rounded-full border border-neutral-850/60">
                      <ShoppingBag className="w-8 h-8 text-neutral-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-400">Order tray is empty</p>
                      <p className="text-xs text-neutral-600 mt-1 max-w-[200px]">Add exquisite appetizers or mains directly from specialties menu above.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing list footer */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-neutral-900 border-t border-neutral-850 space-y-4 font-sans">
                  <div className="space-y-2 text-xs text-neutral-400 leading-relaxed">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NY State Tax (8.25%)</span>
                      <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Table Cover / Host Dispatch</span>
                      <span className="text-white font-semibold">${serviceCharge.toFixed(2)}</span>
                    </div>
                    <div className="h-[1px] bg-neutral-800 my-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-white">Grand Total</span>
                      <span className="font-serif font-bold text-amber-500 text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Proceed checkout */}
                  <Magnet range={20} sensitivity={0.3}>
                    <button
                      onClick={handleCheckout}
                      disabled={checkingOut}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow shadow-amber-500/10 active:scale-95"
                    >
                      {checkingOut ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          PROCESSING SECURE SECRETS...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          CONFIRM & PLACE ORDER
                        </>
                      )}
                    </button>
                  </Magnet>
                </div>
              )}
            </>
          ) : (
            // Success view
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-neutral-950">
              <div className="max-w-xs w-full p-6 border border-dashed border-amber-500/40 rounded-2xl bg-neutral-900 relative shadow-2xl mb-8">
                <CheckCircle className="w-14 h-14 text-amber-500 mx-auto mb-4 animate-bounce" />
                <span className="text-[9px] tracking-widest text-amber-500 font-bold block mb-1 uppercase">ORDER DISPATCHED</span>
                <h4 className="font-serif font-bold text-white text-lg mb-2">Sent to Kitchen</h4>
                
                <p className="font-sans text-[11px] text-neutral-400 mb-6 font-light">
                  Our kitchen staff has initiated seasonings for your selects! Follow details below:
                </p>

                <div className="py-3 px-4 bg-neutral-950 rounded-lg text-left text-[11px] space-y-2 text-neutral-300 font-mono mb-4">
                  <div className="flex justify-between">
                    <span>Order Code:</span>
                    <strong className="text-amber-500">{orderId}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Prep Time:</span>
                    <strong className="text-white">~15-20 Mins</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Settled cost:</span>
                    <strong className="text-white">${total.toFixed(2)}</strong>
                  </div>
                </div>

                <p className="text-[10px] text-neutral-500">Barcodes have been transmitted to your priority phone registration.</p>
              </div>

              <Magnet range={15}>
                <button
                  onClick={handleReceived}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs tracking-wider uppercase rounded-md cursor-pointer font-sans duration-300 transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" />
                  TASTY DISCOVERY
                </button>
              </Magnet>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
