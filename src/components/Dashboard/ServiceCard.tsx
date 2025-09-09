import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  price: string;
  onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  color,
  price,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className={`h-2 bg-gradient-to-r ${color}`} />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">{price}</span>
            <p className="text-sm text-gray-500">Starting from</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm font-medium text-gray-600 mb-3">{subtitle}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>

        <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          <span>Get Started</span>
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};