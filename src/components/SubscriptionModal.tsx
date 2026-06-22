import React, { useState } from 'react';
import { X, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any; // SubscriptionPlan
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, plan }) => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const handleSubscribe = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'subscriptions'), {
        userId: user.uid,
        customerName: profile?.name || user.email,
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        status: 'active',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <>
            <h2 className="mb-2 font-serif text-2xl font-bold text-center text-amber-500">
              Confirm Subscription
            </h2>
            <p className="text-center text-neutral-400 mb-6 text-sm">
              You are subscribing to the <strong className="text-white">{plan.name}</strong> plan.
            </p>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-400 text-sm">Plan</span>
                <span className="text-white font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-400 text-sm">Billing Cycle</span>
                <span className="text-white font-semibold capitalize">{plan.billingCycle}</span>
              </div>
              <div className="flex justify-between items-center border-t border-neutral-800 pt-2 mt-2">
                <span className="text-neutral-400 text-sm">Total per month</span>
                <span className="text-amber-500 font-bold text-lg">${plan.price.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full py-3 font-bold tracking-widest text-neutral-950 uppercase bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Processing...' : 'Confirm & Subscribe'}
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce" />
            <h2 className="font-serif text-2xl font-bold text-white mb-2">Subscribed!</h2>
            <p className="text-neutral-400 text-sm mb-6">
              You are now subscribed to the {plan.name} plan. A confirmation notification has been sent.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-amber-500 text-neutral-950 font-bold tracking-wider uppercase rounded-lg hover:bg-amber-600 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
