"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GrLink } from "react-icons/gr";

// Backend URL define karo
const BACKEND_URL = "http://localhost:4001";

export default function InfoWithNews() {
  const [isPaused, setIsPaused] = useState(false);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/news-notices`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 2. URL Formatter Helper
  
  const getFileUrl = (url) => {
    if (!url) return "#";
    if (url.startsWith("http")) return url;
    return `${BACKEND_URL}${url}`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 py-10 p-3 w-full">
      {/* LEFT SECTION */}
      <div className="flex flex-col w-full md:w-[370px] lg:flex-row items-center gap-6 lg:w-2/3">
        {/* IMAGE */}
        <div className="relative w-full md:w-1/2 h-64 md:h-80 lg:h-[500px] rounded-lg overflow-hidden">
          <Image
            src="/assets/college-home.jpg"
            alt="College"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* TEXT */}
        <div className="flex flex-col items-start sm:pt-1 sm:h-full w-full md:w-1/2">
          <h2 className="text-2xl text-orange-500 lg:text-3xl font-bold mb-1">
            P. R. Pote Patil
          </h2>

          <h4 className="text-lg font-bold lg:text-xl text-black mb-4">
            College of Agriculture, Amravati.
          </h4>

          <p className="text-base text-gray-700 leading-relaxed text-justify">
            P. R. Pote Patil College of Agriculture, Amravati established in
            2017 has now become one of the leading college to provide
            agricultural education with practical knowledge. To enhance the
            practical knowledge of students, college develop crop cafeteria in
            Kharif and Rabi season, also runs project of dairy, vermicompost,
            hydroponics, poultry, greenhouse, mushroom production unit,
            sericulture unit, trichoderma, vegetable and flower production unit,
            mother orchard etc. To provide quality technical education and to
            sustain students in today’s competitive environment, college
            recruits and retain highly qualified and competent faculty. This
            college is affiliated to Dr. Panjabrao Deshmukh Krishi Vidyapeeth,
            Akola. The institute provide very high quality infrastructure and
            includes Wifi Campus, well equipped laboratories, well stocked
            library, seminar halls and Swami Vivekanand Auditorim having
            capacity of 10000 students.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION (NEWS & NOTICES) */}
      <div className="lg:w-1/3 flex flex-col">
        <div className="bg-linear-to-r from-orange-400 to-yellow-300 text-black flex justify-center items-center gap-2 text-center py-3 rounded-t-lg text-xl font-semibold">
          News & Notices <img src="/assets/new.gif" alt="" />
        </div>

        <div className="relative bg-white shadow-lg border-black rounded-b-lg overflow-hidden h-[450px]">
          <div className="absolute top-0 left-0 w-full h-10 bg-linear-to-b from-white to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-white to-transparent z-10"></div>

          {/* Loading State or Auto-scroll */}
          {loading ? (
            <div className="p-4 space-y-4 animate-pulse">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <div className="w-5 h-5 bg-gray-200 rounded shrink-0 mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : newsItems.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              No news or notices available.
            </div>
          ) : (
            <div
              className="animate-scrollSlow"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {newsItems.concat(newsItems).map((item, i) => (
                <div
                  key={i}
                  className="py-3 flex items-start gap-3 px-4 border-b border-gray-200 text-gray-800 text-sm leading-tight"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <GrLink className="text-orange-400 w-6 h-6 mt-1 shrink-0" />

                  {/* Dynamic News Link logic applied here */}
                  <a
                    href={getFileUrl(item.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 cursor-pointer wrap-break-word hover:text-orange-500 transition-colors"
                  >
                    {item.title}{" "}
                    <img
                      src="/assets/new.gif"
                      alt="new"
                      className="inline-block w-6 h-6 ml-1 align-middle"
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}