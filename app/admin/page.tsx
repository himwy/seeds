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
  FaGripVertical,
  FaInbox,
  FaPlay,
  // FaEye,
  // FaChevronDown,
} from "react-icons/fa";
import { EventsService, Event } from "../lib/eventsService";
import Image from "next/image";
import Link from "next/link";
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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(
    null,
  );
  const [isVideoEvent, setIsVideoEvent] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(
    null,
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState<string>("");

  useEffect(() => {
    checkExistingSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const validation = EventsService.validateConfiguration();
      if (!validation.isValid) {
        setMessage({
          type: "error",
          text: `Configuration Error: ${validation.errors.join(
            ", ",
          )}. Please check your .env file.`,
        });
        return;
      }
      loadEvents();
    }
  }, [isLoggedIn]);

  // Check for existing session on page load
  const checkExistingSession = async () => {
    try {
      const userData = await account.get();
      const ud = userData as { labels?: string[]; email?: string };
      const isAdmin =
        (Array.isArray(ud.labels) && ud.labels.includes("admin")) ||
        ud.email === "admin@seeds.com";

      if (isAdmin) {
        setIsLoggedIn(true);
        setMessage({
          type: "success",
          text: "Welcome back! You're already logged in.",
        });
      }
    } catch {
      // No existing session or session expired
      setIsLoggedIn(false);
    }
  };

  // Handle logout with proper session cleanup
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
      setMessage({
        type: "success",
        text: "Successfully logged out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if session deletion fails
      setIsLoggedIn(false);
    }
  };

  // Drag and drop handlers for reordering images
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedImageIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (
      draggedImageIndex === null ||
      draggedImageIndex === dropIndex ||
      !editingEvent
    ) {
      setDraggedImageIndex(null);
      return;
    }

    const newImages = [...currentEventImages];
    const draggedImage = newImages[draggedImageIndex];

    // Remove the dragged image from its original position
    newImages.splice(draggedImageIndex, 1);

    // Insert it at the new position
    newImages.splice(dropIndex, 0, draggedImage);

    setCurrentEventImages(newImages);

    try {
      // Update the event in the database
      await EventsService.updateEvent(editingEvent.$id!, {
        ...editingEvent,
        images: newImages,
      });

      setMessage({
        type: "success",
        text: "Image order updated successfully",
      });

      // Reload events to reflect changes
      loadEvents();
    } catch (error) {
      console.error("Error updating image order:", error);
      setMessage({
        type: "error",
        text: "Failed to update image order",
      });
      // Revert the change
      setCurrentEventImages(editingEvent.images || []);
    }

    setDraggedImageIndex(null);
  };

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

      if (!existingUser) {
        await account.createEmailPasswordSession(email, password);
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

  // Upload limits — client-side defense. Bucket-side limits in Appwrite are the
  // real enforcement, but we want to reject obvious garbage before it hits the wire.
  const MAX_FILE_COUNT = 50;
  const MAX_FILE_BYTES = 500 * 1024 * 1024; // 500MB per file
  const LARGE_FILE_THRESHOLD = 200 * 1024 * 1024; // > 200MB: skip preview generation (browser crash risk)

  const validateBatch = (
    incoming: File[],
    alreadyCount: number,
  ): { ok: File[]; rejected: string[] } => {
    const ok: File[] = [];
    const rejected: string[] = [];
    let remaining = Math.max(0, MAX_FILE_COUNT - alreadyCount);
    for (const f of incoming) {
      if (!f.type.startsWith("image/") && !f.type.startsWith("video/")) {
        rejected.push(`${f.name}: unsupported type (${f.type || "unknown"})`);
        continue;
      }
      if (f.size > MAX_FILE_BYTES) {
        rejected.push(
          `${f.name}: ${(f.size / 1024 / 1024).toFixed(0)}MB exceeds ${MAX_FILE_BYTES / 1024 / 1024}MB limit`,
        );
        continue;
      }
      if (remaining <= 0) {
        rejected.push(`${f.name}: over ${MAX_FILE_COUNT}-file limit per event`);
        continue;
      }
      ok.push(f);
      remaining--;
    }
    return { ok, rejected };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Array.from(e.target.files || []);
    const { ok: files, rejected } = validateBatch(raw, selectedFiles.length);
    if (rejected.length > 0) {
      setMessage({
        type: "error",
        text: `Rejected ${rejected.length} file(s): ${rejected.slice(0, 3).join("; ")}${rejected.length > 3 ? "…" : ""}`,
      });
    }
    if (files.length === 0) {
      e.target.value = "";
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);

    // Process files sequentially to maintain order, but skip previews for large files
    const processFiles = async () => {
      const newPreviewUrls: string[] = [];

      for (const file of files) {
        try {
          // Skip preview generation for large files to prevent crashes
          if (file.size > LARGE_FILE_THRESHOLD) {
            // Add a placeholder for large files
            if (file.type.startsWith("video/")) {
              newPreviewUrls.push(
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzNzQxNTEiLz48cGF0aCBkPSJNMzUgMjVMMzUgNzVMNzUgNTBMMzUgMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==",
              );
            } else {
              newPreviewUrls.push(
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzNzQxNTEiLz48cGF0aCBkPSJNMjUgMjVIMzVWNzVIMjVWMjVaTTQwIDI1SDUwVjc1SDQwVjI1Wk01NSAyNUg2NVY3NUg1NVYyNVpNNzAgMjVIODBWNzVINzBWMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==",
              );
            }
          } else {
            // Generate preview for smaller files
            const preview = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
            newPreviewUrls.push(preview);
          }
        } catch (error) {
          console.error("Error reading file:", file.name, error);
          // Add error placeholder
          newPreviewUrls.push(
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNEQzI2MjYiLz48cGF0aCBkPSJNMjUgMjVMNzUgNzVNNzUgMjVMMjUgNzUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg==",
          );
        }
      }

      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    };

    processFiles();
  };

  const isVideo = (file: File) => {
    return file.type.startsWith("video/");
  };

  const isImage = (file: File) => {
    return file.type.startsWith("image/");
  };

  const isVideoUrl = (url: string) => {
    // Check file extension and URL patterns
    const videoExtensions = [".mp4", ".mov", ".avi", ".webm", ".mkv", ".m4v"];
    const lowerUrl = url.toLowerCase();
    return (
      videoExtensions.some((ext) => lowerUrl.includes(ext)) ||
      lowerUrl.includes("video")
    );
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // File Upload Drag and Drop Handlers
  const handleFileUploadDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleFileUploadDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileUploadDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const raw = Array.from(e.dataTransfer.files);
    const { ok: mediaFiles, rejected } = validateBatch(raw, selectedFiles.length);
    if (rejected.length > 0) {
      setMessage({
        type: "error",
        text: `Rejected ${rejected.length} file(s): ${rejected.slice(0, 3).join("; ")}${rejected.length > 3 ? "…" : ""}`,
      });
    }

    if (mediaFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...mediaFiles]);

      // Process files sequentially to maintain order, but skip previews for large files
      const processFiles = async () => {
        const newPreviewUrls: string[] = [];

        for (const file of mediaFiles) {
          try {
            // Skip preview generation for large files to prevent crashes
            if (file.size > LARGE_FILE_THRESHOLD) {
              // Add a placeholder for large files
              if (file.type.startsWith("video/")) {
                newPreviewUrls.push(
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzNzQxNTEiLz48cGF0aCBkPSJNMzUgMjVMMzUgNzVMNzUgNTBMMzUgMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==",
                );
              } else {
                newPreviewUrls.push(
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzNzQxNTEiLz48cGF0aCBkPSJNMjUgMjVIMzVWNzVIMjVWMjVaTTQwIDI1SDUwVjc1SDQwVjI1Wk01NSAyNUg2NVY3NUg1NVYyNVpNNzAgMjVIODBWNzVINzBWMjVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==",
                );
              }
            } else {
              // Generate preview for smaller files
              const preview = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
              newPreviewUrls.push(preview);
            }
          } catch (error) {
            console.error("Error reading file:", file.name, error);
            // Add error placeholder
            newPreviewUrls.push(
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNEQzI2MjYiLz48cGF0aCBkPSJNMjUgMjVMNzUgNzVNNzUgMjVMMjUgNzUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg==",
            );
          }
        }

        console.log("Generated previews:", newPreviewUrls.length);
        setPreviewUrls((prev) => {
          const newPreviews = [...prev, ...newPreviewUrls];
          console.log("Total previews after adding:", newPreviews.length);
          return newPreviews;
        });
      };

      processFiles();

      setMessage({
        type: "success",
        text: `Added ${mediaFiles.length} file(s) successfully! Processing previews...`,
      });
    } else {
      setMessage({
        type: "error",
        text: "Please drop only image or video files.",
      });
    }
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
      const fileId = EventsService.extractFileId(imageUrl);
      if (fileId) {
        await EventsService.deleteImageFile(fileId);
      }
      const updatedImages = currentEventImages.filter(
        (img) => img !== imageUrl,
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

  // Download media function
  const downloadImage = async (mediaUrl: string, index: number) => {
    try {
      // Determine if it's a video or image
      const isVideo = isVideoUrl(mediaUrl);
      const fileExtension = isVideo ? "mp4" : "jpg";
      const fileName = `event-media-${index + 1}.${fileExtension}`;

      // Use direct URL for download (no transformations)
      const downloadUrl = mediaUrl;

      // Use fetch to get the file as blob for proper download
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(url);

      setMessage({ type: "success", text: "Download completed" });
    } catch (err) {
      console.error("Error downloading media:", err);
      try {
        // Fallback: try direct download with download parameter
        const url = new URL(mediaUrl);
        url.searchParams.set("download", "true");
        const link = document.createElement("a");
        link.href = url.toString();
        link.download = `event-media-${index + 1}`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMessage({ type: "success", text: "Download started" });
      } catch {
        // Final fallback: open in new tab
        window.open(mediaUrl, "_blank");
        setMessage({
          type: "error",
          text: "Download failed, opened in new tab",
        });
      }
    }
  };

  const addImagesToEvent = async (files: File[]) => {
    if (!editingEvent || files.length === 0) return;

    const { ok, rejected } = validateBatch(files, currentEventImages.length);
    if (rejected.length > 0) {
      setMessage({
        type: "error",
        text: `Rejected ${rejected.length} file(s): ${rejected.slice(0, 3).join("; ")}${rejected.length > 3 ? "…" : ""}`,
      });
    }
    if (ok.length === 0) return;

    try {
      setLoading(true);
      const newImageUrls = await EventsService.uploadImages(ok);
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
      setUploadProgress(0);

      let imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        setMessage({
          type: "success",
          text: `Uploading ${selectedFiles.length} file(s)... This may take a while for large files.`,
        });

        // Upload files one by one to prevent timeouts and show progress
        imageUrls = [];
        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          setUploadingFileName(file.name);
          // Show progress for *completed* files, not the in-flight one,
          // so the bar can't jump to 100% while the last file is still uploading.
          setUploadProgress(Math.round((i / selectedFiles.length) * 100));

          try {
            const fileUrls = await EventsService.uploadImages([file]);
            imageUrls.push(...fileUrls);
            setUploadProgress(
              Math.round(((i + 1) / selectedFiles.length) * 100),
            );
            setMessage({
              type: "success",
              text: `Uploaded ${i + 1}/${selectedFiles.length}: ${
                file.name
              } (${(file.size / 1024 / 1024).toFixed(1)}MB)`,
            });
          } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
            setMessage({
              type: "error",
              text: `Failed to upload ${file.name}. ${
                error instanceof Error ? error.message : "Please try again."
              }`,
            });
            // Continue with other files instead of stopping completely
          }
        }

        setUploadingFileName("");
        setUploadProgress(100);
      }

      // Handle thumbnail upload
      let thumbnailUrl: string | undefined = existingThumbnail || undefined;
      if (thumbnailFile) {
        try {
          const thumbnailUrls = await EventsService.uploadImages([
            thumbnailFile,
          ]);
          thumbnailUrl = thumbnailUrls[0];
        } catch (error) {
          console.error("Failed to upload thumbnail:", error);
          setMessage({
            type: "error",
            text: "Failed to upload thumbnail. Event will be saved without thumbnail.",
          });
        }
      }

      const eventData = {
        name: formData.name,
        chineseName: formData.chineseName,
        date: formData.date,
        category: formData.category,
        images: editingEvent
          ? [...editingEvent.images, ...imageUrls]
          : imageUrls,
        thumbnail: thumbnailUrl,
        isVideo: isVideoEvent,
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
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setExistingThumbnail(null);
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
    // Load existing thumbnail if present
    setExistingThumbnail(event.thumbnail || null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    // Load isVideo flag
    setIsVideoEvent(event.isVideo || false);
    setShowForm(true);
  };

  const handleDelete = async (eventId: string) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this event? This action cannot be undone.",
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
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setExistingThumbnail(null);
    setIsVideoEvent(false);
    setShowForm(false);
    setEditingEvent(null);
    setUploadProgress(0);
    setUploadingFileName("");
  };

  // Professional Login Screen
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex items-center justify-center p-4"
        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-slate-900 px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 backdrop-blur-sm"
            >
              <FaLock className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-1 tracking-wide">
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm uppercase tracking-widest">
              Seeds Financial Group
            </p>
          </div>
          {/* Login Form */}
          <div className="p-8">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                    message.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-100"
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
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-slate-700 transition-colors" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all bg-slate-50 focus:bg-white text-slate-900"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg mt-4"
              >
                Access Dashboard
              </button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <FaLock className="w-3 h-3" /> Secure connection
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900"
      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
    >
      {/* Minimal header */}
      <div className="bg-stone-50/85 backdrop-blur supports-[backdrop-filter]:bg-stone-50/70 border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 -ml-2 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Menu"
            >
              <FaBars className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-amber-500" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                Admin / Events
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/contacts"
                className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 hover:text-stone-900 transition-colors px-3 py-2"
              >
                <FaInbox className="w-3.5 h-3.5" />
                Messages
              </Link>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-semibold px-4 py-2.5 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
                <span className="hidden sm:inline">New Event</span>
              </button>
              <button
                onClick={() => handleLogout()}
                className="text-stone-400 hover:text-stone-900 p-2 transition-colors"
                title="Logout"
              >
                <FaSignOutAlt className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status messages — minimal, no shouting colors */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="max-w-6xl mx-auto px-6 lg:px-10 pt-6"
          >
            <div
              className={`px-5 py-3 border-l-2 ${
                message?.type === "error"
                  ? "border-stone-900 bg-stone-100/70 text-stone-900"
                  : "border-amber-500 bg-stone-100/70 text-stone-700"
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
            <div className="px-8 py-6 border-b border-stone-200 relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-amber-500"></div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-px w-6 bg-amber-500" />
                    <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                      {editingEvent ? "Edit Entry" : "New Entry"}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </h2>
                </div>
                <button
                  onClick={resetForm}
                  className="text-stone-400 hover:text-stone-900 p-2 transition-colors"
                  aria-label="Close"
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
                    className="w-full px-0 py-3 border-b border-stone-300 focus:border-stone-900 outline-none text-stone-900 bg-transparent transition-colors text-base"
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
                    className="w-full px-0 py-3 border-b border-stone-300 focus:border-stone-900 outline-none text-stone-900 bg-transparent transition-colors text-base"
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
                    className="w-full px-0 py-3 border-b border-stone-300 focus:border-stone-900 outline-none text-stone-900 bg-transparent transition-colors text-base"
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
                    className="w-full px-0 py-3 border-b border-stone-300 focus:border-stone-900 outline-none text-stone-900 bg-transparent transition-colors text-base"
                    required
                  >
                    <option value="recent">最近活動 (Recent Events)</option>
                    <option value="past">過往活動 (Past Events)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Event Media · Photos & Videos
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-10 md:p-14 transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? "border-stone-900 bg-stone-100/70"
                      : "border-stone-300 hover:border-stone-900 hover:bg-stone-100/40"
                  }`}
                  onDragOver={handleFileUploadDragOver}
                  onDragLeave={handleFileUploadDragLeave}
                  onDrop={handleFileUploadDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <div className="flex flex-col items-center text-center">
                    <FaCloudUploadAlt
                      className={`h-14 w-14 mb-5 transition-colors ${
                        isDragOver ? "text-stone-900" : "text-stone-400"
                      }`}
                    />
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {isDragOver
                        ? "Drop to upload"
                        : "Drag files here, or click to browse"}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                      JPG, PNG, GIF, MP4, MOV, AVI · up to 10MB each
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("file-upload")?.click();
                      }}
                      className="inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <FaPlus className="text-sm" />
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Media Previews */}
              {previewUrls.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-4">
                    New Media ({previewUrls.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        {isVideo(selectedFiles[index]) ? (
                          <video
                            src={url}
                            className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                            controls
                            muted
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                          />
                        )}
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

              {/* Existing Media */}
              {(editingEvent?.images?.length ?? 0) > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-4">
                    Current Media ({editingEvent?.images?.length ?? 0})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(editingEvent?.images ?? []).map((url, index) => (
                      <div key={index} className="relative group">
                        {isVideoUrl(url) ? (
                          <video
                            src={url}
                            className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                            controls
                            muted
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Current ${index + 1}`}
                            className="w-full h-24 object-cover rounded-xl border-2 border-gray-200"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thumbnail Upload Section (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Custom Thumbnail (Optional)
                  <span className="text-gray-400 ml-2 text-xs font-normal">
                    For video events - loads faster than video
                  </span>
                </label>

                {thumbnailPreview || existingThumbnail ? (
                  <div className="relative inline-block">
                    <img
                      src={thumbnailPreview || existingThumbnail || ""}
                      alt="Thumbnail preview"
                      className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailFile(null);
                        setThumbnailPreview(null);
                        setExistingThumbnail(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      title="Remove thumbnail"
                    >
                      <FaTimes />
                    </button>
                    {existingThumbnail && !thumbnailPreview && (
                      <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                    {thumbnailPreview && (
                      <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setThumbnailFile(file);
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setThumbnailPreview(ev.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="thumbnail-upload-admin"
                    />
                    <label
                      htmlFor="thumbnail-upload-admin"
                      className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm flex items-center justify-center gap-2"
                    >
                      <FaImage className="text-lg" />
                      Click to upload thumbnail image
                    </label>
                    <p className="text-xs text-gray-400 mt-2">
                      Recommended for video events. Shows instantly instead of
                      loading video.
                    </p>
                  </div>
                )}
              </div>

              {/* Is Video Event Checkbox */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  id="isVideoEventAdmin"
                  checked={isVideoEvent}
                  onChange={(e) => setIsVideoEvent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <label
                    htmlFor="isVideoEventAdmin"
                    className="block text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    This is a video event
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Check this if the main media is a video file. This ensures
                    proper display even if video detection fails.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-7 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 hover:text-stone-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {uploadProgress > 0 && uploadProgress < 100 ? (
                        <div className="flex flex-col">
                          <span>Uploading {uploadProgress}%</span>
                          {uploadingFileName && (
                            <span className="text-xs opacity-90 truncate max-w-[200px]">
                              {uploadingFileName}
                            </span>
                          )}
                        </div>
                      ) : (
                        "Processing..."
                      )}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="flex items-baseline justify-between gap-6 pb-4 mb-8 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-amber-500" />
              <h2 className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-stone-500">
                Events Gallery
              </h2>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-400 tabular-nums">
              {String(events.length).padStart(2, "0")} TOTAL
            </span>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-5" />
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                Loading
              </p>
            </div>
          ) : events.length === 0 ? (
            <div className="py-24 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                No events yet
              </h3>
              <p className="text-stone-500 mb-8 max-w-md mx-auto">
                Create your first event to start the chronicle.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-semibold px-7 py-3.5 transition-colors"
              >
                <FaPlus className="text-xs" />
                New Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {events.map((event) => (
                <div
                  key={event.$id}
                  className="group flex flex-col"
                >
                  {/* Event Image */}
                  <div className="relative aspect-[4/3] bg-stone-900 overflow-hidden mb-4">
                    {(() => {
                      if (!event.images || event.images.length === 0) {
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-stone-100">
                            <FaImage className="text-stone-300 text-3xl" />
                          </div>
                        );
                      }
                      const firstMedia = event.images[0];
                      const isVideoFirst = event.isVideo || isVideoUrl(firstMedia);
                      const posterSrc = event.thumbnail || (isVideoFirst ? null : firstMedia);
                      if (!posterSrc) {
                        return (
                          <>
                            <video
                              src={firstMedia}
                              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                              muted
                              playsInline
                              preload="metadata"
                              onLoadedMetadata={(e) => {
                                e.currentTarget.currentTime = 0.1;
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="rounded-full bg-stone-50/95 p-3 shadow-md">
                                <FaPlay className="text-stone-900 text-sm" />
                              </div>
                            </div>
                          </>
                        );
                      }
                      return (
                        <>
                          <Image
                            src={posterSrc}
                            alt={event.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {isVideoFirst && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                              <div className="rounded-full bg-stone-50/95 p-3 shadow-md">
                                <FaPlay className="text-stone-900 text-sm" />
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1">
                        {event.category === "recent" ? "Recent" : "Past"}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.25em] text-stone-500">
                      <time>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span className="text-stone-300">·</span>
                      <span>{event.images?.length || 0} media</span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 leading-snug line-clamp-2 mb-1">
                      {event.name}
                    </h3>
                    <p className="text-sm text-stone-500 italic line-clamp-1 mb-5">
                      {event.chineseName}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-stone-200 text-[10px] uppercase tracking-[0.25em] font-semibold">
                      <button
                        onClick={() => openImageManager(event)}
                        className="text-stone-700 hover:text-stone-900 transition-colors"
                      >
                        Media
                      </button>
                      <span className="text-stone-300">·</span>
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-stone-700 hover:text-stone-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.$id!)}
                        className="ml-auto text-stone-400 hover:text-stone-900 transition-colors"
                        title="Delete Event"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          )}
        </div>
      </div>

      {/* Image Manager Modal */}
      {showImageManager && editingEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-stone-200 relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-amber-500"></div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-px w-6 bg-amber-500" />
                    <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                      Album
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-stone-900">
                    Manage Album
                  </h3>
                  <p className="text-sm text-stone-500 italic mt-1">
                    {editingEvent?.name ?? ""}
                  </p>
                </div>
                <button
                  onClick={() => setShowImageManager(false)}
                  className="text-stone-400 hover:text-stone-900 p-2 transition-colors"
                  aria-label="Close"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              {/* Upload New Media */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Add New Media
                </h4>
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-10 md:p-12 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? "border-stone-900 bg-stone-100/70"
                      : "border-stone-300 hover:border-stone-900 hover:bg-stone-100/40"
                  }`}
                  onDragOver={handleFileUploadDragOver}
                  onDragLeave={handleFileUploadDragLeave}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);

                    const files = Array.from(e.dataTransfer.files);
                    const mediaFiles = files.filter(
                      (file) =>
                        file.type.startsWith("image/") ||
                        file.type.startsWith("video/"),
                    );

                    if (mediaFiles.length > 0) {
                      addImagesToEvent(mediaFiles);
                      setMessage({
                        type: "success",
                        text: `Added ${mediaFiles.length} file(s) to the event!`,
                      });
                    } else {
                      setMessage({
                        type: "error",
                        text: "Please drop only image or video files.",
                      });
                    }
                  }}
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <FaCloudUploadAlt
                    className={`h-14 w-14 mx-auto mb-5 transition-colors ${
                      isDragOver ? "text-stone-900" : "text-stone-400"
                    }`}
                  />
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                    {isDragOver
                      ? "Drop to upload"
                      : "Drag files here, or click to browse"}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Add photos or videos to this album
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
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
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <FaPlus className="text-sm" />
                    Choose Files
                  </label>
                </div>
              </div>

              {/* Current Media */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Current Media ({currentEventImages.length})
                </h4>
                {currentEventImages.length > 0 && (
                  <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <FaGripVertical className="mr-2 text-gray-400" />
                    Drag and drop media to reorder them in the album
                  </p>
                )}
                {currentEventImages.length === 0 ? (
                  <div className="text-center py-12">
                    <FaImages className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No media in this album</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentEventImages.map((mediaUrl, index) => (
                      <div
                        key={index}
                        className="relative group cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <div className="relative w-full h-32 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                          {isVideoUrl(mediaUrl) ? (
                            <video
                              src={mediaUrl}
                              className="w-full h-full object-cover"
                              controls
                              muted
                              preload="metadata"
                              onError={(e) => {
                                console.error(
                                  "Video failed to load:",
                                  mediaUrl,
                                );
                                const target = e.target as HTMLVideoElement;
                                target.style.display = "none";
                                // Show placeholder
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="flex items-center justify-center h-full bg-gray-200">
                                      <span class="text-gray-500 text-xs">Video not available</span>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          ) : (
                            <Image
                              src={mediaUrl}
                              alt={`Event media ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              onError={(e) => {
                                console.error(
                                  "Image failed to load:",
                                  mediaUrl,
                                );
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
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
                          )}
                          {/* Drag Handle */}
                          <div className="absolute top-2 left-2 bg-black bg-opacity-50 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaGripVertical className="text-white text-xs" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => downloadImage(mediaUrl, index)}
                            className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                            title="Download media"
                          >
                            <FaDownload className="text-xs" />
                          </button>
                          <button
                            onClick={() => removeImageFromEvent(mediaUrl)}
                            className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            title="Remove media"
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
