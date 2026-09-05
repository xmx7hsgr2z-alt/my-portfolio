import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio.js'
import RandomLetterSwapNav from '@/components/ui/m-random-letter-swap-1.jsx'

export default function Navbar({ activeSection = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Intro', href: '#intro' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#intro"
          className="group flex items-center space-x-3 text-white transition-opacity hover:opacity-80"
          aria-label={profile.name}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0050FF] to-[#00D6FF] p-[1.5px] flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center font-mono font-bold text-xs text-white">
              {profile.initials}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-sm font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              {profile.name}
            </span>
            <span className="text-[11px] font-mono text-white/50 tracking-wider">
              {profile.location.split(',')[0]} · FULL-STACK
            </span>
          </div>
        </a>

        {/* Desktop Random Letter Swap Navigation Links */}
        <div className="hidden md:block">
          <RandomLetterSwapNav links={navLinks} activeSection={activeSection} />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 text-white/80 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <span className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
          <span className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-5 h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#0A0A0C]/95 backdrop-blur-2xl border-b border-white/10 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-white/80 hover:text-cyan-400 py-2 transition-colors border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
