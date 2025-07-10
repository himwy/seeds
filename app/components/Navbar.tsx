"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group"
                width={50}
                height={50}
                className="mr-2"
              />
              <div>
                <h1 className="text-primary font-bold text-xl">
                  Seeds Financial Group
                </h1>
                <p className="text-secondary text-xs">
                  {t.navbar.companyTagline}
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Only render when language is loaded */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.path}
                  className="flex items-center text-dark-gray hover:text-primary transition-colors"
                >
                  <span className="mr-1">{item.title}</span>
                  {item.submenu && item.submenu.length > 0 && (
                    <FaAngleDown className="w-3 h-3 mt-1" />
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
              className="text-dark-gray focus:outline-none ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.path}
                    className="flex justify-between items-center text-dark-gray hover:text-primary transition-colors"
                    onClick={() => {
                      if (!item.submenu || item.submenu.length === 0) {
                        setIsMenuOpen(false);
                      } else {
                        setHoveredItem(
                          hoveredItem === item.title ? null : item.title
                        );
                      }
                    }}
                  >
                    <span>{item.title}</span>
                    {item.submenu && item.submenu.length > 0 && (
                      <FaAngleDown className="w-4 h-4" />
                    )}
                  </Link>

                  {hoveredItem === item.title &&
                    item.submenu &&
                    item.submenu.length > 0 && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.path}
                            className="block py-1 text-sm text-gray-700 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
