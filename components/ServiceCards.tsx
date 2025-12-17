'use client'

import { FaPlane, FaShip, FaShoppingBag, FaCalculator, FaBox, FaQuestionCircle } from 'react-icons/fa'

export default function ServiceCards() {
  const bookingUrl = 'http://booking-forms-frontend.vercel.app/'

  const handleCardClick = () => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="bg-green-50 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Send Shipment */}
          <button
            onClick={handleCardClick}
            className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-6 shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-400 rounded-full p-4">
                <FaShoppingBag className="text-3xl text-green-700" />
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-yellow-300">Send Shipment</h3>
            <p className="text-sm md:text-base text-center text-green-100">Don&apos;t delay — book today.</p>
          </button>

          {/* Rate Calculator */}
          <button
            onClick={handleCardClick}
            className="group bg-white rounded-lg p-6 shadow-lg hover:bg-gradient-to-br hover:from-green-600 hover:to-green-700 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex justify-center mb-4">
              <FaCalculator className="text-4xl text-green-600 group-hover:text-yellow-300 transition-colors duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-gray-900 group-hover:text-yellow-300 transition-colors duration-300">Rate Calculator</h3>
            <p className="text-sm md:text-base text-center text-gray-600 group-hover:text-green-100 transition-colors duration-300">How much to ship your package? Click here.</p>
          </button>

          {/* Business Shipment */}
          <button
            onClick={handleCardClick}
            className="group bg-white rounded-lg p-6 shadow-lg hover:bg-gradient-to-br hover:from-green-600 hover:to-green-700 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex justify-center mb-4">
              <FaBox className="text-4xl text-green-600 group-hover:text-yellow-300 transition-colors duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-gray-900 group-hover:text-yellow-300 transition-colors duration-300">Business Shipment</h3>
            <p className="text-sm md:text-base text-center text-gray-600 group-hover:text-green-100 transition-colors duration-300">Enjoy the best rates — made just for you.</p>
          </button>

          {/* FAQ */}
          <button
            onClick={handleCardClick}
            className="group bg-white rounded-lg p-6 shadow-lg hover:bg-gradient-to-br hover:from-green-600 hover:to-green-700 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="flex justify-center mb-4">
              <FaQuestionCircle className="text-4xl text-green-600 group-hover:text-yellow-300 transition-colors duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-gray-900 group-hover:text-yellow-300 transition-colors duration-300">Frequently Asked Questions</h3>
            <p className="text-sm md:text-base text-center text-gray-600 group-hover:text-green-100 transition-colors duration-300">Need help? Tap me.</p>
          </button>
        </div>
      </div>
    </section>
  )
}

