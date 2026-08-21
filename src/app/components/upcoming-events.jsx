"use client";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const BACKEND_URL = "http://localhost:4001";

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

const EventCard = ({ event }) => {
  // Construct the full image URL
  const imageUrl = event.coverImage ? `${BACKEND_URL}${event.coverImage}` : "/assets/default-event.jpg";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-[350px] mx-auto h-full flex flex-col group border border-gray-100">
      {/* Event Image - full cover layout */}
      <div className="relative overflow-hidden pt-[70%] w-full shrink-0">
        <img
          src={imageUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Event Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2.5 mt-auto">
          {/* 1. Address / Location */}
          <div className="flex items-start text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-red-500 shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm font-medium line-clamp-2">{event.location}</span>
          </div>

          {/* 2. Date */}
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-orange-500 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">
              {event.eventDate ? new Date(event.eventDate).toLocaleDateString("en-US") : ""}
            </span>
          </div>

          {/* 3. Time & View Details Button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-teal-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{formatTime(event.eventTime)}</span>
            </div>
            <Link href={`/events/${event.id}`}>
              <button className="flex items-center cursor-pointer gap-1 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-black text-xs sm:text-sm font-bold rounded-full transition-all transform hover:scale-105 shadow-sm">
                <span>View Details →</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  // ... (Keep your dragging/carousel state logic here as it is) ...

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/events`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="relative font-sans py-8 md:py-16 px-4 md:px-8 min-h-[75vh]">
        <div className="max-w-7xl mx-auto relative">
          <div className="h-10 w-64 bg-gray-200 rounded-md mb-12 animate-pulse border-l-4 border-orange-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-pulse flex flex-col h-full min-h-[380px]"
              >
                <div className="pt-[70%] w-full bg-gray-200" />
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="h-6 bg-gray-200 rounded-md w-4/5" />
                  <div className="space-y-3 mt-auto">
                    <div className="h-4 bg-gray-200 rounded-md w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-4 bg-gray-200 rounded-md w-1/3" />
                      <div className="h-8 bg-gray-200 rounded-full w-28" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-sans py-8 md:py-16 px-4 md:px-8 min-h-[75vh]">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-orange-400 pl-3 mb-12 text-black">
          Upcoming Events
        </h2>

        {/* Events Grid (Mobile & Desktop) */}
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event) => (
              <motion.div key={event.id} className="w-full h-full">
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-medium">
            No upcoming events found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;