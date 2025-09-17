export interface ExpertSession {
  id: string;
  requestId: string;
  customerId: string;
  customerName: string;
  customerMobile: string;
  expertId: string;
  expertName: string;
  sessionType: 'sarthi' | 'brahma';
  problemType?: string; // For Sarthi
  astrologicalService?: string; // For Brahma
  scheduledDate: Date;
  duration: number; // in hours
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  notes?: string;
  amount: number;
  paymentStatus: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  rescheduleReason?: string;
  rescheduleHistory?: Array<{
    oldDate: Date;
    newDate: Date;
    reason: string;
    timestamp: Date;
  }>;
}

export interface ExpertProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  specialization: string[];
  experience: number;
  rating: number;
  isActive: boolean;
  totalSessions: number;
  completedSessions: number;
  bio?: string;
  qualifications?: string[];
  languages?: string[];
  availability?: {
    [key: string]: { // day of week
      start: string;
      end: string;
      isAvailable: boolean;
    };
  };
  hourlyRate?: number;
  createdAt: Date;
  updatedAt: Date;
}