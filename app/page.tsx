import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ShippingWithoutStress from '@/components/ShippingWithoutStress'
import WeTreatEveryShipment from '@/components/WeTreatEveryShipment'
import About from '@/components/About'
import Hubs from '@/components/Hubs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ShippingWithoutStress />
      <WeTreatEveryShipment />
      <About />
      <Hubs />
      <Footer />
    </main>
  )
}

