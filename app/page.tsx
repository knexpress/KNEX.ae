import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ServiceCards from '@/components/ServiceCards'
import ShippingWithoutStress from '@/components/ShippingWithoutStress'
import WeTreatEveryShipment from '@/components/WeTreatEveryShipment'
import About from '@/components/About'
import Services from '@/components/Services'
import Hubs from '@/components/Hubs'
import ShippingSteps from '@/components/ShippingSteps'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServiceCards />
      <ShippingWithoutStress />
      <WeTreatEveryShipment />
      <About />
      <Services />
      <Hubs />
      <ShippingSteps />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  )
}

