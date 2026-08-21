"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaAward,
  FaBook,
  FaUserGraduate,
  FaHandsHelping,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";

const BACKEND_URL = "http://localhost:4001";

// 🌟 BULLETPROOF IMAGE HELPER 🌟
const getImageSrc = (imageName) => {
  if (!imageName || imageName === "null" || imageName === "undefined") return null;

  // Agar pehle se pura URL hai
  if (imageName.startsWith("http") || imageName.startsWith("blob:") || imageName.startsWith("data:")) {
    return imageName;
  }

  // Path ko clean karo (starting slash ensure karo)
  let cleanPath = imageName.startsWith("/") ? imageName : `/${imageName}`;
  
  // 🔥 MAGIC FIX: Agar database mein galti se purana "/assets/" path pada hai, 
  // toh usko automatically "/uploads/" kar do kyunki backend wahi serve kar raha hai.
  cleanPath = cleanPath.replace(/^\/assets\//, '/uploads/');

  return `${BACKEND_URL}${cleanPath}`;
};

const PrincipalDetails = () => {
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/principal`);
        setPrincipal(res.data);
      } catch (err) {
        console.error("Failed to fetch principal details:", err);
        setError("Unable to load Principal details at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipal();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gray-50">
        <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-gray-50 text-red-500 font-medium text-lg">
        {error}
      </div>
    );
  }

  if (!principal) {
    return (
      <div className="text-center py-20 bg-gray-50 text-gray-500 font-medium text-lg">
        No Principal details have been added yet. Please add them from the Admin Panel.
      </div>
    );
  }

  // 🌟 HELPER USE KIYA YAHAN 🌟
  const imageSrc = getImageSrc(principal.image_url);

  const qualificationsList = principal.qualifications
    ? principal.qualifications.split('\n').filter(q => q.trim() !== '')
    : [];

  const messageParagraphs = principal.content
    ? principal.content.split('\n').filter(p => p.trim() !== '')
    : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 md:mb-12">
            <div className="md:flex">
              
              <div className="md:w-2/5 p-6 md:p-8 bg-gradient-to-b from-orange-50 to-white">
                <div className="flex flex-col items-center">
                  
                  <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                    <img
                      src={imageSrc || "https://placehold.co/400x400/ea580c/ffffff?text=Principal"}
                      alt={principal.name}
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x400/ea580c/ffffff?text=Principal";
                      }}
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    {principal.name}
                  </h2>
                  <p className="text-lg text-orange-600 font-semibold mb-4">
                    {principal.designation}
                  </p>

                  {qualificationsList.length > 0 && (
                    <div className="bg-white rounded-lg p-4 w-full shadow-sm mb-6 border border-gray-100">
                      <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                        <FaUserGraduate className="mr-2 text-orange-400" />
                        Qualifications
                      </h3>
                      <ul className="space-y-2">
                        {qualificationsList.map((qual, index) => (
                          <li
                            key={index}
                            className="text-gray-600 flex items-center text-sm md:text-base"
                          >
                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></span>
                            {qual}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 w-full">
                    {principal.experience && (
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold">
                          {principal.experience}
                        </div>
                        <div className="text-sm text-gray-600">Experience</div>
                      </div>
                    )}
                    
                    {principal.specialization && (
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-700 truncate px-2">
                          {principal.specialization.split("&")[0]}
                        </div>
                        <div className="text-sm text-gray-600">
                          Specialization
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
                
                <div className="mb-8 flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center pb-2 border-b-2 border-orange-100 inline-flex">
                    <FaHandsHelping className="mr-3 text-orange-500" />
                    {principal.messageTitle || "Principal's Message"}
                  </h3>
                  
                  <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
                    {messageParagraphs.length > 0 ? (
                      messageParagraphs.map((para, index) => (
                        <p
                          key={index}
                          className={index === 0 ? "text-gray-900 font-medium" : ""}
                        >
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No message provided.</p>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mt-auto border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                    {principal.email && (
                      <div className="flex items-center">
                        <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                          <FaEnvelope className="text-orange-400 flex-shrink-0" />
                        </div>
                        <div className="truncate">
                          <a
                            href={`mailto:${principal.email}`}
                            className="text-blue-700 hover:underline text-sm md:text-base font-medium"
                          >
                            {principal.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {principal.mobile && (
                      <div className="flex items-center">
                        <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                          <FaPhoneAlt className="text-orange-400 flex-shrink-0" />
                        </div>
                        <div>
                          <p className="text-gray-700 text-sm md:text-base font-medium">
                            {principal.mobile}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {principal.address && (
                      <div className="flex items-start md:col-span-2 pt-2">
                        <div className="bg-white p-2 rounded-full shadow-sm mr-3 mt-1">
                          <FaMapMarkerAlt className="text-orange-400 flex-shrink-0" />
                        </div>
                        <div>
                          <p className="text-gray-700 text-sm md:text-base mt-1.5 font-medium leading-snug">
                            {principal.address}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDetails;