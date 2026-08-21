"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const API_URL = "http://localhost:4001/api/gallery-videos";


const getEmbedSrc = (input) => {
  if (!input) return null;
  const srcMatch = input.match(/src=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) return srcMatch[1];
  
  if (input.includes('youtube.com/watch?v=')) {
    const videoId = input.split('v=')[1]?.split('&')[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  if (input.includes('youtu.be/')) {
    const videoId = input.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  return input;
};

const VideoCard = ({ video }) => {
  const embedSrc = getEmbedSrc(video.url);

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 w-full max-w-[350px] mx-auto">
      <div className="relative pt-[56.25%] overflow-hidden rounded-t-xl bg-gray-100">
        {embedSrc && (
          <iframe
            src={embedSrc}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        )}
      </div>
      <div className="p-4 bg-white rounded-b-xl">
        <h3 className="text-lg font-semibold text-gray-800 text-center truncate">
          {video.title}
        </h3>
      </div>
    </div>
  );
};

export default function VideoCarousel() {
  const scrollRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          const text = await res.text();
          throw new Error(`Server sent HTML instead of JSON. Check your API URL or backend port. Preview: ${text.slice(0, 100)}`);
        }
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err.message);
        setLoading(false);
      });
  }, []);

  // Handle touch/mouse drag for scrolling
  const handleDragStart = (e) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    
    setIsDragging(true);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setStartX(clientX - scrollElement.offsetLeft);
    setScrollLeft(scrollElement.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      const cardWidth = scrollElement.offsetWidth;
      const newIndex = Math.round(scrollElement.scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < videos.length) {
        setActiveIndex(newIndex);
        scrollElement.scrollTo({
          left: newIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleDotClick = (index) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    const scrollPosition = index * scrollElement.offsetWidth;
    scrollElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-gradient-to-r from-orange-400 to-blue-400">
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <div className="relative py-12 md:py-22 md:pt-12 px-4 bg-gradient-to-r from-orange-400 to-blue-400 min-h-[300px]">
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold pl-3 border-l-4 border-black text-white mb-4">
            Videos
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div 
            ref={scrollRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            className={`flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ WebkitOverflowScrolling: 'touch', userSelect: 'none', touchAction: 'pan-y' }}
          >
            {videos.map((video) => (
              <div key={video.id} className="w-full flex-shrink-0 snap-center flex justify-center px-2">
                <VideoCard video={video} />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-3">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}