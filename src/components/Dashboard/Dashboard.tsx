import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from './ServiceCard';
import { HelpCircle, Star, ShoppingBag, BarChart3 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const services = [
    {
      title: 'Sarthi',
      subtitle: 'Any Problem Help',
      description: 'Get personalized solutions from domain experts for your life challenges. From career issues to personal conflicts, our expert team provides guidance within 24 hours.',
      icon: HelpCircle,
      color: 'from-blue-500 to-blue-600',
      price: '₹500',
      path: '/sarthi',
    },
    {
      title: 'Brahma',
      subtitle: 'Astrology Consultation',
      description: 'Connect with certified astrologers for detailed horoscope readings, life predictions, and spiritual guidance. Book your personalized consultation today.',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      price: '₹1,000',
      path: '/brahma',
    },
    {
      title: 'Kavach',
      subtitle: 'Spiritual Merchandise',
      description: 'Discover authentic mantras, yantras, and spiritual items to enhance your spiritual journey. Quality products with detailed descriptions and user reviews.',
      icon: ShoppingBag,
      color: 'from-amber-500 to-orange-500',
      price: '₹99',
      path: '/kavach',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our personal companion designed to guide you through life's journey with wisdom and care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard
                {...service}
                onClick={() => navigate(service.path)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Track Your Journey
          </h2>
          <p className="text-gray-600 mb-6">
            View all your bookings, sessions, and orders in one place. Monitor your spiritual growth and manage your activities.
          </p>
          <button
            onClick={() => navigate('/my-dashboard')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            View My Dashboard
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            24/7 Support Available
          </h2>
          <p className="text-gray-600 mb-6">
            Our dedicated support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+91-9999999999"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Call Support
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};