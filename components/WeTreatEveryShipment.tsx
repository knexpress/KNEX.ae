import Image from 'next/image'

export default function WeTreatEveryShipment() {
  return (
    <section className="bg-gray-100 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-4 md:mb-6">
              We Treat Every Shipment Like It&apos;s Our Own
            </h2>
            <div className="space-y-3 md:space-y-4 text-gray-700">
              <p className="text-base md:text-lg">
                Behind every package is someone counting on us.
              </p>
              <p className="text-base md:text-lg">
                We don&apos;t just move cargo — we carry trust.
              </p>
              <p className="text-base md:text-lg">
                Whether it&apos;s a gift, a business needs, or something personal, we handle it with care and responsibility.
              </p>
              <p className="text-base md:text-lg">
                We show up with integrity — and deliver with heart.
              </p>
              <p className="text-base md:text-lg">
                Your trust starts here — and we&apos;ll keep earning it, shipment after shipment. We are committed to improving every day to serve you better.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src="/shipping you deserve.png"
              alt="We treat every shipment like it's our own"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

