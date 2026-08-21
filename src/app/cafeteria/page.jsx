"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CafeteriaGallery = () => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSection, setCurrentSection] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Section 1: Cafeteria Images
  const cafeteriaImages = [
    { id: 1, title: 'Cafeteria Image 1', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria1.jpeg' },
    { id: 2, title: 'Cafeteria Image 2', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria2.jpeg' },
    { id: 3, title: 'Cafeteria Image 3', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria3.jpeg' },
    { id: 4, title: 'Cafeteria Image 4', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria4.jpeg' },
    { id: 5, title: 'Cafeteria Image 5', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria5.jpeg' },
    { id: 6, title: 'Cafeteria Image 6', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria6.jpeg' },
    { id: 7, title: 'Cafeteria Image 7', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria7.jpeg' },
    { id: 8, title: 'Cafeteria Image 8', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria8.jpeg' },
    { id: 9, title: 'Cafeteria Image 9', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria9.jpeg' },
    { id: 10, title: 'Cafeteria Image 10', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria10.jpeg' },
    { id: 11, title: 'Cafeteria Image 11', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria11.jpeg' },
    { id: 12, title: 'Cafeteria Image 12', category: 'Cafeteria', src: '/assets/Cafeteria/cafeteria12.jpeg' },
  ];

  // Section 2: Cafeteria Agronomy Images
  const cafeteriaAgronomyImages = [
    { id: 1, title: 'Cafeteria Agronomy 1', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy1.jpeg' },
    { id: 2, title: 'Cafeteria Agronomy 2', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy2.jpeg' },
    { id: 3, title: 'Cafeteria Agronomy 3', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy3.jpeg' },
    { id: 4, title: 'Cafeteria Agronomy 4', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy4.jpeg' },
    { id: 5, title: 'Cafeteria Agronomy 5', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy5.jpeg' },
    { id: 6, title: 'Cafeteria Agronomy 6', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy6.jpeg' },
    { id: 7, title: 'Cafeteria Agronomy 7', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy7.jpeg' },
    { id: 8, title: 'Cafeteria Agronomy 8', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy8.jpeg' },
    { id: 9, title: 'Cafeteria Agronomy 9', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy9.jpeg' },
    { id: 10, title: 'Cafeteria Agronomy 10', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy10.jpeg' },
    { id: 11, title: 'Cafeteria Agronomy 11', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy11.jpeg' },
    { id: 12, title: 'Cafeteria Agronomy 12', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy12.jpeg' },
    { id: 13, title: 'Cafeteria Agronomy 13', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy13.jpeg' },
    { id: 14, title: 'Cafeteria Agronomy 14', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy14.jpeg' },
    { id: 15, title: 'Cafeteria Agronomy 15', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy15.jpeg' },
    { id: 16, title: 'Cafeteria Agronomy 16', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy16.jpeg' },
    { id: 17, title: 'Cafeteria Agronomy 17', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy17.jpeg' },
    { id: 18, title: 'Cafeteria Agronomy 18', category: 'Agronomy', src: '/assets/Cafeteria/cafeteria-agronomy18.jpeg' },
  ];

  // Section 3: Cafeteria Horticulture Images
  const horticultureImages = [
    { id: 1, title: 'Cafeteria Horticulture 1', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture1.jpeg' },
    { id: 2, title: 'Cafeteria Horticulture 2', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture2.jpeg' },
    { id: 3, title: 'Cafeteria Horticulture 3', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture3.jpeg' },
    { id: 4, title: 'Cafeteria Horticulture 4', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture4.jpeg' },
    { id: 5, title: 'Cafeteria Horticulture 5', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture5.jpeg' },
    { id: 6, title: 'Cafeteria Horticulture 6', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture6.jpeg' },
    { id: 7, title: 'Cafeteria Horticulture 7', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture7.jpeg' },
    { id: 8, title: 'Cafeteria Horticulture 8', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture8.jpeg' },
    { id: 9, title: 'Cafeteria Horticulture 9', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture9.jpeg' },
    { id: 10, title: 'Cafeteria Horticulture 10', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture10.jpeg' },
    { id: 11, title: 'Cafeteria Horticulture 11', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture11.jpeg' },
    { id: 12, title: 'Cafeteria Horticulture 12', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture12.jpeg' },
    { id: 13, title: 'Cafeteria Horticulture 13', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture13.jpg' },
    { id: 14, title: 'Cafeteria Horticulture 14', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture14.jpeg' },
    { id: 15, title: 'Cafeteria Horticulture 15', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture15.jpeg' },
    { id: 16, title: 'Cafeteria Horticulture 16', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture16.jpeg' },
    { id: 17, title: 'Cafeteria Horticulture 17', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture17.jpeg' },
    { id: 18, title: 'Cafeteria Horticulture 18', category: 'Horticulture', src: '/assets/Cafeteria/cafeteria-horticulture18.jpeg' },
  ];

  // Function to get current section images
  const getCurrentSectionImages = (section) => {
    switch(section) {
      case 'cafeteria': return cafeteriaImages;
      case 'agronomy': return cafeteriaAgronomyImages;
      case 'horticulture': return horticultureImages;
      default: return [];
    }
  };

  // Function to get section name
  const getSectionName = (section) => {
    switch(section) {
      case 'cafeteria': return 'Cafeteria';
      case 'agronomy': return 'Cafeteria Agronomy';
      case 'horticulture': return 'Cafeteria Horticulture';
      default: return '';
    }
  };

  // Function to open modal
  const openModal = (image, section) => {
    const currentImages = getCurrentSectionImages(section);
    const currentIndex = currentImages.findIndex(img => img.id === image.id);
    
    setCurrentImage(image);
    setCurrentSection(section);
    setCurrentImageIndex(currentIndex);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
    setCurrentSection('');
    setCurrentImageIndex(0);
  };

  // Function to navigate to next image
  const nextImage = () => {
    const currentImages = getCurrentSectionImages(currentSection);
    if (currentImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % currentImages.length;
      setCurrentImage(currentImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
    }
  };

  // Function to navigate to previous image
  const prevImage = () => {
    const currentImages = getCurrentSectionImages(currentSection);
    if (currentImages.length > 0) {
      const prevIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
      setCurrentImage(currentImages[prevIndex]);
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
  }, [isModalOpen, currentImageIndex, currentSection]);

  // Helper component for image card
  const ImageCard = ({ image, section }) => (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
      onClick={() => openModal(image, section)}
    >
      {/* Image Container */}
      <div className="relative h-32 sm:h-64 w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 lg:py-18">
        <div className="max-w-7xl mx-auto">
          {/* Main Header */}
          <div className="mb-6 md:mb-12">
            <h1 className="text-xl md:text-4xl lg:text-4xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800 mb-3">
              Explore Our Cafeteria Gallery
            </h1>
          </div>

          {/* Section 1: Cafeteria */}
          <div className="mb-8 md:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Cafeteria</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cafeteriaImages.map((image) => (
                <ImageCard key={image.id} image={image} section="cafeteria" />
              ))}
            </div>
          </div>

          {/* Section 2: Cafeteria Agronomy */}
          <div className="mb-8 md:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Cafeteria Agronomy</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {cafeteriaAgronomyImages.map((image) => (
                <ImageCard key={image.id} image={image} section="agronomy" />
              ))}
            </div>
          </div>

          {/* Section 3: Cafeteria Horticulture */}
          <div className="mb-8 md:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Cafeteria Horticulture</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {horticultureImages.map((image) => (
                <ImageCard key={image.id} image={image} section="horticulture" />
              ))}
            </div>
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
              <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={currentImage.src}
                  alt={currentImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm text-center min-w-[120px]">
                <div className="font-medium">{getSectionName(currentSection)}</div>
                <div className="text-xs opacity-90">
                  {currentImageIndex + 1} / {getCurrentSectionImages(currentSection).length}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm py-4 px-2">
            <div className="max-w-6xl mx-auto">
              <div className="text-center text-white text-sm font-medium mb-2">
                {getSectionName(currentSection)} Gallery
              </div>
              <div className="overflow-x-auto">
                <div className="flex space-x-2 justify-center min-w-max">
                  {getCurrentSectionImages(currentSection).map((image, index) => (
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
                        alt={image.title}
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

export default CafeteriaGallery;