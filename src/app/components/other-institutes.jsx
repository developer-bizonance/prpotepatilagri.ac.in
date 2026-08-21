"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const BACKEND_URL = "http://localhost:4001"; 

const getValidUrl = (url) => {
  if (!url) return null;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export default function OtherInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);

  // Fetch institutes from Backend API
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/institutes`);
        setInstitutes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch institutes:", err);
        setError("Unable to load institutes at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  // Window resize listener for mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Continuous animation logic for mobile
  useEffect(() => {
    if (loading || institutes.length === 0) return;

    const track = trackRef.current;
    if (!track) return;

    if (!isMobile) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        track.style.transform = 'translateX(0px)';
      }
      return;
    }

    // Duplicate cards for seamless looping if not already duplicated
    if (track.children.length === institutes.length) {
      track.innerHTML += track.innerHTML;
    }

    const images = track.querySelectorAll('img');
    const promises = Array.from(images).map(img => new Promise(resolve => {
      if (img.complete) resolve();
      else img.addEventListener('load', resolve);
    }));

    Promise.all(promises).then(() => {
      let start = null;
      let speed = 0.5; // px per frame
      let scrollX = 0;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        start = timestamp;

        scrollX += speed;
        const trackWidth = track.scrollWidth / 2;
        if (scrollX >= trackWidth) scrollX -= trackWidth;

        if (track) {
          track.style.transform = `translateX(${-scrollX}px)`;
        }
        animationRef.current = requestAnimationFrame(step);
      };

      animationRef.current = requestAnimationFrame(step);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isMobile, loading, institutes]);

  if (loading) {
    return (
      <div className="carousel-container container mx-auto max-w-7xl p-4 sm:p-0 sm:py-8 min-h-[300px] animate-pulse">
        <div className="h-8 w-52 bg-gray-200 rounded-md mb-8 border-l-4 border-amber-600 mt-5" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="min-w-[160px] rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0"
            >
              <div className="w-full h-40 bg-gray-200" />
              <div className="h-8 bg-gray-300 w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-white text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="carousel-container container mx-auto max-w-7xl p-4 sm:p-0 sm:py-8 min-h-[300px] sm:min-h-[430px]">
      <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-16 mt-5 border-l-4 border-amber-600 pl-2 text-black">
        Other Institutes
      </h2>

      <div className="carousel-track" ref={trackRef}>
        {institutes.map((institute, index) => {
          const imageSrc = institute.imageUrl 
            ? (institute.imageUrl.startsWith('http') ? institute.imageUrl : `${BACKEND_URL}${institute.imageUrl}`)
            : "/assets/placeholder.png";

          const validLink = getValidUrl(institute.link) || "#";

          return (
            <a
              key={institute.id || index}
              href={validLink}
              target="_blank"
              rel="noopener noreferrer"
              className="carousel-card cursor-pointer"
            >
              <img 
                src={imageSrc} 
                alt={institute.title} 
                className="sm:w-40 sm:h-40 object-cover p-5 rounded-t-lg" 
              />
              <div className="text-center mt-2 py-1 rounded-b-xl bg-gradient-to-r from-orange-400 to-yellow-300 font-medium text-black text-xs sm:text-sm">
                {institute.title}
              </div>
            </a>
          );
        })}
      </div>

      <style jsx>{`
        .carousel-card img[alt*="Nursing"],
        .carousel-card img[alt*="nursing"] {
          object-fit: contain !important;
          background: white;
        }
        .carousel-container {
          overflow: hidden;
          width: 100%;
        }
        .carousel-track {
          display: flex;
          gap: 16px;
          will-change: transform;
        }
        .carousel-card {
          min-width: 160px;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          background: #f9fafb;
          transition: transform 0.3s ease;
        }
        .carousel-card:hover {
          transform: scale(1.07);
        }
        .carousel-card img {
          border-radius: 12px 12px 0 0;
          background: #f9fafb;
        }
        @media (max-width: 600px) {
          .carousel-card {
            min-width: 120px;
          }
          .carousel-card img {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}