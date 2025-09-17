import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Percent, Gift, Calendar, Users, Copy, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { Coupon, CouponUsage } from '../../types/kavach';

export const KavachCouponAdmin: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponUsages, setCouponUsages] = useState<CouponUsage[]>([]);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'expired'>('all');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    // Mock data
    setCoupons([
      {
        id: '1',
        code: 'WELCOME10',
        name: 'Welcome Discount',
        description: 'Get 10% off on your first order',
        type: 'percentage',
        value: 10,
        minimumOrderAmount: 500,
        maximumDiscountAmount: 200,
        usageLimit: 100,
        usageCount: 23,
        userUsageLimit: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
        applicableProducts: [],
        applicableCategories: [],
        excludedProducts: [],
        excludedCategories: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        code: 'FLAT50',
        name: 'Flat ₹50 Off',
        description: 'Flat ₹50 discount on orders above ₹300',
        type: 'fixed',
        value: 50,
        minimumOrderAmount: 300,
        usageLimit: 500,
        usageCount: 156,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        isActive: true,
        applicableProducts: [],
        applicableCategories: ['Yantras', 'Malas'],
        excludedProducts: [],
        excludedCategories: [],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: '3',
        code: 'FREESHIP',
        name: 'Free Shipping',
        description: 'Free shipping on all orders',
        type: 'free_shipping',
        value: 0,
        minimumOrderAmount: 200,
        usageLimit: 1000,
        usageCount: 342,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        isActive: true,
        applicableProducts: [],
        applicableCategories: [],
        excludedProducts: [],
        excludedCategories: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-10'),
      },
    ]);

    setCouponUsages([
      {
        id: '1',
        couponId: '1',
        userId: 'user-1',
        orderId: 'order-1',
        discountAmount: 50,
        usedAt: new Date('2024-01-20'),
      },
      {
        id: '2',
        couponId: '2',
        userId: 'user-2',
        orderId: 'order-2',
        discountAmount: 50,
        usedAt: new Date('2024-01-21'),
      },
    ]);
  }, []);

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = searchTerm === '' || 
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const isExpired = coupon.endDate < now;
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && coupon.isActive && !isExpired) ||
      (statusFilter === 'inactive' && !coupon.isActive) ||
      (statusFilter === 'expired' && isExpired);
    
    return matchesSearch && matchesStatus;
  });

  const handleSaveCoupon = (couponData: Partial<Coupon>) => {
    if (editingCoupon) {
      setCoupons(prev => prev.map(c => 
        c.id === editingCoupon.id 
          ? { ...c, ...couponData, updatedAt: new Date() }
          : c
      ));
    } else {
      const newCoupon: Coupon = {
        id: Date.now().toString(),
        code: couponData.code || '',
        name: couponData.name || '',
        description: couponData.description || '',
        type: couponData.type || 'percentage',
        value: couponData.value || 0,
        minimumOrderAmount: couponData.minimumOrderAmount,
        maximumDiscountAmount: couponData.maximumDiscountAmount,
        usageLimit: couponData.usageLimit,
        usageCount: 0,
        userUsageLimit: couponData.userUsageLimit,
        startDate: couponData.startDate || new Date(),
        endDate: couponData.endDate || new Date(),
        isActive: couponData.isActive ?? true,
        applicableProducts: couponData.applicableProducts || [],
        applicableCategories: couponData.applicableCategories || [],
        excludedProducts: couponData.excludedProducts || [],
        excludedCategories: couponData.excludedCategories || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCoupons(prev => [...prev, newCoupon]);
    }
    setEditingCoupon(null);
    setShowAddForm(false);
  };

  const handleDeleteCoupon = (couponId: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(prev => prev.filter(c => c.id !== couponId));
    }
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons(prev => prev.map(c => 
      c.id === couponId 
        ? { ...c, isActive: !c.isActive, updatedAt: new Date() }
        : c
    ));
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const getCouponStatus = (coupon: Coupon) => {
    const now = new Date();
    const isExpired = coupon.endDate < now;
    const isNotStarted = coupon.startDate > now;
    
    if (isExpired) {
      return { text: 'Expired', color: 'bg-red-100 text-red-700' };
    } else if (isNotStarted) {
      return { text: 'Scheduled', color: 'bg-blue-100 text-blue-700' };
    } else if (!coupon.isActive) {
      return { text: 'Inactive', color: 'bg-gray-100 text-gray-700' };
    } else {
      return { text: 'Active', color: 'bg-green-100 text-green-700' };
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const CouponForm = ({ coupon, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(coupon || {
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: 0,
      minimumOrderAmount: 0,
      maximumDiscountAmount: 0,
      usageLimit: 0,
      userUsageLimit: 1,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      isActive: true,
      applicableCategories: [],
      excludedCategories: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    const generateCouponCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setFormData({ ...formData, code: result });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {coupon ? 'Edit Coupon' : 'Create New Coupon'}
            </h2>
            <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code *</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., WELCOME10"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateCouponCode}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    title="Generate Random Code"
                  >
                    🎲
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Welcome Discount"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Brief description of the coupon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                  <option value="free_shipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === 'percentage' ? 'Discount Percentage' : 
                   formData.type === 'fixed' ? 'Discount Amount (₹)' : 'Value'}
                </label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="0"
                  max={formData.type === 'percentage' ? 100 : undefined}
                  disabled={formData.type === 'free_shipping'}
                  required={formData.type !== 'free_shipping'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  value={formData.minimumOrderAmount || ''}
                  onChange={(e) => setFormData({ ...formData, minimumOrderAmount: Number(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="0"
                />
              </div>

              {formData.type === 'percentage' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Discount Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.maximumDiscountAmount || ''}
                    onChange={(e) => setFormData({ ...formData, maximumDiscountAmount: Number(e.target.value) || undefined })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit || ''}
                  onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="0"
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit Per User</label>
                <input
                  type="number"
                  value={formData.userUsageLimit || ''}
                  onChange={(e) => setFormData({ ...formData, userUsageLimit: Number(e.target.value) || undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  min="1"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Applicable Categories</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Yantras', 'Malas', 'Idols', 'Books', 'Incense', 'Crystals'].map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.applicableCategories?.includes(category) || false}
                        onChange={(e) => {
                          const categories = formData.applicableCategories || [];
                          if (e.target.checked) {
                            setFormData({ ...formData, applicableCategories: [...categories, category] });
                          } else {
                            setFormData({ ...formData, applicableCategories: categories.filter(c => c !== category) });
                          }
                        }}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave empty to apply to all categories</p>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
              >
                <Save className="w-5 h-5 mr-2 inline" />
                Save Coupon
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coupon Management</h1>
          <p className="text-gray-600">Create and manage discount coupons for your store</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Coupon
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Coupons</p>
              <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
            </div>
            <Gift className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Coupons</p>
              <p className="text-2xl font-bold text-green-600">
                {coupons.filter(c => c.isActive && c.endDate > new Date()).length}
              </p>
            </div>
            <Percent className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-purple-600">
                {coupons.reduce((sum, c) => sum + c.usageCount, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-orange-600">
                ₹{couponUsages.reduce((sum, u) => sum + u.discountAmount, 0).toLocaleString()}
              </p>
            </div>
            <Gift className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search coupons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
          
          <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Export Coupons
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Coupons ({filteredCoupons.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coupon Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Validity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCoupons.map((coupon) => {
                const status = getCouponStatus(coupon);
                const usagePercentage = coupon.usageLimit ? (coupon.usageCount / coupon.usageLimit) * 100 : 0;
                
                return (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-mono font-bold text-gray-900">{coupon.code}</span>
                          <button
                            onClick={() => copyCouponCode(coupon.code)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="Copy Code"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{coupon.name}</div>
                        <div className="text-sm text-gray-500">{coupon.description}</div>
                        {coupon.applicableCategories && coupon.applicableCategories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {coupon.applicableCategories.slice(0, 2).map((category) => (
                              <span key={category} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {category}
                              </span>
                            ))}
                            {coupon.applicableCategories.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{coupon.applicableCategories.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {coupon.type === 'percentage' && `${coupon.value}%`}
                          {coupon.type === 'fixed' && `₹${coupon.value}`}
                          {coupon.type === 'free_shipping' && 'Free Shipping'}
                        </div>
                        {coupon.minimumOrderAmount && (
                          <div className="text-xs text-gray-500">Min: ₹{coupon.minimumOrderAmount}</div>
                        )}
                        {coupon.maximumDiscountAmount && (
                          <div className="text-xs text-gray-500">Max: ₹{coupon.maximumDiscountAmount}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {coupon.usageCount} / {coupon.usageLimit || '∞'}
                        </div>
                        {coupon.usageLimit && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            />
                          </div>
                        )}
                        {coupon.userUsageLimit && (
                          <div className="text-xs text-gray-500 mt-1">
                            {coupon.userUsageLimit} per user
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(coupon.startDate)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(coupon.endDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedCoupon(coupon)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingCoupon(coupon)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Coupon"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleCouponStatus(coupon.id)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title={coupon.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {coupon.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Coupon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coupon Form Modal */}
      {(showAddForm || editingCoupon) && (
        <CouponForm
          coupon={editingCoupon}
          onSave={handleSaveCoupon}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCoupon(null);
          }}
        />
      )}

      {/* Coupon Details Modal */}
      {selectedCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Coupon Details</h2>
              <button
                onClick={() => setSelectedCoupon(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-gray-900 mb-2">{selectedCoupon.code}</div>
                <div className="text-lg font-medium text-gray-700">{selectedCoupon.name}</div>
                <div className="text-gray-600">{selectedCoupon.description}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Discount</div>
                  <div className="text-lg font-bold text-gray-900">
                    {selectedCoupon.type === 'percentage' && `${selectedCoupon.value}%`}
                    {selectedCoupon.type === 'fixed' && `₹${selectedCoupon.value}`}
                    {selectedCoupon.type === 'free_shipping' && 'Free Shipping'}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Usage</div>
                  <div className="text-lg font-bold text-gray-900">
                    {selectedCoupon.usageCount} / {selectedCoupon.usageLimit || '∞'}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Valid From</div>
                  <div className="text-lg font-bold text-gray-900">{formatDate(selectedCoupon.startDate)}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500">Valid Until</div>
                  <div className="text-lg font-bold text-gray-900">{formatDate(selectedCoupon.endDate)}</div>
                </div>
              </div>

              {selectedCoupon.minimumOrderAmount && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-700">Minimum Order Amount</div>
                  <div className="text-lg font-bold text-blue-900">₹{selectedCoupon.minimumOrderAmount}</div>
                </div>
              )}

              {selectedCoupon.applicableCategories && selectedCoupon.applicableCategories.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Applicable Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCoupon.applicableCategories.map((category) => (
                      <span key={category} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};