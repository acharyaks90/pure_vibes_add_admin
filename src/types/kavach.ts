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
  specifications: Record<string, string>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  vendor?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  sku?: string;
  barcode?: string;
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  order: number;
  parentId?: string;
  image?: string;
}

export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  userUsageLimit?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  applicableProducts?: string[];
  applicableCategories?: string[];
  excludedProducts?: string[];
  excludedCategories?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CouponUsage {
  id: string;
  couponId: string;
  userId: string;
  orderId: string;
  discountAmount: number;
  usedAt: Date;
}

export interface ImageUpload {
  id: string;
  file: File;
  url: string;
  isUploading: boolean;
  uploadProgress: number;
  error?: string;
}