"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Fallback backend URL
const BACKEND_URL = "http://localhost:4001";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/slider`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Full fetch error details:", error);
      }
    };

    fetchImages();
  }, []);

  // Auto Slide
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-[200px] sm:h-[700px] overflow-hidden">
      <div
        ref={sliderRef}
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((item) => {
          const imgSrc = item.url ? item.url : `${BACKEND_URL}${item.imageUrl}`;

          return (
            <div key={item.id} className="relative min-w-full h-full">
              {imgSrc && (
                <Image
                  src={imgSrc}
                  alt={item.name || "Slider Image"}
                  fill
                  className="object-cover"
                  priority={true}
                  unoptimized={true}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}