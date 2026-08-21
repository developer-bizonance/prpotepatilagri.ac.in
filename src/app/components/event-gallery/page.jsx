"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

const getImageSrc = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) return imagePath;
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_URL}${cleanPath.replace(/^\/assets\//, '/uploads/')}`;
};

function EventContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || searchParams.get("category");

  const [groupedImages, setGroupedImages] = useState({});
  const [flatImages, setFlatImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Year Filter States
  const [selectedYear, setSelectedYear] = useState("All");
  const availableYears = ["All", "2026", "2025", "2024", "2023", "2022"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/eventGallery`);
        if (!res.ok) throw new Error("Failed to fetch data");
        
        const data = await res.json();

        const allImages = data
          .map((item) => ({
            id: item.id,
            title: item.title,
            category: (item.category || "").trim(),
            sub_category: (item.sub_category || item.category || "General").trim(),
            year: item.year || "2026",
            src: getImageSrc(item.image_url),
            alt: item.title || item.category,
          }))
          .filter((img) => {
            // 1. Navbar tab / category filter
            if (currentTab) {
              const matchesCategory = img.category.toLowerCase() === currentTab.toLowerCase();
              const matchesSubCategory = img.sub_category.toLowerCase() === currentTab.toLowerCase();
              if (!matchesCategory && !matchesSubCategory) return false;
            }
            // 2. Year Filter check
            if (selectedYear !== "All" && img.year !== selectedYear) {
              return false;
            }
            return true;
          });
        
        setFlatImages(allImages);

        const groups = allImages.reduce((acc, img) => {
          const subCat = img.sub_category || "General";
          if (!acc[subCat]) {
            acc[subCat] = [];
          }
          acc[subCat].push(img);
          return acc;
        }, {});

        setGroupedImages(groups);
      } catch (err) {
        console.error("Error fetching event gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentTab, selectedYear]);

  const handleImageClick = (clickedImg) => {
    const index = flatImages.findIndex(img => img.id === clickedImg.id);
    setCurrentImageIndex(index !== -1 ? index : 0);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = useCallback(() => {
    if (flatImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % flatImages.length);
    }
  }, [flatImages.length]);

  const prevImage = useCallback(() => {
    if (flatImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
    }
  }, [flatImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextImage, prevImage]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
  }, [isModalOpen]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      </div>
    );
  }

  const selectedImage = flatImages[currentImageIndex];

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e293b] border-l-[4px] border-orange-500 pl-3 capitalize">
            {currentTab ? currentTab : "Event Gallery"} {selectedYear !== "All" ? `- ${selectedYear}` : ""}
          </h1>
        </div>

        {/* YEAR FILTER BUTTONS BAR */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {availableYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-sm ${
                selectedYear === yr
                  ? "bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold shadow-md scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* SUB-CATEGORY SECTIONS */}
        {Object.keys(groupedImages).length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-200 border-dashed">
            No images found for {selectedYear === "All" ? "this section" : `year ${selectedYear}`}.
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedImages).map(([subCategoryName, images]) => (
              <div key={subCategoryName} className="flex flex-col">
                
                {/* Sub-Category Title */}
                <h2 className="text-xl md:text-2xl font-bold text-[#1e293b] border-l-[4px] border-orange-500 pl-3 mb-5">
                  {subCategoryName}
                </h2>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="group relative overflow-hidden rounded-xl bg-gray-200 cursor-pointer aspect-[4/3] shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => handleImageClick(img)}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      {img.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white text-xs font-semibold p-3 truncate w-full">
                            {img.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL SLIDER */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-6xl flex flex-col items-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-0 right-4 md:right-0 z-20 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {flatImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center mb-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                unoptimized
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <div className="bg-black/60 text-white px-6 py-2.5 rounded-full backdrop-blur-md flex items-center gap-3">
              <span className="font-semibold text-orange-400">{selectedImage.sub_category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm font-medium text-yellow-300">{selectedImage.year}</span>
              {selectedImage.title && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <span className="text-sm font-medium">{selectedImage.title}</span>
                </>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span className="text-sm text-gray-300">
                {currentImageIndex + 1} / {flatImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventGalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-orange-500 w-12 h-12" /></div>}>
      <EventContent />
    </Suspense>
  );
}