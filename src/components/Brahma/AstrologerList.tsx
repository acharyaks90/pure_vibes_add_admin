import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { AstrologerCard } from './AstrologerCard';
import { Astrologer } from '../../types';

interface AstrologerListProps {
  onSelect: (astrologer: Astrologer) => void;
  onBack: () => void;
}

const astrologers: Astrologer[] = [
  {
    id: '1',
    name: 'Pandit Rajesh Sharma',
    specialization: ['Vedic Astrology', 'Marriage', 'Career'],
    experience: 15,
    rating: 4.8,
    pricePerHour: 1200,
    availability: ['10:00', '14:00', '18:00'],
    image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Astrologer Priya Devi',
    specialization: ['Numerology', 'Palmistry', 'Love Life'],
    experience: 12,
    rating: 4.9,
    pricePerHour: 1500,
    availability: ['11:00', '15:00', '19:00'],
    image: 'https://images.pexels.com/photos/8197527/pexels-photo-8197527.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Dr. Amit Kumar',
    specialization: ['KP Astrology', 'Business', 'Finance'],
    experience: 20,
    rating: 4.7,
    pricePerHour: 1800,
    availability: ['09:00', '13:00', '17:00'],
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Guruji Manoj Tiwari',
    specialization: ['Horoscope', 'Gemstones', 'Remedies'],
    experience: 18,
    rating: 4.6,
    pricePerHour: 1000,
    availability: ['12:00', '16:00', '20:00'],
    image: 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export const AstrologerList: React.FC<AstrologerListProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Astrologer
          </h1>
          <p className="text-lg text-gray-600">
            Select from our certified astrologers for personalized guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {astrologers.map((astrologer, index) => (
            <motion.div
              key={astrologer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AstrologerCard
                astrologer={astrologer}
                onSelect={onSelect}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};