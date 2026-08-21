"use client";
import { useState, useEffect } from "react";
import { Loader2, ImageOff, AlertTriangle } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
const API_URL = `${BACKEND_URL}/api/faculties`;

const getSafeImageSrc = (imageName) => {
  if (!imageName || imageName === "null" || imageName === "undefined") return "/assets/placeholder.png";
  if (imageName.startsWith("http") || imageName.startsWith("blob:") || imageName.startsWith("data:") || imageName.startsWith("/assets/")) {
    return imageName;
  }
  if (imageName.startsWith("/uploads/") || imageName.startsWith("uploads/")) {
    return `${BACKEND_URL}${imageName.startsWith("/") ? imageName : `/${imageName}`}`;
  }
  return `${BACKEND_URL}/uploads/${imageName}`;
};

const getResumeSrc = (pdf) => {
  if (!pdf || pdf === "null" || pdf === "undefined") return null;
  if (pdf.startsWith("http") || pdf.startsWith("blob:") || pdf.startsWith("/assets/")) {
    return pdf;
  }
  return `${BACKEND_URL}${pdf.startsWith("/") ? pdf : `/${pdf}`}`;
};

export default function NonTeachingStaff() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?type=Non-Teaching`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((dbData) => {
        const sortedData = Array.isArray(dbData) ? dbData : [];
        sortedData.sort((a, b) => (a.order ?? 0) - (b.order ?? b.id));
        setFaculties(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching non-teaching staff:", err);
        setError("Unable to connect to the server.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-orange-500 w-10 h-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 font-medium">
        <AlertTriangle className="mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-[5px] h-8 bg-orange-600 shrink-0"></div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Non-Teaching Staff
          </h1>
        </div>

        {faculties.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            No non-teaching staff members found. Add them from Admin Panel.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {faculties.map((f, i) => {
              const resumeSrc = getResumeSrc(f.resumeUrl || f.resume || f.pdf_path || f.pdfUrl || f.pdf);
              const imgSrc = getSafeImageSrc(f.imageUrl || f.image);
              return (
                <div
                  key={f.id || i}
                  className="bg-white rounded-2xl shadow-md w-full max-w-[210px] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100/60 shrink-0"
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
                        {f.degree && <p className="truncate">🎓 {f.degree}</p>}
                        {f.experience && <p className="truncate">💼 {f.experience}</p>}
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
        )}
      </div>
    </div>
  );
}