"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Home,
  ChevronDown,
  User,
  UserRoundCog,
  ScrollText,
  Image as ImageIcon,
  Building2,
  Contact,
  NotebookText,
  Users,
  Link2
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hospitalTabs, setHospitalTabs] = useState([]);
  const [admissionItems, setAdmissionItems] = useState([{ label: "Loading...", href: "#" }]);
  const [impLinkItems, setImpLinkItems] = useState([{ label: "Loading Links...", href: "#" }]);
  const [committeeItems, setCommitteeItems] = useState([{ label: "Loading Committees...", href: "#" }]);
  const [ncismItems, setNcismItems] = useState([{ label: "Loading NCISM...", href: "#" }]);
  const [muhsItems, setMuhsItems] = useState([{ label: "Loading MUHS...", href: "#" }]);
  const [departmentItems, setDepartmentItems] = useState([{ label: "Loading Departments...", href: "#" }]);
  const [eventGalleryTabs, setEventGalleryTabs] = useState([{ label: "Loading Gallery...", href: "#" }]);

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const API_BASE = "http://localhost:4001";

    const safeFetch = async (endpoint, setter, transformFn) => {
      try {
        const res = await fetch(`${API_BASE}/api/${endpoint}`, { cache: "no-store" });
        if (!res.ok) {
          setter([{ label: `No ${endpoint} Found`, href: "#" }]);
          return;
        }
        const data = await res.json();
        if (data && data.length > 0) {
          const sortedData = [...data].sort((a, b) => (a.sequence_order ?? a.orderIndex ?? a.id) - (b.sequence_order ?? b.orderIndex ?? b.id));
          setter(transformFn(sortedData));
        } else {
          setter([{ label: `No ${endpoint} Found`, href: "#" }]);
        }
      } catch (error) {
        setter([{ label: `No ${endpoint} Found`, href: "#" }]);
      }
    };

    safeFetch("hospital", setHospitalTabs, (data) => data.map(tab => ({ label: tab.title, href: `/hospital/${tab.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}` })));
    safeFetch("ncism", setNcismItems, (data) => data.map(tab => ({ label: tab.title, href: `/ncism/${tab.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}` })));
    safeFetch("muhs", setMuhsItems, (data) => data.map(tab => ({ label: tab.title, href: `/muhs/${tab.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")}` })));
    safeFetch("admissions", setAdmissionItems, (data) => data.map(item => ({ label: item.title, href: item.pdf_path ? `${API_BASE}${item.pdf_path}` : "#", icon: "/assets/new.gif", target: "_blank" })));
    safeFetch("links", setImpLinkItems, (data) => data.map(item => ({ label: item.title, href: item.url || "#", target: "_blank" })));
    safeFetch("committees", setCommitteeItems, (data) => data.map(item => ({ label: item.title, href: item.pdf_path ? `${API_BASE}${item.pdf_path}` : "#", target: "_blank" })));
    safeFetch("departments", setDepartmentItems, (data) => data.map(dept => ({ label: dept.name, href: `/${dept.name ? dept.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") : "#"}` })));
    
    
    safeFetch("eventGallery", setEventGalleryTabs, (data) => {
      const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
      if (uniqueCategories.length === 0) {
        return [{ label: "No Event Gallery Found", href: "#" }];
      }
      return uniqueCategories.map(cat => ({
        label: cat,
        href: `/event-gallery?tab=${encodeURIComponent(cat)}`
      }));
    });
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMenuOpen]);

  /* DROPDOWN DATA */
  const dropdownItems = {
    ABOUT: [
      { label: "About College", href: "/about" },
      { label: "Chairman Desk", href: "/administration" },
      { label: "Principal Desk", href: "/principal-desk" },
      { label: "Vision Mission", href: "/vision-mission" },
      { label: "Board of Directors", href: "/board-of-directors" },
      { label: "Governing Bodies", href: "/governing-bodies" },
    ],
    Admission: [
      { label: "Course Layout", href: "/admission/course-layout" },
      { label: "Eligibility Criteria", href: "/admission/eligibility" },
      { label: "Admission Contact", href: "/admission/contact" },
      { label: "Fee Structure", href: "/admission/fee-structure" },
      { label: "FRA Proposal 2026-27", href: "/admission/fra-proposal" },
    ],
    Faculty: [
      { label: "Teaching Staff", href: "/teaching-staff" },
      { label: "Non-Teaching Staff", href: "/non-teaching-staff" },
    ],
    Student: [
      { label: "Academic Calendar", href: "/student/academic-calendar" },
      { label: "Academic Discipline", href: "/student/academic-discipline" },
      { label: "National Service Scheme", href: "/student/nss" },
      { label: "University Result", href: "/student/university-result" },
    ],
    Facilities: [
      { label: "Campus", href: "/facilities?tab=campus" },
      { label: "Library", href: "/college-library" }, 
      { label: "Module", href: "/facilities?tab=module" },
      { label: "Sport", href: "/facilities?tab=sport" },
      { label: "Cafeteria", href: "/facilities?tab=cafeteria" },
    ],
    Eventgallery: [
      { label: "Image Gallery", href: "/image-gallery" },
      { label: "Domestic Study Tour", href: "/domestic-tour" },
      { label: "International Study Tour", href: "/international-tour" },
    ],
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white sticky top-0 z-50 shadow-md">
      {/* MOBILE HEADER */}
      <div className="md:hidden flex justify-between items-center p-4">
        <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
          <svg className="w-6 h-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <div className={`fixed inset-0 z-20 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white text-gray-800 z-30 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center p-4 border-b border-orange-200">
          <div className="flex items-center gap-2">
            <img src="/assets/agriculture.png" className="h-16" alt="College Logo" />
            <div className="bg-orange-500 w-1 h-16" />
            <div>
              <h1 className="text-orange-500 text-2xl font-medium" style={{ fontFamily: "RockwellBold" }}>P. R. Pote Patil</h1>
              <h2 className="text-blue-800 text-[10px] font-bold">College of Agriculture, Amravati.</h2>
            </div>
          </div>
        </div>

        <ul className="flex flex-col py-2">
          <MobileNavItem href="/" pathname={pathname}><div className="flex items-center text-sm"><Home className="w-5 h-5 mr-2" /> Home</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={dropdownItems.ABOUT}><div className="flex items-center text-sm"><Building2 className="w-5 h-5 mr-2" /> About</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={dropdownItems.Admission} isNested={false}><div className="flex items-center text-sm"><NotebookText className="w-5 h-5 mr-2" /> Admission</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={dropdownItems.Faculty}><div className="flex items-center text-sm"><Users className="w-5 h-5 mr-2" /> Faculty</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={dropdownItems.Student} isNested={false}><div className="flex items-center text-sm"><User className="w-5 h-5 mr-2" /> Student</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={dropdownItems.Facilities}><div className="flex items-center text-sm"><ScrollText className="w-5 h-5 mr-2" /> Facilities</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={dropdownItems.Eventgallery}><div className="flex items-center text-sm"><ImageIcon className="w-5 h-5 mr-2" /> Event Gallery</div></MobileNavItem>
          <MobileNavItem pathname={pathname} dropdownItems={impLinkItems}><div className="flex items-center text-sm"><Link2 className="w-5 h-5 mr-2" /> Useful Links</div></MobileNavItem>
          <MobileNavItem href="/contact" pathname={pathname}><div className="flex items-center text-sm"><Contact className="w-5 h-5 mr-2" /> Contact Us</div></MobileNavItem>
        </ul>

        <div className="text-center text-gray-600 text-[12px] mt-10 mb-4">
          <h1>Developed by</h1>
          <img className="h-6 mx-auto mt-2" src="/assets/bizlogo.png" alt="Developer Logo" />
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex justify-center max-w-[1500px] mx-auto px-2">
        <ul className="flex items-center justify-center space-x-1 lg:space-x-3">
          <NavItem href="/" pathname={pathname}>HOME</NavItem>
          <DropdownItem label="ABOUT" items={dropdownItems.ABOUT} width="w-[280px]" />

          {/* ADMISSION */}
          <li className="relative group px-2 lg:px-3 py-3 cursor-pointer">
            <div className="flex items-center gap-1 text-white group-hover:text-black transition-colors duration-300">
              <span className="text-[12px] lg:text-[13px] font-bold uppercase tracking-wide">ADMISSION</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="absolute left-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white text-black shadow-xl rounded-b-md border-t-[3px] border-orange-500 py-2 flex min-w-[250px]">
                <ul className="w-full">
                  {dropdownItems.Admission?.map((item, i) => (
                    <li key={i} className="relative group/main-item">
                      <Link href={item.href || "#"} target={item.target || "_self"} className="block px-6 py-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium transition-colors">
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          {item.icon && <img src={item.icon} className="w-5 h-5 object-contain" alt="New" />}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          <DropdownItem label="FACULTY" items={dropdownItems.Faculty} width="w-[250px]" />

          {/* STUDENT */}
          <li className="relative group px-2 lg:px-3 py-3 cursor-pointer">
            <div className="flex items-center gap-1 text-white group-hover:text-black transition-colors duration-300">
              <span className="text-[12px] lg:text-[13px] font-bold uppercase tracking-wide">STUDENT</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="absolute left-0 top-full mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white text-black shadow-xl rounded-b-md border-t-[3px] border-orange-500 py-2 flex min-w-[250px]">
                <ul className="w-full">
                  {dropdownItems.Student?.map((item, i) => (
                    <li key={i} className="relative group/main-item">
                      <Link href={item.href || "#"} className="block px-6 py-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium transition-colors">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          <DropdownItem label="FACILITIES" items={dropdownItems.Facilities} width="w-[220px]" />
          <DropdownItem label="EVENT GALLERY" items={dropdownItems.Eventgallery} width="w-[250px]" />
          <DropdownItem label="USEFUL LINKS" items={impLinkItems} width="w-[280px]" />

          <NavItem href="/contact" pathname={pathname}>CONTACT US</NavItem>
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ children, href, pathname }) {
  const isActive = pathname === href;
  return (
    <li className="relative px-2 lg:px-3 py-3 group cursor-pointer">
      <Link 
        className={`text-[12px] lg:text-[13px] font-bold uppercase tracking-wide transition-colors duration-300 ${isActive ? "text-black" : "text-white group-hover:text-black"}`} 
        href={href || "#"}
      >
        {children}
      </Link>
    </li>
  );
}

function DropdownItem({ label, items, width }) {
  const hasItems = items && items.length > 0;

  return (
    <li className="relative group px-2 lg:px-3 py-3 cursor-pointer">
      <div className="flex items-center gap-1 text-white group-hover:text-black transition-colors duration-300">
        <span className={`text-[12px] lg:text-[13px] font-bold tracking-wide ${label === 'EVENT GALLERY' ? '' : 'uppercase'}`}>
          {label}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>
      
      {hasItems && (
        <ul className={`absolute left-0 top-full mt-0 bg-white text-black shadow-xl rounded-b-md border-t-[3px] border-orange-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2 ${width ? width : "w-[220px]"}`}>
          {items?.map((item, i) => (
            <li key={i}>
              <Link href={item.href || "#"} target={item.target || "_self"} className="block px-6 py-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium transition-colors w-full">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileNavItem({ children, href, pathname, dropdownItems, isNested = false }) {
  const isActive = pathname === href;
  const [open, setOpen] = useState(false);

  const checkIfItemIsActive = (items) => items && items.length > 0 ? items.some(item => item.href === pathname) : false;
  const hasActiveItem = dropdownItems ? checkIfItemIsActive(dropdownItems) : false;

  if (!dropdownItems) {
    return (
      <li>
        <Link href={href || "#"} className={`block py-3 px-6 text-[15px] font-semibold ${isActive ? "text-orange-500 bg-orange-50" : "text-gray-700 hover:bg-gray-50"}`}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button onClick={() => setOpen(!open)} className={`w-full flex justify-between items-center py-3 px-6 text-[15px] font-semibold transition-colors ${hasActiveItem ? "text-orange-500 bg-orange-50" : "text-gray-700 hover:bg-gray-50"}`}>
        {children}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""} ${hasActiveItem ? "text-orange-500" : "text-gray-400"}`} />
      </button>

      {open && (
        <ul className="ml-4 border-l-2 border-orange-100 pl-2 my-1 space-y-1 max-h-96 overflow-y-auto">
          {dropdownItems?.map((item, index) => (
            <li key={index}>
              <Link href={item.href || "#"} target={item.target || "_self"} className={`block py-2.5 px-4 rounded-md text-[14px] ${item.href === pathname ? "text-orange-600 font-bold bg-orange-50" : "text-gray-600 font-medium hover:bg-gray-50 hover:text-orange-500"}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}