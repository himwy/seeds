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
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  ContactMessagesService,
  ContactMessage,
  ContactFilters,
} from "../../lib/contactMessagesService";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [filters, setFilters] = useState<ContactFilters>({
    status: "all",
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageCounts, setMessageCounts] = useState({
    total: 0,
    unread: 0,
    read: 0,
    archived: 0,
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
        ContactMessagesService.getMessageCounts(),
      ]);
      setMessages(messagesData);
      setMessageCounts(countsData);
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [filters]);

  // Filter messages by search term
  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle message actions
  const handleMarkAsRead = async (messageId: string) => {
    try {
      setActionLoading(messageId);
      await ContactMessagesService.markAsRead(messageId);
      await loadMessages();
      if (selectedMessage?.$id === messageId) {
        setSelectedMessage((prev) => (prev ? { ...prev, isRead: true } : null));
      }
    } catch (err) {
      console.error("Error marking message as read:", err);
      setError("Failed to mark message as read.");
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
        setSelectedMessage((prev) =>
          prev ? { ...prev, isRead: false } : null,
        );
      }
    } catch (err) {
      console.error("Error marking message as unread:", err);
      setError("Failed to mark message as unread.");
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
      console.error("Error archiving message:", err);
      setError("Failed to archive message.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) {
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
      console.error("Error deleting message:", err);
      setError("Failed to delete message.");
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (message: ContactMessage) => {
    if (message.isArchived)
      return <FaFolder className="w-4 h-4 text-gray-500" />;
    if (message.isRead) return <FaEye className="w-4 h-4 text-green-500" />;
    return <FaEnvelope className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/admin"
                className="mr-4 p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
              </Link>
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mr-3 shadow-inner">
                <FaInbox className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Contact Messages
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Client Inquiries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <FaFilter className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Filters</span>
                <FaChevronDown
                  className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg shadow-sm">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Total
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {messageCounts.total}
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <FaInbox className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Unread
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {messageCounts.unread}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
              <FaClock className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Read
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                {messageCounts.read}
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
              <FaCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Archived
              </p>
              <p className="text-2xl font-bold text-slate-700">
                {messageCounts.archived}
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
              <FaFolder className="w-4 h-4 text-slate-500" />
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
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value as any,
                      }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 bg-slate-50 focus:bg-white transition-all"
                  >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value as any,
                      }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 bg-slate-50 focus:bg-white transition-all"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                    Search
                  </label>
                  <div className="relative group">
                    <FaSearch className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-slate-700 transition-colors" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search messages..."
                      className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 bg-slate-50 focus:bg-white transition-all"
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
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-4 border-b border-slate-800">
                <h3 className="font-bold text-white tracking-wide">
                  Inbox ({filteredMessages.length})
                </h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-slate-500 mt-3 font-medium">
                      Loading messages...
                    </p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="p-10 text-center text-slate-500">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaInbox className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="font-medium">No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.$id}
                      onClick={() => handleSelectMessage(message)}
                      className={`p-5 border-b border-slate-100 cursor-pointer transition-colors hover:bg-slate-50 ${
                        selectedMessage?.$id === message.$id
                          ? "bg-slate-50 border-l-4 border-l-amber-500"
                          : "border-l-4 border-l-transparent"
                      } ${!message.isRead ? "bg-white" : "bg-slate-50/50"}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(message)}
                          <span
                            className={`ml-3 text-sm truncate ${!message.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}
                          >
                            {message.name}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap ml-2 font-medium">
                          {formatDate(message.$createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2 truncate font-medium">
                        {message.email}
                      </p>
                      <p
                        className={`text-sm line-clamp-2 ${!message.isRead ? "text-slate-800 font-medium" : "text-slate-600"}`}
                      >
                        {message.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
                        {getStatusIcon(selectedMessage)}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-slate-900">
                          {selectedMessage.name}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                      {!selectedMessage.isRead ? (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage.$id)}
                          disabled={actionLoading === selectedMessage.$id}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Mark as read"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleMarkAsUnread(selectedMessage.$id)
                          }
                          disabled={actionLoading === selectedMessage.$id}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Mark as unread"
                        >
                          <FaEyeSlash className="w-4 h-4" />
                        </button>
                      )}
                      <div className="w-px h-6 bg-slate-200 mx-1"></div>
                      <button
                        onClick={() => handleArchive(selectedMessage.$id)}
                        disabled={actionLoading === selectedMessage.$id}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                        title="Archive"
                      >
                        <FaArchive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(selectedMessage.$id)}
                        disabled={actionLoading === selectedMessage.$id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete permanently"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Received {formatDate(selectedMessage.$createdAt)}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Message Content
                  </h4>
                  <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                    <p className="text-slate-800 whitespace-pre-wrap leading-relaxed text-lg">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 mb-6">
                  <FaEnvelope className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Select a message
                </h3>
                <p className="text-gray-600">
                  Choose a message from the list to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
