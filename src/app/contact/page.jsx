// components/ContactUsSection.jsx

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // Using lucide-react for icons

const ContactUsSection = () => {
  // Data structure for the contact details
  const contactDetails = [
    {
      icon: <MapPin className="h-6 w-6 text-orange-400" />,
      label: '',
      value: 'PR Pote Patil Group of Educational Institute, Pote Patil Rd, Amravati, Maharashtra 444604',
    },
    {
      icon: <Phone className="h-6 w-6 text-orange-400" />,
      label: '', // Label is empty as per screenshot design
      value: '09403390171',
    },
    {
      icon: <Mail className="h-6 w-6 text-orange-400" />,
      label: '',
      value: 'prpagri11302@gmail.com',
    },
  ];

  return (
    <div className="min-h-[600px] bg-gray-50 p-4 sm:p-8 lg:p-12">
      {/* Header Bar */}
      <div className="bg-opacity-70  py-6 px-4 sm:py-8 lg:py-10  mb-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center tracking-wide">
          Contact Us
        </h1>
      </div>

      {/* Main Content Grid (Responsive Layout) */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        {/* Left Column: Contact Details */}
        <div className="flex flex-col space-y-6">
          {contactDetails.map((detail, index) => (
            <div
              key={index}
              className={`bg-white p-5 rounded-lg shadow-md border-l-4 ${
                detail.label === 'Address'
                  ? 'border-orange-400' // Distinct border for the address block
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="pt-1">{detail.icon}</div>
                {/* Text Content */}
                <div>
                  {detail.label && (
                    <p className="text-gray-600 font-semibold mb-1">
                      {detail.label}
                    </p>
                  )}
                  <p className="text-lg font-medium text-gray-800 break-words">
                    {detail.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Embedded Map */}
        <div className="w-full h-[400px] lg:h-full rounded-lg overflow-hidden shadow-xl border-2 border-gray-200">
          {/*
            NOTE: For a live map, replace this placeholder with an actual
            Google Maps embed iframe or a map component (like react-google-maps).
            The screenshot shows a static image, so this placeholder mimics the appearance.
          */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1971245444392!2d77.7561695759689!3d20.98473388928792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a37faf5b7ecb%3A0x38ff34fdd8f1ec5a!2sP.%20R.%20Pote%20Patil%20College%20Of%20Agriculture!5e0!3m2!1sen!2sin!4v1765531372629!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;