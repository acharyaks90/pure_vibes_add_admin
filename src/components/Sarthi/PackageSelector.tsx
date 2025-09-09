import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, Clock, Users, TrendingUp } from 'lucide-react';
import { MainCategory, SubCategory, SolutionPackage } from '../../types/sarthi';

interface PackageSelectorProps {
  mainCategory: MainCategory;
  subCategory: SubCategory;
  onSelect: (packageData: SolutionPackage) => void;
  onBack: () => void;
}

const mockPackages: SolutionPackage[] = [
  {
    id: 'quick-fix-1',
    subCategoryId: 'personal-1',
    name: 'Quick Fix Trail',
    description: 'Get immediate clarity and direction with focused guidance',
    features: [
      '1-week guided sessions',
      'Personality analysis',
      'Daily routine optimization',
      'Goal setting framework',
      'WhatsApp support'
    ],
    duration: 7,
    price: 199,
    originalPrice: 299,
    tier: 'quick-fix',
    isActive: true,
    order: 1,
  },
  {
    id: 'sustainable-1',
    subCategoryId: 'personal-1',
    name: 'Sustainable Guidance',
    description: 'Comprehensive month-long transformation program',
    features: [
      '1-month personalized guidance',
      'Birth chart analysis',
      'Habit formation framework',
      'Weekly progress reviews',
      'Meditation techniques',
      'Life purpose mapping'
    ],
    duration: 30,
    price: 750,
    originalPrice: 999,
    tier: 'sustainable',
    isActive: true,
    order: 2,
  },
  {
    id: 'transformation-1',
    subCategoryId: 'personal-1',
    name: 'Long-term Transformation',
    description: 'Complete life transformation with deep spiritual guidance',
    features: [
      '2-6 months comprehensive program',
      'Deep karma analysis',
      'Personalized yoga sessions',
      'Bi-weekly progress reviews',
      'Spiritual counseling',
      'Life coaching sessions',
      'Community support group',
      'Lifetime follow-up support'
    ],
    duration: 180,
    price: 2100,
    originalPrice: 4000,
    tier: 'transformation',
    isActive: true,
    order: 3,
  },
];

export const PackageSelector: React.FC<PackageSelectorProps> = ({
  mainCategory,
  subCategory,
  onSelect,
  onBack
}) => {
  const [selectedPackage, setSelectedPackage] = useState<SolutionPackage | null>(null);

  // Filter packages for the current subcategory
  const availablePackages = mockPackages.filter(pkg => 
    pkg.subCategoryId === subCategory.id && pkg.isActive
  ).sort((a, b) => a.order - b.order);

  const getPackageIcon = (tier: SolutionPackage['tier']) => {
    switch (tier) {
      case 'quick-fix':
        return <Clock className="w-8 h-8" />;
      case 'sustainable':
        return <TrendingUp className="w-8 h-8" />;
      case 'transformation':
        return <Star className="w-8 h-8" />;
      default:
        return <Users className="w-8 h-8" />;
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

  const getDurationText = (days: number) => {
    if (days <= 7) return `${days} days`;
    if (days <= 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  };

  const handlePackageSelect = (pkg: SolutionPackage) => {
    setSelectedPackage(pkg);
  };

  const handleContinue = () => {
    if (selectedPackage) {
      onSelect(selectedPackage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Issues
          </button>
          
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>{mainCategory.name}</span>
              <span>→</span>
              <span>{subCategory.name}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Solution Package
            </h1>
            <p className="text-lg text-gray-600">
              Select the guidance level that best fits your needs and commitment
            </p>
          </div>
        </div>

        {/* Package Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {availablePackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden cursor-pointer transition-all ${
                selectedPackage?.id === pkg.id 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-100 hover:border-blue-300'
              } ${pkg.tier === 'sustainable' ? 'relative' : ''}`}
              onClick={() => handlePackageSelect(pkg)}
            >
              {pkg.tier === 'sustainable' && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`h-2 bg-gradient-to-r ${getPackageColor(pkg.tier)}`} />
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getPackageColor(pkg.tier)} flex items-center justify-center mx-auto mb-4 text-white`}>
                    {getPackageIcon(pkg.tier)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{pkg.description}</p>
                  
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">₹{pkg.price.toLocaleString()}</span>
                    {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                      <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{getDurationText(pkg.duration)} program</p>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                  selectedPackage?.id === pkg.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {selectedPackage?.id === pkg.id ? 'Selected' : 'Select Package'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleContinue}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg font-semibold"
            >
              Continue to Payment
              <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
            </button>
            <p className="text-sm text-gray-600 mt-3">
              You selected: <strong>{selectedPackage.name}</strong> for ₹{selectedPackage.price.toLocaleString()}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};