"use client";
import { useState, useEffect } from "react";
import { Loader2, ImageOff, AlertTriangle } from "lucide-react";

// Use environment variable for deployment, fallback to localhost for development
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
const API_URL = `${BACKEND_URL}/api/faculties`;
const MEDIA_DOWNLOAD = "https://media.bizonance.in/api/v1/image/download/eca82cda-d4d7-4fe5-915a-b0880bb8de74/bizonance";

const getImageSrc = (imageName) => {
  if (!imageName || imageName === "null" || imageName === "undefined") return null;
  if (imageName.startsWith("http") || imageName.startsWith("blob:") || imageName.startsWith("data:") || imageName.startsWith("/assets/")) return imageName;
  
  if (imageName.startsWith("/uploads/") || imageName.startsWith("uploads/")) {
    const cleanPath = imageName.startsWith("/") ? imageName : `/${imageName}`;
    return `${BACKEND_URL}${cleanPath}`; 
  }

  const cleanName = imageName.split('/').pop(); 
  return `${MEDIA_DOWNLOAD}/${cleanName}`;
};

const getResumeSrc = (resumeName) => {
  if (!resumeName || resumeName === "null" || resumeName === "undefined") return null;
  if (resumeName.startsWith("http") || resumeName.startsWith("blob:") || resumeName.startsWith("data:") || resumeName.startsWith("/assets/")) return resumeName;
  
  if (resumeName.startsWith("/uploads/") || resumeName.startsWith("uploads/")) {
    const cleanPath = resumeName.startsWith("/") ? resumeName : `/${resumeName}`;
    return `${BACKEND_URL}${cleanPath}`; 
  }

  const cleanName = resumeName.split('/').pop(); 
  return `${MEDIA_DOWNLOAD}/${cleanName}`;
};

export default function TeachingStaff() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?type=Teaching`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((dbData) => {
        const sortedData = Array.isArray(dbData) ? dbData : [];
        sortedData.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setFaculties(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teaching staff:", err);
        setError("Unable to connect to the server. Please ensure the backend is running.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-orange-500 w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 gap-3">
        <AlertTriangle className="w-6 h-6" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-8 lg:px-16 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl border-l-4 border-amber-600 pl-3 font-bold text-gray-900 tracking-tight">
            Teaching Staff
          </h1>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm pl-4">
            Meet our Principal, Vice Principal, Dean, HODs and faculty members.
          </p>
        </div>

        {faculties.length === 0 ? (
          <div className="text-center text-gray-400 py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            No teaching staff members found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {faculties.map((f, i) => {
              const imgSrc = getImageSrc(f.imageUrl || f.image);
              const resumeSrc = getResumeSrc(f.resumeUrl || f.resume || f.pdf_path || f.pdfUrl || f.pdf);
              
              return (
                <div
                  key={f.id || i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border border-gray-200/80 w-full"
                >
                  {/* Image Container */}
                  <div className="h-60 sm:h-64 lg:h-72 w-full bg-gray-200 relative overflow-hidden flex items-center justify-center">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={f.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <ImageOff size={36} />
                        <span className="text-xs mt-1">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-[#fffcf7]">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
                        {f.name}
                      </h2>
                      <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-1">
                        {f.role || f.designation}
                      </p>

                      <div className="border-t border-gray-800/80 my-2.5 pt-2 space-y-1 text-xs text-gray-700 font-medium">
                        {f.degree && <p className="truncate">🎓 {f.degree}</p>}
                        {f.experience && <p className="truncate">💼 {f.experience}</p>}
                      </div>
                    </div>

                    {resumeSrc && (
                      <a 
                        href={resumeSrc} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-2 flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-orange-600 transition-colors cursor-pointer self-start"
                      >
                        <span>👁️</span> View Details
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}