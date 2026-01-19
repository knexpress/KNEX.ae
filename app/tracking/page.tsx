'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaSearch, FaCheckCircle, FaClock, FaTruck, FaMapMarkerAlt } from 'react-icons/fa'
import { formatStatusForDisplay } from '@/lib/shipmentStatuses'

interface TrackingStatus {
  status: string
  location: string
  timestamp: string
  description: string
  showOnlyDescription?: boolean
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
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Track Your Shipment</h1>

          {/* Tracking Input */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Enter your tracking code"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm sm:text-base"
              />
              <button
                onClick={() => handleTrack()}
                disabled={loading}
                className="bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 text-sm sm:text-base whitespace-nowrap"
              >
                <FaSearch />
                <span>Track</span>
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm sm:text-base">
                {error}
              </div>
            )}
          </div>

          {/* Tracking Results */}
          {loading && (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading tracking information...</p>
            </div>
          )}

          {trackingData && (
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Tracking Information</h2>
              
              {/* Booking/Invoice Info */}
              {(trackingData.booking || trackingData.invoice) && (
                <div className="mb-6 p-3 sm:p-4 bg-green-50 rounded-lg">
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
                      <p className="text-sm text-gray-600">Service: <span className="font-semibold text-gray-900">
                        {trackingData.booking.service?.type || 'N/A'}
                      </span></p>
                      <p className="text-sm text-gray-600">Status: <span className="font-semibold text-green-600 capitalize">{trackingData.booking.status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}</span></p>
                    </div>
                  )}
                </div>
              )}

              {/* Status Timeline */}
              {trackingData.status && trackingData.status.length > 0 ? (
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {trackingData.status.map((status, index) => {
                    const isSubItem = !status.status || !status.status.trim()
                    const isFirstItem = index === 0
                    const prevItem = index > 0 ? trackingData.status[index - 1] : null
                    const isNewStatusGroup = !isSubItem && (!prevItem || !prevItem.status || prevItem.status !== status.status)
                    
                    // First item is current status (grey), all others are completed (green)
                    return (
                      <div key={index} className={`flex items-start space-x-3 sm:space-x-4 ${isSubItem ? 'ml-3 sm:ml-4 md:ml-6' : ''}`}>
                        <div className="flex-shrink-0">
                          {isFirstItem ? (
                            // Current status (first item) - Grey clock icon
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <FaClock className="text-gray-600 text-base sm:text-lg md:text-xl" />
                            </div>
                          ) : isSubItem ? (
                            // Sub-item - Small grey dot
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gray-400 rounded-full mt-2"></div>
                          ) : (
                            // Previous/completed statuses - Green checkmark
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center">
                              <FaCheckCircle className="text-white text-base sm:text-lg md:text-xl" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          {!isSubItem && isNewStatusGroup && (
                            <div className="mb-2">
                              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                                {formatStatusForDisplay(status.status)}
                              </h3>
                            </div>
                          )}
                          {isSubItem && status.description && status.description.trim() && (
                            <p className="text-sm sm:text-base text-gray-700 mb-1 break-words">{status.description}</p>
                          )}
                          {!isSubItem && status.description && status.description.trim() && status.description !== status.status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase()) && (
                            <p className="text-sm sm:text-base text-gray-600 mb-1 break-words">{status.description}</p>
                          )}
                          {!isSubItem && status.location && status.location.trim() && (
                            <div className="flex items-center space-x-2 mb-1">
                              <FaMapMarkerAlt className="text-green-600 text-xs sm:text-sm md:text-base flex-shrink-0" />
                              <p className="text-xs sm:text-sm md:text-base text-gray-600 break-words">{status.location}</p>
                            </div>
                          )}
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {new Date(status.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <FaTruck className="text-3xl sm:text-4xl md:text-6xl text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-gray-600 px-4">Tracking information will be updated as your shipment progresses.</p>
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

