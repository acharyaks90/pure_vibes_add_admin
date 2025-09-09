import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Eye } from 'lucide-react';

interface OrderSuccessProps {
  orderId: string;
  onContinueShopping: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderId, onContinueShopping }) => {
  const trackingId = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="text-lg font-bold text-gray-900">{orderId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tracking ID</p>
                <p className="text-lg font-bold text-gray-900">{trackingId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
                <p className="text-lg font-bold text-gray-900">
                  {estimatedDelivery.toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="text-lg font-bold text-green-600">Order Confirmed</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <Package className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
              <p className="text-xs text-gray-600">Your order is being processed</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
              <Truck className="w-8 h-8 text-yellow-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">In Transit</p>
              <p className="text-xs text-gray-600">Your order will be shipped soon</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Delivered</p>
              <p className="text-xs text-gray-600">Estimated in 5-7 days</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {/* Navigate to order tracking */}}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              <Eye className="w-5 h-5 mr-2" />
              Track Your Order
            </button>
            
            <button
              onClick={onContinueShopping}
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>What's next?</strong> You'll receive an SMS and email confirmation shortly. 
              We'll keep you updated on your order status.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};