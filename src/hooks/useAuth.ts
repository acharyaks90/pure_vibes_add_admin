import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (mobile: string, otp: string, name: string) => Promise<boolean>;
  logout: () => void;
  sendOtp: (mobile: string) => Promise<boolean>;
  isLoading: boolean;
  redirectAfterLogin: string | null;
  setRedirectAfterLogin: (path: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (mobile: string): Promise<boolean> => {
    try {
      // Simulate OTP sending
      console.log('Sending OTP to:', mobile);
      return true;
    } catch (error) {
      console.error('Failed to send OTP:', error);
      return false;
    }
  };

  const login = async (mobile: string, otp: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate OTP verification
      if (otp === '1234') {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          mobile,
          createdAt: new Date(),
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setRedirectAfterLogin(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
    sendOtp,
    isLoading,
    redirectAfterLogin,
    setRedirectAfterLogin,
  };
};

export { AuthContext };