"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaUpload,
  FaImages,
  FaCalendarAlt,
  FaCheck,
  FaExclamationTriangle,
  FaSave,
  FaTimes,
  FaPlay,
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
    uploadPhotos: "Upload Event Media",
    uploadHint: "Select multiple photos and videos for this event (JPG, PNG, GIF, MP4, MOV, etc.)",

    categoryRecent: "Recent Events",
    categoryPast: "Past Events",

    save: "Create Event",
    cancel: "Cancel",

    uploading: "Uploading media...",
    saving: "Creating event...",
    success: "Event created successfully!",
    error: "Error creating event",
    validationError:
      "Please fill in all required fields and upload at least one photo or video",

    removePhoto: "Remove media",
    dragDrop: "Drag & drop photos and videos here or click to browse",
    selectedPhotos: "Selected Media",
    noPhotos: "No media selected",

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
    uploadPhotos: "上傳活動媒體",
    uploadHint: "為此活動選擇多張相片和影片（JPG、PNG、GIF、MP4、MOV等）",

    categoryRecent: "最近活動",
    categoryPast: "過往活動",

    save: "創建活動",
    cancel: "取消",

    uploading: "上傳媒體中...",
    saving: "創建活動中...",
    success: "活動創建成功！",
    error: "創建活動時出錯",
    validationError: "請填寫所有必填欄位並上傳至少一張相片或影片",

    removePhoto: "移除媒體",
    dragDrop: "拖放相片和影片到此處或點擊瀏覽",
    selectedPhotos: "已選媒體",
    noPhotos: "未選擇媒體",

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
  const [isDragOver, setIsDragOver] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // File collection state for handling multiple rapid drops
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [dropTimeout, setDropTimeout] = useState<NodeJS.Timeout | null>(null);

  const isVideoFile = (file: File) => {
    return file.type.startsWith("video/");
  };

  // Cleanup object URLs on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
      // Clear any pending timeout
      if (dropTimeout) {
        clearTimeout(dropTimeout);
      }
    };
  }, [previewUrls, dropTimeout]);

  // Prevent default drag behavior on document
  useEffect(() => {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragEnter = (e: DragEvent) => preventDefaults(e);
    const handleDragLeave = (e: DragEvent) => preventDefaults(e);
    const handleDragOver = (e: DragEvent) => preventDefaults(e);
    const handleDrop = (e: DragEvent) => preventDefaults(e);

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  // Process pending files after a brief delay
  const processPendingFiles = useCallback(async () => {
    if (pendingFiles.length > 0) {
      console.log(`Processing ${pendingFiles.length} pending files:`, pendingFiles.map(f => f.name));
      await addFiles(pendingFiles);
      setPendingFiles([]);
    }
    setDropTimeout(null);
  }, [pendingFiles]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input change triggered");
    const files = Array.from(e.target.files || []);
    console.log("File input files:", files.length, files.map(f => f.name));
    
    if (files.length > 0) {
      await addFiles(files);
    }
    
    // Reset the input so the same files can be selected again if needed
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    console.log("=== DROP EVENT START ===");
    console.log("DataTransfer object:", e.dataTransfer);
    console.log("DataTransfer.files:", e.dataTransfer.files);
    console.log("DataTransfer.files.length:", e.dataTransfer.files.length);
    console.log("DataTransfer.items:", e.dataTransfer.items);
    console.log("DataTransfer.items.length:", e.dataTransfer.items?.length);
    
    // Try using DataTransferItemList first (more reliable for multiple files)
    let allFiles: File[] = [];
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      console.log("Using DataTransfer.items");
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i];
        console.log(`Item ${i}:`, item.kind, item.type);
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            allFiles.push(file);
          }
        }
      }
    } else {
      console.log("Using DataTransfer.files");
      allFiles = Array.from(e.dataTransfer.files);
    }
    
    console.log("All files collected:", allFiles.length, allFiles.map(f => f.name));
    
    const files = allFiles.filter((file) =>
      file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    
    console.log("Media files after filtering:", files.length, files.map(f => f.name));
    console.log("=== DROP EVENT END ===");
    
    if (files.length > 0) {
      await addFiles(files);
    } else {
      console.warn("No valid image or video files found in drop");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const addFiles = async (files: File[]) => {
    console.log(`Processing ${files.length} files:`, files.map(f => f.name));
    
    // Add all files to the state immediately
    setSelectedFiles((prev) => {
      const newFiles = [...prev, ...files];
      console.log(`Total files after adding: ${newFiles.length}`);
      return newFiles;
    });

    // Generate previews for all files
    const previewPromises = files.map((file, index) => {
      return new Promise<string>((resolve) => {
        if (file.type.startsWith("image/")) {
          // For images, create preview using FileReader
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log(`Generated preview for image: ${file.name}`);
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video/")) {
          // For videos, create preview using URL.createObjectURL
          const videoUrl = URL.createObjectURL(file);
          console.log(`Generated preview for video: ${file.name}`);
          resolve(videoUrl);
        } else {
          // Fallback for unsupported file types
          console.warn(`Unsupported file type: ${file.type} for ${file.name}`);
          resolve("");
        }
      });
    });

    // Wait for all previews to be generated
    try {
      const newPreviews = await Promise.all(previewPromises);
      const validPreviews = newPreviews.filter(url => url !== "");
      console.log(`Generated ${validPreviews.length} valid previews`);
      
      setPreviewUrls((prev) => {
        const allPreviews = [...prev, ...validPreviews];
        console.log(`Total preview URLs: ${allPreviews.length}`);
        return allPreviews;
      });
    } catch (error) {
      console.error("Error generating previews:", error);
    }
  };

  const removeFile = (index: number) => {
    // Clean up object URLs for videos to prevent memory leaks
    const urlToRemove = previewUrls[index];
    if (selectedFiles[index]?.type.startsWith("video/") && urlToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(urlToRemove);
    }
    
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.chineseName || selectedFiles.length === 0) {
      setMessage({ type: "error", text: t.validationError });
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

      setMessage({ type: "success", text: t.success });

      // Redirect after success
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      setMessage({ type: "error", text: t.error });
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
              message.type === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            <div className="flex items-center">
              {message.type === "error" ? (
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
              <h2 className="text-lg font-semibold text-gray-900">
                Event Information
              </h2>
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
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                }`}
              >
                <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">{t.dragDrop}</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
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

            {/* Debug Info */}
            <div className="text-sm text-gray-500 p-4 bg-gray-100 rounded-lg">
              <p><strong>Debug Info:</strong></p>
              <p>Selected Files: {selectedFiles.length}</p>
              <p>Preview URLs: {previewUrls.length}</p>
              <p>Pending Files: {pendingFiles.length}</p>
              <p>Files: {selectedFiles.map(f => f.name).join(', ')}</p>
              {pendingFiles.length > 0 && (
                <p>Pending: {pendingFiles.map(f => f.name).join(', ')}</p>
              )}
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
                      {isVideoFile(selectedFiles[index]) ? (
                        <div className="relative">
                          <video
                            src={url}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            muted
                            preload="metadata"
                          />
                          {/* Video play icon overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                            <FaPlay className="text-white text-lg" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                      )}
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
