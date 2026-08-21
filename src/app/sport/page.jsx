"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const SportGallery = () => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sportGalleryImages = [
    { id: 1, src: '/assets/Sport/sport1.jpeg', alt: 'Sport Image 1' },
    { id: 2, src: '/assets/Sport/sport2.jpeg', alt: 'Sport Image 2' },
    { id: 3, src: '/assets/Sport/sport3.jpeg', alt: 'Sport Image 3' },
    { id: 4, src: '/assets/Sport/sport4.jpeg', alt: 'Sport Image 4' },
    { id: 5, src: '/assets/Sport/sport5.jpeg', alt: 'Sport Image 5' },
    { id: 6, src: '/assets/Sport/sport6.jpeg', alt: 'Sport Image 6' },
    { id: 7, src: '/assets/Sport/sport7.jpeg', alt: 'Sport Image 7' },
    { id: 8, src: '/assets/Sport/sport8.jpeg', alt: 'Sport Image 8' },
    { id: 9, src: '/assets/Sport/sport9.jpeg', alt: 'Sport Image 9' },
    { id: 10, src: '/assets/Sport/sport10.jpeg', alt: 'Sport Image 10' },
    { id: 11, src: '/assets/Sport/sport11.jpeg', alt: 'Sport Image 11' },
    { id: 12, src: '/assets/Sport/sport12.jpeg', alt: 'Sport Image 12' },
    { id: 13, src: '/assets/Sport/sport13.jpeg', alt: 'Sport Image 13' },
    { id: 14, src: '/assets/Sport/sport14.jpeg', alt: 'Sport Image 14' },
    { id: 15, src: '/assets/Sport/sport15.jpeg', alt: 'Sport Image 15' },
    { id: 16, src: '/assets/Sport/sport16.jpeg', alt: 'Sport Image 16' },
    { id: 17, src: '/assets/Sport/sport17.jpeg', alt: 'Sport Image 17' },
    { id: 18, src: '/assets/Sport/sport18.jpeg', alt: 'Sport Image 18' },
    { id: 19, src: '/assets/Sport/sport19.jpeg', alt: 'Sport Image 19' },
    { id: 20, src: '/assets/Sport/sport20.jpeg', alt: 'Sport Image 20' },
    { id: 21, src: '/assets/Sport/sport21.jpeg', alt: 'Sport Image 21' },
    { id: 22, src: '/assets/Sport/sport22.jpeg', alt: 'Sport Image 22' },
    { id: 23, src: '/assets/Sport/sport23.jpeg', alt: 'Sport Image 23' },
  ];

  // Tabs state (if you want to add filtering later)
  const tabs = ['All'];
  const [activeTab, setActiveTab] = useState('All');

  // Handle image click
  const handleImageClick = (image, index) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
    setCurrentImageIndex(0);
  };

  // Navigate to next image
  const nextImage = () => {
    if (sportGalleryImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % sportGalleryImages.length;
      setCurrentImage(sportGalleryImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (sportGalleryImages.length > 0) {
      const prevIndex = (currentImageIndex - 1 + sportGalleryImages.length) % sportGalleryImages.length;
      setCurrentImage(sportGalleryImages[prevIndex]);
      setCurrentImageIndex(prevIndex);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

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
  }, [isModalOpen, currentImageIndex]);

  // Helper component for image card
  const ImageCard = ({ image, index }) => (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
      onClick={() => handleImageClick(image, index)}
    >
      {/* Image Container */}
      <div className="relative h-32 sm:h-64 w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 p-4 md:p-6 lg:p-8 lg:py-18">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <div className="mb-6 md:mb-12">
            <h1 className="text-2xl border-l-4 border-orange-400 pl-3 md:text-4xl lg:text-4xl font-bold text-gray-800 mb-3">
              Sport Gallery
            </h1>
          </div>

       

          {/* Image Section */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sportGalleryImages.map((image, index) => (
              <ImageCard key={image.id} image={image} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for large image view - Updated to match DomesticTourGallery style */}
      {isModalOpen && currentImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Background */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
            onClick={closeModal}
          />
          
          {/* Main Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-2">
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
              <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Counter */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {sportGalleryImages.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-4 px-2">
            <div className="max-w-6xl mx-auto">
              <div className="text-center text-white text-sm font-medium mb-2">
                Sport Gallery
              </div>
              <div className="overflow-x-auto">
                <div className="flex space-x-2 justify-center min-w-max">
                  {sportGalleryImages.map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => {
                        setCurrentImage(image);
                        setCurrentImageIndex(index);
                      }}
                      className={`relative flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                        currentImageIndex === index 
                          ? 'ring-4 ring-blue-500 transform scale-105' 
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SportGallery;