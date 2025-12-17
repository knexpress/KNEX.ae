import { FaStar, FaPlay } from 'react-icons/fa'

export default function Reviews() {
  const youtubeReviews = [
    {
      name: 'Vanna Mae',
      route: 'Philippines to UAE',
      quote: 'Pangalawang beses na to. So far, so good, like what we are expected na ... fast yung delivery.',
      thumbnail: '/api/placeholder/300/200',
    },
    {
      name: 'OFW Client',
      route: 'Philippines to UAE',
      quote: 'First time ko lang rin talaga sa mga courier, masyadong expensive diba. Pero, this time, sa KN Express pasok sa budget.',
      thumbnail: '/api/placeholder/300/200',
    },
    {
      name: 'OFW Client',
      route: 'UAE to Philippines',
      quote: 'May partition sya. Hindi po katulad ng mga ibang balikbayan box na nakikita natin... Kagandahan kasi dito ay mura lang siya at pasok sa budget.',
      thumbnail: '/api/placeholder/300/200',
    },
    {
      name: 'Annalyn',
      route: 'Philippines to UAE',
      quote: 'Its, very good! Yes, on time.',
      thumbnail: '/api/placeholder/300/200',
    },
  ]

  const googleReviews = [
    {
      name: 'Marylead Mabanta-Robles',
      route: 'Philippines to UAE',
      rating: 5,
      quote: 'Great service from start to finish! My package was carefully packed and secured. I really appreciate how clear and easy the communication was....',
      avatar: '/api/placeholder/50/50',
    },
    {
      name: 'La Arnie',
      route: 'UAE to Philippines',
      rating: 5,
      quote: 'KN Express exceeded my expectations! Their service speed is remarkable within just seven days, the phone I sent to my child arrived safe, intact, and in perfect condition...',
      avatar: '/api/placeholder/50/50',
    },
    {
      name: 'SieJhay Patrick Bonifacio',
      route: 'Thailand to UAE',
      rating: 5,
      quote: 'I was incredibly impressed with the speed and efficiency of my recent shipment from Thailand to UAE. KN Express delivered exactly as promised...',
      avatar: '/api/placeholder/50/50',
    },
    {
      name: 'Nix Abella',
      route: 'UAE to Philippines',
      rating: 5,
      quote: 'I am truly impressed with the exceptional service provided by KN Express. From the ease of booking to the timely delivery, every step was seamless and stress-free...',
      avatar: '/api/placeholder/50/50',
    },
  ]

  return (
    <section className="bg-white py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">Customer Stories and Reviews</h2>
          <p className="text-base md:text-xl text-gray-700">Trusted by thousands of people and businesses around the world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* YouTube Reviews */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-2">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="text-red-600 text-xl md:text-2xl font-bold">YouTube</div>
                <div className="text-orange-500 text-sm md:text-base">
                  <span className="font-semibold">20K+ Views</span> | <span className="font-semibold">50+ Reviews</span>
                </div>
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-green-700 transition mb-4 md:mb-6 text-sm md:text-base w-full sm:w-auto">
              Watch More On YouTube →
            </button>

            <div className="space-y-3 md:space-y-4">
              {youtubeReviews.map((review, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-full sm:w-24 h-32 sm:h-16 bg-gray-200 rounded flex items-center justify-center">
                        <FaPlay className="text-red-600" />
                      </div>
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {review.route}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-1">{review.name}</h4>
                      <p className="text-xs md:text-sm text-gray-600 mb-2">{review.quote}</p>
                      <a href="#" className="text-xs md:text-sm text-gray-500 hover:text-green-600">
                        Read Full Review Here &gt;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Reviews */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-2">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="text-blue-600 text-xl md:text-2xl font-bold">Google</div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="fill-current text-sm md:text-base" />
                    ))}
                  </div>
                  <div className="text-orange-500 text-sm md:text-base">
                    <span className="font-semibold">4.6 Stars</span> | <span className="font-semibold">500+ Reviews</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-green-700 transition mb-4 md:mb-6 text-sm md:text-base w-full sm:w-auto">
              Read More On Google Reviews →
            </button>

            <div className="space-y-3 md:space-y-4">
              {googleReviews.map((review, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 shadow-sm">
                  <div className="flex space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-500 text-xs">Avatar</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm md:text-base text-gray-900 truncate">{review.name}</h4>
                        <div className="flex text-yellow-400 ml-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className="fill-current text-xs md:text-sm" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 mb-2">{review.quote}</p>
                      <a href="#" className="text-xs md:text-sm text-gray-500 hover:text-green-600">
                        Read Full Review Here &gt;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

