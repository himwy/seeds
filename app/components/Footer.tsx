"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaWeixin,
  FaAngleDown,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { translations } from "../translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);

  // State for accordion-style mobile footer sections
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initially
    checkMobile();

    // Update on resize
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section]
    );
  };

  const isSectionExpanded = (section: string) =>
    expandedSections.includes(section);

  return (
    <footer className="bg-white pt-8 md:pt-16 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {/* Company Info */}
          <div className="py-2 md:py-0">
            <div className="flex items-center mb-4">
              <Image
                src="/assets/Seeds_Icon_Trans.png"
                alt="Seeds Financial Group"
                width={40}
                height={40}
                className="mr-2"
              />
              <h3 className="font-bold text-lg text-primary">
                Seeds Financial Group
              </h3>
            </div>
            <p className="text-sm mb-4 text-dark-gray">
              {t.footer.companyInfo}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/seeds-financial-group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-primary hover:text-secondary transition-colors"
                aria-label="WeChat"
              >
                <FaWeixin size={20} />
              </a>
            </div>
          </div>

          {/* Services - Mobile Accordion / Desktop Normal */}
          <div className="border-t md:border-t-0 py-2 md:py-0">
            <button
              className="md:hidden w-full flex justify-between items-center font-bold text-lg py-2 text-primary focus:outline-none"
              onClick={() => toggleSection("services")}
              aria-expanded={isSectionExpanded("services")}
            >
              {t.footer.ourServices}
              <FaAngleDown
                className={`transition-transform duration-200 ${
                  isSectionExpanded("services") ? "rotate-180" : ""
                }`}
              />
            </button>
            <h3 className="hidden md:block font-bold text-lg mb-4 text-primary">
              {t.footer.ourServices}
            </h3>
            <ul
              className={`space-y-2 overflow-hidden transition-all duration-300 ${
                isSectionExpanded("services") || !isMobile
                  ? "max-h-96"
                  : "max-h-0"
              }`}
            >
              <li>
                <Link
                  href="/services/critical-illness"
                  className="text-sm text-dark-gray hover:text-primary transition-colors block py-1.5"
                >
                  {t.footer.services.criticalIllness}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/education"
                  className="text-sm text-dark-gray hover:text-primary transition-colors block py-1.5"
                >
                  {t.footer.services.education}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/annuity"
                  className="text-sm text-dark-gray hover:text-primary transition-colors block py-1.5"
                >
                  {t.footer.services.annuity}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/medical"
                  className="text-sm text-dark-gray hover:text-primary transition-colors block py-1.5"
                >
                  {t.footer.services.medical}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/travel"
                  className="text-sm text-dark-gray hover:text-primary transition-colors block py-1.5"
                >
                  {t.footer.services.travel}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/life"
                  className="text-sm text-dark-gray hover:text-primary transition-colors block py-1.5"
                >
                  {t.footer.services.life}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Mobile Accordion / Desktop Normal */}
          <div className="border-t md:border-t-0 py-2 md:py-0">
            <button
              className="md:hidden w-full flex justify-between items-center font-bold text-lg py-2 text-primary focus:outline-none"
              onClick={() => toggleSection("contact")}
              aria-expanded={isSectionExpanded("contact")}
            >
              {t.footer.contactUs}
              <FaAngleDown
                className={`transition-transform duration-200 ${
                  isSectionExpanded("contact") ? "rotate-180" : ""
                }`}
              />
            </button>
            <h3 className="hidden md:block font-bold text-lg mb-4 text-primary">
              {t.footer.contactUs}
            </h3>
            <ul
              className={`space-y-3 overflow-hidden transition-all duration-300 ${
                isSectionExpanded("contact") || !isMobile
                  ? "max-h-96"
                  : "max-h-0"
              }`}
            >
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-2 text-primary flex-shrink-0" />
                <a
                  href="tel:+85255304114"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  (852) 5530-4114
                </a>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-primary flex-shrink-0" />
                <a
                  href="mailto:hr@actiondoitnow.com"
                  className="text-sm text-dark-gray hover:text-primary transition-colors break-all"
                >
                  hr@actiondoitnow.com
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm text-dark-gray">
                  Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway
                  Bay, Hong Kong
                </span>
              </li>
            </ul>
          </div>

          {/* Service Hours - Mobile Accordion / Desktop Normal */}
          <div className="border-t md:border-t-0 py-2 md:py-0">
            <button
              className="md:hidden w-full flex justify-between items-center font-bold text-lg py-2 text-primary focus:outline-none"
              onClick={() => toggleSection("hours")}
              aria-expanded={isSectionExpanded("hours")}
            >
              {t.footer.serviceHours}
              <FaAngleDown
                className={`transition-transform duration-200 ${
                  isSectionExpanded("hours") ? "rotate-180" : ""
                }`}
              />
            </button>
            <h3 className="hidden md:block font-bold text-lg mb-4 text-primary">
              {t.footer.serviceHours}
            </h3>
            <ul
              className={`space-y-2 overflow-hidden transition-all duration-300 ${
                isSectionExpanded("hours") || !isMobile ? "max-h-96" : "max-h-0"
              }`}
            >
              <li className="flex items-center">
                <FaClock className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {t.footer.weekdays}
                  </p>
                  <p className="text-sm text-dark-gray">8:30 am to 5:30 pm</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {t.footer.saturday}
                  </p>
                  <p className="text-sm text-dark-gray">9:00 am to 12:00 pm</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {t.footer.evenings}
                  </p>
                  <p className="text-sm text-dark-gray">
                    {t.footer.byAppointment}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-dark-gray mb-4 md:mb-0 text-center md:text-left">
              &copy; {new Date().getFullYear()} Seeds Financial Group.{" "}
              {t.footer.copyright}
            </p>
            <p className="text-xs text-dark-gray text-center md:text-right">
              {t.footer.equalOpportunity}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
