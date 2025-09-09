import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  HelpCircle, 
  Star, 
  ShoppingBag, 
  CreditCard,
  Settings,
  UserCheck
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useAdmin();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Analytics',
      icon: BarChart3,
      path: '/admin/dashboard',
      roles: ['super-admin', 'sarthi-admin', 'brahma-admin', 'kavach-admin'],
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      path: '/admin/customers',
      roles: ['super-admin'],
    },
    {
      id: 'sarthi',
      label: 'Sarthi',
      icon: HelpCircle,
      path: '/admin/sarthi',
      roles: ['super-admin', 'sarthi-admin'],
    },
    {
      id: 'brahma',
      label: 'Brahma',
      icon: Star,
      path: '/admin/brahma',
      roles: ['super-admin', 'brahma-admin'],
    },
    {
      id: 'kavach',
      label: 'Kavach',
      icon: ShoppingBag,
      path: '/admin/kavach',
      roles: ['super-admin', 'kavach-admin'],
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      path: '/admin/payments',
      roles: ['super-admin'],
    },
    {
      id: 'experts',
      label: 'Experts',
      icon: UserCheck,
      path: '/admin/experts',
      roles: ['super-admin', 'sarthi-admin'],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      roles: ['super-admin', 'sarthi-admin', 'brahma-admin', 'kavach-admin'],
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    admin?.role && item.roles.includes(admin.role)
  );

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1">Current Role</p>
          <p className="text-sm font-semibold text-slate-900 capitalize">
            {admin?.role?.replace('-', ' ')}
          </p>
        </div>
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 border-r-2 border-slate-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};