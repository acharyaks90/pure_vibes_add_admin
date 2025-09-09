import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AstrologerList } from '../components/Brahma/AstrologerList';
import { BookingForm } from '../components/Brahma/BookingForm';
import { Astrologer } from '../types';

export const Brahma: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'list' | 'booking' | 'success'>('list');
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);

  const handleAstrologerSelect = (astrologer: Astrologer) => {
    setSelectedAstrologer(astrologer);
    setStep('booking');
  };

  const handleBookingComplete = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your consultation with {selectedAstrologer?.name} has been scheduled successfully. You'll receive a confirmation shortly.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/my-dashboard')}
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View My Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {step === 'list' && (
        <AstrologerList
          onSelect={handleAstrologerSelect}
          onBack={() => navigate('/dashboard')}
        />
      )}
      {step === 'booking' && selectedAstrologer && (
        <BookingForm
          astrologer={selectedAstrologer}
          onBack={() => setStep('list')}
          onComplete={handleBookingComplete}
        />
      )}
    </>
  );
};