'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

const getImageSrc = (url) => {
  if (!url) return "/assets/International-tour/internationaltour1.jpeg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE}${cleanPath}`;
};

const InternationalTourGallery = () => {
  const [tourImages, setTourImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState(['All', '2026', '2025', '2024', '2023']);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/eventGallery?category=International Study Tour`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((item) => ({
              id: item.id,
              src: getImageSrc(item.image_url),
              alt: item.title || 'International Tour',
              year: item.year ? item.year.toString() : '2026',
              title: item.title || 'International Tour',
            }));
            setTourImages(formatted);

            const yearsFromData = Array.from(new Set(formatted.map(img => img.year).filter(Boolean))).sort().reverse();
            if (yearsFromData.length > 0) {
              setTabs(['All', ...yearsFromData]);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching international tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const filteredImages = activeTab === 'All' 
    ? tourImages 
    : tourImages.filter(img => img.year === activeTab);

  // Handle image click
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  // Navigate to next image
  const nextImage = () => {
    if (filteredImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (filteredImages.length > 0) {
      const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex]);
      setCurrentImageIndex(prevIndex);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 sm:py-18 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <header className="mb-3 sm:mb-12">
            <h1 className="text-xl sm:text-4xl font-bold border-l-4 border-orange-400 pl-3 text-gray-900 mb-4">
              International Study Tour
            </h1>
          </header>

          {/* Tabs */}
          <div className="flex mb-5 sm:mb-12 overflow-x-auto">
            <div className="inline-flex rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 sm:px-8 py-2 text-xs mx-1 font-semibold rounded-3xl transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-orange-400 to-yellow-300 shadow-sm text-gray-900'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-gray-500 font-medium">Loading tours...</div>
          ) : (
            /* Image Gallery */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
                  onClick={() => handleImageClick(image, index)}
                >
                  {/* Image Container */}
                  <div className="relative h-32 sm:h-64 w-full overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600">No tours available for the selected year.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Image View */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Background */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
            onClick={closeModal}
          />
          
          {/* Main Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
              aria-label="Close gallery"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors duration-200"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center bg-black/40">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-4 px-2">
            <div className="max-w-6xl mx-auto overflow-x-auto">
              <div className="flex space-x-2 justify-center">
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      setSelectedImage(image);
                      setCurrentImageIndex(index);
                    }}
                    className={`relative flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'ring-4 ring-blue-500 transform scale-105' 
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
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

export default InternationalTourGallery;