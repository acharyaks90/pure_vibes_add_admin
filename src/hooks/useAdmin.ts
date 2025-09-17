import { useState, useEffect, createContext, useContext } from 'react';
import { useCallback } from 'react';
import { Admin, AdminSession, CustomerAnalytics, SarthiRequest, Comment, Expert, PaymentTransaction } from '../types/admin';

interface AdminContextType {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  analytics: CustomerAnalytics | null;
  sarthiRequests: SarthiRequest[];
  experts: Expert[];
  payments: PaymentTransaction[];
  fetchAnalytics: () => Promise<void>;
  fetchSarthiRequests: () => Promise<void>;
  fetchExperts: () => Promise<void>;
  fetchPayments: () => Promise<void>;
  assignExpert: (requestId: string, expertId: string) => Promise<boolean>;
  updateRequestStatus: (requestId: string, status: SarthiRequest['status']) => Promise<boolean>;
  addComment: (requestId: string, content: string, actionType?: Comment['actionType']) => Promise<boolean>;
  getComments: (requestId: string) => Promise<Comment[]>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const useAdminProvider = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<CustomerAnalytics | null>(null);
  const [sarthiRequests, setSarthiRequests] = useState<SarthiRequest[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);

  useEffect(() => {
    // Check for stored admin session
    const storedSession = localStorage.getItem('adminSession');
    if (storedSession) {
      const session: AdminSession = JSON.parse(storedSession);
      if (new Date(session.expiresAt) > new Date()) {
        setAdmin(session.admin);
      } else {
        localStorage.removeItem('adminSession');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock admin credentials
      const mockAdmins = [
        {
          email: 'admin@purevibes.com',
          password: 'admin123',
          admin: {
            id: 'admin-1',
            name: 'Super Admin',
            email: 'admin@purevibes.com',
            mobile: '9999999999',
            role: 'super-admin' as const,
            permissions: ['all'],
            createdAt: new Date(),
            lastLogin: new Date(),
          }
        },
        {
          email: 'sarthi@purevibes.com',
          password: 'sarthi123',
          admin: {
            id: 'admin-2',
            name: 'Sarthi Admin',
            email: 'sarthi@purevibes.com',
            mobile: '9999999998',
            role: 'sarthi-admin' as const,
            permissions: ['sarthi'],
            createdAt: new Date(),
            lastLogin: new Date(),
          }
        },
        {
          email: 'brahma@purevibes.com',
          password: 'brahma123',
          admin: {
            id: 'admin-3',
            name: 'Brahma Admin',
            email: 'brahma@purevibes.com',
            mobile: '9999999997',
            role: 'brahma-admin' as const,
            permissions: ['brahma'],
            createdAt: new Date(),
            lastLogin: new Date(),
          }
        },
        {
          email: 'kavach@purevibes.com',
          password: 'kavach123',
          admin: {
            id: 'admin-4',
            name: 'Kavach Admin',
            email: 'kavach@purevibes.com',
            mobile: '9999999996',
            role: 'kavach-admin' as const,
            permissions: ['kavach'],
            createdAt: new Date(),
            lastLogin: new Date(),
          }
        },
        {
          email: 'expert1@purevibes.com',
          password: 'expert123',
          admin: {
            id: 'expert-1',
            name: 'Dr. Meera Singh',
            email: 'expert1@purevibes.com',
            mobile: '9999999995',
            role: 'expert' as const,
            permissions: ['expert'],
            createdAt: new Date(),
            lastLogin: new Date(),
            expertId: 'expert-1',
            specialization: ['Relationship Counseling', 'Family Issues'],
          }
        },
        {
          email: 'expert2@purevibes.com',
          password: 'expert123',
          admin: {
            id: 'expert-2',
            name: 'Pandit Rajesh Sharma',
            email: 'expert2@purevibes.com',
            mobile: '9999999994',
            role: 'expert' as const,
            permissions: ['expert'],
            createdAt: new Date(),
            lastLogin: new Date(),
            expertId: 'expert-2',
            specialization: ['Vedic Astrology', 'Marriage', 'Career'],
          }
        }
      ];

      const matchedAdmin = mockAdmins.find(a => a.email === email && a.password === password);
      
      if (matchedAdmin) {
        const session: AdminSession = {
          admin: matchedAdmin.admin,
          token: 'mock-token-' + Math.random().toString(36),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        };
        
        setAdmin(matchedAdmin.admin);
        localStorage.setItem('adminSession', JSON.stringify(session));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Admin login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminSession');
  };

  const fetchAnalytics = useCallback(async () => {
    // Mock analytics data
    setAnalytics({
      totalCustomers: 1247,
      activeUsers: 892,
      sarthiUsers: 456,
      brahmaUsers: 234,
      kavachUsers: 567,
      newRegistrations: 23,
      revenueThisMonth: 125000,
    });
  }, []);

  const fetchSarthiRequests = useCallback(async () => {
    // Mock Sarthi requests
    setSarthiRequests([
      {
        id: 'SR001',
        userId: 'user-1',
        userName: 'Rahul Sharma',
        userMobile: '9876543210',
        problemType: 'Career Growth & Job Issues',
        status: 'unassigned',
        amount: 500,
        paymentStatus: 'completed',
        createdAt: new Date('2024-01-20T10:00:00Z'),
        updatedAt: new Date('2024-01-20T10:00:00Z'),
        priority: 'medium',
      },
      {
        id: 'SR002',
        userId: 'user-2',
        userName: 'Priya Patel',
        userMobile: '9876543211',
        problemType: 'Relationship & Marriage Problems',
        customDescription: 'Having issues with in-laws and need guidance on how to handle the situation',
        status: 'assigned',
        expertId: 'expert-1',
        expertName: 'Dr. Meera Singh',
        scheduledDate: new Date('2024-01-22T15:00:00Z'),
        amount: 500,
        paymentStatus: 'completed',
        createdAt: new Date('2024-01-19T14:30:00Z'),
        updatedAt: new Date('2024-01-20T09:15:00Z'),
        priority: 'high',
      },
    ]);
  }, []);

  const fetchExperts = useCallback(async () => {
    // Mock experts data
    setExperts([
      {
        id: 'expert-1',
        name: 'Dr. Meera Singh',
        email: 'meera@experts.com',
        mobile: '9876543220',
        specialization: ['Relationship Counseling', 'Family Issues'],
        experience: 12,
        rating: 4.8,
        isActive: true,
        totalAssignments: 156,
        completedAssignments: 142,
      },
      {
        id: 'expert-2',
        name: 'Prof. Amit Kumar',
        email: 'amit@experts.com',
        mobile: '9876543221',
        specialization: ['Career Guidance', 'Business Consulting'],
        experience: 15,
        rating: 4.9,
        isActive: true,
        totalAssignments: 203,
        completedAssignments: 195,
      },
    ]);
  }, []);

  const fetchPayments = useCallback(async () => {
    // Mock payments data
    setPayments([
      {
        id: 'PAY001',
        userId: 'user-1',
        userName: 'Rahul Sharma',
        serviceType: 'sarthi',
        serviceId: 'SR001',
        amount: 500,
        status: 'completed',
        paymentMethod: 'UPI',
        transactionId: 'TXN123456789',
        createdAt: new Date('2024-01-20T10:05:00Z'),
        completedAt: new Date('2024-01-20T10:05:30Z'),
      },
      {
        id: 'PAY002',
        userId: 'user-2',
        userName: 'Priya Patel',
        serviceType: 'brahma',
        serviceId: 'BR001',
        amount: 1200,
        status: 'completed',
        paymentMethod: 'Card',
        transactionId: 'TXN123456790',
        createdAt: new Date('2024-01-19T16:20:00Z'),
        completedAt: new Date('2024-01-19T16:20:45Z'),
      },
    ]);
  }, []);

  const assignExpert = useCallback(async (requestId: string, expertId: string): Promise<boolean> => {
    try {
      // Update the request with expert assignment
      setSarthiRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              expertId, 
              expertName: experts.find(e => e.id === expertId)?.name,
              status: 'assigned',
              updatedAt: new Date()
            }
          : req
      ));
      return true;
    } catch (error) {
      console.error('Failed to assign expert:', error);
      return false;
    }
  }, [experts]);

  const updateRequestStatus = useCallback(async (requestId: string, status: SarthiRequest['status']): Promise<boolean> => {
    try {
      setSarthiRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status, updatedAt: new Date() }
          : req
      ));
      return true;
    } catch (error) {
      console.error('Failed to update status:', error);
      return false;
    }
  }, []);

  const addComment = useCallback(async (requestId: string, content: string, actionType?: Comment['actionType']): Promise<boolean> => {
    try {
      // In a real app, this would make an API call
      console.log('Adding comment:', { requestId, content, actionType });
      return true;
    } catch (error) {
      console.error('Failed to add comment:', error);
      return false;
    }
  }, []);

  const getComments = useCallback(async (requestId: string): Promise<Comment[]> => {
    // Mock comments data
    return [
      {
        id: 'comment-1',
        requestId,
        authorId: 'admin-1',
        authorName: 'Super Admin',
        authorType: 'admin',
        content: 'Request assigned to Dr. Meera Singh for relationship counseling expertise.',
        actionType: 'assignment',
        createdAt: new Date('2024-01-20T09:15:00Z'),
      },
      {
        id: 'comment-2',
        requestId,
        authorId: 'expert-1',
        authorName: 'Dr. Meera Singh',
        authorType: 'expert',
        content: 'Reviewed the case. Scheduling initial consultation for tomorrow at 3 PM.',
        actionType: 'note',
        createdAt: new Date('2024-01-20T11:30:00Z'),
      },
    ];
  }, []);

  return {
    admin,
    login,
    logout,
    isLoading,
    analytics,
    sarthiRequests,
    experts,
    payments,
    fetchAnalytics,
    fetchSarthiRequests,
    fetchExperts,
    fetchPayments,
    assignExpert,
    updateRequestStatus,
    addComment,
    getComments,
  };
};

export { AdminContext };