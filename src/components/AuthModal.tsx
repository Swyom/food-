import React, { useState } from 'react';
import { X, Mail, Lock, User, MapPin, Phone } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateMobile = (number: string) => {
    // Basic mobile validation: 10 to 15 digits
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        if (onSuccess) onSuccess();
        onClose();
      } else {
        if (!validateMobile(mobile)) {
          setError("Please enter a valid mobile number (10-15 digits).");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          name,
          address,
          mobile,
          email,
          createdAt: new Date().toISOString()
        });

        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-6 font-serif text-3xl font-bold text-center text-amber-500">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-5 h-5 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 text-white bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                  />
                </div>
              </div>
              <div>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3 w-5 h-5 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 text-white bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                  />
                </div>
              </div>
              <div>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3 w-5 h-5 text-neutral-500" />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 text-white bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-5 h-5 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-white bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
              />
            </div>
          </div>

          <div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-5 h-5 text-neutral-500" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-white bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 font-bold tracking-widest text-neutral-950 uppercase bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-neutral-400 hover:text-amber-500 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
