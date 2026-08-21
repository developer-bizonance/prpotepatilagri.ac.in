"use client";
import React from 'react';
import { FaRegFilePdf } from "react-icons/fa";

const Syllabus= () => {
    // Data for the 14 schedule documents
    const scheduleItems = [
         { id: 1, title: 'SYLLABUS 1-2 SME CBCS', link:'/assets/syllabus/SYLLABUS-1-2-SEM-CBCS.pdf' },
         { id: 2, title: 'SYLLABUS 3-4 SME CBCS', link:'/assets/syllabus/SYLLABUS-3-4-SEM-CBCS.pdf' },
         { id: 3, title: 'SYLLABUS 5-6 SME CBCS', link:'/assets/syllabus/SYLLABUS-5-6-SEM-CBCS.pdf' },
         { id: 4, title: 'SYLLABUS 7-8 SME CBCS', link:'/assets/syllabus/SYLLABUS-7-8-SEM-CBCS.pdf' },
        
         
       
       
    ];

    return (
        <div className="font-sans py-12 md:py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center mb-10">
                    {/* Vertical Accent Bar (Orange) */}
                    <span className="w-1 bg-amber-600 h-8 mr-3 rounded-sm"></span>
                 SYLLABUS   
                </h1>
                {/* No explicit title is visible in the screenshot, so we assume this section is a continuation or uses context from the page above.
                We'll add a subtle header for context if the user needs to integrate it. */}

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                    {scheduleItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-white p-4 rounded-lg shadow-md border-b-4  border-amber-500 transition duration-300 ease-in-out transform hover:-translate-y-4"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-white border border-amber-500 rounded-md">
                              <FaRegFilePdf className='w-8 h-8 text-amber-500' />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {item.title}
                                    </p>
                                  
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Syllabus;