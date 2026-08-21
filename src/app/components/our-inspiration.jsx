"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BACKEND_URL = "http://localhost:4001";

export default function InspirationPillars() {
  const [data, setData] = useState({ inspiration: null, principal: null, pillars: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/authorities`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching authorities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFullImageUrl = (path) => (path ? `${BACKEND_URL}${path}` : "/assets/placeholder.jpg");

  const getPillarButtonText = (pillar) => {
    const role = (pillar.role || "").toLowerCase();
    const name = (pillar.name || "").toLowerCase();
    if (role.includes("vice") || name.includes("shreyas")) {
      return "Vice-Chairman's Message →";
    }
    if (role.includes("chairman") || name.includes("pravin")) {
      return "Chairman's Note →";
    }
    return "Read More →";
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="w-full px-4 md:px-10 py-10 md:py-20 overflow-hidden">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-stretch">

        {/* LEFT SIDE - OUR INSPIRATION */}
        {data.inspiration && (
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center h-full justify-center">
            <h2 className="text-3xl font-bold mb-6 text-orange-500">Our Inspiration</h2>
            <div className="w-[280px] h-[420px] md:h-[400px] md:w-[400px] rounded-xl overflow-hidden shadow-xl">
              <img src={getFullImageUrl(data.inspiration.imageUrl)} alt={data.inspiration.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-2xl font-semibold text-orange-500 mt-4">{data.inspiration.name}</p>
            <p className="mt-3 text-gray-500 leading-relaxed max-w-md">{data.inspiration.description}</p>
          </motion.div>
        )}

        {/* RIGHT SIDE - OUR PILLARS */}
        <div className="flex flex-col h-full justify-center w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Our Pillars</h2>
          <div className="flex flex-col gap-6 w-full sm:w-[700px] items-center">
            {data.pillars.map((pillar) => (
              <motion.div key={pillar.id} className="flex flex-col md:flex-row w-full md:w-[650px] gap-2 h-auto sm:h-72 shadow-2xl rounded-2xl items-center md:items-start bg-gradient-to-r from-orange-400 to-yellow-300 overflow-hidden">
                <div className="w-full md:w-[290px] h-64 md:h-full shrink-0">
                  <img src={getFullImageUrl(pillar.imageUrl)} alt={pillar.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between text-center md:text-left h-full py-6 px-6 w-full">
                  <div>
                    <h3 className="text-2xl font-bold text-black tracking-tight">{pillar.name}</h3>
                    <p className="text-blue-950 font-bold text-base mt-0.5">{pillar.role}</p>
                    <p className="text-sm mt-3 leading-relaxed font-normal text-black">{pillar.description}</p>
                  </div>
                  <Link href="/administration" className="text-black font-bold text-base md:text-lg mt-auto hover:underline pt-3 inline-flex items-center gap-1">
                    {getPillarButtonText(pillar)}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - OUR PRINCIPAL */}
      {data.principal && (
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center pt-20 mt-10">
          <h2 className="text-3xl font-bold mb-10 text-orange-500">Our Principal</h2>
          <div className="flex flex-col md:flex-row w-full md:w-[650px] gap-2 h-auto sm:h-72 shadow-2xl rounded-2xl items-center md:items-start bg-gradient-to-r from-orange-400 to-yellow-300 overflow-hidden">
            <div className="w-full md:w-[290px] h-64 md:h-full shrink-0">
              <img src={getFullImageUrl(data.principal.imageUrl)} alt={data.principal.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between text-center md:text-left h-full py-6 px-6 w-full">
              <div>
                <h3 className="text-2xl font-bold text-black tracking-tight">{data.principal.name}</h3>
                <p className="text-blue-950 font-bold text-base mt-0.5">{data.principal.role}</p>
                <p className="text-sm mt-3 leading-relaxed font-normal text-black">{data.principal.description}</p>
              </div>
              <Link href="/principal-desk" className="text-black font-bold text-base md:text-lg mt-auto hover:underline pt-3 inline-flex items-center gap-1">Principal's Message →</Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}