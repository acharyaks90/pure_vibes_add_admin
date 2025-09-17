import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Star, Phone, Mail, Filter, Search, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Expert } from '../../types/admin';
import { useAdmin } from '../../hooks/useAdmin';

export const ExpertsAdmin: React.FC = () => {
  const { admin } = useAdmin();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Mock data - in a real app, this would come from your backend
    setExperts([
      {
        id: 'expert-1',
        name: 'Dr. Meera Singh',
        email: 'meera@experts.com',
        mobile: '9876543220',
        specialization: ['Relationship Counseling', 'Family Issues'],
        experience: 12,
        rating: 4.8,
        isActive: true,
        totalAssignments: 156,
        completedAssignments: 142,
      },
      {
        id: 'expert-2',
        name: 'Prof. Amit Kumar',
        email: 'amit@experts.com',
        mobile: '9876543221',
        specialization: ['Career Guidance', 'Business Consulting'],
        experience: 15,
        rating: 4.9,
        isActive: true,
        totalAssignments: 203,
        completedAssignments: 195,
      },
      {
        id: 'expert-3',
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh@experts.com',
        mobile: '9876543222',
        specialization: ['Mental Health', 'Stress Management'],
        experience: 8,
        rating: 4.6,
        isActive: false,
        totalAssignments: 89,
        completedAssignments: 82,
      },
    ]);
  }, []);

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = searchTerm === '' || 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && expert.isActive) ||
      (statusFilter === 'inactive' && !expert.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSaveExpert = (expertData: Partial<Expert>) => {
    if (editingExpert) {
      setExperts(prev => prev.map(e => 
        e.id === editingExpert.id 
          ? { ...e, ...expertData }
          : e
      ));
    } else {
      const newExpert: Expert = {
        id: Date.now().toString(),
        name: expertData.name || '',
        email: expertData.email || '',
        mobile: expertData.mobile || '',
        specialization: expertData.specialization || [],
        experience: expertData.experience || 0,
        rating: 0,
        isActive: expertData.isActive ?? true,
        totalAssignments: 0,
        completedAssignments: 0,
      };
      setExperts(prev => [...prev, newExpert]);
    }
    setEditingExpert(null);
    setShowAddForm(false);
  };

  const handleDeleteExpert = (expertId: string) => {
    if (confirm('Are you sure you want to delete this expert?')) {
      setExperts(prev => prev.filter(e => e.id !== expertId));
    }
  };

  const toggleExpertStatus = (expertId: string) => {
    setExperts(prev => prev.map(e => 
      e.id === expertId 
        ? { ...e, isActive: !e.isActive }
        : e
    ));
  };

  const ExpertForm = ({ expert, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(expert || {
      name: '',
      email: '',
      mobile: '',
      specialization: [],
      experience: 0,
      isActive: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {expert ? 'Edit Expert' : 'Add New Expert'}
            </h2>
            <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile *</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years) *</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization (comma separated) *</label>
                <input
                  type="text"
                  value={Array.isArray(formData.specialization) ? formData.specialization.join(', ') : ''}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Relationship Counseling, Career Guidance"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-5 h-5 mr-2 inline" />
                Save Expert
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expert Management</h1>
          <p className="text-gray-600">Manage Sarthi experts and their assignments</p>
        </div>
        {admin?.role === 'super-admin' && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Expert
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Experts</p>
              <p className="text-2xl font-bold text-gray-900">{experts.length}</p>
            </div>
            <UserCheck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Experts</p>
              <p className="text-2xl font-bold text-green-600">{experts.filter(e => e.isActive).length}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(experts.reduce((sum, e) => sum + e.rating, 0) / experts.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-purple-600">
                {experts.reduce((sum, e) => sum + e.totalAssignments, 0)}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Experts</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Experts Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Expert List</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expert
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
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
              {filteredExperts.map((expert) => (
                <tr key={expert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{expert.name}</div>
                      <div className="text-sm text-gray-500">{expert.experience} years experience</div>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{expert.rating}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {expert.mobile}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {expert.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {expert.specialization.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Total: {expert.totalAssignments}</div>
                      <div>Completed: {expert.completedAssignments}</div>
                      <div className="text-xs text-gray-500">
                        Success Rate: {Math.round((expert.completedAssignments / expert.totalAssignments) * 100)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      expert.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {expert.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {admin?.role === 'super-admin' && (
                        <>
                          <button
                            onClick={() => setEditingExpert(expert)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Expert"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleExpertStatus(expert.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              expert.isActive 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            } transition-colors`}
                          >
                            {expert.isActive ? 'Active' : 'Inactive'}
                          </button>
                          <button
                            onClick={() => handleDeleteExpert(expert.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Expert"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expert Form Modal */}
      {(showAddForm || editingExpert) && (
        <ExpertForm
          expert={editingExpert}
          onSave={handleSaveExpert}
          onCancel={() => {
            setShowAddForm(false);
            setEditingExpert(null);
          }}
        />
      )}
    </div>
  );
};