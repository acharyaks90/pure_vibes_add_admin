import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft, Star } from 'lucide-react';
import { Astrologer } from '../../types';

interface BookingFormProps {
  astrologer: Astrologer;
  onBack: () => void;
  onComplete: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ astrologer, onBack, onComplete }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = astrologer.pricePerHour * duration;

  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }),
      });
    }
    return dates;
  };

  const handlePayment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setPaymentCompleted(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleConfirm = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Astrologers
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Book Consultation
          </h1>
        </div>

        <div className="space-y-6">
          {/* Astrologer Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={astrologer.image}
                alt={astrologer.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{astrologer.name}</h2>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{astrologer.rating} • {astrologer.experience} years</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {astrologer.specialization.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Date</option>
                  {getAvailableDates().map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Time</option>
                  {astrologer.availability.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={1}>1 Hour - ₹{astrologer.pricePerHour}</option>
                <option value={1.5}>1.5 Hours - ₹{Math.round(astrologer.pricePerHour * 1.5)}</option>
                <option value={2}>2 Hours - ₹{astrologer.pricePerHour * 2}</option>
              </select>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-700">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">₹{totalAmount}</span>
            </div>

            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                disabled={isProcessing || !selectedDate || !selectedTime}
                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Confirm Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};