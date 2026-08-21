"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

const campusImages = [
  { id: 1, title: "Main Building View", src: "/assets/campus1.jpg" },
  { id: 2, title: "Main Building View", src: "/assets/campus2.jpg" },
  { id: 3, title: "Main Building View", src: "/assets/campus3.jpg" },
  { id: 4, title: "Main Building View", src: "/assets/campus4.jpg" },
  { id: 5, title: "Main Building View", src: "/assets/campus5.jpg" },
  { id: 6, title: "Main Building View", src: "/assets/campus6.jpg" },
  { id: 7, title: "Main Building View", src: "/assets/campus7.jpg" },
  { id: 8, title: "Main Building View", src: "/assets/campus8.jpg" },
  { id: 9, title: "Main Building View", src: "/assets/campus9.jpg" },
  { id: 10, title: "Main Building View", src: "/assets/campus10.jpg" },
  { id: 11, title: "Main Building View", src: "/assets/campus11.jpg" },
  { id: 12, title: "Main Building View", src: "/assets/campus12.jpg" },
  { id: 13, title: "Main Building View", src: "/assets/campus13.jpg" },
  { id: 14, title: "Main Building View", src: "/assets/campus14.jpg" },
  { id: 15, title: "Main Building View", src: "/assets/campus15.jpg" },
  { id: 16, title: "Main Building View", src: "/assets/campus16.jpg" },
  { id: 17, title: "Main Building View", src: "/assets/campus17.jpg" },
  { id: 18, title: "Main Building View", src: "/assets/campus18.jpg" },
  { id: 19, title: "Main Building View", src: "/assets/campus19.jpeg" },
  { id: 20, title: "Main Building View", src: "/assets/campus20.jpeg" },
  { id: 21, title: "Main Building View", src: "/assets/campus21.jpeg" },
  { id: 22, title: "Main Building View", src: "/assets/campus22.jpeg" },
  { id: 23, title: "Main Building View", src: "/assets/campus23.jpeg" },
  { id: 24, title: "Main Building View", src: "/assets/campus24.jpeg" },
  { id: 25, title: "Main Building View", src: "/assets/campus25.jpeg" },
  { id: 26, title: "Main Building View", src: "/assets/campus26.jpeg" },
  { id: 27, title: "Main Building View", src: "/assets/campus27.jpeg" },
  { id: 28, title: "Main Building View", src: "/assets/campus28.jpeg" },
  { id: 29, title: "Main Building View", src: "/assets/campus29.jpeg" },
  { id: 30, title: "Main Building View", src: "/assets/campus30.jpeg" },
];

const CampusSection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle image click
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImageIndex(null);
    }, 400);
  };

  // Navigation functions
  const goToNextImage = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < campusImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (selectedImageIndex === campusImages.length - 1) {
      setSelectedImageIndex(0); // Loop back to first image
    }
  }, [selectedImageIndex, campusImages.length]);

  const goToPrevImage = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (selectedImageIndex === 0) {
      setSelectedImageIndex(campusImages.length - 1); // Loop to last image
    }
  }, [selectedImageIndex, campusImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === 'Escape') {
          handleCloseModal();
        } else if (e.key === 'ArrowRight') {
          goToNextImage();
        } else if (e.key === 'ArrowLeft') {
          goToPrevImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, goToNextImage, goToPrevImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Component for an individual campus image
  const CampusImageCard = ({ title, src, index }) => (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
      onClick={() => handleImageClick(index)}
    >
      <Image
        src={src}
        alt={title}
        width={500}
        height={300}
        className="w-full h-auto object-cover aspect-[5/3] transition-transform duration-700 ease-out group-hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/500x300/d8c8a8/50432f?text=Image+Load+Error";
        }}
      />
    </div>
  );

  // Component to handle the Modal/Lightbox view
  const ImageModal = () => {
    if (selectedImageIndex === null) return null;

    const selectedImage = campusImages[selectedImageIndex];

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
          isModalOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        onClick={handleCloseModal}
      >
        {/* Backdrop with blur */}
        <div 
          className={`absolute inset-0 bg-black transition-all duration-500 ease-out ${
            isModalOpen ? 'opacity-70 backdrop-blur-sm' : 'opacity-0'
          }`}
        />
        
        {/* Modal Content */}
        <div className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col">
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute -top-12 right-0 text-white hover:text-[#21e2bc] transition-colors duration-300 z-20"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className={`object-contain transition-all duration-700 ease-out ${
                  isModalOpen ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1000px"
              />
            </div>

            {/* Navigation Buttons */}
            {campusImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
              {selectedImageIndex + 1} / {campusImages.length}
            </div>
          </div>

          {/* Image Title */}
          <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 text-center">
              {selectedImage.title}
            </h3>
          </div>

          {/* Thumbnail Strip */}
          {campusImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-2 px-2">
              {campusImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index
                      ? 'border-[#21e2bc] scale-105'
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard Navigation Instructions */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Press <kbd className="mx-1 px-2 py-1 bg-gray-800 rounded">←</kbd> and <kbd className="mx-1 px-2 py-1 bg-gray-800 rounded">→</kbd> to navigate • <kbd className="mx-1 px-2 py-1 bg-gray-800 rounded">ESC</kbd> to close
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 pb-2 pl-3 border-l-4 border-orange-400 inline-block tracking-tight">
          Campus
        </h1>

        <div className="mb-8 space-y-4 text-lg leading-relaxed text-justify text-gray-700">
          <p>
            PRPGEI is a leading name when it comes to campus, infrastructure & technological support. The campus of the institute is spread over an expanse of 100 acres and is developed into the institutional establishment with all the modern amenities. Boys' hostel, girls hostel, faculty and staff quarters are also located in the campus. The Campus is designed to provide students and faculty members a serene and calm environment suitable for academic and other creative activities.
          </p>
          <p>
            In a stimulating environment, greenary surrounded area, it created standard in infrastructure which supports co-curricular as well as extra-curricular activities with modern facilities. Students avail services such as fully air conditioned auditorium, class rooms, conference room, computer laboratories with 24 hours online support, fully automated 24 hours library & online journals etc for theirs projects. It also provides sports facilities & inimitable canteen facility. The Campus is equipped with facilities like swimming pool, gymnasium etc. It also provides various recreation facilities. A spiritual, pleasant & intellectually stimulating environment has been created for the development of students.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {campusImages.map((image, index) => (
              <CampusImageCard
                key={image.id}
                title={image.title}
                src={image.src}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal Component */}
      <ImageModal />
    </div>
  );
};

export default CampusSection;