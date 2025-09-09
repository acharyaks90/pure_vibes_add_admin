import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Shield, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">PV</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pure Vibes Adda
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Your Personal Companion Multi-Path Platform
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Connect with experts for life guidance, astrology consultations, and spiritual merchandise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Customer Login Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-8 rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
              aria-label="Customer Login - Access your personal dashboard and services"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Customer Login</h2>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Access your personal dashboard, book consultations, and manage your spiritual journey
                  </p>
                </div>
                <div className="flex items-center text-blue-200 group-hover:text-white transition-colors">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>

            {/* Admin Login Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin/login')}
              className="group relative bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white p-8 rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-300 focus:ring-opacity-50"
              aria-label="Admin Login - Access administrative dashboard and management tools"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Secure access to administrative dashboard, user management, and platform analytics
                  </p>
                </div>
                <div className="flex items-center text-slate-300 group-hover:text-white transition-colors">
                  <span className="mr-2">Admin Portal</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm mb-4">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+91-9999999999"
                className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 rounded-lg"
                aria-label="Call support at +91-9999999999"
              >
                📞 +91-9999999999
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 rounded-lg"
                aria-label="Contact us on WhatsApp"
              >
                💬 WhatsApp Support
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};