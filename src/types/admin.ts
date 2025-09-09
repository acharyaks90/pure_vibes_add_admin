export interface Admin {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'super-admin' | 'sarthi-admin' | 'brahma-admin' | 'kavach-admin';
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date;
}

export interface AdminSession {
  admin: Admin;
  token: string;
  expiresAt: Date;
}

export interface CustomerAnalytics {
  totalCustomers: number;
  activeUsers: number;
  sarthiUsers: number;
  brahmaUsers: number;
  kavachUsers: number;
  newRegistrations: number;
  revenueThisMonth: number;
}

export interface SarthiRequest {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  problemType: string;
  customDescription?: string;
  status: 'unassigned' | 'assigned' | 'scheduled' | 'completed' | 'cancelled';
  expertId?: string;
  expertName?: string;
  scheduledDate?: Date;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Comment {
  id: string;
  requestId: string;
  authorId: string;
  authorName: string;
  authorType: 'admin' | 'expert';
  content: string;
  actionType?: 'assignment' | 'status_change' | 'escalation' | 'resolution' | 'note';
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface Expert {
  id: string;
  name: string;
  email: string;
  mobile: string;
  specialization: string[];
  experience: number;
  rating: number;
  isActive: boolean;
  totalAssignments: number;
  completedAssignments: number;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  serviceType: 'sarthi' | 'brahma' | 'kavach';
  serviceId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface AdminAction {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: 'user' | 'request' | 'booking' | 'order' | 'payment';
  targetId: string;
  details: Record<string, any>;
  timestamp: Date;
}