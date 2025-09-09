import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, TrendingUp, Filter, Search, Eye, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';
import { CustomerSubscription, ProgressNote } from '../../types/sarthi';

export const SarthiSubscriptionAdmin: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<CustomerSubscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'cancelled' | 'paused'>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<CustomerSubscription | null>(null);
  const [progressNotes, setProgressNotes] = useState<ProgressNote[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Mock data
    setSubscriptions([
      {
        id: 'sub-1',
        userId: 'user-1',
        userName: 'Rahul Sharma',
        userMobile: '9876543210',
        packageId: 'sustainable-1',
        packageName: 'Sustainable Guidance',
        mainCategory: 'Personal',
        subCategory: 'Lack of Purpose/Confusion',
        status: 'active',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        progress: 65,
        totalSessions: 8,
        completedSessions: 5,
        nextReviewDate: new Date('2024-01-25'),
        assignedExpertId: 'expert-1',
        assignedExpertName: 'Dr. Meera Singh',
        paymentStatus: 'completed',
        amount: 750,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-22'),
      },
      {
        id: 'sub-2',
        userId: 'user-2',
        userName: 'Priya Patel',
        userMobile: '9876543211',
        packageId: 'transformation-1',
        packageName: 'Long-term Transformation',
        mainCategory: 'Career',
        subCategory: 'No Hike in Salary',
        status: 'active',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-07-10'),
        progress: 25,
        totalSessions: 24,
        completedSessions: 6,
        nextReviewDate: new Date('2024-01-28'),
        assignedExpertId: 'expert-2',
        assignedExpertName: 'Prof. Amit Kumar',
        paymentStatus: 'completed',
        amount: 2100,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20'),
      },
    ]);

    setProgressNotes([
      {
        id: 'note-1',
        subscriptionId: 'sub-1',
        authorId: 'expert-1',
        authorName: 'Dr. Meera Singh',
        authorType: 'expert',
        content: 'Client showing good progress in self-awareness exercises. Recommended daily meditation practice.',
        sessionNumber: 5,
        progressUpdate: 65,
        actionType: 'session_completed',
        createdAt: new Date('2024-01-22'),
      },
    ]);
  }, []);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = searchTerm === '' || 
      sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.mainCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CustomerSubscription['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddNote = (subscriptionId: string) => {
    if (!newNote.trim()) return;
    
    const note: ProgressNote = {
      id: Date.now().toString(),
      subscriptionId,
      authorId: 'admin-1',
      authorName: 'Admin',
      authorType: 'admin',
      content: newNote.trim(),
      actionType: 'note',
      createdAt: new Date(),
    };
    
    setProgressNotes(prev => [...prev, note]);
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Monitor customer subscriptions and track progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['active', 'completed', 'cancelled', 'paused'].map((status) => {
          const count = subscriptions.filter(s => s.status === status).length;
          const revenue = subscriptions
            .filter(s => s.status === status && s.paymentStatus === 'completed')
            .reduce((sum, s) => sum + s.amount, 0);
          
          return (
            <motion.div
              key={status}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
              onClick={() => setStatusFilter(status as any)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              {revenue > 0 && (
                <p className="text-xs text-green-600 font-medium">₹{revenue.toLocaleString()} revenue</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer, category, or subcategory..."
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Active Subscriptions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer & Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category & Issue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress & Sessions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expert & Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
                      <div className="text-sm text-gray-500">{subscription.userMobile}</div>
                      <div className="text-sm font-medium text-blue-600 mt-1">{subscription.packageName}</div>
                      <div className="text-xs text-gray-400">₹{subscription.amount.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscription.mainCategory}</div>
                      <div className="text-sm text-gray-600">{subscription.subCategory}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${subscription.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{subscription.progress}%</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {subscription.completedSessions}/{subscription.totalSessions} sessions
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscription.assignedExpertName}</div>
                      <div className="text-sm text-gray-500">
                        Ends: {formatDate(subscription.endDate)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {getDaysRemaining(subscription.endDate)} days left
                      </div>
                      {subscription.nextReviewDate && (
                        <div className="text-xs text-blue-600">
                          Next review: {formatDate(subscription.nextReviewDate)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                        {subscription.status}
                      </span>
                      <div className={`text-xs ${
                        subscription.paymentStatus === 'completed' ? 'text-green-600' : 
                        subscription.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        Payment: {subscription.paymentStatus}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedSubscription(subscription)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Progress Notes"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Details Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Subscription Details</h2>
              <button
                onClick={() => setSelectedSubscription(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedSubscription.userName}</p>
                    <p><span className="font-medium">Mobile:</span> {selectedSubscription.userMobile}</p>
                    <p><span className="font-medium">Package:</span> {selectedSubscription.packageName}</p>
                    <p><span className="font-medium">Amount:</span> ₹{selectedSubscription.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full" 
                          style={{ width: `${selectedSubscription.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{selectedSubscription.progress}%</span>
                    </div>
                    <p><span className="font-medium">Sessions:</span> {selectedSubscription.completedSessions}/{selectedSubscription.totalSessions}</p>
                    <p><span className="font-medium">Expert:</span> {selectedSubscription.assignedExpertName}</p>
                  </div>
                </div>
              </div>

              {/* Progress Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Notes</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {progressNotes
                    .filter(note => note.subscriptionId === selectedSubscription.id)
                    .map((note) => (
                      <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{note.authorName}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              note.authorType === 'admin' ? 'bg-blue-100 text-blue-700' : 
                              note.authorType === 'expert' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {note.authorType}
                            </span>
                            {note.actionType && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                {note.actionType.replace('_', ' ')}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{formatDate(note.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{note.content}</p>
                        {note.sessionNumber && (
                          <p className="text-xs text-blue-600 mt-1">Session #{note.sessionNumber}</p>
                        )}
                      </div>
                    ))}
                </div>

                {/* Add Note Form */}
                <div className="mt-4 flex space-x-3">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a progress note..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNote(selectedSubscription.id)}
                  />
                  <button
                    onClick={() => handleAddNote(selectedSubscription.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};