"use client";
import React, { useState } from "react";
import Link from "next/link"; // Agar oddiy React bo'lsa 'react-router-dom' dan import qiling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo qismi */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">⚽</span>
              <span className="font-extrabold text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Polya.uz
              </span>
            </Link>
          </div>

          {/* Desktop menyu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-green-600 font-medium transition"
            >
              Bosh sahifa
            </Link>
            <Link
              href="/stadiums"
              className="text-gray-600 hover:text-green-600 font-medium transition"
            >
              Stadionlar
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-green-600 font-medium transition"
            >
              Biz haqimizda
            </Link>
          </div>

          {/* O'ng tomon - Tugmalar */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/owner/login"
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Polya egasi misiz?
            </Link>
          </div>

          {/* Mobil menyu tugmasi (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none p-2"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menyu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in-down absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
            >
              Bosh sahifa
            </Link>
            <Link
              href="/stadiums"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
            >
              Stadionlar
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
            >
              Biz haqimizda
            </Link>

            <div className="pt-4 border-t border-gray-100 mt-2">
              <Link
                href="/owner/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-base font-semibold rounded-xl shadow-md"
              >
                Polya egasi misiz?
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
