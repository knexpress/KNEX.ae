import { FaBullseye, FaLightbulb, FaBalanceScale } from 'react-icons/fa'

export default function About() {
  return (
    <section id="about" className="bg-gray-100 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">Who is KN Express?</h2>
          <p className="text-lg md:text-xl text-gray-700">Your Partner in Every Meaningful Shipment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Mission */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-6">
                <FaBullseye className="text-4xl text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Mission</h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600 text-left">
              Making every step of shipping feel secure, easy, and genuinely cared for.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-6">
                <FaLightbulb className="text-4xl text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Vision</h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600 text-left">
              To be the most trusted hands your package can land in.
            </p>
          </div>

          {/* Values */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-6">
                <FaBalanceScale className="text-4xl text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Values</h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600 text-left">
              To never settle. Every day is a chance to get better — for our customers and our team. We&apos;re committed to consistent, unstoppable improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

