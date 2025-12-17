import Link from 'next/link'
import Image from 'next/image'
import { FaHome, FaBuilding, FaTruck, FaWarehouse, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendar, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
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
            <h3 className="text-green-400 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaHome className="text-sm" /><span>Home</span></Link></li>
              <li><Link href="#about" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaBuilding className="text-sm" /><span>About</span></Link></li>
              <li><Link href="#services" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaTruck className="text-sm" /><span>Services</span></Link></li>
              <li><Link href="#hubs" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaWarehouse className="text-sm" /><span>Hubs</span></Link></li>
              <li><Link href="#tracking" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaMapMarkerAlt className="text-sm" /><span>Tracking</span></Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaPhone className="text-sm" /><span>Contact Us</span></Link></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Address</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span className="text-xs md:text-sm">Rocky Warehouse - Warehouse #19 11th St - Al Qusais Industrial Area - Al Qusais 1 - Dubai</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCalendar className="text-sm" />
                <span>Mon - Sun: 09:00 AM to 06:00 PM</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-sm" />
                <span>customercare@knexpress.ae</span>
              </li>
            </ul>
          </div>

          {/* Call Us */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Call Us</h3>
            <p className="text-gray-400 text-sm mb-4">
              Feel free to contact us for any inquiries or assistance. We&apos;re here to help and provide the best solutions for your needs.
            </p>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-green-400" />
              <span className="text-white font-semibold">+971524459157</span>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Social Media</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaFacebook /><span>Facebook</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaInstagram /><span>Instagram</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaYoutube /><span>YouTube</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaLinkedin /><span>LinkedIn</span></Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-green-400 transition flex items-center space-x-2"><FaTiktok /><span>TikTok</span></Link></li>
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

