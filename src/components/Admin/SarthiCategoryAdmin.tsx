import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Folder, FolderOpen, Package } from 'lucide-react';
import { MainCategory, SubCategory, SolutionPackage } from '../../types/sarthi';

export const SarthiCategoryAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'subcategories' | 'packages'>('categories');
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [packages, setPackages] = useState<SolutionPackage[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Mock data - in a real app, this would come from your backend
    setMainCategories([
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
    ]);

    setSubCategories([
      { id: 'personal-1', mainCategoryId: 'personal', name: 'Lack of Purpose/Confusion', description: 'Finding direction and meaning in life', isActive: true, order: 1 },
      { id: 'career-1', mainCategoryId: 'career', name: 'No Hike in Salary', description: 'Strategies for salary negotiation and growth', isActive: true, order: 1 },
    ]);

    setPackages([
      {
        id: 'quick-fix-1',
        subCategoryId: 'personal-1',
        name: 'Quick Fix Trail',
        description: 'Get immediate clarity and direction with focused guidance',
        features: ['1-week guided sessions', 'Personality analysis', 'Daily routine optimization'],
        duration: 7,
        price: 199,
        originalPrice: 299,
        tier: 'quick-fix',
        isActive: true,
        order: 1,
      },
    ]);
  }, []);

  const handleSave = (item: any, type: string) => {
    if (type === 'category') {
      if (editingItem?.id) {
        setMainCategories(prev => prev.map(cat => cat.id === editingItem.id ? item : cat));
      } else {
        setMainCategories(prev => [...prev, { ...item, id: Date.now().toString() }]);
      }
    } else if (type === 'subcategory') {
      if (editingItem?.id) {
        setSubCategories(prev => prev.map(sub => sub.id === editingItem.id ? item : sub));
      } else {
        setSubCategories(prev => [...prev, { ...item, id: Date.now().toString() }]);
      }
    } else if (type === 'package') {
      if (editingItem?.id) {
        setPackages(prev => prev.map(pkg => pkg.id === editingItem.id ? item : pkg));
      } else {
        setPackages(prev => [...prev, { ...item, id: Date.now().toString() }]);
      }
    }
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: string, type: string) => {
    if (type === 'category') {
      setMainCategories(prev => prev.filter(cat => cat.id !== id));
    } else if (type === 'subcategory') {
      setSubCategories(prev => prev.filter(sub => sub.id !== id));
    } else if (type === 'package') {
      setPackages(prev => prev.filter(pkg => pkg.id !== id));
    }
  };

  const CategoryForm = ({ category, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(category || {
      name: '',
      description: '',
      icon: '',
      color: 'from-blue-500 to-blue-600',
      isActive: true,
      order: 1,
    });

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Icon (emoji)"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
            rows={2}
          />
          <select
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="from-blue-500 to-blue-600">Blue</option>
            <option value="from-purple-500 to-purple-600">Purple</option>
            <option value="from-green-500 to-green-600">Green</option>
            <option value="from-red-500 to-red-600">Red</option>
          </select>
          <input
            type="number"
            placeholder="Order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sarthi Category Management</h1>
        <p className="text-gray-600">Manage categories, subcategories, and solution packages</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-2">
          {[
            { id: 'categories', label: 'Main Categories', icon: Folder },
            { id: 'subcategories', label: 'Sub Categories', icon: FolderOpen },
            { id: 'packages', label: 'Solution Packages', icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Main Categories</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6">
              <CategoryForm
                onSave={(data: any) => handleSave(data, 'category')}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          <div className="space-y-4">
            {mainCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                {editingItem?.id === category.id ? (
                  <CategoryForm
                    category={category}
                    onSave={(data: any) => handleSave(data, 'category')}
                    onCancel={() => setEditingItem(null)}
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xl`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${category.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-xs text-gray-500">Order: {category.order}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingItem(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, 'category')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar structure for subcategories and packages tabs */}
      {activeTab === 'subcategories' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sub Categories</h2>
          <p className="text-gray-600">Sub-category management interface would go here...</p>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Solution Packages</h2>
          <p className="text-gray-600">Package management interface would go here...</p>
        </div>
      )}
    </div>
  );
};