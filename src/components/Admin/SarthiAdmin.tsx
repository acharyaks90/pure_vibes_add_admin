import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MessageSquare, AlertCircle, CheckCircle, Filter, Search, Plus, Eye, Edit, UserCheck, Settings, TrendingUp } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';
import { SarthiRequest, Comment } from '../../types/admin';
import { RequestDetailsModal } from './RequestDetailsModal';
import { SarthiCategoryAdmin } from './SarthiCategoryAdmin';
import { SarthiSubscriptionAdmin } from './SarthiSubscriptionAdmin';

export const SarthiAdmin: React.FC = () => {
  const { sarthiRequests, experts, fetchSarthiRequests, fetchExperts, assignExpert, updateRequestStatus } = useAdmin();
  const [activeTab, setActiveTab] = useState<'requests' | 'subscriptions' | 'categories'>('requests');
  const [selectedRequest, setSelectedRequest] = useState<SarthiRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'unassigned' | 'assigned' | 'scheduled' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);

  useEffect(() => {
    fetchSarthiRequests();
    fetchExperts();
  }, []);

  const getStatusColor = (status: SarthiRequest['status']) => {
    switch (status) {
      case 'unassigned':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: SarthiRequest['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredRequests = sarthiRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = searchTerm === '' || 
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.problemType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleAssignExpert = async (requestId: string, expertId: string) => {
    const success = await assignExpert(requestId, expertId);
    if (success) {
      fetchSarthiRequests();
      setShowAssignModal(null);
    }
  };

  const handleStatusUpdate = async (requestId: string, status: SarthiRequest['status']) => {
    const success = await updateRequestStatus(requestId, status);
    if (success) {
      fetchSarthiRequests();
    }
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

  const getUpcomingMeetings = () => {
    return sarthiRequests.filter(req => 
      req.status === 'scheduled' && 
      req.scheduledDate && 
      new Date(req.scheduledDate) > new Date()
    );
  };

  const getRequestsByStatus = (status: SarthiRequest['status']) => {
    return sarthiRequests.filter(req => req.status === status);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sarthi Management</h1>
        <p className="text-gray-600">Comprehensive management of Sarthi services, subscriptions, and categories</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-2">
          {[
            { id: 'requests', label: 'Problem Requests', icon: MessageSquare },
            { id: 'subscriptions', label: 'Subscriptions', icon: TrendingUp },
            { id: 'categories', label: 'Categories & Packages', icon: Settings },
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

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
        <div>
              <h2 className="text-2xl font-bold text-gray-900">Problem Requests</h2>
              <p className="text-gray-600">Manage individual problem requests and expert assignments</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </div>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <SarthiSubscriptionAdmin />
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <SarthiCategoryAdmin />
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {['unassigned', 'assigned', 'scheduled', 'completed', 'cancelled'].map((status) => {
          const statusRequests = getRequestsByStatus(status as SarthiRequest['status']);
          const count = statusRequests.length;
          const isUrgent = status === 'unassigned';
          const urgentCount = status === 'unassigned' ? statusRequests.filter(r => r.priority === 'urgent').length : 0;
          return (
            <motion.div
              key={status}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer border-l-4 ${
                isUrgent ? 'border-red-500' : 'border-blue-500'
              }`}
              onClick={() => setFilter(status as any)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">{status}</p>
                  <p className={`text-2xl font-bold ${isUrgent && count > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {count}
                  </p>
                  {isUrgent && urgentCount > 0 && (
                    <p className="text-xs text-red-500 font-medium">{urgentCount} urgent</p>
                  )}
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status as any).split(' ')[0]}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name, problem type, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Requests</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => fetchSarthiRequests()}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {viewMode === 'calendar' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
          <div className="space-y-4">
            {getUpcomingMeetings().map((meeting) => (
              <div key={meeting.id} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{meeting.problemType}</h3>
                  <p className="text-sm text-gray-600">{meeting.userName} • {meeting.expertName}</p>
                  <p className="text-sm text-blue-600">{formatDate(meeting.scheduledDate!)}</p>
                </div>
                <button
                  onClick={() => setSelectedRequest(meeting)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
            {getUpcomingMeetings().length === 0 && (
              <p className="text-gray-500 text-center py-8">No upcoming meetings scheduled</p>
            )}
          </div>
        </div>
      )}

      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Request Management</h2>
            <div className="text-sm text-gray-500">
              {filteredRequests.length} of {sarthiRequests.length} requests
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expert Assignment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getPriorityColor(request.priority)}`} />
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">
                            {request.id}
                          </div>
                          <div className="text-sm text-gray-900 font-medium mb-1">
                            {request.problemType}
                          </div>
                          {request.customDescription && (
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {request.customDescription}
                            </div>
                          )}
                          <div className="flex items-center mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(request.priority)} text-white`}>
                              {request.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                        <div className="text-sm text-gray-500">{request.userMobile}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Created: {formatDate(request.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {request.expertName ? (
                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{request.expertName}</div>
                            {request.scheduledDate && (
                              <div className="text-xs text-gray-500">
                                Meeting: {formatDate(request.scheduledDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAssignModal(request.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                        >
                          <UserCheck className="w-4 h-4" />
                          <span>Assign Expert</span>
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <div className="text-xs text-gray-500">
                          Updated: {formatDate(request.updatedAt)}
                        </div>
                        <div className={`text-xs ${
                          request.paymentStatus === 'completed' ? 'text-green-600' : 
                          request.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          Payment: {request.paymentStatus}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusUpdate(request.id, e.target.value as SarthiRequest['status'])}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="unassigned">Unassigned</option>
                            <option value="assigned">Assigned</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No requests found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Expert Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign Expert</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {experts.filter(e => e.isActive).map((expert) => (
                <button
                  key={expert.id}
                  onClick={() => handleAssignExpert(showAssignModal, expert.id)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{expert.name}</div>
                  <div className="text-sm text-gray-600">{expert.specialization.join(', ')}</div>
                  <div className="text-xs text-gray-500">
                    {expert.experience} years • Rating: {expert.rating}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAssignModal(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          experts={experts}
          onClose={() => setSelectedRequest(null)}
          onAssignExpert={handleAssignExpert}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </div>
  );
};