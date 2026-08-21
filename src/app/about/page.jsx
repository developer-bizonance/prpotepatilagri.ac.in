"use client";
import React from 'react';
import VisionMission from '../components/vision';



// Mock image URL (replace with your actual image path)
const collegeImageUrl = "/assets/college.webp"; 

const AboutCollege = () => {
  // Mock Content based on the screenshot text
  const introText = "P.R.Pote Patil College of Agriculture,Amravati. Every year P. R. Pote college of agriculture, Amravati develops crops cafeteria in kharif and Rabi seasons that facilitates conduct of practical classes with live demonstrations for easy understanding of cropping patterns of different crops for under graduate students. students can learn skills in different farm operations of various crops like land preparation, seed treatments, sowing, fertilizer application, irrigation and weed management, assessment of maturity signs, harvesting of crop, cost of cultivation and economics of crop, observations on growth and yield estimation. This college is affiliated to Dr. Panjabrao Deshmukh Krishi Vidyapeeth, Akola. The P.R.Pote Patil Educational trust has created a thick educational network in entire Vidarbha, for it has been managing under its control, eudcational institutions of varied nature, and that too at all levels. With a view, to making this educational network known to all, we have proud privilege to state that this Education Society.";


  const Title = ({ text }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-l-4 border-orange-400 pl-3 mb-6 mt-4 md:mt-0">
      {text}
    </h2>
  );
  
  const SectionTitle = ({ text }) => (
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-8 mb-4">
      {text}
    </h3>
  );

  return (
    <>
    <div className="font-sans py-2 md:py-16 md:pb-2 px-4 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header */}
        <Title text="About PRPGI" />

        {/* Content Layout: Image and Introduction */}
        <div className="flex flex-col lg:flex-col gap-8 mb-12">
          
          {/* Image Container */}
          <div className="w-full lg:w-full  flex-shrink-0">
            <img
              src={collegeImageUrl}
              alt="College Building"
              className="w-full h-full md:h-[700px] object-cover border-4 border-white shadow-xl"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/E5E7EB/4B5563?text=College+Image" }}
            />
          </div>
          
          {/* Introductory Text */}
          <div className="w-full lg:w-full text-gray-700 text-base leading-relaxed text-justify">
            <p>{introText}</p>
          </div>
        </div>

  
      </div>
    </div>
    <VisionMission/>
    </>
    
  );
};

export default AboutCollege;