"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaAngleDown, FaAngleRight } from "react-icons/fa";
import {
  FaInfoCircle,
  FaLightbulb,
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translations";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Define the navbar menu structure with nested items and translations
  const menuItems = [
    {
      title: t.navbar.about,
      path: "#", // Changed to non-clickable
      icon: <FaInfoCircle className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.aboutItems?.aboutCompany || "About the Company",
          path: "/about",
        },
        {
          title: t.navbar.aboutItems?.ourTeam || "Our Team",
          path: "/team",
        },
      ],
    },
    {
      title: t.navbar.concepts,
      path: "#", // Changed to non-clickable
      icon: <FaLightbulb className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.conceptsItems.financialPlanning,
          path: "/concepts/financial-planning",
        },
        {
          title: t.navbar.conceptsItems.investmentStrategy,
          path: "/concepts/investment-strategy",
        },
        {
          title: t.navbar.conceptsItems.riskManagement,
          path: "/concepts/risk-management",
        },
        {
          title: t.navbar.conceptsItems.retirementPlanning,
          path: "/concepts/retirement-planning",
        },
      ],
    },
    {
      title: t.navbar.caseStudies,
      path: "#", // Changed to non-clickable
      icon: <FaBriefcase className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.caseStudiesItems.successStories,
          path: "/case-studies/success-stories",
        },
        {
          title: t.navbar.caseStudiesItems.clientTestimonials,
          path: "/case-studies/testimonials",
        },
      ],
    },
    {
      title: t.navbar.career,
      path: "/careers",
      icon: <FaGraduationCap className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.careerItems.jobOpportunities,
          path: "/careers",
        },
      ],
    },
    {
      title: t.navbar.iiqe,
      path: "/iiqe",
      icon: <IoIosSchool className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.iiqeItems.examPreparation,
          path: "/iiqe/exam-preparation",
        },
        {
          title: t.navbar.iiqeItems.studyMaterials,
          path: "/iiqe/study-materials",
        },
        {
          title: t.navbar.iiqeItems.practiceTests,
          path: "/iiqe/practice-tests",
        },
      ],
    },
    {
      title: t.navbar.events,
      path: "/events",
      icon: <FaCalendarAlt className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.eventsItems.upcomingEvents,
          path: "/events/upcoming",
        },
        {
          title: t.navbar.eventsItems.pastEvents,
          path: "/events/past",
        },
        {
          title: t.navbar.eventsItems.webinars,
          path: "/events/webinars",
        },
      ],
    },
    {
      title: t.navbar.contact,
      path: "/contact",
      icon: <FaEnvelope className="w-5 h-5" />,
      submenu: [],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Lock body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMobileSubmenu = (title: string) => {
    setExpandedMobileItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-md py-1" : "py-2"
      }`}
      style={{ width: "100vw", marginLeft: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Mobile design: No padding, simplified logo layout */}
              <div className="md:pl-2 md:mr-3 mr-2">
                <Image
                  src="/assets/Seeds_Icon_Trans.png"
                  alt="Seeds Financial Group"
                  width={50}
                  height={50}
                  className="md:rounded-none"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <h1 className="text-primary font-bold text-base md:text-xl">
                  Seeds Financial Group
                </h1>
                <p className="text-secondary text-xs hidden sm:block">
                  {t.navbar.companyTagline}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Only render when language is loaded */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.submenu && item.submenu.length > 0 ? (
                  // Items with dropdown - make parent non-clickable
                  <div className="flex items-center text-dark-gray hover:text-primary transition-colors py-2 cursor-pointer">
                    <span className="mr-1">{item.title}</span>
                    <FaAngleDown className="w-3 h-3" />
                  </div>
                ) : (
                  // Regular items without dropdown - keep clickable
                  <Link
                    href={item.path}
                    className="flex items-center text-dark-gray hover:text-primary transition-colors py-2"
                  >
                    <span className="mr-1">{item.title}</span>
                  </Link>
                )}

                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <button
              className="text-dark-gray hover:text-primary focus:outline-none ml-2 p-1 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden fixed left-0 right-0 bg-white z-50 overflow-y-auto shadow-xl border-t border-gray-100"
            style={{
              width: "100%",
              top: isScrolled ? "54px" : "62px",
              height: `calc(100vh - ${isScrolled ? "54px" : "62px"})`,
              maxHeight: "100vh",
              animation: "slideInUp 0.3s ease-out forwards",
            }}
          >
            <div className="px-6 py-6">
              {/* Menu handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-8"></div>
              
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <div key={item.title} className="group">
                    {item.submenu && item.submenu.length > 0 ? (
                      // Items with dropdown
                      <div className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-200">
                        <button
                          className="flex justify-between items-center w-full text-left p-4 hover:bg-gray-100 transition-colors"
                          onClick={() => toggleMobileSubmenu(item.title)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-600 text-sm">
                                {item.icon}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-900 text-lg">
                              {item.title}
                            </span>
                          </div>
                          <FaAngleDown
                            className={`w-5 h-5 transition-transform duration-300 text-gray-500 ${
                              expandedMobileItems.includes(item.title)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {expandedMobileItems.includes(item.title) && (
                          <div className="border-t border-gray-200 bg-white">
                            {item.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subItem.title}
                                href={subItem.path}
                                className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-4"></div>
                                <span className="text-gray-700 font-medium">
                                  {subItem.title}
                                </span>
                                <FaAngleRight className="w-4 h-4 ml-auto text-gray-400" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Regular clickable items without dropdown
                      <Link
                        href={item.path}
                        className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-gray-600 text-sm">
                            {item.icon}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900 text-lg">
                          {item.title}
                        </span>
                        <FaAngleRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Language Switcher in Mobile Menu */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600 text-sm">🌐</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-lg">
                      Language
                    </span>
                  </div>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInUp {
          from {
            transform: translateY(10%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
}
