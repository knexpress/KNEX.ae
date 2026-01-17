import Link from 'next/link'
import Image from 'next/image'
import { FaHome, FaBuilding, FaTruck, FaWarehouse, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendar, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/KNEXPRESSGREEN.png"
                alt="KN Express Logo"
                width={100}
                height={40}
                className="h-auto"
              />
            </div>
            <p className="text-gray-400 text-xs md:text-sm">
              Welcome to KN Express — built for your cargo, your convenience, and your peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4 text-sm md:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaHome className="text-xs sm:text-sm flex-shrink-0" /><span>Home</span></Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaBuilding className="text-xs sm:text-sm flex-shrink-0" /><span>About</span></Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaTruck className="text-xs sm:text-sm flex-shrink-0" /><span>Services</span></Link></li>
              <li><Link href="#hubs" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaWarehouse className="text-xs sm:text-sm flex-shrink-0" /><span>Hubs</span></Link></li>
              <li><Link href="#tracking" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaMapMarkerAlt className="text-xs sm:text-sm flex-shrink-0" /><span>Tracking</span></Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaPhone className="text-xs sm:text-sm flex-shrink-0" /><span>Contact Us</span></Link></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4 text-sm md:text-base">Address</h3>
            <ul className="space-y-2.5 text-gray-400 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-green-400" />
                <span>Rocky Warehouse - Warehouse #19 11th St - Al Qusais Industrial Area - Al Qusais 1 - Dubai</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCalendar className="text-green-400 flex-shrink-0" />
                <span>Mon - Sun: 09:00 AM to 06:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-green-400 flex-shrink-0" />
                <span className="break-all">customercare@knexpress.ae</span>
              </li>
            </ul>
          </div>

          {/* Call Us */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4 text-sm md:text-base">Call Us</h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Feel free to contact us for any inquiries or assistance. We&apos;re here to help and provide the best solutions for your needs.
            </p>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-green-400 flex-shrink-0" />
              <a href="tel:+971524459157" className="text-white font-semibold text-sm sm:text-base hover:text-green-400 transition">+971524459157</a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4 text-sm md:text-base">Social Media</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaFacebook className="text-xs sm:text-sm flex-shrink-0" /><span>Facebook</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaInstagram className="text-xs sm:text-sm flex-shrink-0" /><span>Instagram</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaYoutube className="text-xs sm:text-sm flex-shrink-0" /><span>YouTube</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaLinkedin className="text-xs sm:text-sm flex-shrink-0" /><span>LinkedIn</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2 text-xs sm:text-sm py-1"><FaTiktok className="text-xs sm:text-sm flex-shrink-0" /><span>TikTok</span></Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 All Rights Reserved by KN Express</p>
        </div>
      </div>
    </footer>
  )
}

