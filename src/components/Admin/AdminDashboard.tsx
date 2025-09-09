import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Activity, HelpCircle, Star, ShoppingBag } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

export const AdminDashboard: React.FC = () => {
  const { analytics, fetchAnalytics } = useAdmin();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const stats = [
    {
      title: 'Total Customers',
      value: analytics?.totalCustomers || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Active Users',
      value: analytics?.activeUsers || 0,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      change: '+8%',
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(analytics?.revenueThisMonth || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      change: '+23%',
    },
    {
      title: 'New Registrations',
      value: analytics?.newRegistrations || 0,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      change: '+5%',
    },
  ];

  const serviceStats = [
    {
      title: 'Sarthi Users',
      value: analytics?.sarthiUsers || 0,
      icon: HelpCircle,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Brahma Users',
      value: analytics?.brahmaUsers || 0,
      icon: Star,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Kavach Users',
      value: analytics?.kavachUsers || 0,
      icon: ShoppingBag,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Overview of platform performance and user engagement</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Service Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">New Sarthi request from Rahul Sharma</p>
              <p className="text-sm text-gray-600">Career Growth & Job Issues • 2 minutes ago</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
              Unassigned
            </span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Brahma session completed</p>
              <p className="text-sm text-gray-600">Pandit Rajesh Sharma with Priya Patel • 1 hour ago</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Completed
            </span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Kavach order shipped</p>
              <p className="text-sm text-gray-600">Order #K001 • Sacred Ganesha Yantra • 3 hours ago</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              Shipped
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};