"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, User } from 'lucide-react';

// SAHI BACKEND URL (Port 4001)
const BACKEND_URL = "http://localhost:4001";

const getImageSrc = (imageName) => {
  if (!imageName || imageName === "null" || imageName === "undefined") return null;
  
  if (imageName.startsWith('http') || imageName.startsWith('blob:') || imageName.startsWith('data:')) {
    return imageName;
  }

  // Agar path /uploads/ ya /assets/ se shuru hota hai
  if (imageName.startsWith("/uploads/") || imageName.startsWith("uploads/") || 
      imageName.startsWith("/assets/") || imageName.startsWith("assets/")) {
    const cleanPath = imageName.startsWith('/') ? imageName : `/${imageName}`;
    return `${BACKEND_URL}${cleanPath}`;
  }

  const cleanName = imageName.split('/').pop();
  return `${BACKEND_URL}/uploads/admin_cards/${cleanName}`;
};

const ChairmanDesk = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchAdminCards = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/admin-cards`);
        setCards(res.data);
      } catch (err) {
        console.error("Failed to fetch administration cards:", err);
        setError("Unable to load profiles at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminCards();
  }, []);

  // 2. Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gray-50">
        <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      </div>
    );
  }

  // 3. Error State
  if (error) {
    return (
      <div className="text-center py-20 bg-gray-50 text-red-500 font-medium text-lg">
        {error}
      </div>
    );
  }

  // 4. Main Dynamic UI
  return (
    <div className="font-sans flex flex-col items-center p-4 md:p-8 bg-gray-50 min-h-screen space-y-8">
      
      {cards.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No profiles have been added yet. Please add them from the Admin Panel.
        </div>
      ) : (
        // Database se aane wale har profile ke liye ek card banega
        cards.map((card) => {
          
          // 🌟 Helper function use kiya image path ke liye 🌟
          const imageSrc = getImageSrc(card.image_url);

          return (
            <div 
              key={card.id} 
              className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-100/80"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-10">
                
                {/* --- Left Column: Image and Biographical Info --- */}
                <div className="flex flex-col items-center justify-start text-center md:w-1/3 shrink-0">
                  
                  {/* Circular Image Container */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mb-4 flex-shrink-0">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={card.name || "Profile"}
                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/240x240?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center mx-auto">
                        <User size={70} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  
                  {/* Name and Designation centered cleanly under the photo */}
                  <div className="text-center w-full px-2">
                    <h2 className="text-lg sm:text-xl font-extrabold text-orange-500 mb-1 leading-snug">
                      {card.name}
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                      {card.title}
                    </p>
                  </div>
                </div>
                
                {/* --- Right Column: Note Content --- */}
                <div className="md:w-2/3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l-2 md:border-orange-400 md:pl-8 lg:pl-10 flex flex-col justify-start">
                  
                  {/* Note Title (e.g. Chairman's Note / Vice-Chairman's Note) */}
                  <h1 className="text-xl sm:text-2xl font-bold mb-4 text-[#1e3a8a] tracking-tight">
                    {card.noteTitle || (card.title?.toLowerCase().includes("vice") ? "Vice-Chairman's Note" : "Chairman's Note")}
                  </h1>
                  
                  {/* Content Body */}
                  <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base text-justify">
                    
                    {/* Salutation (Optional) */}
                    {card.salutation && (
                      <p className="font-bold text-sm sm:text-base text-gray-900">
                        {card.salutation}
                      </p>
                    )}
                    
                    {card.content && card.content.split('\n').map((paragraph, index) => {
                      if (!paragraph.trim()) return null;
                      return (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}

                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChairmanDesk;