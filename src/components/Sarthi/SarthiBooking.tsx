import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';

interface SarthiBookingProps {
  problemType: string;
  customDescription?: string;
  onBack: () => void;
  onComplete: () => void;
}

export const SarthiBooking: React.FC<SarthiBookingProps> = ({
  problemType,
  customDescription,
  onBack,
  onComplete,
}) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentCompleted(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleConfirm = () => {
    // Here you would typically send the booking to your backend
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Confirm Your Booking
          </h1>
          <p className="text-lg text-gray-600">
            Review your details and complete the payment
          </p>
        </div>

        <div className="space-y-6">
          {/* Problem Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Details</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Problem Type</label>
                <p className="text-gray-900 font-medium">{problemType}</p>
              </div>
              {customDescription && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-900">{customDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Guarantee</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Expert assignment within 4 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Meeting scheduled within 24 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">100% callback guarantee</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-700">Service Fee</span>
              <span className="text-2xl font-bold text-gray-900">₹500</span>
            </div>

            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Payment
                  </>
                )}
              </button>
            ) : (
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <p className="text-green-600 font-semibold">Payment Successful!</p>
                <button
                  onClick={handleConfirm}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};