"use client";

import React, { useState, useEffect } from "react";
import {
  FaLock,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
  FaTimes,
  FaUser,
  FaCog,
  FaImage,
  FaCalendarAlt,
  FaCheck,
  FaExclamationTriangle,
  FaImages,
  FaSignOutAlt,
  FaCloudUploadAlt,
  FaBars,
  FaDownload,
  // FaEye,
  // FaChevronDown,
} from "react-icons/fa";
import { EventsService, Event } from "../lib/eventsService";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { account } from "../lib/appwrite";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // removed unused `user` state (was only being set, not used)
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showImageManager, setShowImageManager] = useState(false);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [formData, setFormData] = useState({
    name: "",
    chineseName: "",
    date: new Date().toISOString().split("T")[0],
    category: "recent" as "recent" | "past",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      const validation = EventsService.validateConfiguration();
      if (!validation.isValid) {
        setMessage({
          type: "error",
          text: `Configuration Error: ${validation.errors.join(
            ", "
          )}. Please check your .env file.`,
        });
        return;
      }
      loadEvents();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Appwrite login and role check
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      // If a session is already active, account.get() will succeed.
      // Detect and handle to avoid "Creation of a session is prohibited when a session is active".
      let existingUser: { email?: string } | null = null;
      try {
        existingUser = await account.get();
      } catch {
        // no active session
        existingUser = null;
      }

      if (existingUser) {
        // If the active session belongs to the requested email, reuse it.
        if (existingUser.email === email) {
          // proceed to role check below using existingUser
        } else {
          // Active session belongs to another user: clear it so we can create a new one.
          await account.deleteSession("current");
          existingUser = null;
        }
      }

      // Use SDK method if available (newer Appwrite SDKs).
      const acc = account as unknown as { createEmailSession?: (email: string, password: string) => Promise<unknown> };
      if (!existingUser) {
        if (typeof acc.createEmailSession === "function") {
          await acc.createEmailSession(email, password);
        } else {
        // Fallback: call Appwrite REST endpoint for email/password sessions.
        const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
        const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "";
        const res = await fetch(`${endpoint}/account/sessions/email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Appwrite-Project": project,
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.message || `Login failed (${res.status})`);
        }
        }
      }
      const userData = existingUser ?? (await account.get());
      // Narrow the shape before accessing optional properties
      const ud = userData as { labels?: string[]; email?: string };
      const isAdmin =
        (Array.isArray(ud.labels) && ud.labels.includes("admin")) ||
        ud.email === "admin@seeds.com";
      if (!isAdmin) {
        setMessage({
          type: "error",
          text: "You do not have admin permissions.",
        });
        await account.deleteSession("current");
        return;
      }
      setIsLoggedIn(true);
      setMessage({
        type: "success",
        text: "Successfully logged in to admin panel",
      });
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      const e = err as { message?: string };
      setMessage({
        type: "error",
        text: e?.message || "Login failed. Access denied.",
      });
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await EventsService.getAllEvents();
      setEvents(eventsData);
    } catch (err) {
      console.error("Error loading events:", err);
      setMessage({
        type: "error",
        text: "Failed to load events from database",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Image Album Management Functions
  const openImageManager = (event: Event) => {
    setCurrentEventImages(event.images || []);
    setEditingEvent(event);
    setShowImageManager(true);
  };

  const removeImageFromEvent = async (imageUrl: string) => {
    if (!editingEvent) return;
    try {
      setLoading(true);
      // Extract file ID from Appwrite preview URL (assumes /buckets/{bucketId}/files/{fileId}/...)
      const match = imageUrl.match(/\/files\/(.*?)\//);
      const fileId = match ? match[1] : null;
      if (fileId) {
        await EventsService.deleteImageFile(fileId);
      }
      const updatedImages = currentEventImages.filter(
        (img) => img !== imageUrl
      );
      await EventsService.updateEvent(editingEvent.$id!, {
        ...editingEvent,
        images: updatedImages,
      });
      setCurrentEventImages(updatedImages);
      setMessage({ type: "success", text: "Image removed successfully" });
      await loadEvents(); // Refresh events list
    } catch (error) {
      console.error("Error removing image:", error);
      setMessage({ type: "error", text: "Failed to remove image" });
    } finally {
      setLoading(false);
    }
  };

  // Download image function
  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `event-image-${index + 1}.jpg`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // For Appwrite URLs, we need to add download parameter
      const url = new URL(imageUrl);
      url.searchParams.set('download', 'true');
      link.href = url.toString();
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setMessage({ type: "success", text: "Download started" });
    } catch (err) {
      console.error("Error downloading image:", err);
      // Fallback: open in new tab
      window.open(imageUrl, '_blank');
      setMessage({ type: "error", text: "Download failed, opened in new tab" });
    }
  };

  const addImagesToEvent = async (files: File[]) => {
    if (!editingEvent || files.length === 0) return;

    try {
      setLoading(true);
      const newImageUrls = await EventsService.uploadImages(files);
      const updatedImages = [...currentEventImages, ...newImageUrls];

      await EventsService.updateEvent(editingEvent.$id!, {
        ...editingEvent,
        images: updatedImages,
      });

      setCurrentEventImages(updatedImages);
      setMessage({ type: "success", text: "Images added successfully" });
      await loadEvents(); // Refresh events list
    } catch (error) {
      console.error("Error adding images:", error);
      setMessage({ type: "error", text: "Failed to add images" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        imageUrls = await EventsService.uploadImages(selectedFiles);
      }

      const eventData = {
        name: formData.name,
        chineseName: formData.chineseName,
        date: formData.date,
        category: formData.category,
        images: editingEvent
          ? [...editingEvent.images, ...imageUrls]
          : imageUrls,
      };

      if (editingEvent) {
        await EventsService.updateEvent(editingEvent.$id!, eventData);
        setMessage({ type: "success", text: "Event updated successfully" });
      } else {
        await EventsService.createEvent(eventData);
        setMessage({ type: "success", text: "Event created successfully" });
      }

      setFormData({
        name: "",
        chineseName: "",
        date: new Date().toISOString().split("T")[0],
        category: "recent",
      });
      setSelectedFiles([]);
      setPreviewUrls([]);
      setShowForm(false);
      setEditingEvent(null);

      loadEvents();
    } catch (err) {
      console.error("Error saving event:", err);
      setMessage({
        type: "error",
        text: "Failed to save event. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      chineseName: event.chineseName,
      date: event.date,
      category: event.category,
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId: string) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this event? This action cannot be undone."
      )
    ) {
      try {
        await EventsService.deleteEventWithImages(eventId);
        setMessage({ type: "success", text: "Event deleted successfully" });
        loadEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
        setMessage({
          type: "error",
          text: "Failed to delete event. Please try again.",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      chineseName: "",
      date: new Date().toISOString().split("T")[0],
      category: "recent",
    });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setShowForm(false);
    setEditingEvent(null);
  };

  // Professional Login Screen
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gray-900 px-8 py-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaLock className="w-8 h-8 text-gray-900" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Seeds Financial Group</p>
          </div>
          {/* Login Form */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Secure Access
              </h2>
              <p className="text-gray-600 text-sm">
                Enter credentials to access the management system
              </p>
            </div>
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                    message.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
                >
                  <div className="flex items-center">
                    {message.type === "error" ? (
                      <FaExclamationTriangle className="mr-3 text-lg" />
                    ) : (
                      <FaCheck className="mr-3 text-lg" />
                    )}
                    {message.text}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all bg-white text-gray-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all bg-white text-gray-900"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                <FaUser className="mr-2" />
                Access Dashboard
              </button>
            </form>
            <div className="mt-6 text-center text-xs text-gray-500">
              Authorized personnel only • All access monitored
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Mobile-First Header */}
  <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <FaBars className="w-5 h-5 text-gray-600" />
            </button>

            {/* Header Content */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <FaCog className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Portal
                </h1>
                <p className="text-sm text-gray-600">Events Management</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Event</span>
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

  {/* Duplicate toolbar removed; top-right header controls are retained */}

      {/* Status Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 sm:px-6 lg:px-8 pt-4"
          >
            <div
              className={`p-4 rounded-lg shadow-sm ${
                message?.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <div className="flex items-center">
                {message?.type === "error" ? (
                  <FaExclamationTriangle className="mr-3 text-lg flex-shrink-0" />
                ) : (
                  <FaCheck className="mr-3 text-lg flex-shrink-0" />
                )}
                <span className="font-medium">{message?.text ?? ""}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

  {/* Main Content removed - using the polished gallery below to avoid duplicate UIs */}

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-secondary px-8 py-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <FaCalendarAlt className="mr-3 text-white" />
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </h2>
                  <p className="text-white/90 mt-1">
                    {editingEvent
                      ? "Update event details"
                      : "Create a new event entry"}
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Event Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800 bg-white transition-colors"
                    placeholder="Enter event name in English"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Event Name (Chinese) *
                  </label>
                  <input
                    type="text"
                    value={formData.chineseName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        chineseName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800 bg-white transition-colors"
                    placeholder="Enter event name in Chinese"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800 bg-white transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value as "recent" | "past",
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-800 bg-white transition-colors"
                    required
                  >
                    <option value="recent">最近活動 (Recent Events)</option>
                    <option value="past">過往活動 (Past Events)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <div className="text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Upload multiple images (JPG, PNG, GIF)
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Previews */}
              {previewUrls.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-4">
                    New Photos ({previewUrls.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing Photos */}
              {(editingEvent?.images?.length ?? 0) > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-4">
                    Current Photos ({editingEvent?.images?.length ?? 0})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(editingEvent?.images ?? []).map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Current ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheck className="mr-3" />
                      {editingEvent ? "Update Event" : "Add Event"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sophisticated Events Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary px-8 py-6 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <FaImages className="mr-3 text-white" />
              Events Gallery ({events.length} total)
            </h2>
            <p className="text-white/90 mt-1 font-medium">
              Manage your event portfolio with ease
            </p>
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg font-medium">
                Loading events...
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-16 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <FaCalendarAlt className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No events found
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Start building your event portfolio by creating your first
                event.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <FaPlus className="mr-2" />
                Add Your First Event
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <div
                    key={event.$id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20 transform hover:-translate-y-1"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                      {event.images && event.images.length > 0 ? (
                        <Image
                          src={event.images[0]}
                          alt={event.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImage className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            event.category === "recent"
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {event.category === "recent" ? "最近" : "過往"}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {event.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-1">
                        {event.chineseName}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <FaImages className="mr-2" />
                          {event.images?.length || 0} photos
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openImageManager(event)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                          title="Manage Images"
                        >
                          <FaImages className="mr-2" />
                          Images
                        </button>
                        <button
                          onClick={() => handleEdit(event)}
                          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                          title="Edit Event"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event.$id!)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                          title="Delete Event"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Manager Modal */}
      {showImageManager && editingEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Manage Album</h3>
                  <p className="text-blue-100">{editingEvent?.name ?? ""}</p>
                </div>
                <button
                  onClick={() => setShowImageManager(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* Upload New Images */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Add New Images
                </h4>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                  <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop images here, or click to select
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        addImagesToEvent(files);
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:from-secondary hover:to-primary transition-all duration-300"
                  >
                    Select Images
                  </label>
                </div>
              </div>

              {/* Current Images */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Current Images ({currentEventImages.length})
                </h4>
                {currentEventImages.length === 0 ? (
                  <div className="text-center py-12">
                    <FaImages className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No images in this album</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentEventImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <div className="relative w-full h-32 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={`Event image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            onError={(e) => {
                              console.error('Image failed to load:', imageUrl);
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              // Show placeholder
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="flex items-center justify-center h-full bg-gray-200">
                                    <span class="text-gray-500 text-xs">Image not available</span>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => downloadImage(imageUrl, index)}
                            className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                            title="Download image"
                          >
                            <FaDownload className="text-xs" />
                          </button>
                          <button
                            onClick={() => removeImageFromEvent(imageUrl)}
                            className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            title="Remove image"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
