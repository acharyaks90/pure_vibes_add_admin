export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  specifications?: Record<string, string>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  id: string;
  userId?: string;
  productId: string;
  addedAt: Date;
}

export interface CartItem {
  id: string;
  userId?: string;
  productId: string;
  quantity: number;
  addedAt: Date;
  updatedAt: Date;
}

export interface DeliveryCharge {
  id: string;
  name: string;
  baseCharge: number;
  freeDeliveryThreshold: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  userEmail?: string;
  items: Array<{
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  shippingAddress: Address;
  trackingId?: string;
  estimatedDelivery?: Date;
  deliveryHistory: DeliveryUpdate[];
  orderDate: Date;
  deliveredDate?: Date;
  notes?: string;
}

export interface Address {
  id?: string;
  userId?: string;
  name: string;
  mobile: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export interface DeliveryUpdate {
  id: string;
  orderId: string;
  status: string;
  location: string;
  description: string;
  timestamp: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
  order: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  isVerified: boolean;
}