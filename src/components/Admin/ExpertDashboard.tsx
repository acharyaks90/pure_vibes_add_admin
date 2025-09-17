import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Video, MessageSquare, CheckCircle, XCircle, RotateCcw, LogOut, Bell, Star } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import { ExpertSession } from '../../types/expert';

export const ExpertDashboard: React.FC = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<ExpertSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ExpertSession | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled'>('all');
  const [rescheduleModal, setRescheduleModal] = useState<ExpertSession | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');

  useEffect(() => {
    if (admin?.expertId) {
      // Mock sessions data for the expert
      setSessions([
        {
          id: 'session-1',
          requestId: 'SR001',
          customerId: 'user-1',
          customerName: 'Rahul Sharma',
          customerMobile: '9876543210',
          expertId: admin.expertId,
          expertName: admin.name,
          sessionType: 'sarthi',
          problemType: 'Career Growth & Job Issues',
          scheduledDate: new Date('2024-01-25T15:00:00Z'),
          duration: 1,
          status: 'scheduled',
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          amount: 500,
          paymentStatus: 'completed',
          createdAt: new Date('2024-01-20T10:00:00Z'),
          updatedAt: new Date('2024-01-20T10:00:00Z'),
        },
        {
          id: 'session-2',
          requestId: 'BR001',
          customerId: 'user-2',
          customerName: 'Priya Patel',
          customerMobile: '9876543211',
          expertId: admin.expertId,
          expertName: admin.name,
          sessionType: 'brahma',
          astrologicalService: 'Birth Chart Reading',
          scheduledDate: new Date('2024-01-22T11:00:00Z'),
          duration: 1.5,
          status: 'completed',
          amount: 1200,
          paymentStatus: 'completed',
          notes: 'Detailed birth chart analysis provided. Customer satisfied with insights.',
          createdAt: new Date('2024-01-18T14:30:00Z'),
          updatedAt: new Date('2024-01-22T12:30:00Z'),
        },
        {
          id: 'session-3',
          requestId: 'SR002',
          customerId: 'user-3',
          customerName: 'Amit Kumar',
          customerMobile: '9876543212',
          expertId: admin.expertId,
          expertName: admin.name,
          sessionType: 'sarthi',
          problemType: 'Relationship Issues',
          scheduledDate: new Date('2024-01-28T16:00:00Z'),
          duration: 1,
          status: 'scheduled',
          amount: 500,
          paymentStatus: 'completed',
          createdAt: new Date('2024-01-23T09:00:00Z'),
          updatedAt: new Date('2024-01-23T09:00:00Z'),
        },
      ]);
    }
  }, [admin]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleStatusUpdate = (sessionId: string, newStatus: ExpertSession['status']) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: newStatus, updatedAt: new Date() }
        : session
    ));
  };

  const handleReschedule = () => {
    if (!rescheduleModal || !rescheduleDate || !rescheduleReason) return;

    setSessions(prev => prev.map(session => 
      session.id === rescheduleModal.id 
        ? { 
            ...session, 
            status: 'rescheduled',
            scheduledDate: new Date(rescheduleDate),
            rescheduleReason,
            rescheduleHistory: [
              ...(session.rescheduleHistory || []),
              {
                oldDate: session.scheduledDate,
                newDate: new Date(rescheduleDate),
                reason: rescheduleReason,
                timestamp: new Date(),
              }
            ],
            updatedAt: new Date()
          }
        : session
    ));

    setRescheduleModal(null);
    setRescheduleDate('');
    setRescheduleReason('');
  };

  const filteredSessions = sessions.filter(session => 
    statusFilter === 'all' || session.status === statusFilter
  );

  const getStatusColor = (status: ExpertSession['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'rescheduled':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const getUpcomingSessions = () => {
    const now = new Date();
    return sessions.filter(session => 
      session.status === 'scheduled' && new Date(session.scheduledDate) > now
    ).sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
  };

  const getTodaySessions = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return sessions.filter(session => {
      const sessionDate = new Date(session.scheduledDate);
      return sessionDate >= today && sessionDate < tomorrow;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Expert Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {admin?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3 px-4 py-2 bg-slate-50 rounded-lg">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
                  <p className="text-xs text-gray-600">Expert</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                <p className="text-2xl font-bold text-green-600">{getTodaySessions().length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">
                  {sessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-yellow-600">4.8</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {getUpcomingSessions().slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {session.sessionType === 'sarthi' ? (
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Star className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{session.customerName}</h3>
                    <p className="text-sm text-gray-600">
                      {session.problemType || session.astrologicalService}
                    </p>
                    <p className="text-sm text-blue-600">{formatDate(session.scheduledDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {session.meetingLink && (
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Video className="w-4 h-4 inline mr-1" />
                      Join
                    </a>
                  )}
                  <button
                    onClick={() => setRescheduleModal(session)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4 inline mr-1" />
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
            {getUpcomingSessions().length === 0 && (
              <p className="text-gray-500 text-center py-8">No upcoming sessions scheduled</p>
            )}
          </div>
        </div>

        {/* All Sessions */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">All Sessions</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer & Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration & Amount
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
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{session.customerName}</div>
                        <div className="text-sm text-gray-500">{session.customerMobile}</div>
                        <div className="text-sm text-blue-600">
                          {session.problemType || session.astrologicalService}
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          session.sessionType === 'sarthi' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {session.sessionType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(session.scheduledDate)}</div>
                      {session.rescheduleHistory && session.rescheduleHistory.length > 0 && (
                        <div className="text-xs text-purple-600">
                          Rescheduled {session.rescheduleHistory.length} time(s)
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{session.duration} hour(s)</div>
                      <div className="text-sm font-medium text-green-600">₹{session.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {session.status === 'scheduled' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(session.id, 'in-progress')}
                              className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-xs"
                            >
                              Start
                            </button>
                            <button
                              onClick={() => setRescheduleModal(session)}
                              className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs"
                            >
                              Reschedule
                            </button>
                          </>
                        )}
                        {session.status === 'in-progress' && (
                          <button
                            onClick={() => handleStatusUpdate(session.id, 'completed')}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs"
                          >
                            Complete
                          </button>
                        )}
                        {session.meetingLink && session.status !== 'completed' && session.status !== 'cancelled' && (
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
                          >
                            Join
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedSession(session)}
                          className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reschedule Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Date & Time</label>
                <input
                  type="datetime-local"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Reschedule</label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide a reason for rescheduling..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setRescheduleModal(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                disabled={!rescheduleDate || !rescheduleReason}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reschedule
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Session Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
              <button
                onClick={() => setSelectedSession(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Customer</label>
                  <p className="text-gray-900 font-medium">{selectedSession.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedSession.customerMobile}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Service Type</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedSession.sessionType === 'sarthi' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedSession.sessionType}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Service</label>
                  <p className="text-gray-900">{selectedSession.problemType || selectedSession.astrologicalService}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Duration & Amount</label>
                  <p className="text-gray-900">{selectedSession.duration} hours • ₹{selectedSession.amount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Scheduled Date</label>
                  <p className="text-gray-900">{formatDate(selectedSession.scheduledDate)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedSession.status)}`}>
                    {selectedSession.status}
                  </span>
                </div>
              </div>

              {selectedSession.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Session Notes</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedSession.notes}</p>
                  </div>
                </div>
              )}

              {selectedSession.rescheduleHistory && selectedSession.rescheduleHistory.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Reschedule History</label>
                  <div className="space-y-2">
                    {selectedSession.rescheduleHistory.map((reschedule, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-900">
                          <strong>From:</strong> {formatDate(reschedule.oldDate)} → <strong>To:</strong> {formatDate(reschedule.newDate)}
                        </p>
                        <p className="text-sm text-purple-700 mt-1">
                          <strong>Reason:</strong> {reschedule.reason}
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          {formatDate(reschedule.timestamp)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSession.meetingLink && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Meeting Link</label>
                  <a
                    href={selectedSession.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Meeting
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};