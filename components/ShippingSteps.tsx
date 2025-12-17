'use client'

import { FaLaptop, FaBox, FaMobileAlt, FaArrowRight } from 'react-icons/fa'

export default function ShippingSteps() {
  const bookingUrl = 'http://booking-forms-frontend.vercel.app/'

  const handleBookingClick = () => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
  }

  const handleTrackClick = () => {
    const trackingInput = document.getElementById('tracking-input')
    if (trackingInput) {
      trackingInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        trackingInput.focus()
      }, 500)
    }
  }
  const steps = [
    {
      icon: <FaLaptop className="text-4xl" />,
      step: 'Step 1',
      title: 'Book Online in Minutes',
      description: 'Fill out and confirm your booking.',
      button: 'Book Shipment',
      buttonIcon: <FaBox className="text-sm" />,
    },
    {
      icon: <FaBox className="text-4xl" />,
      step: 'Step 2',
      title: 'Drop Off or Schedule a Pick-Up',
      description: 'Choose what\'s more convenient: deliver to our warehouse or we\'ll pick up from your location.',
      button: 'Drop Off / Pick Up',
      buttonIcon: <FaMobileAlt className="text-sm" />,
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      step: 'Step 3',
      title: 'Track and Relax',
      description: 'We\'ll keep you updated at every stage — from departure to arrival. You\'ll always know where your shipment is.',
      button: 'Track Package',
      buttonIcon: <FaMobileAlt className="text-sm" />,
    },
  ]

  return (
    <section className="bg-gray-100 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">Shipping Made Easy in 3 Simple Steps</h2>
          <p className="text-lg md:text-xl text-gray-700">Easy, Fast, and Worry-Free.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative px-2">
              <div className="bg-white rounded-lg p-6 lg:p-8 shadow-lg h-full flex flex-col items-center text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 rounded-full p-4 lg:p-6">
                    <div className="text-green-600">{step.icon}</div>
                  </div>
                </div>
                <p className="text-green-600 font-semibold mb-2 text-sm lg:text-base">{step.step}</p>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-6 text-sm lg:text-base flex-grow">{step.description}</p>
                {step.button === 'Book Shipment' || step.button === 'Drop Off / Pick Up' ? (
                  <button
                    onClick={handleBookingClick}
                    className="bg-green-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 text-sm lg:text-base w-full max-w-xs"
                  >
                    <span>{step.button}</span>
                    {step.buttonIcon}
                  </button>
                ) : step.button === 'Track Package' ? (
                  <button
                    onClick={handleTrackClick}
                    className="bg-green-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 text-sm lg:text-base w-full max-w-xs"
                  >
                    <span>{step.button}</span>
                    {step.buttonIcon}
                  </button>
                ) : (
                  <button className="bg-green-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 text-sm lg:text-base w-full max-w-xs">
                    <span>{step.button}</span>
                    {step.buttonIcon}
                  </button>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-8 xl:-right-10 items-center justify-center z-10 bg-transparent pointer-events-none">
                  <FaArrowRight className="text-2xl lg:text-3xl text-green-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

