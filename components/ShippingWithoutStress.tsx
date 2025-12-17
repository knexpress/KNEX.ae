'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaShoppingBag, FaMapMarkerAlt, FaBox, FaShieldAlt } from 'react-icons/fa'

export default function ShippingWithoutStress() {
  const images = [
    '/shipmentwithoutstress1.png',
    '/shipmentwithoutstress2.png',
    '/shipmentwithoutstress3.png',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="bg-green-50 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Image Slider */}
          <div className="relative aspect-[9/16] w-full max-w-xs mx-auto md:max-w-none rounded-lg overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Shipping without stress ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {/* Indicator dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="mt-6 md:mt-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-4 md:mb-6">
              Shipping, Without the Stress — Because You Deserve Peace of Mind
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4">
              At KN Express, we take the pressure off your shoulders.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
              From booking to drop-off to delivery, we make it:
            </p>

            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex items-start space-x-2 md:space-x-3">
                <FaShoppingBag className="text-green-600 text-xl md:text-2xl mt-1 flex-shrink-0" />
                <span className="text-base md:text-lg text-gray-700">Simple to book</span>
              </div>
              <div className="flex items-start space-x-2 md:space-x-3">
                <FaMapMarkerAlt className="text-green-600 text-xl md:text-2xl mt-1 flex-shrink-0" />
                <span className="text-base md:text-lg text-gray-700">Easy to Track</span>
              </div>
              <div className="flex items-start space-x-2 md:space-x-3">
                <FaBox className="text-green-600 text-xl md:text-2xl mt-1 flex-shrink-0" />
                <span className="text-base md:text-lg text-gray-700">Free packing</span>
              </div>
              <div className="flex items-start space-x-2 md:space-x-3">
                <FaShieldAlt className="text-green-600 text-xl md:text-2xl mt-1 flex-shrink-0" />
                <span className="text-base md:text-lg text-gray-700">Safe and insured</span>
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4">
              We&apos;re here to make things easy, clear, and cared for.
            </p>
            <p className="text-base md:text-lg text-gray-700">
              Because when you ship with us, you&apos;re not alone — we&apos;re in this together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

