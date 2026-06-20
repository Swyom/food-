export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  isPopular: boolean;
  preparationTime?: string;
  rating?: number;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  category: 'dishes' | 'interior' | 'atmosphere';
}

export interface Review {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}
