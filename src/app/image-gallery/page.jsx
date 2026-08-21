"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const BACKEND_URL = "http://localhost:4001";

// 🌟 Image URL Fixer 🌟
const getImageSrc = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) return imagePath;
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_URL}${cleanPath.replace(/^\/assets\//, '/uploads/')}`;
};

const ImageGallery = () => {
  // State for dynamic data
  const [groupedImages, setGroupedImages] = useState({});
  const [flatImages, setFlatImages] = useState([]); // Flat array for the slider
  const [loading, setLoading] = useState(true);

  // State for modal (Tera purana logic)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        let combinedData = [];

        // 1. Fetch from eventGallery API (Admin EventGallery panel)
        try {
          const eventRes = await fetch(`${BACKEND_URL}/api/eventGallery?category=Image Gallery`);
          if (eventRes.ok) {
            const eventData = await eventRes.json();
            if (Array.isArray(eventData)) {
              combinedData.push(...eventData.map(item => ({
                id: `eg-${item.id}`,
                title: item.sub_category || item.title || "Image Gallery",
                imageUrl: item.image_url,
              })));
            }
          }
        } catch (e) {
          console.error("Error fetching eventGallery:", e);
        }

        // 2. Fetch from legacy gallery API
        try {
          const res = await fetch(`${BACKEND_URL}/api/gallery`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              combinedData.push(...data.map(item => ({
                id: `g-${item.id}`,
                title: item.title || "General Gallery",
                imageUrl: item.imageUrl,
              })));
            }
          }
        } catch (e) {
          console.error("Error fetching gallery:", e);
        }
        
        const formattedImages = combinedData.map((img) => ({
          id: img.id,
          title: img.title ? img.title.trim() : "General",
          src: getImageSrc(img.imageUrl),
          alt: img.title || "Gallery Image",
        }));
        
        setFlatImages(formattedImages);

        // Grouping by category/title
        const groups = formattedImages.reduce((acc, img) => {
          const category = img.title || "General Gallery";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(img);
          return acc;
        }, {});

        setGroupedImages(groups);
      } catch (err) {
        console.error("Error in fetchGallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // --- MODAL HANDLERS ---
  const handleImageClick = (image) => {
    // Find index of clicked image in the flat array
    const index = flatImages.findIndex(img => img.id === image.id);
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (flatImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % flatImages.length;
      setCurrentImage(flatImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
    }
  };

  const prevImage = () => {
    if (flatImages.length > 0) {
      const prevIndex = (currentImageIndex - 1 + flatImages.length) % flatImages.length;
      setCurrentImage(flatImages[prevIndex]);
      setCurrentImageIndex(prevIndex);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentImageIndex]);


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 lg:py-12 font-sans">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Header */}
          <div className="mb-10 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 border-l-[5px] border-orange-500 pl-4 mb-3 leading-tight">
              Explore Our <span className="text-orange-500">Gallery</span>
            </h1>
          </div>

          {/* Grouped Image Section */}
          {Object.keys(groupedImages).length === 0 ? (
            <div className="text-center py-20 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
              No images available in the gallery.
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedImages).map(([categoryName, images]) => (
                <div key={categoryName} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  {/* Category Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-[#1e293b] border-l-[4px] border-orange-500 pl-3 mb-6">
                    {categoryName}
                  </h2>
                  
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white cursor-pointer aspect-square sm:aspect-[4/3]"
                        onClick={() => handleImageClick(image)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for large image view */}
      {isModalOpen && currentImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={closeModal}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
              <div className="relative h-[60vh] sm:h-[75vh] w-full flex items-center justify-center">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>
              <div className="mt-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {flatImages.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-4 px-2">
            <div className="max-w-6xl mx-auto overflow-x-auto">
              <div className="flex space-x-2 justify-center">
                {flatImages.map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      setCurrentImage(image);
                      setCurrentImageIndex(index);
                    }}
                    className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? "ring-4 ring-orange-500 transform scale-105 opacity-100"
                        : "opacity-50 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;