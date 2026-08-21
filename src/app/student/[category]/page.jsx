"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, FileText, ExternalLink, Calendar, FolderOpen } from "lucide-react";

export default function StudentCategoryPage() {
  const params = useParams();
  const category = params.category; 

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryTitles = {
    "academic-calendar": { title: "Academic Calendar", desc: "View the academic schedule and important dates." },
    "academic-discipline": { title: "Academic Discipline", desc: "Read guidelines regarding student discipline and rules." },
    "nss": { title: "National Service Scheme (NSS)", desc: "Explore NSS reports, activities, and social service programs." },
    "university-result": { title: "University Result", desc: "Check semester-wise examination results." },
  };

  const pageInfo = categoryTitles[category] || { 
    title: "Student Document", 
    desc: "View related student documents and links." 
  };

  useEffect(() => {
    if (category) fetchDocuments();
  }, [category]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:4001/api/student");
      if (!res.ok) throw new Error("Backend offline");
      const data = await res.json();
      const filtered = data.filter((item) => item.category === category);
      setDocuments(filtered);
    } catch (error) {
      console.error("Error:", error);
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
        
        <div className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 border-l-4 border-orange-500 pl-3">
            {pageInfo.title}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base pl-4">
            {pageInfo.desc}
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl shadow-sm">
            <FolderOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No Records Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Currently, there are no documents or links uploaded for {pageInfo.title}. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {documents.map((doc) => {
              
              let finalLink = "#";
              let isLink = false;
              
              if (doc.link) {
                isLink = true;
                finalLink = doc.link.startsWith("http") ? doc.link : `https://${doc.link}`;
              } else if (doc.pdf_path) {
                finalLink = `http://localhost:4001${doc.pdf_path}`;
              }

              return (
                <a
                  key={doc.id}
                  href={finalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2.5 rounded-lg transition-colors duration-200 bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-500">
                      {isLink ? <ExternalLink size={20} /> : <FileText size={20} />}
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-slate-800 leading-snug group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                        {doc.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                        <Calendar size={13} />
                        <span className="text-[12px] font-medium">
                          {new Date(doc.uploaded_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
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