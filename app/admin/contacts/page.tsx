"use client";

import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaArchive,
  FaTrash,
  FaFilter,
  FaSort,
  FaChevronDown,
  FaArrowLeft,
  FaInbox,
  FaCheck,
  FaClock,
  FaFolder,
  FaSearch,
  FaExclamationTriangle
} from "react-icons/fa";
import { ContactMessagesService, ContactMessage, ContactFilters } from "../../lib/contactMessagesService";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filters, setFilters] = useState<ContactFilters>({ status: 'all', sortBy: 'newest' });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageCounts, setMessageCounts] = useState({
    total: 0,
    unread: 0,
    read: 0,
    archived: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Load messages
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const [messagesData, countsData] = await Promise.all([
        ContactMessagesService.getContactMessages(filters),
        ContactMessagesService.getMessageCounts()
      ]);
      setMessages(messagesData);
      setMessageCounts(countsData);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [filters]);

  // Filter messages by search term
  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle message actions
  const handleMarkAsRead = async (messageId: string) => {
    try {
      setActionLoading(messageId);
      await ContactMessagesService.markAsRead(messageId);
      await loadMessages();
      if (selectedMessage?.$id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
      }
    } catch (err) {
      console.error('Error marking message as read:', err);
      setError('Failed to mark message as read.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkAsUnread = async (messageId: string) => {
    try {
      setActionLoading(messageId);
      await ContactMessagesService.markAsUnread(messageId);
      await loadMessages();
      if (selectedMessage?.$id === messageId) {
        setSelectedMessage(prev => prev ? { ...prev, isRead: false } : null);
      }
    } catch (err) {
      console.error('Error marking message as unread:', err);
      setError('Failed to mark message as unread.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleArchive = async (messageId: string) => {
    try {
      setActionLoading(messageId);
      await ContactMessagesService.archiveMessage(messageId);
      await loadMessages();
      if (selectedMessage?.$id === messageId) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error archiving message:', err);
      setError('Failed to archive message.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) {
      return;
    }
    
    try {
      setActionLoading(messageId);
      await ContactMessagesService.deleteMessage(messageId);
      await loadMessages();
      if (selectedMessage?.$id === messageId) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    // Auto-mark as read when viewing
    if (!message.isRead) {
      handleMarkAsRead(message.$id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (message: ContactMessage) => {
    if (message.isArchived) return <FaFolder className="w-4 h-4 text-gray-500" />;
    if (message.isRead) return <FaEye className="w-4 h-4 text-green-500" />;
    return <FaEnvelope className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/admin" className="mr-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <FaArrowLeft className="w-4 h-4 text-gray-600" />
              </Link>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <FaInbox className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Contact Messages</h1>
                <p className="text-sm text-gray-600">Manage customer inquiries and messages</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <FaFilter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                <FaChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center">
              <FaExclamationTriangle className="mr-3 text-lg flex-shrink-0" />
              <span className="font-medium">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FaInbox className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{messageCounts.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FaClock className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-xl font-bold text-blue-600">{messageCounts.unread}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FaCheck className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Read</p>
                <p className="text-xl font-bold text-green-600">{messageCounts.read}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FaFolder className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Archived</p>
                <p className="text-xl font-bold text-gray-600">{messageCounts.archived}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search messages..."
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Messages ({filteredMessages.length})
                </h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading messages...</p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <FaInbox className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.$id}
                      onClick={() => handleSelectMessage(message)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedMessage?.$id === message.$id ? 'bg-blue-50 border-blue-200' : ''
                      } ${!message.isRead ? 'font-semibold' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(message)}
                          <span className="ml-2 text-sm font-medium text-gray-900 truncate">
                            {message.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {formatDate(message.$createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1 truncate">{message.email}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {getStatusIcon(selectedMessage)}
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedMessage.name}
                        </h3>
                        <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!selectedMessage.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage.$id)}
                          disabled={actionLoading === selectedMessage.$id}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsUnread(selectedMessage.$id)}
                          disabled={actionLoading === selectedMessage.$id}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as unread"
                        >
                          <FaEyeSlash className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleArchive(selectedMessage.$id)}
                        disabled={actionLoading === selectedMessage.$id}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Archive"
                      >
                        <FaArchive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(selectedMessage.$id)}
                        disabled={actionLoading === selectedMessage.$id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete permanently"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-2" />
                    Received on {formatDate(selectedMessage.$createdAt)}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FaEnvelope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                <p className="text-gray-600">Choose a message from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
