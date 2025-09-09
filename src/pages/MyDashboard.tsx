import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Package, Star, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SarthiBooking {
  id: string;
  problemType: string;
  status: 'pending' | 'assigned' | 'scheduled' | 'completed';
  expertName?: string;
  scheduledDate?: string;
  createdAt: string;
  amount: number;
}

interface BrahmaSession {
  id: string;
  astrologerName: string;
  astrologerImage: string;
  appointmentDate: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  specialization: string[];
}

interface KavachOrder {
  id: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  trackingId?: string;
}

export const MyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'sarthi' | 'brahma' | 'kavach'>('overview');

  // Mock data - in a real app, this would come from your backend
  const sarthiBookings: SarthiBooking[] = [
    {
      id: 'S001',
      problemType: 'Career Growth & Job Issues',
      status: 'completed',
      expertName: 'Dr. Rajesh Kumar',
      scheduledDate: '2024-01-15T10:00:00Z',
      createdAt: '2024-01-14T09:00:00Z',
      amount: 500,
    },
  ];

  const brahmaSessions: BrahmaSession[] = [
    {
      id: 'B001',
      astrologerName: 'Pandit Rajesh Sharma',
      astrologerImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      appointmentDate: '2024-01-20T14:00:00Z',
      duration: 1,
      status: 'confirmed',
      amount: 1200,
      specialization: ['Vedic Astrology', 'Marriage', 'Career'],
    },
  ];

  const kavachOrders: KavachOrder[] = [
    {
      id: 'K001',
      items: [
        {
          name: 'Sacred Ganesha Yantra',
          quantity: 1,
          price: 299,
          image: 'https://images.pexels.com/photos/8107475/pexels-photo-8107475.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ],
      total: 299,
      status: 'delivered',
      orderDate: '2024-01-10T12:00:00Z',
      deliveryDate: '2024-01-15T16:00:00Z',
      trackingId: 'TRK123456789',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'confirmed':
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sarthi', label: 'Sarthi' },
    { id: 'brahma', label: 'Brahma' },
    { id: 'kavach', label: 'Kavach' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Dashboard</h1>
          <p className="text-lg text-gray-600">Track your bookings, sessions, and orders</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{sarthiBookings.length}</h3>
                    <p className="text-gray-600">Sarthi Consultations</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔮</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{brahmaSessions.length}</h3>
                    <p className="text-gray-600">Brahma Sessions</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{kavachOrders.length}</h3>
                    <p className="text-gray-600">Kavach Orders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {kavachOrders.map((order) => (
                  <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Package className="w-8 h-8 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Order #{order.id} delivered</p>
                      <p className="text-sm text-gray-600">{formatDate(order.deliveryDate!)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
                {sarthiBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Sarthi consultation completed</p>
                      <p className="text-sm text-gray-600">{formatDate(booking.scheduledDate!)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Sarthi Tab */}
        {activeTab === 'sarthi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {sarthiBookings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Sarthi Consultations Yet</h3>
                <p className="text-gray-600 mb-6">Book your first consultation to get expert help with your problems</p>
                <button
                  onClick={() => navigate('/sarthi')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sarthiBookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{booking.problemType}</h3>
                        <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Booked: {formatDate(booking.createdAt)}
                        </span>
                      </div>
                      {booking.scheduledDate && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Session: {formatDate(booking.scheduledDate)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">₹{booking.amount}</span>
                      </div>
                    </div>

                    {booking.expertName && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Expert Assigned:</p>
                        <p className="font-medium text-gray-900">{booking.expertName}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Brahma Tab */}
        {activeTab === 'brahma' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {brahmaSessions.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Astrology Sessions Yet</h3>
                <p className="text-gray-600 mb-6">Book your first session with our certified astrologers</p>
                <button
                  onClick={() => navigate('/brahma')}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Book Session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {brahmaSessions.map((session) => (
                  <div key={session.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={session.astrologerImage}
                        alt={session.astrologerName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{session.astrologerName}</h3>
                            <p className="text-sm text-gray-600">Session ID: {session.id}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {session.specialization.map((spec) => (
                            <span
                              key={spec}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {formatDate(session.appointmentDate)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {session.duration} hour{session.duration > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">₹{session.amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Kavach Tab */}
        {activeTab === 'kavach' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {kavachOrders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-600 mb-6">Browse our spiritual merchandise collection</p>
                <button
                  onClick={() => navigate('/kavach')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {kavachOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">
                          Ordered on {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-medium text-gray-900">₹{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">Total Amount:</span>
                        <span className="text-lg font-bold text-gray-900">₹{order.total}</span>
                      </div>
                      
                      {order.trackingId && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>Tracking ID: {order.trackingId}</span>
                        </div>
                      )}
                      
                      {order.deliveryDate && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Package className="w-4 h-4" />
                          <span>Delivered on {formatDate(order.deliveryDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};