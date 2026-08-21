'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
  Sparkles,
  PlayCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

const getImageUrl = (path) => {
  if (!path) return "/assets/default-event.jpg";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BACKEND_URL}${cleanPath}`;
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const trimmed = timeStr.trim();
  if (/am|pm/i.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }
  return trimmed;
};

const formatDateNumeric = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const formatDateFull = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id;

  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gallery Modal State
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const fetchEventData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch single event detail
        const res = await fetch(`${BACKEND_URL}/api/events/${eventId}`);
        if (!res.ok) {
          throw new Error("Event not found");
        }
        const data = await res.json();
        setEvent(data);

        // Fetch list for "Other Upcoming Events"
        const listRes = await fetch(`${BACKEND_URL}/api/events`);
        if (listRes.ok) {
          const listData = await listRes.json();
          setOtherEvents(listData.filter((item) => String(item.id) !== String(eventId)));
        }
      } catch (err) {
        console.error("Error loading event:", err);
        setError(err.message || "Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrevImage = () => {
    if (!event?.additionalImages?.length || selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? event.additionalImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!event?.additionalImages?.length || selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === event.additionalImages.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Breadcrumb Skeleton */}
          <div className="flex justify-between items-center">
            <div className="w-36 h-9 bg-gray-200 rounded-full" />
            <div className="w-48 h-5 bg-gray-200 rounded-md" />
          </div>

          {/* Main Card Skeleton */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md">
            {/* Cover Image Banner Skeleton */}
            <div className="w-full h-64 sm:h-80 md:h-[420px] bg-gray-200 relative" />

            <div className="p-6 sm:p-8 md:p-10 space-y-8">
              {/* Info Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-gray-100/70 rounded-2xl">
                <div className="h-12 bg-gray-200 rounded-xl" />
                <div className="h-12 bg-gray-200 rounded-xl" />
                <div className="h-12 bg-gray-200 rounded-xl" />
              </div>

              {/* Title & Description Skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded-md w-3/4" />
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                <div className="h-4 bg-gray-200 rounded-md w-4/6" />
              </div>

              {/* Gallery Thumbnails Skeleton */}
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded-md w-40" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="h-36 bg-gray-200 rounded-2xl" />
                  <div className="h-36 bg-gray-200 rounded-2xl" />
                  <div className="h-36 bg-gray-200 rounded-2xl" />
                  <div className="h-36 bg-gray-200 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-16 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The event you are looking for does not exist or has been removed."}</p>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full transition-all duration-200 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  const coverUrl = getImageUrl(event.coverImage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation / Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold rounded-full border border-gray-200 shadow-sm transition-all duration-200 hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4 text-orange-500" /> Back to Events
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-none">{event.title}</span>
          </div>
        </div>

        {/* Main Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-12"
        >
          {/* Cover Banner Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-[420px] bg-gray-900 overflow-hidden">
            <img
              src={coverUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Title & Floating Info on Cover Image */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white mb-2 drop-shadow-md">
                {event.title}
              </h1>
              <p className="text-xs sm:text-sm text-amber-300 font-medium">
                {formatDateFull(event.eventDate)}
              </p>
            </div>
          </div>

          {/* Details Bar & Content */}
          <div className="p-6 sm:p-8 md:p-10">
            {/* Key Information Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 bg-orange-50/60 rounded-2xl border border-orange-100 mb-8">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-red-100 text-red-600 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5 line-clamp-2">
                    {event.location || "P.R. Pote Patil College of Agriculture, Amravati"}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {formatDateNumeric(event.eventDate)} ({formatDateFull(event.eventDate)})
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-teal-100 text-teal-600 rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">
                    {formatTime(event.eventTime) || "12:00 PM"}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-amber-400 pl-3">
                About the Event
              </h2>
              {event.description ? (
                <div className="prose prose-orange max-w-none text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {event.description}
                </div>
              ) : (
                <p className="text-gray-500 italic">No description provided for this event.</p>
              )}
            </div>

            {/* Additional Images Gallery */}
            {event.additionalImages && event.additionalImages.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-amber-400 pl-3">
                  Event Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {event.additionalImages.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md cursor-pointer border border-gray-100 bg-gray-100"
                    >
                      <img
                        src={getImageUrl(imgSrc)}
                        alt={`Event gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-xs font-semibold">
                        View Photo
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Links */}
            {event.videos && event.videos.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-amber-400 pl-3 flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-red-500" /> Event Videos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.videos.map((vidUrl, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800 truncate max-w-[80%]">
                        {vidUrl}
                      </span>
                      <a
                        href={vidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1 shrink-0"
                      >
                        Watch <PlayCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full transition-all duration-200 text-xs sm:text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" /> Link Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-gray-600" /> Share Event
                  </>
                )}
              </button>

              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-md text-xs sm:text-sm"
              >
                View More Events →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Other Upcoming Events Carousel / Grid */}
        {otherEvents.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl sm:text-3xl font-bold border-l-4 border-orange-400 pl-3 mb-8 text-gray-900">
              Other Upcoming Events
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100"
                >
                  <div className="relative overflow-hidden pt-[65%] w-full">
                    <img
                      src={getImageUrl(item.coverImage)}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="space-y-2 mt-auto">
                      <div className="flex items-start text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium line-clamp-1">{item.location || "P.R. Pote Patil College"}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-gray-700">
                          <Calendar className="w-4 h-4 mr-1.5 text-orange-500 shrink-0" />
                          <span className="text-xs font-medium">{formatDateNumeric(item.eventDate)}</span>
                        </div>

                        <Link href={`/events/${item.id}`}>
                          <button className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold rounded-full transition-all transform hover:scale-105 shadow-sm">
                            View Details →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && event?.additionalImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image View */}
            <div
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(event.additionalImages[selectedImageIndex])}
                alt={`Gallery photo ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain mx-auto rounded-2xl shadow-2xl"
              />
              <div className="text-center text-white text-xs mt-3 opacity-80">
                Photo {selectedImageIndex + 1} of {event.additionalImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
