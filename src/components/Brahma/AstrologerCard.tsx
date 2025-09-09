import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Award } from 'lucide-react';
import { Astrologer } from '../../types';

interface AstrologerCardProps {
  astrologer: Astrologer;
  onSelect: (astrologer: Astrologer) => void;
}

export const AstrologerCard: React.FC<AstrologerCardProps> = ({ astrologer, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
      onClick={() => onSelect(astrologer)}
    >
      <div className="relative">
        <img
          src={astrologer.image}
          alt={astrologer.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{astrologer.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{astrologer.name}</h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">{astrologer.experience} years experience</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {astrologer.specialization.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Available Now</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">₹{astrologer.pricePerHour}</span>
            <p className="text-xs text-gray-500">/hour</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};