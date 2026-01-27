import Navigation from '../components/landing/Navigation'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import AboutSection from '../components/landing/AboutSection'
import TechStackSection from '../components/landing/TechStackSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default LandingPage
