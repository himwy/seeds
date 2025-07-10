"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaAngleDown,
  FaAngleRight,
  FaHome,
  FaInfoCircle,
  FaLightbulb,
  FaBriefcase,
  FaGraduationCap,
  FaNewspaper,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

// Define the sidebar menu structure with nested items
const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome className="w-5 h-5" />,
  },
  {
    title: "About Us",
    path: "/about-us",
    icon: <FaInfoCircle className="w-5 h-5" />,
    submenu: [],
  },
  {
    title: "Concepts",
    path: "/concepts",
    icon: <FaLightbulb className="w-5 h-5" />,
    submenu: [
      { title: "Financial Planning", path: "/concepts/financial-planning" },
      { title: "Investment Strategy", path: "/concepts/investment-strategy" },
      { title: "Risk Management", path: "/concepts/risk-management" },
      { title: "Retirement Planning", path: "/concepts/retirement-planning" },
    ],
  },
  {
    title: "Case Studies",
    path: "/case-studies",
    icon: <FaBriefcase className="w-5 h-5" />,
    submenu: [
      { title: "Success Stories", path: "/case-studies/success-stories" },
      { title: "Client Testimonials", path: "/case-studies/testimonials" },
    ],
  },
  {
    title: "Career Development",
    path: "/career-development",
    icon: <FaGraduationCap className="w-5 h-5" />,
    submenu: [
      { title: "Career Paths", path: "/career-development/career-paths" },
      {
        title: "Training Programs",
        path: "/career-development/training-programs",
      },
      {
        title: "Job Opportunities",
        path: "/career-development/job-opportunities",
      },
    ],
  },
  {
    title: "Latest News",
    path: "/latest-news",
    icon: <FaNewspaper className="w-5 h-5" />,
    submenu: [],
  },
  {
    title: "IIQE",
    path: "/iiqe",
    icon: <IoIosSchool className="w-5 h-5" />,
    submenu: [
      { title: "IIQE Exam Preparation", path: "/iiqe/exam-preparation" },
      { title: "Study Materials", path: "/iiqe/study-materials" },
      { title: "Practice Tests", path: "/iiqe/practice-tests" },
    ],
  },
  {
    title: "Events",
    path: "/events",
    icon: <FaCalendarAlt className="w-5 h-5" />,
    submenu: [
      { title: "Upcoming Events", path: "/events/upcoming" },
      { title: "Past Events", path: "/events/past" },
      { title: "Webinars", path: "/events/webinars" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
      style={{ marginTop: "70px" }} // Adjust based on your navbar height
    >
      <div className="h-full overflow-y-auto py-4">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li
              key={item.title}
              className="py-1 relative"
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.submenu && item.submenu.length > 0 ? (
                <div className="flex flex-col">
                  <Link
                    href={item.path}
                    className="flex items-center justify-between w-full p-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {hoveredItem === item.title ? (
                      <FaAngleDown className="w-4 h-4" />
                    ) : (
                      <FaAngleRight className="w-4 h-4" />
                    )}
                  </Link>

                  {hoveredItem === item.title && item.submenu.length > 0 && (
                    <ul className="pl-9 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.path}
                            className="block p-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  className="flex items-center gap-3 p-2 text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
