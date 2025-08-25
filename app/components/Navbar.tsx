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
          title: t.navbar.aboutItems.aboutCompany,
          path: "/about",
        },
        {
          title: t.navbar.aboutItems.ourTeam,
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
          title: t.navbar.conceptsItems.seedsStory,
          path: "/concepts/seeds-story",
        },
      ],
    },
    {
      title: t.navbar.caseStudies,
      path: "/case-studies/client-stories",
      icon: <FaBriefcase className="w-5 h-5" />,
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
        {
          title: t.navbar.iiqe,
          path: "/careers/iiqe",
        },
      ],
    },
    {
      title: t.navbar.events,
      path: "#", // Changed to non-clickable
      icon: <FaCalendarAlt className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.eventsItems.recentEvents,
          path: "/events/recent",
        },
        {
          title: t.navbar.eventsItems.pastEvents,
          path: "/events/past",
        },
      ],
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
              className="text-dark-gray hover:text-primary focus:outline-none ml-2 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-0" : "translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 translate-y-0" : "-translate-y-1.5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Professional backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              style={{
                animation: "fadeIn 0.3s ease-out forwards",
              }}
            />

            {/* Professional mobile menu */}
            <div
              ref={mobileMenuRef}
              className="md:hidden fixed left-3 right-3 bg-white z-50 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              style={{
                top: isScrolled ? "68px" : "76px",
                maxHeight: `calc(100vh - ${isScrolled ? "88px" : "96px"})`,
                animation:
                  "slideInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              }}
            >
              {/* Elegant header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t.navbar.menu}
                  </h3>
                  <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Professional navigation */}
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                <nav className="px-2 py-4">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.title}
                      className="mb-1"
                      style={{
                        animation: `slideInLeft 0.4s ease-out ${
                          index * 0.05
                        }s both`,
                      }}
                    >
                      {item.submenu && item.submenu.length > 0 ? (
                        // Items with dropdown - sophisticated design
                        <>
                          <button
                            className="group flex justify-between items-center w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
                            onClick={() => toggleMobileSubmenu(item.title)}
                          >
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 mr-3">
                                <span className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                                  {item.icon}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                                  {item.title}
                                </span>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {item.submenu.length}{" "}
                                  {item.submenu.length === 1
                                    ? t.navbar.item
                                    : t.navbar.itemsCount}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaAngleDown
                                className={`w-4 h-4 transition-all duration-300 text-gray-400 ${
                                  expandedMobileItems.includes(item.title)
                                    ? "rotate-180 text-blue-600"
                                    : "group-hover:text-gray-600"
                                }`}
                              />
                            </div>
                          </button>

                          {expandedMobileItems.includes(item.title) && (
                            <div
                              className="ml-4 mt-2 mb-2 space-y-1 pl-4 border-l-2 border-gradient-to-b from-blue-500 to-indigo-500 rounded-l"
                              style={{
                                animation: "expandDown 0.3s ease-out forwards",
                                borderImage:
                                  "linear-gradient(to bottom, #3b82f6, #6366f1) 1",
                              }}
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.path}
                                  className="group flex items-center py-2.5 px-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                                  onClick={() => setIsMenuOpen(false)}
                                  style={{
                                    animation: `slideInSubitem 0.3s ease-out ${
                                      subIndex * 0.05
                                    }s both`,
                                  }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors duration-300 mr-3"></div>
                                  <span className="font-medium">
                                    {subItem.title}
                                  </span>
                                  <FaAngleRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        // Regular clickable items - elegant design
                        <Link
                          href={item.path}
                          className="group flex items-center px-4 py-3 text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 hover:shadow-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 mr-3">
                            <span className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                              {item.icon}
                            </span>
                          </div>
                          <span className="font-medium flex-1">
                            {item.title}
                          </span>
                          <FaAngleRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Professional footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Seeds Financial Group</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes expandDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 300px;
            opacity: 1;
          }
        }

        @keyframes slideInSubitem {
          from {
            transform: translateX(-15px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Professional gradient border */
        .border-gradient-to-b {
          border-image: linear-gradient(to bottom, #3b82f6, #6366f1) 1;
        }

        /* Smooth scroll */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
    </header>
  );
}
