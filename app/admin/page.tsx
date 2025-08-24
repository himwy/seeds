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
  FaKey,
  FaCog,
  FaImage,
  FaCalendarAlt,
  FaTag,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { EventsService, Event } from "../lib/eventsService";

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "seeds123"
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
      // Validate configuration first
      const validation = EventsService.validateConfiguration();
      if (!validation.isValid) {
        setMessage({ 
          type: 'error', 
          text: `Configuration Error: ${validation.errors.join(', ')}. Please check your .env file.` 
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setMessage({ type: 'success', text: 'Successfully logged in to admin panel' });
    } else {
      setMessage({ type: 'error', text: 'Invalid username or password. Access denied.' });
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await EventsService.getAllEvents();
      setEvents(eventsData);
    } catch (err) {
      console.error("Error loading events:", err);
      setMessage({ type: 'error', text: 'Failed to load events from database' });
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
        setMessage({ type: 'success', text: 'Event updated successfully' });
      } else {
        await EventsService.createEvent(eventData);
        setMessage({ type: 'success', text: 'Event created successfully' });
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
      setMessage({ type: 'error', text: 'Failed to save event. Please try again.' });
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
      confirm("Are you sure you want to permanently delete this event? This action cannot be undone.")
    ) {
      try {
        await EventsService.deleteEvent(eventId);
        setMessage({ type: 'success', text: 'Event deleted successfully' });
        loadEvents();
      } catch (err) {
        console.error("Error deleting event:", err);
        setMessage({ type: 'error', text: 'Failed to delete event. Please try again.' });
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

  // Professional Login Interface
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
            <div className="flex items-center">
              <FaKey className="mr-3 text-xl" />
              <div>
                <h1 className="text-xl font-semibold">Administrator Access</h1>
                <p className="text-blue-100 text-sm">Seeds Financial Group</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FaUser className="text-2xl text-blue-600" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Admin Login Required
              </h2>
              <p className="text-gray-600 text-sm">
                Please enter your credentials to access the admin panel
              </p>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === 'error' 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                <div className="flex items-center">
                  {message.type === 'error' ? (
                    <FaExclamationTriangle className="mr-2" />
                  ) : (
                    <FaCheck className="mr-2" />
                  )}
                  {message.text}
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                <FaUser className="mr-2" />
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              Authorized personnel only. All access is logged and monitored.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Professional Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FaCog className="text-2xl text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Events Management
                </h1>
                <p className="text-gray-600 text-sm">Seeds Financial Group Admin Panel</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <FaPlus className="mr-2" />
                New Event
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-4 rounded-lg ${
            message.type === 'error' 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'error' ? (
                <FaExclamationTriangle className="mr-2" />
              ) : (
                <FaCheck className="mr-2" />
              )}
              {message.text}
            </div>
          </div>
        </div>
      )}

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-3 text-blue-600" />
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 text-xl transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter event name in English"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter event name in Chinese"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="recent">Recent Events</option>
                    <option value="past">Past Events</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    New Photos ({previewUrls.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
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
              {editingEvent && editingEvent.images.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current Photos ({editingEvent.images.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {editingEvent.images.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Current ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      {editingEvent ? "Update Event" : "Create Event"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaImage className="mr-3 text-blue-600" />
              Events Overview ({events.length} total)
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center">
              <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first event.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Event
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div
                  key={event.$id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {event.images && event.images.length > 0 ? (
                        <img
                          src={event.images[0]}
                          alt={event.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <FaImage className="text-gray-400 text-xl" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {event.name}
                        </h3>
                        <p className="text-gray-600">{event.chineseName}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <FaImage className="mr-1" />
                            {event.images?.length || 0} photos
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full flex items-center ${
                              event.category === "recent"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            <FaTag className="mr-1" />
                            {event.category === "recent" ? "Recent" : "Past"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(event.$id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
