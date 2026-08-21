"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
const API_URL = `${BACKEND_URL}/api/popup-events`;
const UPLOAD_URL = `${BACKEND_URL}/uploads/images/popups`;

export default function PopupManager() {
  const [popups, setPopups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPopups = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!isMounted || !Array.isArray(data) || data.length === 0) return;

        const firstPopup = data[0];
        const firstImg = firstPopup?.images?.[0];
        const imageSrc = firstImg
          ? firstImg.startsWith("http")
            ? firstImg
            : `${UPLOAD_URL}/${firstImg}`
          : null;

        if (imageSrc) {
          // Preload image in memory for instant display
          const img = new Image();
          img.src = imageSrc;
          const displayModal = () => {
            if (isMounted) {
              setPopups(data);
              setCurrentIndex(0);
              setShow(true);
            }
          };
          img.onload = displayModal;
          img.onerror = displayModal;
        } else {
          setPopups(data);
          setCurrentIndex(0);
          setShow(true);
        }
      } catch (err) {
        console.warn("Popup instant fetch notice:", err?.message || err);
      }
    };

    fetchPopups();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (popups.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popups.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [popups.length, currentIndex, isPaused]);

  const currentPopup = popups[currentIndex] || null;

  const nextPopup = () => {
    if (popups.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % popups.length);
    }
  };

  const prevPopup = () => {
    if (popups.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + popups.length) % popups.length);
    }
  };

  if (!show || !currentPopup || popups.length === 0) return null;

  const hasTitle = currentPopup.title && currentPopup.title.trim() !== "";

  const hasLink =
    currentPopup.link &&
    currentPopup.link.trim() !== "" &&
    currentPopup.link.trim() !== "#" &&
    currentPopup.link.trim() !== "null";

  const hasButton =
    hasLink && currentPopup.buttonText && currentPopup.buttonText.trim() !== "";

  const imageSrc = currentPopup.images?.[0]
    ? currentPopup.images[0].startsWith("http")
      ? currentPopup.images[0]
      : `${UPLOAD_URL}/${currentPopup.images[0]}`
    : null;

  if (!imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl w-fit max-w-[95vw] overflow-hidden shadow-2xl relative border-x-4 border-white"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-[#006633]" />

        {hasTitle && (
          <div className="px-6 py-4 flex justify-between items-center bg-gradient-to-r from-orange-500/10 to-[#006633]/10 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-gradient-to-b from-orange-500 to-[#006633] rounded-full" />
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                {currentPopup.title}
              </h2>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-1.5 transition-all duration-200"
            >
              <X size={22} />
            </button>
          </div>
        )}

        {!hasTitle && (
          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 z-20 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-full p-1.5 transition-all duration-200 bg-white/70 shadow-sm"
          >
            <X size={22} />
          </button>
        )}

        <div className="relative flex items-center justify-center group max-w-2xl mx-auto">
          {popups.length > 1 && (
            <button
              onClick={prevPopup}
              className="absolute left-3 z-10 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110 opacity-70 hover:opacity-100"
              aria-label="Previous banner"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {hasLink ? (
            <a
              href={currentPopup.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block flex items-center justify-center hover:opacity-95 transition-opacity duration-200"
            >
              <img
                src={imageSrc}
                className="w-auto h-auto max-h-[75vh] object-contain block"
                alt={currentPopup.title || "Announcement"}
              />
            </a>
          ) : (
            <img
              src={imageSrc}
              className="w-auto h-auto max-h-[75vh] object-contain block"
              alt={currentPopup.title || "Announcement"}
            />
          )}

          {popups.length > 1 && (
            <button
              onClick={nextPopup}
              className="absolute right-3 z-10 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110 opacity-70 hover:opacity-100"
              aria-label="Next banner"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {(hasButton || popups.length > 1) && (
          <div className="bg-white px-4 py-2.5 grid grid-cols-3 items-center border-t border-gray-100 min-w-[300px]">
            <div className="flex justify-start">
              {popups.length > 1 && (
                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  {currentIndex + 1} / {popups.length}
                </span>
              )}
            </div>

            <div className="flex justify-center gap-1.5">
              {popups.length > 1 &&
                popups.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-6 bg-gradient-to-r from-orange-500 to-[#006633]"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
            </div>

            <div className="flex justify-end">
              {hasButton && (
                <a
                  href={currentPopup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-[#006633] text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
                >
                  {currentPopup.buttonText}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
