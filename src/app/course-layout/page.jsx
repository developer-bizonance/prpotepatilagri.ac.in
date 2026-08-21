import React from 'react';

const CourseLayout = () => {
  // Aap yahan backend se aane wale PDF links daal sakte hain
  const semesters = [
    { id: 1, title: 'Semester I', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 2, title: 'Semester II', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 3, title: 'Semester III', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 4, title: 'Semester IV', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 5, title: 'Semester V', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 6, title: 'Semester VI', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 7, title: 'Semester VII', date: 'Uploaded: 7/9/2026', fileLink: '#' },
    { id: 8, title: 'Semester VIII', date: 'Uploaded: 7/9/2026', fileLink: '#' },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Course Layout
          </h1>
          <p className="text-gray-600">
            Download semester-wise syllabus and course layout PDFs.
          </p>
        </div>

        {/* Grid Container matching the MUHS style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {semesters.map((sem) => (
            <a
              key={sem.id}
              href={sem.fileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border-2 border-gray-800 rounded-xl p-5 hover:bg-gray-50 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {sem.title}
                </h3>
                <span className="text-sm text-gray-500 mt-1">
                  {sem.date}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CourseLayout;