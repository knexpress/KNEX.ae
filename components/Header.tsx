'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaCalendar, FaSearch, FaTimes } from 'react-icons/fa'

interface BookingResult {
  awb: string
  submittedAt: string
  submissionTimestamp: string
  createdDate: string | null
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFindAWBOpen, setIsFindAWBOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<BookingResult[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      const response = await fetch(`/api/book?phone=${encodeURIComponent(phoneNumber.trim())}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to search bookings')
        return
      }

      if (data.success && data.bookings && data.bookings.length > 0) {
        setResults(data.bookings)
      } else {
        setError('No bookings found for this phone number')
      }
    } catch (err) {
      console.error('Search error:', err)
      setError('An error occurred while searching. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

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
            <button
              onClick={() => setIsFindAWBOpen(true)}
              className="bg-green-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg flex items-center space-x-1 lg:space-x-2 hover:bg-green-700 transition text-sm lg:text-base"
            >
              <FaSearch className="text-sm lg:text-base" />
              <span>Find AWB</span>
            </button>
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
              <button
                onClick={() => setIsFindAWBOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Find AWB
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">Book Now</button>
            </div>
          </nav>
        )}

        {/* Find AWB Modal */}
        {isFindAWBOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Find Your AWB</h2>
                <button
                  onClick={() => {
                    setIsFindAWBOpen(false)
                    setPhoneNumber('')
                    setResults([])
                    setError(null)
                  }}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-6">
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Your Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., +971501234567"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch()
                        }
                      }}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={isLoading || !phoneNumber.trim()}
                      className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <FaSearch />
                      <span className="hidden md:inline">Search</span>
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="mt-2 text-gray-600">Searching...</p>
                  </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Found {results.length} {results.length === 1 ? 'Booking' : 'Bookings'}
                    </h3>
                    <div className="space-y-3">
                      {results.map((booking, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        >
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-gray-600">AWB Number</p>
                              <p className="text-lg font-bold text-green-600">{booking.awb}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                              <div>
                                <p className="text-xs text-gray-500">Submitted At</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {booking.createdDate || (booking.submittedAt ? new Date(booking.submittedAt).toLocaleDateString() : 'N/A')}
                                </p>
                                {booking.submittedAt && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(booking.submittedAt).toLocaleString()}
                                  </p>
                                )}
                              </div>
                              {booking.submissionTimestamp && (
                                <div>
                                  <p className="text-xs text-gray-500">Submission Timestamp</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {new Date(booking.submissionTimestamp).toLocaleString()}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

