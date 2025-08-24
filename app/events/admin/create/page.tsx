"use client";

import React, { useState } from "react";
import { useLanguage } from "../../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FaArrowLeft, 
  FaUpload, 
  FaTrash, 
  FaImages, 
  FaCalendarAlt, 
  FaTag,
  FaCheck,
  FaExclamationTriangle,
  FaSave,
  FaTimes
} from "react-icons/fa";
import { EventsService } from "../../../lib/eventsService";

const translations = {
  en: {
    pageTitle: "Create Event",
    pageSubtitle: "Add a new event to the system",
    backToAdmin: "Back to Admin Panel",

    eventName: "Event Name (English)",
    eventNameChinese: "Event Name (Chinese)",
    eventDate: "Event Date",
    eventCategory: "Event Category",
    uploadPhotos: "Upload Event Photos",
    uploadHint: "Select multiple photos for this event (JPG, PNG, GIF)",

    categoryRecent: "Recent Events",
    categoryPast: "Past Events",

    save: "Create Event",
    cancel: "Cancel",

    uploading: "Uploading photos...",
    saving: "Creating event...",
    success: "Event created successfully!",
    error: "Error creating event",
    validationError: "Please fill in all required fields and upload at least one photo",

    removePhoto: "Remove photo",
    dragDrop: "Drag & drop photos here or click to browse",
    selectedPhotos: "Selected Photos",
    noPhotos: "No photos selected",
    
    required: "Required field",
    optional: "Optional",
  },
  "zh-HK": {
    pageTitle: "創建活動",
    pageSubtitle: "添加新活動到系統",
    backToAdmin: "返回管理面板",

    eventName: "活動名稱（英文）",
    eventNameChinese: "活動名稱（中文）",
    eventDate: "活動日期",
    eventCategory: "活動類別",
    uploadPhotos: "上傳活動相片",
    uploadHint: "為此活動選擇多張相片（JPG、PNG、GIF）",

    categoryRecent: "最近活動",
    categoryPast: "過往活動",

    save: "創建活動",
    cancel: "取消",

    uploading: "上傳相片中...",
    saving: "創建活動中...",
    success: "活動創建成功！",
    error: "創建活動時出錯",
    validationError: "請填寫所有必填欄位並上傳至少一張相片",

    removePhoto: "移除相片",
    dragDrop: "拖放相片到此處或點擊瀏覽",
    selectedPhotos: "已選相片",
    noPhotos: "未選擇相片",
    
    required: "必填欄位",
    optional: "可選",
  },
};

export default function CreateEventPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    chineseName: "",
    date: new Date().toISOString().split("T")[0],
    category: "recent" as "recent" | "past",
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    addFiles(files);
  };

  const addFiles = (files: File[]) => {
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

    if (!formData.name || !formData.chineseName || selectedFiles.length === 0) {
      setMessage({ type: 'error', text: t.validationError });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      // Upload images first
      setUploading(true);
      const imageUrls = await EventsService.uploadImages(selectedFiles);
      setUploading(false);

      // Create event
      await EventsService.createEvent({
        name: formData.name,
        chineseName: formData.chineseName,
        date: formData.date,
        category: formData.category,
        images: imageUrls,
      });

      setMessage({ type: 'success', text: t.success });
      
      // Redirect after success
      setTimeout(() => {
        router.push("/admin");
      }, 2000);

    } catch (err) {
      setMessage({ type: 'error', text: t.error });
      console.error("Error creating event:", err);
    } finally {
      setUploading(false);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link 
                href="/admin"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-6"
              >
                <FaArrowLeft className="mr-2" />
                {t.backToAdmin}
              </Link>
              <div className="border-l border-gray-300 pl-6">
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <FaCalendarAlt className="mr-3 text-blue-600" />
                  {t.pageTitle}
                </h1>
                <p className="text-gray-600 text-sm">{t.pageSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'error' 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            <div className="flex items-center">
              {message.type === 'error' ? (
                <FaExclamationTriangle className="mr-2" />
              ) : (
                <FaCheck className="mr-2" />
              )}
              {message.text}
            </div>
          </motion.div>
        )}

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow border border-gray-200"
        >
          {/* Card Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center">
              <FaImages className="text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Event Information</h2>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventName}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter event name in English"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventNameChinese}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="chineseName"
                  value={formData.chineseName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="輸入活動中文名稱"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventDate}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventCategory}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                >
                  <option value="recent">{t.categoryRecent}</option>
                  <option value="past">{t.categoryPast}</option>
                </select>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.uploadPhotos}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-4">{t.uploadHint}</p>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors bg-gray-50"
              >
                <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">{t.dragDrop}</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center"
                >
                  <FaImages className="mr-2" />
                  Browse Files
                </label>
              </div>
            </div>

            {/* Photo Previews */}
            {previewUrls.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FaImages className="mr-2 text-blue-600" />
                  {t.selectedPhotos} ({previewUrls.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        title={t.removePhoto}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Link href="/admin">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  {t.cancel}
                </button>
              </Link>
              <button
                type="submit"
                disabled={uploading || saving}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t.uploading}
                  </>
                ) : saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t.saving}
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    {t.save}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
