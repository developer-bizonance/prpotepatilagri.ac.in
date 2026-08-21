"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BACKEND_URL = "http://localhost:4001";
const MEDIA_DOWNLOAD =
  "https://media.bizonance.in/api/v1/image/download/eca82cda-d4d7-4fe5-915a-b0880bb8de74/bizonance";

// Safe Image URL Resolver
const getSafeImageSrc = (imageUrl) => {
  if (
    !imageUrl ||
    imageUrl === "null" ||
    imageUrl === "undefined" ||
    imageUrl === "[object Object]" ||
    typeof imageUrl !== "string" ||
    imageUrl.trim() === ""
  ) {
    return "/assets/placeholder.png";
  }
  if (
    imageUrl.startsWith("http") ||
    imageUrl.startsWith("blob:") ||
    imageUrl.startsWith("data:") ||
    imageUrl.startsWith("/assets/")
  ) {
    return imageUrl;
  }
  if (imageUrl.startsWith("/uploads/") || imageUrl.startsWith("uploads/")) {
    const cleanPath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `${BACKEND_URL}${cleanPath}`;
  }
  const cleanName = imageUrl.split("/").pop();
  return `${MEDIA_DOWNLOAD}/${cleanName}`;
};

// Safe Resume / PDF URL Resolver
const getResumeSrc = (resumeName) => {
  if (
    !resumeName ||
    resumeName === "null" ||
    resumeName === "undefined" ||
    typeof resumeName !== "string" ||
    resumeName.trim() === ""
  )
    return null;
  if (
    resumeName.startsWith("http") ||
    resumeName.startsWith("blob:") ||
    resumeName.startsWith("data:") ||
    resumeName.startsWith("/assets/")
  )
    return resumeName;
  if (
    resumeName.startsWith("/uploads/") ||
    resumeName.startsWith("uploads/")
  ) {
    const cleanPath = resumeName.startsWith("/") ? resumeName : `/${resumeName}`;
    return `${BACKEND_URL}${cleanPath}`;
  }
  const cleanName = resumeName.split("/").pop();
  return `${MEDIA_DOWNLOAD}/${cleanName}`;
};

export default function FacultySection() {
  const scrollRef = useRef(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/faculties?type=Teaching`);
        if (!res.ok) throw new Error("Failed to fetch faculties");
        const data = await res.json();
        setFaculty(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  // Auto scroll animation every 3 seconds with hover pause
  useEffect(() => {
    if (faculty.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [faculty.length, isPaused]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      if (scrollLeft <= 0) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-6 px-4 md:mb-8">
      <div className="flex bg-white sm:rounded-2xl shadow-lg overflow-hidden max-w-7xl w-full flex-col">
        <div className="bg-gradient-to-r from-orange-400 to-blue-400 p-6 sm:p-10 w-full">
          {/* Desktop & Mobile Container */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-8 w-full">
            {/* Left Section - Title & Button */}
            <div className="flex flex-col justify-between text-white lg:w-1/4 shrink-0 min-h-[140px] lg:min-h-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  Our Faculties
                </h2>
              </div>

              <Link href="/teaching-staff" className="mt-auto pt-4">
                <button className="bg-white text-black cursor-pointer rounded-full px-6 py-3 font-semibold hover:bg-gray-100 transition shadow-sm w-fit text-sm sm:text-base">
                  Explore Faculties →
                </button>
              </Link>
            </div>

            {/* Right Section: Scrollable Cards Panel with Skeleton Loading & Scroller Buttons */}
            <div
              className="w-full lg:w-3/4 relative flex items-center group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {loading ? (
                <div className="flex gap-4 overflow-hidden w-full py-2 px-1 animate-pulse">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="bg-white/90 rounded-2xl shadow-md w-[200px] sm:w-[210px] flex flex-col overflow-hidden border border-white/40 shrink-0"
                    >
                      <div className="h-44 sm:h-48 w-full bg-gray-200/80" />
                      <div className="p-3.5 space-y-3 bg-white">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="border-t border-gray-100 pt-2 space-y-1.5">
                          <div className="h-3 bg-gray-200 rounded w-4/5" />
                          <div className="h-3 bg-gray-200 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : faculty.length === 0 ? (
                <div className="text-white text-center py-12 font-medium bg-black/10 rounded-xl w-full">
                  No teaching staff members found.
                </div>
              ) : (
                <>
                  {/* Left Scroller Button */}
                  <button
                    onClick={handleScrollLeft}
                    className="absolute -left-3 sm:-left-5 z-20 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-xl border border-gray-100 transition-all hover:scale-110 cursor-pointer"
                    aria-label="Scroll Left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Horizontal Scroll Track */}
                  <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth w-full py-2 px-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {faculty.map((f, i) => {
                      const resumeSrc = getResumeSrc(
                        f.resumeUrl || f.resume || f.pdf_path || f.pdfUrl || f.pdf
                      );
                      const imgSrc = getSafeImageSrc(f.imageUrl || f.image);
                      return (
                        <div
                          key={f.id || i}
                          className="bg-white rounded-2xl shadow-md w-[200px] sm:w-[210px] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100/60 shrink-0"
                        >
                          {/* Image Container */}
                          <div className="h-44 sm:h-48 w-full relative overflow-hidden bg-gray-100 flex items-center justify-center">
                            <img
                              src={imgSrc}
                              alt={f.name || "Faculty"}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>

                          {/* Card Content */}
                          <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-[#fffcf7]">
                            <div>
                              <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                                {f.name}
                              </h3>
                              <p className="text-[11px] text-gray-500 font-medium mt-0.5 line-clamp-1">
                                {f.role || f.designation}
                              </p>

                              <div className="border-t border-orange-100/70 mt-2 pt-2 space-y-0.5 text-[10px] sm:text-[11px] text-gray-600 font-medium">
                                <p className="truncate">🎓 {f.degree}</p>
                                <p className="truncate">💼 {f.experience}</p>
                              </div>
                            </div>

                            {resumeSrc && (
                              <a
                                href={resumeSrc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2.5 flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-teal-800 hover:text-teal-950 cursor-pointer self-start"
                              >
                                <span className="text-[11px]">👁️</span> View Details
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Scroller Button */}
                  <button
                    onClick={handleScrollRight}
                    className="absolute -right-3 sm:-right-5 z-20 bg-white/90 hover:bg-white text-gray-800 p-2.5 rounded-full shadow-xl border border-gray-100 transition-all hover:scale-110 cursor-pointer"
                    aria-label="Scroll Right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}