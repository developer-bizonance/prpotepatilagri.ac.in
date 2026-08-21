'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

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

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/events`);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold border-l-4 border-orange-400 pl-3 text-gray-900">
              Upcoming Events
            </h1>
            <p className="text-gray-600 text-sm mt-1 pl-4">
              Discover and participate in academic and cultural events at P. R. Pote Patil College of Agriculture.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-pulse flex flex-col h-full min-h-[380px]"
              >
                <div className="pt-[65%] w-full bg-gray-200" />
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
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const imageUrl = event.coverImage
                ? (event.coverImage.startsWith("http") ? event.coverImage : `${BACKEND_URL}${event.coverImage}`)
                : "/assets/default-event.jpg";

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 h-full"
                >
                  <div className="relative overflow-hidden pt-[65%] w-full shrink-0">
                    <img
                      src={imageUrl}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {event.title}
                    </h2>

                    <div className="space-y-2.5 mt-auto">
                      <div className="flex items-start text-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium line-clamp-2">{event.location || "P.R. Pote Patil College of Agriculture, Amravati"}</span>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-orange-500 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium">
                          {formatDateNumeric(event.eventDate)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-4 h-4 mr-2 text-teal-500 shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">{formatTime(event.eventTime) || "12:00 PM"}</span>
                        </div>
                        <Link href={`/events/${event.id}`}>
                          <button className="flex items-center cursor-pointer gap-1 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-black text-xs sm:text-sm font-bold rounded-full transition-all transform hover:scale-105 shadow-sm">
                            <span>View Details →</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-3" />
            <h3 className="text-xl font-bold text-gray-700 mb-1">No Events Found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
