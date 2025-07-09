"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaWeixin,
} from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
                Risk and Asset Management
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-dark-gray hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-dark-gray hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="text-dark-gray hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-dark-gray hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link href="/iiqe" className="btn-primary">
              IIQE Exam
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-gray focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-dark-gray hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-dark-gray hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-dark-gray hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-dark-gray hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/iiqe"
                className="btn-primary inline-block w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                IIQE Exam
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
