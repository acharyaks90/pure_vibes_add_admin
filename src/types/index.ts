export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  createdAt: Date;
}

export interface PaymentConfig {
  sarthiPrice: number;
  brahmaBasePrice: number;
  kavachShippingFee: number;
  refundPolicy: string;
}

// Legacy types for backward compatibility
export interface Problem {
  id: string;
  title: string;
  category: string;
}

export interface Astrologer {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  pricePerHour: number;
  availability: string[];
  image: string;
}