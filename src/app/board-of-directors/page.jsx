"use client";
import React from 'react';

// Trustee data
const trustees = [
  {
    id: 1,
    name: 'Shri. Pravin R. Pote',
    designation: 'Chairperson',
    imageUrl: '/assets/pravinji_pote.webp',
  },
  {
    id: 2,
    name: 'Shri. Shreyash P. Pote',
    designation: 'Vice Chairman',
    imageUrl: '/assets/shreyashji_pote.png',
  },
];

const BoardOfTrustees = () => {
  return (
    <div className="font-sans py-8 md:py-20 px-4 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: `url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="%2322C55E" fill-opacity="0.1" fill-rule="evenodd"><path d="M0 40L40 0H20L0 20ZM40 40H20L0 20V40ZM40 0L0 40V20L20 0Z" fill="%23D1FAE5"/><path d="M10 0h20L10 30zM0 10h30L0 40z" fill="%2310B981" opacity="0.1"/></g></svg>')`,
          backgroundSize: '80px 80px',
          backgroundRepeat: 'repeat',
          opacity: 0.05,
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Title Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 border-l-4 border-amber-600 pl-3 mb-10">
          Board of Trustees
        </h1>

        {/* Trustees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trustees.map((trustee) => (
            <div 
              key={trustee.id} 
              className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden">
                <img
                  src={trustee.imageUrl}
                  alt={trustee.name}
                  className="w-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x400/FF7A33/ffffff?text=Image+Error"; }}
                />
              </div>

              {/* Name and Designation Section */}
              <div className="bg-gradient-to-r from-orange-400 to-yellow-300 text-black p-4 text-center">
                <h3 className="text-lg font-bold mb-1">{trustee.name}</h3>
                <p className="text-sm font-medium opacity-90">{trustee.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardOfTrustees;
