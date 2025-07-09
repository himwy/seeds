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
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
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
              Seeds Financial Group is in partnership with one of the world's
              largest financial groups, providing advisory services using a wide
              range of risk management, strategy and asset allocation plans.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/seeds-financial-group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary"
              >
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-primary hover:text-secondary">
                <FaWeixin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">
              Our Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/critical-illness"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  Critical Illness Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/services/education"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  Education Plan
                </Link>
              </li>
              <li>
                <Link
                  href="/services/annuity"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  Annuity Plan
                </Link>
              </li>
              <li>
                <Link
                  href="/services/medical"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  Medical Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/services/travel"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/life"
                  className="text-sm text-dark-gray hover:text-primary transition-colors"
                >
                  Life Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-2 text-primary" />
                <span className="text-sm text-dark-gray">(852) 5530-4114</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 text-primary" />
                <span className="text-sm text-dark-gray">
                  hr@actiondoitnow.com
                </span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-primary" />
                <span className="text-sm text-dark-gray">
                  Caroline Centre, Lee Gardens Two, 28, Yun Ping Road, Causeway
                  Bay, Hong Kong
                </span>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">
              Service Hours
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaClock className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Monday - Friday
                  </p>
                  <p className="text-sm text-dark-gray">8:30 am to 5:30 pm</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-primary">Saturday</p>
                  <p className="text-sm text-dark-gray">9:00 am to 12:00 pm</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-primary">Evenings</p>
                  <p className="text-sm text-dark-gray">By appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-dark-gray mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Seeds Financial Group. All
              rights reserved.
            </p>
            <p className="text-xs text-dark-gray text-center md:text-right">
              Our company is an Equal Employment Opportunity employer that
              adheres to policies based on merit and business needs.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
