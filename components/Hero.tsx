'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaQrcode, FaSearch, FaTruck, FaWeight, FaSync, FaPlane, FaShieldAlt } from 'react-icons/fa'

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('')

  const handleTrack = () => {
    if (trackingCode.trim()) {
      window.location.href = `/tracking?code=${trackingCode}`
    }
  }

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-8">
          {/* Left Content */}
          <div className="flex-1 w-full md:max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Not Just a Cargo, It&apos;s a{' '}
              <span className="text-green-600">Promise We Deliver</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              We deliver your shipments with speed, security, and full transparency, from personal packages to commercial cargo, we deliver with the same care and commitment.
            </p>

            {/* Tracking Section */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Track your shipment</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                <div className="flex-1 relative">
                  <FaQrcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="tracking-input"
                    type="text"
                    placeholder="Type your tracking code"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm md:text-base"
                  />
                </div>
                <button
                  onClick={handleTrack}
                  className="bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 text-sm md:text-base whitespace-nowrap"
                >
                  <FaSearch />
                  <span>Search</span>
                </button>
                <a
                  href="http://booking-forms-frontend.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 text-sm md:text-base whitespace-nowrap"
                >
                  <FaTruck />
                  <span className="hidden sm:inline">Book Shipment</span>
                  <span className="sm:hidden">Book</span>
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaWeight className="text-green-600 text-xl md:text-2xl flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700">No Minimum Weight</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaSync className="text-green-600 text-xl md:text-2xl flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700">Real-Time Updates</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaPlane className="text-green-600 text-xl md:text-2xl flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700">2-3 Days Delivery</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaShieldAlt className="text-green-600 text-xl md:text-2xl flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700">100% Insured</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block flex-shrink-0 w-full md:w-auto">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/hero1.png"
                alt="KN Express Hero"
                width={300}
                height={300}
                className="w-full h-auto object-contain max-w-sm"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

