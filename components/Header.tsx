'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaCalendar } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/KNEXPRESSGREEN.png"
              alt="KN Express Logo"
              width={100}
              height={40}
              className="h-auto w-20 md:w-24 lg:w-28"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="text-sm lg:text-base text-gray-700 hover:text-green-600 transition">Home</Link>
            <Link href="#about" className="text-sm lg:text-base text-gray-700 hover:text-green-600 transition">About</Link>
            <Link href="#services" className="text-sm lg:text-base text-gray-700 hover:text-green-600 transition">Services</Link>
            <Link href="#hubs" className="text-sm lg:text-base text-gray-700 hover:text-green-600 transition">Hubs</Link>
            <Link href="#tracking" className="text-sm lg:text-base text-gray-700 hover:text-green-600 transition">Tracking</Link>
            <Link href="#contact" className="text-sm lg:text-base text-gray-700 hover:text-green-600 transition">Contact Us</Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <button className="bg-green-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg flex items-center space-x-1 lg:space-x-2 hover:bg-green-700 transition text-sm lg:text-base">
              <FaCalendar className="text-sm lg:text-base" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-green-600 py-2">Home</Link>
            <Link href="#about" className="block text-gray-700 hover:text-green-600 py-2">About</Link>
            <Link href="#services" className="block text-gray-700 hover:text-green-600 py-2">Services</Link>
            <Link href="#hubs" className="block text-gray-700 hover:text-green-600 py-2">Hubs</Link>
            <Link href="#tracking" className="block text-gray-700 hover:text-green-600 py-2">Tracking</Link>
            <Link href="#contact" className="block text-gray-700 hover:text-green-600 py-2">Contact Us</Link>
            <div className="flex flex-col space-y-2 pt-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">Book Now</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

