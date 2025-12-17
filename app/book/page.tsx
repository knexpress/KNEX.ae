'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaPlane, FaShip } from 'react-icons/fa'

interface Service {
  id: string
  title: string
  type: string
  price: string
}

function BookContent() {
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',
    receiverName: '',
    receiverEmail: '',
    receiverPhone: '',
    receiverAddress: '',
    weight: '',
    description: '',
    pickupType: 'dropoff',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const services: Service[] = [
    { id: 'ph-uae-air', title: 'PHILIPPINES TO UAE', type: 'Air Cargo', price: 'AED 39.00 / KG' },
    { id: 'uae-ph-air', title: 'UAE TO PHILIPPINES', type: 'Air Cargo', price: 'AED 39.00 / KG' },
    { id: 'thailand-uae-air', title: 'THAILAND TO UAE', type: 'Air Cargo', price: 'AED 39.00 / KG' },
    { id: 'ph-uae-sea', title: 'PHILIPPINES TO UAE', type: 'Sea Cargo', price: 'AED 2699.00 / CBM' },
  ]

  useEffect(() => {
    const serviceId = searchParams.get('service')
    if (serviceId) {
      const service = services.find(s => s.id === serviceId)
      if (service) {
        setSelectedService(service)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService,
          ...formData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFormData({
          senderName: '',
          senderEmail: '',
          senderPhone: '',
          senderAddress: '',
          receiverName: '',
          receiverEmail: '',
          receiverPhone: '',
          receiverAddress: '',
          weight: '',
          description: '',
          pickupType: 'dropoff',
        })
      } else {
        alert(data.error || 'Failed to submit booking')
      }
    } catch (error) {
      alert('Failed to submit booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Select a Service</h1>
            <p className="text-gray-600 mb-8">Please select a shipping service to continue.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition text-left"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-2">{service.type}</p>
                  <p className="text-green-600 font-semibold">{service.price}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Book Your Shipment</h1>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-green-800">
                Booking submitted successfully! We will contact you shortly with your tracking number.
              </p>
            </div>
          )}

          {/* Selected Service */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedService.title}</h2>
                <p className="text-gray-600">{selectedService.type}</p>
                <p className="text-green-600 font-semibold text-lg mt-2">{selectedService.price}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Change Service
              </button>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sender Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.senderEmail}
                    onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.senderPhone}
                    onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <textarea
                    placeholder="Address"
                    required
                    rows={3}
                    value={formData.senderAddress}
                    onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Receiver Information</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.receiverName}
                    onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.receiverEmail}
                    onChange={(e) => setFormData({ ...formData, receiverEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.receiverPhone}
                    onChange={(e) => setFormData({ ...formData, receiverPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <textarea
                    placeholder="Address"
                    required
                    rows={3}
                    value={formData.receiverAddress}
                    onChange={(e) => setFormData({ ...formData, receiverAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shipment Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Weight (kg) or Volume (CBM)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter weight or volume"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pickup Type</label>
                  <select
                    value={formData.pickupType}
                    onChange={(e) => setFormData({ ...formData, pickupType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="dropoff">Drop Off at Warehouse</option>
                    <option value="pickup">Schedule Pickup</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Package Description</label>
                <textarea
                  placeholder="Describe your package contents"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition font-semibold text-lg disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function BookPage() {
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
      <BookContent />
    </Suspense>
  )
}

