import React, { useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  requiredRole = [] 
}) => {
  const { admin, isLoading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !admin) {
      navigate('/admin/login');
    } else if (admin && requiredRole.length > 0 && !requiredRole.includes(admin.role)) {
      // Redirect based on role
      if (admin.role === 'expert') {
        navigate('/admin/expert');
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [admin, isLoading, navigate, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect to login
  }

  if (requiredRole.length > 0 && !requiredRole.includes(admin.role)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this section.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};