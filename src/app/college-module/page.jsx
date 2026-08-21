"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const FourSectionGallery = () => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSection, setCurrentSection] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Section 1: Nature Images
  const agronomyImages = [
  
    { id: 2, title: 'Mountain Peak', category: 'Nature', src: '/assets/Agronomy/agronomy1.jpeg' },
    { id: 3, title: 'River Flow', category: 'Nature', src: '/assets/Agronomy/agronomy2.jpeg' },
    { id: 4, title: 'Desert Sunset', category: 'Nature', src: '/assets/Agronomy/agronomy3.jpeg' },
    { id: 5, title: 'Ocean Waves', category: 'Nature', src: '/assets/Agronomy/agronomy4.jpeg' },
    { id: 6, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy5.jpeg' },
    { id: 7, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy6.jpeg' },
    { id: 8, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy7.jpeg' },
    { id: 9, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy8.jpeg' },
    { id: 10, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy9.jpeg' },
    { id: 11, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy10.jpeg' },
    { id: 12, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy11.jpeg' },
    { id: 13, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy12.jpeg' },
    { id: 14, title: 'Green Valley', category: 'Nature', src: '/assets/Agronomy/agronomy13.jpeg' },
  ];

  // Section 2: Urban Images
  const animalScienceImages = [
    { id: 1, title: 'Modern Architecture', category: 'Urban', src: '/assets/Animal-Science/animal-science1.jpeg' },
    { id: 2, title: 'Night Lights', category: 'Urban', src: '/assets/Animal-Science/animal-science2.jpeg' },
    { id: 3, title: 'Urban Bridge', category: 'Urban', src: '/assets/Animal-Science/animal-science3.jpeg' },
    { id: 4, title: 'City Park', category: 'Urban', src: '/assets/Animal-Science/animal-science4.jpeg' },
    { id: 5, title: 'Downtown', category: 'Urban', src: '/assets/Animal-Science/animal-science5.jpeg' },
  ];

  // Section 3: Art & Design
  const horticultureImages = [
    { id: 1, title: 'Abstract Art', category: 'Art', src: '/assets/Horticulture/horticulture1.jpeg' },
    { id: 2, title: 'Minimal Design', category: 'Art', src: '/assets/Horticulture/horticulture2.jpeg' },
    { id: 3, title: 'Color Burst', category: 'Art', src: '/assets/Horticulture/horticulture3.jpeg' },
    { id: 4, title: 'Pattern Play', category: 'Art', src: '/assets/Horticulture/horticulture4.jpeg' },
    { id: 5, title: 'Modern Art', category: 'Art', src: '/assets/Horticulture/horticulture5.jpeg' },
    { id: 6, title: 'Creative Design', category: 'Art', src: '/assets/Horticulture/horticulture6.jpeg' },
    { id: 7, title: 'Creative Design', category: 'Art', src: '/assets/Horticulture/horticulture7.jpeg' },
    { id: 8, title: 'Creative Design', category: 'Art', src: '/assets/Horticulture/horticulture8.jpeg' },
    { id: 9, title: 'Creative Design', category: 'Art', src: '/assets/Horticulture/horticulture9.jpeg' },
    { id: 10, title: 'Creative Design', category: 'Art', src: '/assets/Horticulture/horticulture10.jpeg' },
  ];

  // Section 4: Travel & Adventure
  const plantPathalogyImages = [
    { id: 1, title: 'Beach Paradise', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy1.jpg' },
    { id: 2, title: 'Mountain Hike', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy2.jpg' },
    { id: 3, title: 'Historic City', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy3.jpg' },
    { id: 4, title: 'Cultural Heritage', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy4.jpg' },
    { id: 5, title: 'Tropical Island', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy5.jpeg' },
    { id: 6, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy6.jpeg' },
    { id: 7, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy7.jpeg' },
    { id: 8, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy8.jpeg' },
    { id: 9, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy9.jpeg' },
    { id: 10, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy10.jpeg' },
    { id: 11, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy11.jpeg' },
    { id: 12, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy12.jpeg' },
    { id: 13, title: 'Snow Adventure', category: 'Travel', src: '/assets/Plant-Pathology/plant-pathalogy13.jpeg' },
  ];

  // Function to get current section images
  const getCurrentSectionImages = (section) => {
    switch(section) {
      case 'nature': return agronomyImages;
      case 'urban': return animalScienceImages;
      case 'art': return horticultureImages;
      case 'travel': return plantPathalogyImages;
      default: return [];
    }
  };

  // Function to open modal
  const openModal = (image, section, sectionName) => {
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
  const ImageCard = ({ image, section, sectionName }) => (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
      onClick={() => openModal(image, section, sectionName)}
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
          <div className=" mb-5 md:mb-12">
            <h1 className="text-xl border-l-4 border-orange-400 pl-3 md:text-4xl lg:text-4xl font-bold text-gray-800 mb-3">
              Explore Our <span className="text-orange-500">Gallery</span>
            </h1>
          </div>

          {/* Section 1: Nature */}
          <div className="mb-8 md:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Agronomy</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {agronomyImages.map((image) => (
                <ImageCard key={image.id} image={image} section="nature" sectionName="Agronomy" />
              ))}
            </div>
          </div>

          {/* Section 2: Urban */}
          <div className="mb-8 md:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Animal Science & Dairy Science</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {animalScienceImages.map((image) => (
                <ImageCard key={image.id} image={image} section="urban" sectionName="Animal Science and Dairy Science" />
              ))}
            </div>
          </div>

          {/* Section 3: Art */}
          <div className="mb-8 md:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Horticulture</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {horticultureImages.map((image) => (
                <ImageCard key={image.id} image={image} section="art" sectionName="Horticulture" />
              ))}
            </div>
          </div>

          {/* Section 4: Travel */}
          <div className="mb-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xl md:text-3xl border-l-4 border-orange-400 pl-3 font-bold text-gray-800">Plant Pathology</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {plantPathalogyImages.map((image) => (
                <ImageCard key={image.id} image={image} section="travel" sectionName="Plant Pathology" />
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
                <div className="font-medium">{currentSection === 'nature' ? 'Agronomy' : 
                                            currentSection === 'urban' ? 'Animal Science' : 
                                            currentSection === 'art' ? 'Horticulture' : 
                                            'Plant Pathology'}</div>
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
                {currentSection === 'nature' ? 'Agronomy Gallery' : 
                 currentSection === 'urban' ? 'Animal Science Gallery' : 
                 currentSection === 'art' ? 'Horticulture Gallery' : 
                 'Plant Pathology Gallery'}
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

export default FourSectionGallery;