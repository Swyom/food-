import { Dish, Review, GalleryItem } from './types';

// @ts-ignore
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub1',
    name: 'Taste Tester Pack',
    description: 'Perfect for individuals or couples looking to elevate their weekend dining experience with curated chef specials.',
    price: 39.99,
    billingCycle: 'monthly',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    features: [
      '4 premium dishes per month',
      'Standard contactless delivery',
      '10% off any extra single orders',
      'Access to standard menu items'
    ],
    isPopular: false,
    savingsPercent: 5,
    deliveryType: 'standard',
  },
  {
    id: 'sub2',
    name: 'Epicurean Club',
    description: 'Our most popular tier. Designed for food lovers who want a seamless, high-quality dining rotation right at home.',
    price: 79.99,
    billingCycle: 'monthly',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    features: [
      '10 premium dishes per month',
      'Free priority delivery on all items',
      '15% off any extra single orders',
      'Early access to seasonal & popular dishes',
      '1 complimentary dessert per month'
    ],
    isPopular: true,
    savingsPercent: 15,
    deliveryType: 'priority',
  },
  {
    id: 'sub3',
    name: 'Gourmet Connoisseur',
    description: 'The ultimate culinary package. Unlimited premium selections, zero delivery fees, and VIP treatment from our kitchen.',
    price: 149.99,
    billingCycle: 'monthly',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600',
    features: [
      '22 premium dishes per month',
      'Free priority VIP delivery window',
      '25% off any extra single orders',
      'Exclusive off-menu requests allowed',
      '2 complimentary drinks & desserts per month',
      'Dedicated support line'
    ],
    isPopular: false,
    savingsPercent: 25,
    deliveryType: 'priority',
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    image: '/src/assets/images/creamy_alfredo_1781958600642.jpg',
    caption: 'Fettuccine Alfredo cooked with premium aged parmesan.',
    category: 'dishes',
  },
  {
    id: 'g2',
    image: '/src/assets/images/restaurant_interior_1781958580832.jpg',
    caption: 'Our elegant and intimate main dining setup.',
    category: 'interior',
  },
  {
    id: 'g3',
    image: '/src/assets/images/hero_steak_gourmet_1781958560784.jpg',
    caption: 'Prime ribeye cuts seared by master chefs.',
    category: 'dishes',
  },
  {
    id: 'g4',
    image: '/src/assets/images/beef_burger_1781958615596.jpg',
    caption: 'Juicy artisan burgers assembled on buttered brioche.',
    category: 'dishes',
  },
  {
    id: 'g5',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    caption: 'The warm, relaxing ambience during evening hours.',
    category: 'atmosphere',
  },
  {
    id: 'g6',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
    caption: 'Unparalleled customer hospitality and wine service.',
    category: 'atmosphere',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    role: 'Local Food Critic',
    text: 'Flavoro has redefined casual fine dining in our neighborhood. The Grilled Salmon was exceptionally moist, and the moody, elegant interior feels like a true oasis.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'r2',
    author: 'David Vance',
    role: 'Gourmet Enthusiast',
    text: 'Unbelievable flavors. The truffle garlic bread combined with their classic beef burger makes for a highly satisfying feast. Plus, the service was wonderfully prompt and warm.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'r3',
    author: 'Elena Rostova',
    role: 'Travel blogger',
    text: 'Finding premium food combined with this level of cozy atmosphere is rare. The Chocolate Lava Cake literally flows with liquid cocoa perfection. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
  },
];
