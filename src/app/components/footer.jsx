"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [loadingLinks, setLoadingLinks] = useState(true);

  const [contact] = useState({
    phone: "",
    email: "",
    address: "",
    facebook: "https://www.facebook.com/p/P-R-Pote-Patil-College-of-Agriculture-Amravati-100057501247472/",
    instagram: "https://www.instagram.com/pr.pote.college.of.agriculture/?hl=en",
    youtube: "",
    google: "https://www.google.com/search?q=pr+pote+agriculture+college+&sca_esv=f0158aba78c19323&ei=R_M7ad7iE9WgseMPsaLlqAY&ved=0ahUKEwieooyn8LeRAxVVUGwGHTFRGWUQ4dUDCBA&uact=5&oq=pr+pote+agriculture+college+&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHByIHBvdGUgYWdyaWN1bHR1cmUgY29sbGVnZSAyCxAuGIAEGMcBGK8BMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGBYYChgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yGhAuGIAEGMcBGK8BGJcFGNwEGN4EGOAE2AEBSNISUMsCWPMMcAF4AZABAJgB1QKgAfcNqgEHMC43LjEuMbgBA8gBAPgBAZgCBKACyQXCAgoQABiwAxjWBBhHwgIFECEYoAHCAgQQIRgVmAMAiAYBkAYIugYGCAEQARgUkgcHMS4yLjAuMaAHkD2yBwcwLjIuMC4xuAe_BcIHBTItMy4xyAccgAgA&sclient=gws-wiz-serp",
    whatsapp: "",
    playStore: "",
    appStore: "",
  });

  // --- FETCH USEFUL LINKS FROM ADMIN PANEL ---
  useEffect(() => {
    const fetchUsefulLinks = async () => {
      try {
        const res = await fetch("http://localhost:4001/api/links");
        if (res.ok) {
          const data = await res.json();
          const sortedData = [...data].sort((a, b) => (a.orderIndex ?? a.id) - (b.orderIndex ?? b.id));
          setUsefulLinks(sortedData);
        }
      } catch (error) {
        console.error("Error fetching useful links:", error);
      } finally {
        setLoadingLinks(false);
      }
    };
    fetchUsefulLinks();
  }, []);

  const socialLinks = [
    {
      href: contact.youtube,
      label: "YouTube",
      bg: "bg-red-600 hover:bg-red-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      ),
    },
    {
      href: contact.whatsapp,
      label: "WhatsApp",
      bg: "bg-green-500 hover:bg-green-600",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.408 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      href: contact.facebook,
      label: "Facebook",
      bg: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      href: contact.instagram,
      label: "Instagram",
      bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      href: contact.google,
      label: "Google",
      bg: "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:opacity-90",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21.35 11.1H12v2.9h5.5c-.25 1.4-1.52 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.87 0 3.13.8 3.85 1.5l2.65-2.55C16.8 3.2 14.53 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10c5.78 0 9.65-4.05 9.65-9.75 0-.65-.07-1.15-.15-1.65z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-100 pt-5 text-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
          {/* Academy Information */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 flex items-start flex-col">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-300 text-black font-bold px-2.5 py-1 rounded-md mr-2 mb-1 shadow-sm">
                P. R. Pote Patil
              </span>
              <span>College of Agriculture, Amravati.</span>
            </h3>
            <p className="text-dark">
              Empowering students to achieve their dreams of serving the nation
              through quality education and guidance.
            </p>
          </div>

          {/* Useful Links with Routing (Dynamic from Backend with Fallback) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-orange-400 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2">
              {loadingLinks ? (
                <li className="text-gray-400 text-sm">Loading links...</li>
              ) : usefulLinks.length > 0 ? (
                usefulLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-400 transition"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback static links if backend returns nothing
                [
                  { name: "Pdkv akola", path: "https://www.pdkv.ac.in/" },
                  { name: "IUMS pdkv akola", path: "https://iums.pdkv.ac.in/iums/Login.aspx" },
                  { name: "MCAER Pune", path: "http://www.mcaer.org/maueb.html" },
                  { name: "ICAR New Delhi", path: "https://icar.org.in/" },
                  { name: "Ministry of Agriculture & Farmers Welfare", path: "https://agriwelfare.gov.in/" },
                  { name: "Maharashtra Krushi vibhag", path: "http://krishi.maharashtra.gov.in/" },
                  { name: "NABARD office", path: "https://www.nabard.org/" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-orange-400 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Dynamic Social Icons */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-orange-400 pb-2">
              Connect with us
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(
                (link, i) =>
                  link.href && (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${link.bg} text-white p-2 rounded-full transition-colors`}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t text-sm border-orange-400 mt-10 pt-6 pb-4 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left">
          {/* All Rights Reserved Text */}
          <p className="text-gray-700 mb-2 flex flex-col md:flex-row items-center justify-start md:justify-center gap-2">
            © 2025 P. R. Pote Patil College of Agriculture, Amravati.{" "}
            <span> All rights reserved.</span>
          </p>

          {/* Designed & Managed by */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 text-center md:text-left">
            <p>Developed by</p>
            <a
              href="https://bizonance.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-6"
                src="/assets/bizlogo.png"
                alt="Bizonance Logo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;