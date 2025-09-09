import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Star, CreditCard, Filter, Search, Eye, Edit, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

interface BrahmaBooking {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  astrologerId: string;
  astrologerName: string;
  appointmentDate: Date;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'refunded';
  createdAt: Date;
  specialization: string[];
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    type: 'admin' | 'astrologer' | 'customer';
  }>;
}

export const BrahmaAdmin: React.FC = () => {
  const [bookings, setBookings] = useState<BrahmaBooking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<BrahmaBooking | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Mock data - in a real app, this would come from your backend
    setBookings([
      {
        id: 'BR001',
        userId: 'user-1',
        userName: 'Priya Patel',
        userMobile: '9876543211',
        astrologerId: 'ast-1',
        astrologerName: 'Pandit Rajesh Sharma',
        appointmentDate: new Date('2024-01-22T15:00:00Z'),
        duration: 1,
        status: 'confirmed',
        amount: 1200,
        paymentStatus: 'completed',
        createdAt: new Date('2024-01-20T10:00:00Z'),
        specialization: ['Vedic Astrology', 'Marriage', 'Career'],
        comments: [
          {
            id: 'c1',
            author: 'Admin',
            content: 'Booking confirmed. Customer payment verified.',
            timestamp: new Date('2024-01-20T10:30:00Z'),
            type: 'admin'
          }
        ]
      },
      {
        id: 'BR002',
        userId: 'user-3',
        userName: 'Amit Kumar',
        userMobile: '9876543212',
        astrologerId: 'ast-2',
        astrologerName: 'Astrologer Priya Devi',
        appointmentDate: new Date('2024-01-23T11:00:00Z'),
        duration: 1.5,
        status: 'pending',
        amount: 1800,
        paymentStatus: 'pending',
        createdAt: new Date('2024-01-21T14:30:00Z'),
        specialization: ['Numerology', 'Palmistry', 'Love Life'],
        comments: []
      },
    ]);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.astrologerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: BrahmaBooking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleStatusUpdate = (bookingId: string, newStatus: BrahmaBooking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const handleAddComment = (bookingId: string) => {
    if (!newComment.trim()) return;
    
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? {
            ...booking,
            comments: [...booking.comments, {
              id: Date.now().toString(),
              author: 'Admin',
              content: newComment.trim(),
              timestamp: new Date(),
              type: 'admin' as const
            }]
          }
        : booking
    ));
    setNewComment('');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Brahma Management</h1>
        <p className="text-gray-600">Manage astrology consultations and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => {
          const count = bookings.filter(b => b.status === status).length;
          const revenue = bookings
            .filter(b => b.status === status && b.paymentStatus === 'completed')
            .reduce((sum, b) => sum + b.amount, 0);
          
          return (
            <motion.div
              key={status}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer border-l-4 border-purple-500"
              onClick={() => setStatusFilter(status as any)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              {revenue > 0 && (
                <p className="text-xs text-green-600 font-medium">₹{revenue.toLocaleString()} revenue</p>
              )}
              <div className="mt-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status as any).split(' ')[0]}`} />
              </div>
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
              placeholder="Search by customer, astrologer, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Astrology Bookings</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Astrologer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                      <div className="text-sm text-gray-500">
                        {booking.duration} hour{booking.duration > 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-400">
                        Booked: {formatDate(booking.createdAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                      <div className="text-sm text-gray-500">{booking.userMobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.astrologerName}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {booking.specialization.slice(0, 2).map((spec) => (
                          <span
                            key={spec}
                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.appointmentDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900">₹{booking.amount.toLocaleString()}</div>
                      <div className={`text-xs ${
                        booking.paymentStatus === 'completed' ? 'text-green-600' : 
                        booking.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        Payment: {booking.paymentStatus}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowComments(booking.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors relative"
                        title="Comments"
                      >
                        <MessageSquare className="w-4 h-4" />
                        {booking.comments.length > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {booking.comments.length}
                          </span>
                        )}
                      </button>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BrahmaBooking['status'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Booking ID</label>
                  <p className="text-gray-900 font-medium">{selectedBooking.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Customer</label>
                  <p className="text-gray-900">{selectedBooking.userName}</p>
                  <p className="text-sm text-gray-600">{selectedBooking.userMobile}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Astrologer</label>
                  <p className="text-gray-900">{selectedBooking.astrologerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Appointment</label>
                  <p className="text-gray-900">{formatDate(selectedBooking.appointmentDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Duration & Amount</label>
                  <p className="text-gray-900">{selectedBooking.duration} hours • ₹{selectedBooking.amount}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {selectedBooking.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Comments</h2>
              <button
                onClick={() => setShowComments(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {bookings.find(b => b.id === showComments)?.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(showComments)}
                />
                <button
                  onClick={() => handleAddComment(showComments)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};