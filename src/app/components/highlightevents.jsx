"use client";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const BACKEND_URL = "http://localhost:4001";

const EventCard = ({ event }) => {
  // Construct the full image URL
  const imageUrl = event.coverImage ? `${BACKEND_URL}${event.coverImage}` : "/assets/placeholder.jpg";

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-full h-full flex flex-col group">
      <div className="relative overflow-hidden pt-[70%] w-full">
        <img
          src={imageUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-sm border text-sm font-semibold px-4 py-2 rounded-full text-gray-800">
            Event
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
        <div className="space-y-3 mt-auto">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-3 text-orange-500" />
            <span className="text-sm font-medium">{new Date(event.eventDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-3 text-teal-500" />
            <span className="text-sm font-medium">{event.eventTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700 flex-1">
              <MapPin className="w-4 h-4 mr-3 text-red-500" />
              <span className="text-sm font-medium truncate">{event.location}</span>
            </div>
            <Link href={`/events/${event.id}`}>
              <button className="px-4 py-2 bg-orange-400 text-black text-sm font-medium rounded-3xl">
                View Details →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const HighlightEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/highlighted-events`);
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

  if (loading) return <div className="p-20 text-center">Loading events...</div>;

  return (
    <div className="relative font-sans py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-orange-400 pl-3 mb-12">
          Highlighted Events
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightEvents;