"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../../components/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { EventsService, Event } from "../../lib/eventsService";

const translations = {
  en: {
    backToEvents: "Back to Events",
    loading: "Loading album...",
    error: "Error loading album",
    notFound: "Album not found",
    photoGallery: "Photo Gallery",
    photos: "photos",
    closeModal: "Close",
    nextPhoto: "Next photo",
    prevPhoto: "Previous photo",
  },
  "zh-HK": {
    backToEvents: "返回活動",
    loading: "載入相冊中...",
    error: "載入相冊時出錯",
    notFound: "未找到相冊",
    photoGallery: "相片集",
    photos: "張相片",
    closeModal: "關閉",
    nextPhoto: "下一張相片",
    prevPhoto: "上一張相片",
  },
};

export default function EventDetailPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const params = useParams();
  const eventId = params.eventId as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventData = await EventsService.getEvent(eventId);
      setEvent(eventData);
    } catch (err) {
      setError(t.error);
      console.error("Error loading event:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "zh-HK" ? "zh-HK" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    if (event && selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % event.images.length);
    }
  };

  const prevImage = () => {
    if (event && selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0
          ? event.images.length - 1
          : selectedImageIndex - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "Escape") closeImageModal();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex]);

  // Get the back URL based on event category
  const getBackUrl = () => {
    if (!event) return "/events/recent";
    return event.category === "past" ? "/events/past" : "/events/recent";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">{t.loading}</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">{error || t.notFound}</div>
          <Link href={getBackUrl()}>
            <span className="text-teal-600 hover:underline">
              {t.backToEvents}
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href={getBackUrl()}>
              <span className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-4">
                <FaArrowLeft className="mr-2" />
                {t.backToEvents}
              </span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {language === "zh-HK" ? event.chineseName : event.name}
            </h1>

            <div className="flex items-center text-gray-600 mb-4">
              <FaCalendarAlt className="mr-2" />
              {formatDate(event.date)}
            </div>

            <div className="text-gray-600">
              {event.images.length} {t.photos}
            </div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t.photoGallery}
            </h2>

            {event.images.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No photos available
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {event.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openImageModal(index)}
                  >
                    <img
                      src={image}
                      alt={`${
                        language === "zh-HK" ? event.chineseName : event.name
                      } - Photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              title={t.closeModal}
            >
              <FaTimes size={24} />
            </button>

            {/* Navigation Buttons */}
            {event.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                  title={t.prevPhoto}
                >
                  <FaChevronLeft size={24} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                  title={t.nextPhoto}
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={event.images[selectedImageIndex]}
              alt={`${
                language === "zh-HK" ? event.chineseName : event.name
              } - Photo ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {event.images.length}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
