'use client'

import Image from 'next/image'
import { FaWhatsapp, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa'

export default function Contact() {
  const whatsappNumber = '+971524459157'
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`

  return (
    <section id="contact" className="bg-gray-100 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">Get in Touch with KN Express</h2>
          <p className="text-base md:text-xl text-gray-700">Feel free to ask for any assistance with your package</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Left - Image */}
          <div className="bg-green-600 rounded-lg p-4 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative order-2 md:order-1">
            <Image
              src="/Getintouch.svg"
              alt="Get in Touch"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right - Contact Information */}
          <div className="bg-white rounded-lg border-2 border-green-600 p-4 md:p-8 order-1 md:order-2">
            <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-4 md:mb-6">Contact KN Express here</h3>

            {/* WhatsApp Section */}
            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">Message Us on WhatsApp</p>
              
              {/* QR Code */}
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-2 border-gray-300 rounded flex items-center justify-center overflow-hidden">
                  <Image
                    src="/QR CODE .jpg"
                    alt="WhatsApp QR Code"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 text-center mb-3 md:mb-4">Scan to Chat Instantly!</p>
              
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg hover:bg-green-700 transition mb-2 text-sm md:text-base"
              >
                <FaWhatsapp className="text-lg md:text-xl" />
                <span className="break-all">{whatsappNumber}</span>
              </a>
              <p className="text-xs md:text-sm text-gray-600 text-center">Available on WhatsApp</p>
            </div>

            <div className="border-t border-gray-300 pt-4 md:pt-6 mb-4 md:mb-6">
              <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">Follow us on:</p>
              <ul className="space-y-1.5 md:space-y-2">
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 transition flex items-center space-x-2">
                    <FaFacebook />
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 transition flex items-center space-x-2">
                    <FaInstagram />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 transition flex items-center space-x-2">
                    <FaYoutube />
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 transition flex items-center space-x-2">
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-green-600 transition flex items-center space-x-2">
                    <FaTiktok />
                    <span>TikTok</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <a href="#" className="text-gray-700 hover:text-green-600 transition underline">
                Need Help? Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

