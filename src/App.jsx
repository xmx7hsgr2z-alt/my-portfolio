import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import CinematicHero from './components/CinematicHero.jsx'
import ShowcaseSection from './components/ShowcaseSection.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import SkillsExperienceSection from './components/SkillsExperienceSection.jsx'
import AboutSection from './components/AboutSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [activeSection, setActiveSection] = useState('intro')

  // Section Observer for Navbar Highlight
  useEffect(() => {
    const sectionIds = ['intro', 'showcase', 'work', 'skills', 'about', 'contact']

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.25,
    })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-white font-sans antialiased">
      {/* Minimal Apple-Style Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Cinematic Scroll Story */}
      <main className="relative">
        {/* Scene 1: Cinematic Intro & Camera Arc */}
        <CinematicHero />

        {/* Scene 2: Multiple Website Showcase Reel */}
        <ShowcaseSection />

        {/* Real Projects & Case Studies */}
        <ProjectsSection />

        {/* Skills Matrix, Certifications & Timeline */}
        <SkillsExperienceSection />

        {/* Personal About & Academic Background */}
        <AboutSection />

        {/* High-End Contact CTA */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
