import RandomLetterSwap from '@/components/ui/random-letter-swap'

export default function RandomLetterSwapNav({
  links = [
    { label: 'Intro', href: '#intro' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  activeSection = 'intro',
  onSelectLink,
}) {
  return (
    <nav className="flex items-center gap-1 sm:gap-2 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] px-3 py-1.5 rounded-full shadow-2xl">
      {links.map((link) => {
        const sectionId = link.href.replace('#', '')
        const isActive = activeSection === sectionId
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={onSelectLink}
            className="no-underline"
          >
            <RandomLetterSwap
              label={link.label.toUpperCase()}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-300 ${
                isActive
                  ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 shadow-sm shadow-cyan-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              staggerDuration={0.02}
              transition={{ duration: 0.4, type: 'spring' }}
            />
          </a>
        )
      })}
    </nav>
  )
}
