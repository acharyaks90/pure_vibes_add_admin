import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Edit3, ArrowLeft } from 'lucide-react';
import { Problem } from '../../types';

interface ProblemSelectorProps {
  onSelect: (problem: string, customDescription?: string) => void;
  onBack: () => void;
}

const predefinedProblems: Problem[] = [
  { id: '1', title: 'Career Growth & Job Issues', category: 'Professional' },
  { id: '2', title: 'Relationship & Marriage Problems', category: 'Personal' },
  { id: '3', title: 'Financial Difficulties', category: 'Finance' },
  { id: '4', title: 'Family Conflicts', category: 'Family' },
  { id: '5', title: 'Health & Wellness Concerns', category: 'Health' },
  { id: '6', title: 'Business & Entrepreneurship', category: 'Business' },
  { id: '7', title: 'Education & Academic Issues', category: 'Education' },
  { id: '8', title: 'Legal & Documentation Problems', category: 'Legal' },
  { id: '9', title: 'Property & Real Estate', category: 'Property' },
  { id: '10', title: 'Mental Health & Stress', category: 'Mental Health' },
];

export const ProblemSelector: React.FC<ProblemSelectorProps> = ({ onSelect, onBack }) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customProblem, setCustomProblem] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customProblem.trim()) {
      onSelect('Custom Problem', customProblem.trim());
    }
  };

  const categories = [...new Set(predefinedProblems.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sarthi - Problem Help
          </h1>
          <p className="text-lg text-gray-600">
            Select your problem type or describe your specific situation
          </p>
        </div>

        {!showCustom ? (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{category}</h2>
                <div className="grid gap-3">
                  {predefinedProblems
                    .filter(p => p.category === category)
                    .map((problem) => (
                      <motion.button
                        key={problem.id}
                        whileHover={{ x: 4 }}
                        onClick={() => onSelect(problem.title)}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                      >
                        <span className="font-medium text-gray-900">{problem.title}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.button>
                    ))}
                </div>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowCustom(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              <Edit3 className="w-6 h-6" />
              <span className="text-lg font-semibold">Describe Your Own Problem</span>
            </motion.button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleCustomSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your problem (maximum 50 words)
                </label>
                <textarea
                  value={customProblem}
                  onChange={(e) => setCustomProblem(e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please describe your specific problem or situation..."
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">
                    {customProblem.split(' ').filter(word => word.length > 0).length} / 50 words
                  </p>
                  <span className={`text-sm ${
                    customProblem.split(' ').filter(word => word.length > 0).length > 50 
                      ? 'text-red-500' 
                      : 'text-green-500'
                  }`}>
                    {customProblem.split(' ').filter(word => word.length > 0).length <= 50 ? '✓' : '⚠️'}
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCustom(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Predefined Options
                </button>
                <button
                  type="submit"
                  disabled={
                    !customProblem.trim() || 
                    customProblem.split(' ').filter(word => word.length > 0).length > 50
                  }
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};