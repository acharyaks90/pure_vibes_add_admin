export interface MainCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  order: number;
}

export interface SubCategory {
  id: string;
  mainCategoryId: string;
  name: string;
  description: string;
  isActive: boolean;
  order: number;
}

export interface SolutionPackage {
  id: string;
  subCategoryId: string;
  name: string;
  description: string;
  features: string[];
  duration: number; // in days
  price: number;
  originalPrice?: number;
  tier: 'quick-fix' | 'sustainable' | 'transformation';
  isActive: boolean;
  order: number;
}

export interface CustomerSubscription {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  packageId: string;
  packageName: string;
  mainCategory: string;
  subCategory: string;
  status: 'active' | 'completed' | 'cancelled' | 'paused';
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  totalSessions: number;
  completedSessions: number;
  nextReviewDate?: Date;
  assignedExpertId?: string;
  assignedExpertName?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressNote {
  id: string;
  subscriptionId: string;
  authorId: string;
  authorName: string;
  authorType: 'admin' | 'expert' | 'customer';
  content: string;
  sessionNumber?: number;
  progressUpdate?: number;
  actionType?: 'session_completed' | 'progress_update' | 'review_scheduled' | 'note' | 'milestone';
  createdAt: Date;
}

export interface SessionSchedule {
  id: string;
  subscriptionId: string;
  sessionNumber: number;
  scheduledDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  expertId?: string;
  expertName?: string;
  notes?: string;
  createdAt: Date;
}