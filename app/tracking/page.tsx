'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaSearch, FaCheckCircle, FaClock, FaTruck, FaMapMarkerAlt } from 'react-icons/fa'

interface TrackingStatus {
  status: string
  location: string
  timestamp: string
  description: string
}

interface TrackingResponse {
  code: string
  type: 'booking' | 'invoice'
  status: TrackingStatus[]
  booking?: {
    trackingCode: string
    awb?: string | null
    service: any
    status: string
    batch_no?: string | null
    createdAt: string
  }
  invoice?: {
    awb: string
    invoiceNumber?: string | null
    status: string
    createdAt: string
  }
}

function TrackingContent() {
  const searchParams = useSearchParams()
  const [trackingCode, setTrackingCode] = useState('')
  const [trackingData, setTrackingData] = useState<TrackingResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      setTrackingCode(code)
      handleTrack(code)
    }
  }, [searchParams])

  const handleTrack = async (code?: string) => {
    const codeToTrack = code || trackingCode
    if (!codeToTrack.trim()) {
      setError('Please enter a tracking code')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/tracking?code=${codeToTrack}`)
      const data = await response.json()
      
      if (response.ok) {
        setTrackingData(data)
      } else {
        setError(data.error || 'Tracking code not found')
        setTrackingData(null)
      }
    } catch (err) {
      setError('Failed to fetch tracking information')
      setTrackingData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Track Your Shipment</h1>

          {/* Tracking Input */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter your tracking code"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                onClick={() => handleTrack()}
                disabled={loading}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition flex items-center space-x-2 disabled:opacity-50"
              >
                <FaSearch />
                <span>Track</span>
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Tracking Results */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">Loading tracking information...</p>
            </div>
          )}

          {trackingData && (
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Tracking Information</h2>
              
              {/* Booking/Invoice Info */}
              {(trackingData.booking || trackingData.invoice) && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  {trackingData.invoice && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">AWB: <span className="font-semibold text-gray-900">{trackingData.invoice.awb}</span></p>
                      {trackingData.invoice.invoiceNumber && (
                        <p className="text-sm text-gray-600">Invoice: <span className="font-semibold text-gray-900">{trackingData.invoice.invoiceNumber}</span></p>
                      )}
                      <p className="text-sm text-gray-600">Status: <span className="font-semibold text-green-600 capitalize">{trackingData.invoice.status}</span></p>
                    </div>
                  )}
                  {trackingData.booking && (
                    <div>
                      <p className="text-sm text-gray-600">Tracking Code: <span className="font-semibold text-gray-900">{trackingData.booking.trackingCode}</span></p>
                      {trackingData.booking.awb && (
                        <p className="text-sm text-gray-600">AWB: <span className="font-semibold text-gray-900">{trackingData.booking.awb}</span></p>
                      )}
                      {trackingData.booking.batch_no && (
                        <p className="text-sm text-gray-600">Batch No: <span className="font-semibold text-gray-900">{trackingData.booking.batch_no}</span></p>
                      )}
                      <p className="text-sm text-gray-600">Service: <span className="font-semibold text-gray-900">{trackingData.booking.service?.title} ({trackingData.booking.service?.type})</span></p>
                      <p className="text-sm text-gray-600">Status: <span className="font-semibold text-green-600 capitalize">{trackingData.booking.status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}</span></p>
                    </div>
                  )}
                </div>
              )}

              {/* Status Timeline */}
              {trackingData.status && trackingData.status.length > 0 ? (
                <div className="space-y-4 md:space-y-6">
                  {trackingData.status.map((status, index) => (
                    <div key={index} className="flex items-start space-x-3 md:space-x-4">
                      <div className="flex-shrink-0">
                        {index === 0 ? (
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-white text-lg md:text-xl" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <FaClock className="text-gray-600 text-lg md:text-xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1 md:mb-2">
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 capitalize">
                            {status.status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <FaMapMarkerAlt className="text-green-600 text-sm md:text-base" />
                          <p className="text-sm md:text-base text-gray-600">{status.location}</p>
                        </div>
                        {status.description && (
                          <p className="text-sm md:text-base text-gray-600 mb-1">{status.description}</p>
                        )}
                        <p className="text-xs md:text-sm text-gray-500">
                          {new Date(status.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FaTruck className="text-4xl md:text-6xl text-gray-400 mx-auto mb-3 md:mb-4" />
                  <p className="text-sm md:text-base text-gray-600">Tracking information will be updated as your shipment progresses.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <TrackingContent />
    </Suspense>
  )
}

