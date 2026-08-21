// components/CollegePhotos.jsx
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

/**
 * Renders the College Photos component with year tabs and click-to-view modal/lightbox feature.
 */
const CollegePhotos = () => {
  // State for modal
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for year tabs - set "All" as default
  const [activeYear, setActiveYear] = useState("All");

  // Data structure for college photos organized by year
  const photosByYear = {
    "2025": [
      {
        title: "Ganpati Making",
        imageUrl: "/assets/college1.jpg",
        date: "September 19, 2025",
      },
      {
        title: "Ganpati Making",
        imageUrl: "/assets/college2.jpg",
        date: "September 19, 2025",
      },
      {
        title: "Our first-year students engaged in an eye-opening transformative session on dopamine detox",
        imageUrl: "/assets/college3.jpg",
        date: "January 20, 2025",
      },
      {
        title: "Our first-year students engaged in an eye-opening transformative session on dopamine detox",
        imageUrl: "/assets/college4.jpg",
        date: "January 20, 2025",
      },
      {
        title: "Our first-year students engaged in an eye-opening transformative session on dopamine detox",
        imageUrl: "/assets/college5.jpg",
        date: "January 20, 2025",
      },
      {
        title: "Our first-year students engaged in an eye-opening transformative session on dopamine detox",
        imageUrl: "/assets/college6.jpg",
        date: "January 20, 2025",
      },
      {
        title: "Our first-year students engaged in an eye-opening transformative session on dopamine detox",
        imageUrl: "/assets/college7.jpg",
        date: "January 20, 2025",
      },
      {
        title: "Offer Letter Distribution Ceremony 2025",
        imageUrl: "/assets/college8.jpg",
        date: "March 15, 2025",
      },
      {
        title: "Offer Letter Distribution Ceremony 2025",
        imageUrl: "/assets/college10.jpg",
        date: "March 15, 2025",
      },
      {
        title: "Offer Letter Distribution Ceremony 2025",
        imageUrl: "/assets/college11.jpg",
        date: "March 15, 2025",
      },
      {
        title: "Farewell to our incredible TT series students",
        imageUrl: "/assets/college12.jpg",
        date: "April 30, 2025",
      },
      {
        title: "Farewell to our incredible TT series students",
        imageUrl: "/assets/college13.jpg",
        date: "April 30, 2025",
      },
      {
        title: "Farewell to our incredible TT series students",
        imageUrl: "/assets/college14.jpg",
        date: "April 30, 2025",
      },
      {
        title: "Yoga day",
        imageUrl: "/assets/college15.jpg",
        date: "June 21, 2025",
      },
      {
        title: "Yoga day",
        imageUrl: "/assets/college16.jpg",
        date: "June 21, 2025",
      },
      {
        title: "Yoga day",
        imageUrl: "/assets/college17.jpg",
        date: "June 21, 2025",
      },
      {
        title: "Yoga day",
        imageUrl: "/assets/college18.jpg",
        date: "June 21, 2025",
      },
      {
        title: "Yoga day",
        imageUrl: "/assets/college19.jpg",
        date: "June 21, 2025",
      },
      {
        title: "Popular MLA Ravibhau Rana Presents Digital Portrait to Chief Justice of India",
        imageUrl: "/assets/college20.jpg",
        date: "February 14, 2025",
      },
      {
        title: "Popular MLA Ravibhau Rana Presents Digital Portrait to Chief Justice of India",
        imageUrl: "/assets/college21.jpg",
        date: "February 14, 2025",
      },
      {
        title: "Popular MLA Ravibhau Rana Presents Digital Portrait to Chief Justice of India",
        imageUrl: "/assets/college22.jpg",
        date: "February 14, 2025",
      },
      {
        title: "Popular MLA Ravibhau Rana Presents Digital Portrait to Chief Justice of India",
        imageUrl: "/assets/college23.jpg",
        date: "February 14, 2025",
      },
    ],
    "2024": [
      {
        title: "Annual Sports Day 2024",
        imageUrl: "/assets/sports-2024.jpg",
        date: "February 25, 2024",
      },
      {
        title: "Cultural Fest 2024",
        imageUrl: "/assets/cultural-2024.jpg",
        date: "November 20, 2024",
      },
      {
        title: "Science Exhibition 2024",
        imageUrl: "/assets/science-2024.jpg",
        date: "October 15, 2024",
      },
    ],
    "2023": [
      {
        title: "Graduation Ceremony 2023",
        imageUrl: "/assets/graduation-2023.jpg",
        date: "May 30, 2023",
      },
      {
        title: "Workshop Series 2023",
        imageUrl: "/assets/workshop-2023.jpg",
        date: "Auguest 15, 2023",
      },
    ],
  };

  // Define the order of tabs - "All" first, then years in descending order
  const tabOrder = ["All", "2025", "2024", "2023"];

  // Get all photos combined for "All" tab
  const getAllPhotos = () => {
    const allPhotos = [];
    tabOrder.slice(1).forEach(year => { // Skip "All" tab
      if (photosByYear[year]) {
        allPhotos.push(...photosByYear[year].map(photo => ({
          ...photo,
          year: year // Add year property for display
        })));
      }
    });
    // Sort by date (newest first)
    return allPhotos.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  };

  // Get photos for the active tab
  const getCurrentPhotos = () => {
    if (activeYear === "All") {
      return getAllPhotos();
    }
    return photosByYear[activeYear] || [];
  };

  const currentPhotos = getCurrentPhotos();

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
    if (selectedImageIndex !== null && selectedImageIndex < currentPhotos.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else if (selectedImageIndex === currentPhotos.length - 1) {
      setSelectedImageIndex(0); // Loop back to first image
    }
  }, [selectedImageIndex, currentPhotos.length]);

  const goToPrevImage = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (selectedImageIndex === 0) {
      setSelectedImageIndex(currentPhotos.length - 1); // Loop to last image
    }
  }, [selectedImageIndex, currentPhotos.length]);

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

  // Component to handle the Modal/Lightbox view
  const ImageModal = () => {
    if (selectedImageIndex === null) return null;

    const selectedPhoto = currentPhotos[selectedImageIndex];

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${isModalOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
          }`}
        onClick={handleCloseModal}
      >
        {/* Backdrop with blur */}
        <div
          className={`absolute inset-0 bg-black transition-all duration-500 ease-out ${isModalOpen ? 'opacity-70 backdrop-blur-sm' : 'opacity-0'
            }`}
        />

        {/* Modal Content */}
        <div className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col">
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-1 right-2  hover:text-[#21e2bc] transition-colors duration-300 z-20"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Main Image Container */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                className={`object-contain transition-all duration-700 ease-out ${isModalOpen ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 1000px"
              />
            </div>

            {/* Navigation Buttons */}
            {currentPhotos.length > 1 && (
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
              {selectedImageIndex + 1} / {currentPhotos.length}
            </div>
          </div>

          {/* Image Title and Details */}
          <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              {selectedPhoto.title}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedPhoto.date}</span>
              </div>
              {activeYear === "All" && selectedPhoto.year && (
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                    Year: {selectedPhoto.year}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {currentPhotos.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-2 px-2">
              {currentPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === index
                      ? 'border-[#21e2bc] scale-105'
                      : 'border-transparent hover:border-gray-400'
                    }`}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center truncate">
                    {photo.date.split(' ')[0]} {/* Show just the day number */}
                  </div>
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

  // Component for an individual photo card
  const PhotoCard = ({ title, imageUrl, date, index, year }) => (
    <div
      className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1"
      onClick={() => handleImageClick(index)}
    >
      <div className="relative aspect-video w-full h-52 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />




      </div>

      <div className="p-4 bg-white group-hover:bg-gray-50 transition-colors duration-300">
        <p className="text-sm font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </p>
        <div className="space-y-3 mt-auto">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-3 text-orange-500" />
            <span className="text-xs font-semibold">{date}</span>
          </div>

        </div>
      </div>
    </div>
  );

  // Calculate total count for "All" tab
  const getAllTabCount = () => {
    let total = 0;
    tabOrder.slice(1).forEach(year => {
      total += photosByYear[year]?.length || 0;
    });
    return total;
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-14">
      {/* Header with Year Tabs */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl border-l-4 border-orange-400 pl-3 font-extrabold text-gray-800 tracking-wider mb-6">
          College Photos
        </h1>

        {/* Year Tabs - Show All, 2025, 2024, 2023 in order */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabOrder.map((tab) => {
            let count = 0;
            let isEmpty = false;

            if (tab === "All") {
              count = getAllTabCount();
              isEmpty = count === 0;
            } else {
              count = photosByYear[tab]?.length || 0;
              isEmpty = count === 0;
            }

            return (
              <button
                key={tab}
                onClick={() => setActiveYear(tab)}
                className={`px-8 py-2 my-1 rounded-3xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] ${activeYear === tab
                    ? "bg-gradient-to-r from-orange-400 to-teal-400 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } ${isEmpty ? 'opacity-70' : ''}`}
              >
                {tab === "All" ? "All " : ` ${tab}`}



                {/* Show (Empty) for empty tabs */}
                {isEmpty && tab !== "All" && (
                  <span className="ml-2 text-xs opacity-75">(Empty)</span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Grid Layout for Photos */}
      {currentPhotos.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPhotos.map((photo, index) => (
            <PhotoCard
              key={index}
              title={photo.title}
              imageUrl={photo.imageUrl}
              date={photo.date}
              index={index}
              year={photo.year}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-400 mb-4 text-6xl">📷</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {activeYear === "All"
              ? "No college photos available"
              : `No college photos available for ${activeYear}`}
          </h3>
          <p className="text-gray-500 mb-4">
            {activeYear === "All"
              ? "Add photos to any year to see them here"
              : "College photos will be added soon"}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {tabOrder.map((tab) => {
              if (tab === "All") {
                const allCount = getAllTabCount();
                if (allCount > 0) {
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveYear(tab)}
                      className="px-4 py-2 bg-[#21e2bc] text-white rounded-lg text-sm font-medium hover:bg-[#1bd1ad] transition-colors"
                    >
                      View All Photos ({allCount})
                    </button>
                  );
                }
              } else if (photosByYear[tab]?.length > 0) {
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveYear(tab)}
                    className="px-4 py-2 bg-[#21e2bc] text-white rounded-lg text-sm font-medium hover:bg-[#1bd1ad] transition-colors"
                  >
                    View {tab} Photos ({photosByYear[tab].length})
                  </button>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}

      {/* Image Modal Component */}
      <ImageModal />
    </div>
  );
};

export default CollegePhotos;