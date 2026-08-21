"use client";
import { useState, useEffect } from "react";
import { Loader2, FileText, Calendar, FolderOpen } from "lucide-react";

const API_BASE = "http://localhost:4001";
const API_URL = `${API_BASE}/api/governing-bodies`;

export default function GoverningBodiesPage() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Backend offline");
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching Governing Bodies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin w-10 h-10 text-orange-500" />
        <p className="text-slate-500 font-medium animate-pulse">Loading resources...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 sm:px-12 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 border-l-4 border-orange-500 pl-3">
            Governing Bodies
          </h1>
          <p className="text-slate-500 text-sm sm:text-base pl-4">
            View related documents and PDFs for the Governing Bodies section.
          </p>
        </div>

        {/* Empty State */}
        {documents.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl shadow-sm">
            <FolderOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No Records Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Currently, there are no documents uploaded for Governing Bodies. Please check back later.
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {documents.map((doc) => {
              
              // Handle PDF URL creation securely
              const finalLink = doc.pdf_path 
                ? `${API_BASE}${doc.pdf_path.startsWith('/') ? '' : '/'}${doc.pdf_path}` 
                : "#";

              return (
                <a
                  key={doc.id}
                  href={finalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  // 🌟 Yahan hover:border-orange-500 add kiya hai
                  className="group relative bg-white border border-slate-200 rounded-[16px] p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-orange-500 transition-all duration-300 cursor-pointer"
                >
                  
                  {/* 🌟 Icon Box - Hover pe bg-orange-50 aur text-orange-500 */}
                  <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shrink-0 bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors duration-300">
                    <FileText size={22} className="stroke-[1.5]" />
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0">
                    {/* 🌟 Document Title - Hover pe text-orange-500 */}
                    <h3 className="text-[15px] font-semibold text-slate-800 leading-tight truncate group-hover:text-orange-500 transition-colors duration-300">
                      {doc.title}
                    </h3>
                    
                    {/* Upload Date (Gray hi rahega hover pe bhi, jaisa image me hai) */}
                    <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-400">
                      <Calendar size={14} className="stroke-[2]" />
                      <span>
                        {doc.uploaded_date ? new Date(doc.uploaded_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : "Date not available"}
                      </span>
                    </div>
                  </div>
                    
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}