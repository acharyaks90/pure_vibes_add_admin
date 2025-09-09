import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, User, Clock, MessageSquare, UserCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { SarthiRequest, Expert, Comment } from '../../types/admin';
import { useAdmin } from '../../hooks/useAdmin';

interface RequestDetailsModalProps {
  request: SarthiRequest;
  experts: Expert[];
  onClose: () => void;
  onAssignExpert: (requestId: string, expertId: string) => Promise<void>;
  onUpdateStatus: (requestId: string, status: SarthiRequest['status']) => Promise<void>;
}

export const RequestDetailsModal: React.FC<RequestDetailsModalProps> = ({
  request,
  experts,
  onClose,
  onAssignExpert,
  onUpdateStatus,
}) => {
  const { getComments, addComment } = useAdmin();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedExpert, setSelectedExpert] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(request.status);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, [request.id]);

  const loadComments = async () => {
    const requestComments = await getComments(request.id);
    setComments(requestComments);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    const success = await addComment(request.id, newComment.trim(), 'note');
    if (success) {
      setNewComment('');
      loadComments();
    }
    setIsLoading(false);
  };

  const handleAssignExpert = async () => {
    if (!selectedExpert) return;
    
    setIsLoading(true);
    await onAssignExpert(request.id, selectedExpert);
    await addComment(request.id, `Assigned to ${experts.find(e => e.id === selectedExpert)?.name}`, 'assignment');
    loadComments();
    setIsLoading(false);
  };

  const handleStatusUpdate = async () => {
    if (selectedStatus === request.status) return;
    
    setIsLoading(true);
    await onUpdateStatus(request.id, selectedStatus);
    await addComment(request.id, `Status changed to ${selectedStatus}`, 'status_change');
    loadComments();
    setIsLoading(false);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-5rem)]">
          {/* Left Panel - Request Info */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {request.userName}</p>
                  <p><span className="font-medium">Mobile:</span> {request.userMobile}</p>
                  <p><span className="font-medium">Request ID:</span> {request.id}</p>
                </div>
              </div>

              {/* Problem Details */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Problem Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Type:</span> {request.problemType}</p>
                  {request.customDescription && (
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="mt-1 text-gray-700">{request.customDescription}</p>
                    </div>
                  )}
                  <p><span className="font-medium">Priority:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                  </p>
                </div>
              </div>

              {/* Assignment */}
              <div className="bg-yellow-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Expert Assignment
                </h3>
                <div className="space-y-3">
                  <select
                    value={selectedExpert}
                    onChange={(e) => setSelectedExpert(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Expert</option>
                    {experts.filter(e => e.isActive).map((expert) => (
                      <option key={expert.id} value={expert.id}>
                        {expert.name} - {expert.specialization.join(', ')}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAssignExpert}
                    disabled={!selectedExpert || isLoading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Assign Expert
                  </button>
                </div>
              </div>

              {/* Status Update */}
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Status Management
                </h3>
                <div className="space-y-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as SarthiRequest['status'])}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="unassigned">Unassigned</option>
                    <option value="assigned">Assigned</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={selectedStatus === request.status || isLoading}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Status
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Timeline
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Created:</span> {formatDate(request.createdAt)}</p>
                  <p><span className="font-medium">Last Updated:</span> {formatDate(request.updatedAt)}</p>
                  {request.scheduledDate && (
                    <p><span className="font-medium">Scheduled:</span> {formatDate(request.scheduledDate)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Comments */}
          <div className="w-1/2 p-6 flex flex-col">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Comments & Actions
            </h3>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{comment.authorName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        comment.authorType === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {comment.authorType}
                      </span>
                      {comment.actionType && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                          {comment.actionType.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment or action note..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <button
                type="submit"
                disabled={!newComment.trim() || isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};