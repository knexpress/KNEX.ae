'use client'

import Image from 'next/image'
import { FaPlane, FaShip } from 'react-icons/fa'

interface Service {
  id: string
  title: string
  type: string
  price: string
  transitTime: string
  minimum: string
  inclusions: string[]
  icon: React.ReactNode
  image: string
}

export default function Services() {
  const services: Service[] = [
    {
      id: 'ph-uae-air',
      title: 'PHILIPPINES TO UAE',
      type: 'Air Cargo',
      price: 'AED 39.00 / KG',
      transitTime: '2 to 3 Days',
      minimum: 'No Minimum Weight',
      inclusions: ['Free Packing', '100% Insured', 'All transit fees from origin to destination'],
      icon: <FaPlane className="text-2xl" />,
      image: '/Pinas to uae.jpg',
    },
    {
      id: 'uae-ph-air',
      title: 'UAE TO PHILIPPINES',
      type: 'Air Cargo',
      price: 'AED 39.00 / KG',
      transitTime: '2 to 3 Days',
      minimum: 'No Minimum Weight',
      inclusions: ['Free Packing', '100% Insured', 'All transit fees from origin to destination'],
      icon: <FaPlane className="text-2xl" />,
      image: '/uae to pinas.jpg',
    },
    {
      id: 'ph-uae-sea',
      title: 'PHILIPPINES TO UAE',
      type: 'Sea Cargo',
      price: 'AED 2699.00 / CBM',
      transitTime: '30 to 40 Days',
      minimum: 'Jumbo box',
      inclusions: ['Free Packing', '100% Insured', 'All transit fees from origin to destination'],
      icon: <FaShip className="text-2xl" />,
      image: '/Pinas to uae sea.jpg',
    },
  ]

  const handleSelectService = (serviceId: string) => {
    window.open('http://booking-forms-frontend.vercel.app/', '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="services" className="bg-green-50 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">Services</h2>
          <p className="text-lg md:text-xl text-gray-700">We Move Cargo How It&apos;s Meant To Be.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{service.type}</p>
                <p className="text-xl md:text-2xl font-bold text-green-600 mb-3 md:mb-4">{service.price}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transit Time:</span>
                    <span className="font-semibold">{service.transitTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minimum:</span>
                    <span className="font-semibold">{service.minimum}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Inclusions:</p>
                  <ul className="space-y-1">
                    {service.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        {inclusion}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectService(service.id)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                >
                  {service.icon}
                  <span>Select This Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

