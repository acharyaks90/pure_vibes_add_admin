import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategorySelector } from '../components/Sarthi/CategorySelector';
import { PackageSelector } from '../components/Sarthi/PackageSelector';
import { SubscriptionBooking } from '../components/Sarthi/SubscriptionBooking';
import { MainCategory, SubCategory, SolutionPackage } from '../types/sarthi';

export const Sarthi: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'category' | 'package' | 'booking' | 'success'>('category');
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<SolutionPackage | null>(null);

  const handleCategorySelect = (mainCategory: MainCategory, subCategory: SubCategory) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(subCategory);
    setStep('package');
  };

  const handlePackageSelect = (packageData: SolutionPackage) => {
    setSelectedPackage(packageData);
    setStep('booking');
  };

  const handleBookingComplete = () => {
    setStep('success');
    // Here you would typically create the subscription record
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Activated!</h2>
          <p className="text-gray-600 mb-6">
            Your {selectedPackage?.name} subscription has been activated successfully. Our expert will contact you within 24 hours to begin your journey.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
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
      {step === 'category' && (
        <CategorySelector
          onSelect={handleCategorySelect}
          onBack={() => navigate('/dashboard')}
        />
      )}
      {step === 'package' && selectedMainCategory && selectedSubCategory && (
        <PackageSelector
          mainCategory={selectedMainCategory}
          subCategory={selectedSubCategory}
          onSelect={handlePackageSelect}
          onBack={() => setStep('category')}
        />
      )}
      {step === 'booking' && (
        <SubscriptionBooking
          mainCategory={selectedMainCategory!}
          subCategory={selectedSubCategory!}
          selectedPackage={selectedPackage!}
          onBack={() => setStep('package')}
          onComplete={handleBookingComplete}
        />
      )}
    </>
  );
};