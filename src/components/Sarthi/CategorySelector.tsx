import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { MainCategory, SubCategory } from '../../types/sarthi';

interface CategorySelectorProps {
  onSelect: (mainCategory: MainCategory, subCategory: SubCategory) => void;
  onBack: () => void;
}

const mockMainCategories: MainCategory[] = [
  {
    id: 'personal',
    name: 'Personal',
    description: 'Self-development and personal growth issues',
    icon: '🧘‍♀️',
    color: 'from-purple-500 to-purple-600',
    isActive: true,
    order: 1,
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Professional growth and workplace challenges',
    icon: '💼',
    color: 'from-blue-500 to-blue-600',
    isActive: true,
    order: 2,
  },
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Love, marriage, and interpersonal relationships',
    icon: '💕',
    color: 'from-pink-500 to-pink-600',
    isActive: true,
    order: 3,
  },
  {
    id: 'financial',
    name: 'Financial',
    description: 'Money management and financial planning',
    icon: '💰',
    color: 'from-green-500 to-green-600',
    isActive: true,
    order: 4,
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Physical and mental wellness concerns',
    icon: '🏥',
    color: 'from-red-500 to-red-600',
    isActive: true,
    order: 5,
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Family dynamics and household issues',
    icon: '👨‍👩‍👧‍👦',
    color: 'from-orange-500 to-orange-600',
    isActive: true,
    order: 6,
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Academic and learning challenges',
    icon: '📚',
    color: 'from-indigo-500 to-indigo-600',
    isActive: true,
    order: 7,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Entrepreneurship and business development',
    icon: '🚀',
    color: 'from-teal-500 to-teal-600',
    isActive: true,
    order: 8,
  },
];

const mockSubCategories: SubCategory[] = [
  // Personal
  { id: 'personal-1', mainCategoryId: 'personal', name: 'Lack of Purpose/Confusion', description: 'Finding direction and meaning in life', isActive: true, order: 1 },
  { id: 'personal-2', mainCategoryId: 'personal', name: 'Self-confidence Issues', description: 'Building self-esteem and confidence', isActive: true, order: 2 },
  { id: 'personal-3', mainCategoryId: 'personal', name: 'Identity Crisis', description: 'Understanding and accepting yourself', isActive: true, order: 3 },
  
  // Career
  { id: 'career-1', mainCategoryId: 'career', name: 'No Hike in Salary', description: 'Strategies for salary negotiation and growth', isActive: true, order: 1 },
  { id: 'career-2', mainCategoryId: 'career', name: 'Promotion Issues', description: 'Career advancement and leadership development', isActive: true, order: 2 },
  { id: 'career-3', mainCategoryId: 'career', name: 'Job Change Confusion', description: 'Making informed career transition decisions', isActive: true, order: 3 },
  
  // Relationships
  { id: 'relationships-1', mainCategoryId: 'relationships', name: 'Trust Issues', description: 'Building and rebuilding trust in relationships', isActive: true, order: 1 },
  { id: 'relationships-2', mainCategoryId: 'relationships', name: 'Marriage Disputes', description: 'Resolving conflicts and improving communication', isActive: true, order: 2 },
  { id: 'relationships-3', mainCategoryId: 'relationships', name: 'Dating Challenges', description: 'Finding and maintaining healthy relationships', isActive: true, order: 3 },
  
  // Financial
  { id: 'financial-1', mainCategoryId: 'financial', name: 'Debt Management', description: 'Strategies to overcome and manage debt', isActive: true, order: 1 },
  { id: 'financial-2', mainCategoryId: 'financial', name: 'Investment Confusion', description: 'Making smart investment decisions', isActive: true, order: 2 },
  { id: 'financial-3', mainCategoryId: 'financial', name: 'Budget Planning', description: 'Creating and maintaining financial budgets', isActive: true, order: 3 },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect, onBack }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    if (selectedMainCategory) {
      const filteredSubCategories = mockSubCategories.filter(
        sub => sub.mainCategoryId === selectedMainCategory.id && sub.isActive
      ).sort((a, b) => a.order - b.order);
      setSubCategories(filteredSubCategories);
    }
  }, [selectedMainCategory]);

  const handleMainCategorySelect = (category: MainCategory) => {
    setSelectedMainCategory(category);
  };

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    if (selectedMainCategory) {
      onSelect(selectedMainCategory, subCategory);
    }
  };

  const handleBackToMain = () => {
    setSelectedMainCategory(null);
    setSubCategories([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={selectedMainCategory ? handleBackToMain : onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {selectedMainCategory ? 'Back to Categories' : 'Back to Dashboard'}
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedMainCategory ? `${selectedMainCategory.name} - Choose Specific Issue` : 'Choose Your Problem Category'}
          </h1>
          <p className="text-lg text-gray-600">
            {selectedMainCategory 
              ? 'Select the specific issue you\'d like help with'
              : 'Select the main area where you need guidance and support'
            }
          </p>
        </div>

        {!selectedMainCategory ? (
          // Main Categories Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMainCategories.filter(cat => cat.isActive).sort((a, b) => a.order - b.order).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
                onClick={() => handleMainCategorySelect(category)}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                  </div>

                  <div className="flex items-center justify-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    <span>Explore Issues</span>
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Sub Categories List
          <div className="space-y-4">
            {subCategories.map((subCategory, index) => (
              <motion.div
                key={subCategory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer group hover:border-blue-300 hover:bg-blue-50 transition-all"
                onClick={() => handleSubCategorySelect(subCategory)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700">
                      {subCategory.name}
                    </h3>
                    <p className="text-gray-600 group-hover:text-blue-600">
                      {subCategory.description}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};