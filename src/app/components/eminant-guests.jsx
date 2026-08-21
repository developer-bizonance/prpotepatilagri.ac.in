"use client";

import { Camera, User, ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

const CARDS_PER_VIEW_DESKTOP = 3;

export default function EminentGuests() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef(null);
  const cardWidthRef = useRef(0);
  const desktopContainerRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
  const totalSlides = Math.ceil(guests.length / CARDS_PER_VIEW_DESKTOP);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(`${API_URL}/api/eminent-guests`);
        if (!response.ok) throw new Error("Failed to fetch eminent guests");
        const data = await response.json();
        if (Array.isArray(data)) {
          setGuests(data);
        }
      } catch (error) {
        console.error("Error fetching guests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuests();
  }, [API_URL]);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      cardWidthRef.current = carouselRef.current.offsetWidth;
    }
  }, [guests]);

  const nextSlide = useCallback(() => {
    if (guests.length === 0) return;
    setCurrentIndex((prev) => {
      if (isDesktop) {
        return prev === totalSlides - 1 ? 0 : prev + 1;
      }
      return prev === guests.length - 1 ? 0 : prev + 1;
    });
  }, [isDesktop, totalSlides, guests.length]);

  const prevSlide = useCallback(() => {
    if (guests.length === 0) return;
    setCurrentIndex((prev) => {
      if (isDesktop) {
        return prev === 0 ? totalSlides - 1 : prev - 1;
      }
      return prev === 0 ? guests.length - 1 : prev - 1;
    });
  }, [isDesktop, totalSlides, guests.length]);

  // Auto scroll timer with pause on hover
  useEffect(() => {
    if (guests.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, [guests.length, isPaused, nextSlide]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setTranslateX(startX - e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = cardWidthRef.current * 0.2;
    if (Math.abs(translateX) > threshold) {
      translateX > 0 ? nextSlide() : prevSlide();
    }
    setTranslateX(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTranslateX(startX - e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
    }
  };

  useEffect(() => {
    if (isDesktop && desktopContainerRef.current && guests.length > 0) {
      const container = desktopContainerRef.current;
      const cardWidth = container.querySelector(".desktop-card")?.offsetWidth || 330;
      const gap = 24;
      container.scrollTo({
        left: currentIndex * (CARDS_PER_VIEW_DESKTOP * (cardWidth + gap)),
        behavior: "smooth",
      });
    }
  }, [currentIndex, isDesktop, guests.length]);

  if (isLoading) {
    return <div className="py-20 text-center text-gray-500 font-medium">Loading Eminent Guests...</div>;
  }

  if (guests.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1260px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl mb-10 pl-3 border-l-4 border-orange-400 font-extrabold text-gray-900">
          Eminent Guests
        </h2>

        {/* Carousel Container with Side Navigation Buttons & Auto Scroll */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2.5 sm:p-3 rounded-full shadow-xl border border-gray-100 transition-all hover:scale-110 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>

          {/* Desktop View */}
          <div className="hidden md:block">
            <div ref={desktopContainerRef} className="flex gap-6 overflow-hidden py-4 px-2">
              {guests.map((guest) => (
                <div key={guest.id} className="desktop-card flex-shrink-0 w-[330px] lg:w-[380px]">
                  <GuestCard guest={guest} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="relative">
              <div
                ref={carouselRef}
                className="overflow-hidden select-none rounded-xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              >
                <div
                  className="flex py-2"
                  style={{
                    transform: `translateX(calc(-${currentIndex * 100}% + ${-translateX}px))`,
                    transition: isDragging ? "none" : "transform 300ms ease",
                  }}
                >
                  {guests.map((guest) => (
                    <div key={guest.id} className="w-full flex-shrink-0 px-2" style={{ touchAction: "pan-y" }}>
                      <div className="w-full">
                        <GuestCard guest={guest} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2.5 sm:p-3 rounded-full shadow-xl border border-gray-100 transition-all hover:scale-110 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {(isDesktop ? Array.from({ length: totalSlides }) : guests).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-orange-400 w-6" : "bg-gray-300 w-2.5 hover:bg-gray-400"
              }`}
              aria-label={isDesktop ? `Go to slide ${idx + 1}` : `Go to guest ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GuestCard({ guest }) {
  const [imgError, setImgError] = useState(false);
  const MEDIA_DOWNLOAD =
    process.env.NEXT_PUBLIC_MEDIA_DOWNLOAD ||
    "https://media.bizonance.in/api/v1/image/download/eca82cda-d4d7-4fe5-915a-b0880bb8de74/bizonance";

  const resolveImageUrl = () => {
    if (!guest.imageUrl || guest.imageUrl === "null" || guest.imageUrl === "undefined") {
      return null;
    }

    if (guest.imageUrl) {
      if (guest.imageUrl.startsWith("http") || guest.imageUrl.startsWith("data:")) {
        return guest.imageUrl;
      }
      const cleanName = guest.imageUrl.split("/").pop();
      return `${MEDIA_DOWNLOAD}/${cleanName}`;
    }
    return null;
  };

  const imageUrl = resolveImageUrl();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-center group h-full flex flex-col">
      <div className="w-full h-72 overflow-hidden bg-gray-100 flex items-center justify-center">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={guest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <User size={48} />
            <span className="text-xs mt-2 text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-center">
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">
          {guest.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {guest.designation}
        </p>
      </div>
    </div>
  );
}