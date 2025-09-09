import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft, Star, Users } from 'lucide-react';
import { MainCategory, SubCategory, SolutionPackage } from '../../types/sarthi';

interface SubscriptionBookingProps {
  mainCategory: MainCategory;
  subCategory: SubCategory;
  selectedPackage: SolutionPackage;
  onBack: () => void;
  onComplete: () => void;
}

export const SubscriptionBooking: React.FC<SubscriptionBookingProps> = ({
  mainCategory,
  subCategory,
  selectedPackage,
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
    // Here you would typically send the subscription to your backend
    onComplete();
  };

  const getDurationText = (days: number) => {
    if (days <= 7) return `${days} days`;
    if (days <= 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  };

  const getPackageIcon = (tier: SolutionPackage['tier']) => {
    switch (tier) {
      case 'quick-fix':
        return <Clock className="w-6 h-6" />;
      case 'sustainable':
        return <Star className="w-6 h-6" />;
      case 'transformation':
        return <Users className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPackageColor = (tier: SolutionPackage['tier']) => {
    switch (tier) {
      case 'quick-fix':
        return 'from-green-500 to-green-600';
      case 'sustainable':
        return 'from-blue-500 to-blue-600';
      case 'transformation':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
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
            Back to Packages
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Confirm Your Subscription
          </h1>
          <p className="text-lg text-gray-600">
            Review your selection and complete the payment
          </p>
        </div>

        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Selection</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">Category:</span>
                <span className="text-gray-900">{mainCategory.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">Issue:</span>
                <span className="text-gray-900">{subCategory.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-gray-700">Package:</span>
                <span className="text-gray-900">{selectedPackage.name}</span>
              </div>
            </div>
          </div>

          {/* Package Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Package Details</h2>
            
            <div className="flex items-start space-x-4 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getPackageColor(selectedPackage.tier)} flex items-center justify-center text-white`}>
                {getPackageIcon(selectedPackage.tier)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{selectedPackage.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedPackage.description}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {getDurationText(selectedPackage.duration)} program
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="font-medium text-gray-900">What's included:</h4>
              <ul className="space-y-1">
                {selectedPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service Guarantee */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Guarantee</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Expert assignment within 24 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">First session scheduled within 48 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">100% satisfaction guarantee</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-lg text-gray-700">Total Amount</span>
                {selectedPackage.originalPrice && selectedPackage.originalPrice > selectedPackage.price && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">₹{selectedPackage.originalPrice.toLocaleString()}</span>
                    <span className="ml-2 text-green-600 font-medium">
                      Save ₹{(selectedPackage.originalPrice - selectedPackage.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-2xl font-bold text-gray-900">₹{selectedPackage.price.toLocaleString()}</span>
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
                  Confirm Subscription
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};