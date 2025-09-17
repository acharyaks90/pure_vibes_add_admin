import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CreditCard, Filter, Search, MapPin, Eye, MessageSquare, Edit, Plus, User, Settings } from 'lucide-react';
import { KavachProductAdmin } from './KavachProductAdmin';
import { KavachCouponAdmin } from './KavachCouponAdmin';

interface KavachOrder {
  id: string;
  userId: string;
  userName: string;
  userMobile: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    vendor?: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'refunded';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  orderDate: Date;
  deliveryDate?: Date;
  trackingId?: string;
  vendor: string;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    type: 'admin' | 'vendor' | 'customer';
  }>;
}

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  totalOrders: number;
  rating: number;
}

export const KavachAdmin: React.FC = () => {
  const [orders, setOrders] = useState<KavachOrder[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<KavachOrder | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'coupons'>('orders');

  useEffect(() => {
    // Mock data - in a real app, this would come from your backend
    setOrders([
      {
        id: 'K001',
        userId: 'user-1',
        userName: 'Rahul Sharma',
        userMobile: '9876543210',
        items: [
          {
            productId: 'prod-1',
            name: 'Sacred Ganesha Yantra',
            quantity: 1,
            price: 299,
            vendor: 'Spiritual Store Delhi'
          },
        ],
        total: 299,
        status: 'delivered',
        paymentStatus: 'completed',
        shippingAddress: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
        orderDate: new Date('2024-01-10T12:00:00Z'),
        deliveryDate: new Date('2024-01-15T16:00:00Z'),
        trackingId: 'TRK123456789',
        vendor: 'Spiritual Store Delhi',
        comments: [
          {
            id: 'c1',
            author: 'Admin',
            content: 'Order confirmed and forwarded to vendor.',
            timestamp: new Date('2024-01-10T13:00:00Z'),
            type: 'admin'
          }
        ]
      },
      {
        id: 'K002',
        userId: 'user-2',
        userName: 'Priya Patel',
        userMobile: '9876543211',
        items: [
          {
            productId: 'prod-2',
            name: 'Rudraksha Mala 108 Beads',
            quantity: 1,
            price: 899,
            vendor: 'Sacred Items Mumbai'
          },
          {
            productId: 'prod-3',
            name: 'Sri Chakra Crystal Yantra',
            quantity: 1,
            price: 1299,
            vendor: 'Sacred Items Mumbai'
          },
        ],
        total: 2198,
        status: 'shipped',
        paymentStatus: 'completed',
        shippingAddress: {
          street: '456 Park Avenue',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
        },
        orderDate: new Date('2024-01-18T14:30:00Z'),
        trackingId: 'TRK987654321',
        vendor: 'Sacred Items Mumbai',
        comments: []
      },
    ]);

    setVendors([
      {
        id: 'vendor-1',
        name: 'Spiritual Store Delhi',
        email: 'contact@spiritualstore.com',
        phone: '9876543220',
        address: 'Karol Bagh, New Delhi',
        isActive: true,
        totalOrders: 45,
        rating: 4.5
      },
      {
        id: 'vendor-2',
        name: 'Sacred Items Mumbai',
        email: 'info@sacreditems.com',
        phone: '9876543221',
        address: 'Dadar, Mumbai',
        isActive: true,
        totalOrders: 32,
        rating: 4.8
      }
    ]);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: KavachOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: KavachOrder['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const handleAddComment = (orderId: string) => {
    if (!newComment.trim()) return;
    
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? {
            ...order,
            comments: [...order.comments, {
              id: Date.now().toString(),
              author: 'Admin',
              content: newComment.trim(),
              timestamp: new Date(),
              type: 'admin' as const
            }]
          }
        : order
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kavach Management</h1>
        <p className="text-gray-600">Manage spiritual merchandise orders, vendors, and deliveries</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-2">
          {[
            { id: 'orders', label: 'Order Management', icon: Package },
            { id: 'products', label: 'Product Management', icon: Settings },
            { id: 'coupons', label: 'Coupon Management', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
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

      {activeTab === 'products' && <KavachProductAdmin />}

      {activeTab === 'coupons' && <KavachCouponAdmin />}

      {activeTab === 'orders' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => {
              const count = orders.filter(o => o.status === status).length;
              const revenue = orders
                .filter(o => o.status === status && o.paymentStatus === 'completed')
                .reduce((sum, o) => sum + o.total, 0);
              
              return (
                <motion.div
                  key={status}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer border-l-4 border-orange-500"
                  onClick={() => setStatusFilter(status as any)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                      <p className="text-2xl font-bold text-gray-900">{count}</p>
                    </div>
                    <Package className="w-8 h-8 text-orange-600" />
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
                  placeholder="Search by customer, order ID, tracking ID, or vendor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Product Orders</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items & Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment & Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{formatDate(order.orderDate)}</div>
                          <div className="text-xs text-gray-400">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.userName}</div>
                          <div className="text-sm text-gray-500">{order.userMobile}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-gray-900">{item.name}</span>
                              <span className="text-gray-500 ml-2">x{item.quantity}</span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{order.items.length - 2} more items
                            </div>
                          )}
                          <div className="text-xs text-blue-600 font-medium">
                            Vendor: {order.vendor}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-900">₹{order.total.toLocaleString()}</div>
                          <div className={`text-xs ${
                            order.paymentStatus === 'completed' ? 'text-green-600' : 
                            order.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            Payment: {order.paymentStatus}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          {order.deliveryDate && (
                            <div className="text-xs text-gray-500">
                              Delivered: {formatDate(order.deliveryDate)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {order.trackingId ? (
                          <div className="text-sm font-mono text-gray-900">{order.trackingId}</div>
                        ) : (
                          <span className="text-sm text-gray-500">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowComments(order.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors relative"
                            title="Comments"
                          >
                            <MessageSquare className="w-4 h-4" />
                            {order.comments.length > 0 && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {order.comments.length}
                              </span>
                            )}
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value as KavachOrder['status'])}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
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
        </>
      )}


      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Order ID</label>
                  <p className="text-gray-900 font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Customer</label>
                  <p className="text-gray-900">{selectedOrder.userName}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.userMobile}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Vendor</label>
                  <p className="text-gray-900">{selectedOrder.vendor}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Order Date</label>
                  <p className="text-gray-900">{formatDate(selectedOrder.orderDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="text-gray-900 font-bold">₹{selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-3">Items Ordered</label>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Shipping Address</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                    PIN: {selectedOrder.shippingAddress.pincode}
                  </p>
                </div>
              </div>

              {selectedOrder.trackingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Tracking ID</label>
                  <p className="text-gray-900 font-mono">{selectedOrder.trackingId}</p>
                </div>
              )}
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
              <h2 className="text-xl font-bold text-gray-900">Order Comments</h2>
              <button
                onClick={() => setShowComments(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {orders.find(o => o.id === showComments)?.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          comment.type === 'admin' ? 'bg-blue-100 text-blue-700' :
                          comment.type === 'vendor' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {comment.type}
                        </span>
                      </div>
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(showComments)}
                />
                <button
                  onClick={() => handleAddComment(showComments)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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