'use client'

import { useState } from 'react'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaGlobe } from 'react-icons/fa'

interface Hub {
  id: string
  name: string
  address: string
  email: string
  phone: string
  operatingTime: string
  timeZone: string
  mapUrl: string
}

export default function Hubs() {
  const [selectedHub, setSelectedHub] = useState('dubai')

  const hubs: Hub[] = [
    {
      id: 'dubai',
      name: 'DUBAI HUB',
      address: 'Al Qusais, Dubai City, Dubai, UNITED ARAB EMIRATES, 1709',
      email: 'customercare@knexpress.ae',
      phone: '+971 524459157',
      operatingTime: 'EVERYDAY\n9 AM - 6 PM',
      timeZone: 'UAE Time Zone\nGMT+4',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1234567890!2d55.3456789!3d25.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzI0LjQiTiA1NcKwMjAnNDQuNCJF!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae',
    },
    {
      id: 'manila',
      name: 'MANILA HUB',
      address: 'Manila, Philippines',
      email: 'customercare@knexpress.ae',
      phone: '+63 XXX XXX XXXX',
      operatingTime: 'EVERYDAY\n9 AM - 6 PM',
      timeZone: 'Philippines Time Zone\nGMT+8',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.1234567890!2d120.9876543!3d14.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA3JzI0LjQiTiAxMjDCsDU5JzE1LjYiRQ!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph',
    },
    {
      id: 'pampanga',
      name: 'PAMPANGA HUB',
      address: 'Pampanga, Philippines',
      email: 'customercare@knexpress.ae',
      phone: '+63 XXX XXX XXXX',
      operatingTime: 'EVERYDAY\n9 AM - 6 PM',
      timeZone: 'Philippines Time Zone\nGMT+8',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.1234567890!2d120.9876543!3d15.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDA3JzI0LjQiTiAxMjDCsDU5JzE1LjYiRQ!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph',
    },
  ]

  const currentHub = hubs.find(hub => hub.id === selectedHub) || hubs[0]

  return (
    <section id="hubs" className="bg-gray-100 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">Our Hubs Around The World</h2>
          <p className="text-lg md:text-xl text-gray-700">Explore our global hubs for seamless shipping to and from the UAE.</p>
        </div>

        {/* Hub Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
          {hubs.map((hub) => (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition ${
                selectedHub === hub.id
                  ? 'bg-white text-green-600 border-2 border-green-600'
                  : 'bg-green-100 text-gray-700 hover:bg-green-200'
              }`}
            >
              {hub.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Hub Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
            {/* Left Column - Information */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{currentHub.name}</h3>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start space-x-2 md:space-x-3">
                  <FaMapMarkerAlt className="text-green-600 text-lg md:text-xl mt-1 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">{currentHub.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-3">
                  <FaEnvelope className="text-green-600 text-lg md:text-xl flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700 break-all">{currentHub.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-3">
                  <FaPhone className="text-green-600 text-lg md:text-xl flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">{currentHub.phone}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
                  <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Operating Time</p>
                    <p className="text-sm md:text-base text-green-600 font-bold whitespace-pre-line">{currentHub.operatingTime}</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                    <p className="text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">Time Zone</p>
                    <p className="text-sm md:text-base text-green-600 font-bold whitespace-pre-line">{currentHub.timeZone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div>
              <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <iframe
                  src={currentHub.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

