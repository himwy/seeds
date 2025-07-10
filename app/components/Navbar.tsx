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
      path: "/about-us",
      icon: <FaInfoCircle className="w-5 h-5" />,
      submenu: [],
    },
    {
      title: t.navbar.concepts,
      path: "/concepts",
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
      path: "/case-studies",
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
      path: "/career-development",
      icon: <FaGraduationCap className="w-5 h-5" />,
      submenu: [
        {
          title: t.navbar.careerItems.careerPaths,
          path: "/career-development/career-paths",
        },
        {
          title: t.navbar.careerItems.trainingPrograms,
          path: "/career-development/training-programs",
        },
        {
          title: t.navbar.careerItems.jobOpportunities,
          path: "/career-development/job-opportunities",
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
        isScrolled ? "shadow-md py-2" : "py-3"
      }`}
      style={{ width: "100vw", marginLeft: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group"
                width={40}
                height={40}
                className="mr-2"
              />
              <div>
                <h1 className="text-primary font-bold text-lg md:text-xl">
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
                <Link
                  href={item.path}
                  className="flex items-center text-dark-gray hover:text-primary transition-colors py-2"
                >
                  <span className="mr-1">{item.title}</span>
                  {item.submenu && item.submenu.length > 0 && (
                    <FaAngleDown className="w-3 h-3" />
                  )}
                </Link>

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
              className="text-dark-gray hover:text-primary focus:outline-none ml-2 p-2 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden fixed left-0 right-0 bg-white z-50 overflow-y-auto shadow-lg"
            style={{
              width: "100%",
              top: isScrolled ? "60px" : "68px",
              height: `calc(100vh - ${isScrolled ? "60px" : "68px"})`,
              maxHeight: "100vh",
              borderTopWidth: "0",
              animation: "slideInUp 0.3s ease-out forwards",
            }}
          >
            <div className="px-4 py-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <nav className="flex flex-col">
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-gray-200 py-3"
                  >
                    {item.submenu && item.submenu.length > 0 ? (
                      <>
                        <button
                          className="flex justify-between items-center w-full text-left text-dark-gray hover:text-primary transition-colors"
                          onClick={() => toggleMobileSubmenu(item.title)}
                        >
                          <div className="flex items-center">
                            <span className="mr-2 text-primary">
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <FaAngleDown
                            className={`w-4 h-4 transition-transform duration-200 text-primary ${
                              expandedMobileItems.includes(item.title)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {expandedMobileItems.includes(item.title) && (
                          <div className="ml-7 mt-3 space-y-3 pl-2 border-l-2 border-primary">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.path}
                                className="flex items-center py-2 text-gray-700 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <FaAngleRight className="w-3 h-3 mr-2 text-primary" />
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className="flex items-center text-dark-gray hover:text-primary transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-2 text-primary">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
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
