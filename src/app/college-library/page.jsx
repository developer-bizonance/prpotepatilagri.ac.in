import React from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Wifi,
  Calendar,
  Newspaper,
  Library, // Changed from BuildingLibrary to Library
  GraduationCap,
  BarChart3 // Changed from BarChart to BarChart3
} from 'lucide-react';

const LibraryPage = () => {
  const services = [
    { text: "All Students 2 books for one week" },
    { text: "UG students 2 books for two weeks" },
    { text: "Toppers 2 additional books for a semester" },
    { text: "Access to E-material beyond working hours" },
    { text: "Group Study Area" },
    { text: "Text book Library" },
    { text: "Reprographic facility" },
    { text: "Book Bank Scheme" },
    { text: "Orientation programs for new entrants" },
    { text: "Agriculture Paper Solution set" },
    { text: "Monthly display of New Arrivals" },
    { text: "Student participation in book/journal procurement" },
    { text: "Book Circulation throughout the day without any break" },
    { text: "Extended hours during examination period" },
    { text: "Separate seating arrangement for faculty and I/U students" },
  ];

  const facilities = [
    { icon: <Wifi className="w-5 h-5" />, text: "Wi-Fi connectivity" },
    { icon: <Library className="w-5 h-5" />, text: "Spacious Reading Hall" },
    { icon: <GraduationCap className="w-5 h-5" />, text: "Very Good Infrastructure" },
    { icon: <Users className="w-5 h-5" />, text: "Group Study Area" },
    { icon: <Newspaper className="w-5 h-5" />, text: "Key open airer college timing" },
  ];

  const collection = [
    { category: "Number of Titles", count: "413", icon: <BookOpen className="w-6 h-6" /> },
    { category: "Number of Volumes", count: "1,868", icon: <BarChart3 className="w-6 h-6" /> },
    { category: "National Journals", count: "10", icon: <Newspaper className="w-6 h-6" /> },
    { category: "International Journals", count: "01", icon: <Newspaper className="w-6 h-6" /> },
  ];

  const timings = [
    { period: "Working Hours", time: "10:30 a.m. - 3:00 p.m." },
    { period: "Circulation", time: "11:00 a.m. - 5:00 p.m." },
    { period: "Reading Hall", time: "10:30 a.m. - 5:30 p.m." },
    { period: "Extended Hours", time: "During Examination", highlight: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 md:py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Library className="sm:w-12 sm:h-12 w-8 h-8 text-orange-400" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              PRPCA Library
            </h1>
          </div>
          <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Renowned for its rich information sources worldwide, our library provides
            well-organized, up-to-date collections and various services to meet user needs.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Services */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-7 h-7 text-black" />
                </div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                  Services & Facilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="p-1.5 bg-blue-100 rounded-md mt-0.5">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 flex-1">{service.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities Grid */}
            <div className="bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
                Premium Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {facilities.map((facility, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black rounded-lg">
                        {React.cloneElement(facility.icon, { className: "w-5 h-5 text-white" })}
                      </div>
                      <span className="text-black font-medium">{facility.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-8">
            {/* Collection Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-orange-400" />
                Collection Statistics
              </h2>
              <div className="space-y-4">
                {collection.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">{item.category}</h3>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-orange-400">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Library Timings */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Library Timings
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {timings.map((timing, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-4 rounded-xl ${timing.highlight
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                        : 'bg-white/5'
                      }`}
                  >
                    <span className={`font-medium ${timing.highlight ? 'text-yellow-200' : 'text-gray-300'}`}>
                      {timing.period}
                    </span>
                    <span className={`font-semibold ${timing.highlight ? 'text-yellow-300' : 'text-white'}`}>
                      {timing.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Staff Info */}
              <div className="bg-white/10 rounded-xl p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-white" />
                  <h3 className="font-semibold text-white">Library Staff</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">Mr. Kunal D. Kukade</p>
                    <p className="text-blue-200">Librarian</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        {/* Note Section */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 md:p-8 border border-amber-200">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Icon - Stacked on mobile, inline on larger screens */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 sm:hidden">Important Note</h3>
            </div>

            <div className="flex-1">
              {/* Heading - Hidden on mobile (shown with icon), visible on larger screens */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 hidden sm:block">Important Note</h3>

              {/* First paragraph */}
              <p className="text-gray-700 px-2 sm:px-0 mb-4 text-justify">
                The library is kept open on holidays during examination periods for student convenience.
                Reading Hall timings are extended during examination periods to support learning needs.
              </p>

              {/* Second paragraph in highlighted box */}
              <div className="p-4 bg-white/50 rounded-lg border border-amber-200">
                <p className="text-amber-800 font-medium text-justify">
                  The library serves as the main hub for learning, providing services and facilities
                  tailored to the institute's teaching and research programs.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LibraryPage;