"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutCollegeVision() {
  const cards = [
    {
      title: "Vision",
      items: [
        "To be the leading centre providing student – responsive education, farmer –responsive training and services for development of Agriculture and agro-industry.",
      ],
    },
    {
      title: "Mission",
      items: [
        "To promote research and training on sustainable development of agricultural productivity.",
        "To encourage the youths on entrepreneurship and rural development.",
      
      ],
    },
   
  ];

  return (
    <div className="w-full px-4 py-10 md:px-10 lg:px-20">
     

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-semibold text-center mb-4 text-orange-500">
              {card.title}
            </h3>

            <ul className="space-y-3">
              {card.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={22} className="text-orange-500 mt-1 min-w-[22px]" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
