import { useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Download,
  GitBranch,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import './App.css'
import Scene3D from './components/Scene3D.jsx'
import {
  certifications,
  featuredProjects,
  freelanceProjects,
  profile,
  skills,
  stats,
  strengths,
  timeline,
} from './data/portfolio.js'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const contactLinks = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    Icon: Phone,
  },
  {
    label: 'GitHub',
    value: 'xmx7hsgr2z-alt',
    href: profile.github,
    Icon: GitBranch,
    external: true,
  },
]

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function useScrollEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const animated = [
      ...document.querySelectorAll('.preview-track, .section-title, .work-card, .hero-copy'),
    ]
    let frame = 0

    const update = () => {
      const viewport = window.innerHeight || 1
      animated.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const progress = 1 - rect.top / viewport
        const clamped = Math.max(0, Math.min(1, progress))
        element.style.setProperty('--scroll-progress', clamped.toFixed(3))
      })
      frame = 0
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])
}

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return

      const target = document.querySelector(hash)
      if (target) target.scrollIntoView({ block: 'start' })
    }

    const timeout = window.setTimeout(scrollToHash, 250)
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])
}

function GradientButton({ href, children, className = '', external = false }) {
  return (
    <a
      className={`gradient-button ${className}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function WorkStack({ title, kicker, projects, previewImages = [], startAt = 1, variant = 'website' }) {
  return (
    <div className="work-group">
      <div className="work-group-heading">
        <span>{kicker}</span>
        <h3>{title}</h3>
      </div>

      <div className="work-stack">
        {projects.map((project, index) => {
          const fallbackImage = previewImages.length
            ? previewImages[index % previewImages.length]?.image
            : undefined
          const previewImage = project.image || (variant === 'website' ? fallbackImage : undefined)
          const hasLive = Boolean(project.live)
          const href = project.live || project.link || '#contact'
          const isExternal = /^https?:\/\//.test(href)

          return (
            <article className="work-card" key={`${title}-${project.title}-${index}`} data-reveal>
              <div className="work-card-top">
                <span className="work-number">{String(startAt + index).padStart(2, '0')}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.type || project.category}</p>
                </div>
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className="live-pill"
                >
                  {hasLive ? 'Live Project' : project.link ? 'Source Code' : 'Project Preview'}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              <div className="work-card-body">
                {previewImage ? (
                  <img src={previewImage} alt={`${project.title} preview`} />
                ) : (
                  <div className={`code-preview ${variant === 'software' ? 'software-preview' : ''}`} aria-hidden="true">
                    <span>{variant === 'software' ? '{ API + DATABASE }' : '<portfolio />'}</span>
                  </div>
                )}
                <div>
                  <p>{project.description}</p>
                  <div className="tag-row" aria-label={`${project.title} tech stack`}>
                    {(project.stack || []).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  useReveal()
  useScrollEffects()
  useHashScroll()

  const featuredPreview = freelanceProjects.slice(0, 6)
  const websiteProjects = freelanceProjects
  const softwareProjects = featuredProjects

  return (
    <div className="site-shell">
      <header className="nav-shell">
        <a className="brand-lockup" href="#home" aria-label={`${profile.name} home`}>
          <span>{profile.initials}</span>
          <small>{profile.location}</small>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <GradientButton href={profile.resume} external className="nav-cta">
          <Download size={16} aria-hidden="true" />
          Resume
        </GradientButton>
      </header>

      <main>
        <section className="hero-section" id="home">
          <Scene3D />
          <div className="hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">{profile.availability}</p>
              <h1>
                HI I'M
                <span>SAURAV</span>
              </h1>
              <p>{profile.headline}</p>
            </div>

            <div className="hero-panel" data-reveal>
              <span>Full-stack developer</span>
              <p>{profile.role}</p>
              <GradientButton href="#work">
                View Work
                <ArrowRight size={17} aria-hidden="true" />
              </GradientButton>
            </div>
          </div>
          <div className="hero-divider" aria-hidden="true" />
        </section>

        <section className="preview-section" aria-label="Featured portfolio previews">
          <div className="preview-track">
            {featuredPreview.map((project) => (
              <a
                className="preview-card"
                href={project.live || '#work'}
                target={project.live ? '_blank' : undefined}
                rel={project.live ? 'noreferrer' : undefined}
                key={project.title}
              >
                <img src={project.image} alt={`${project.title} website preview`} />
                <span>{project.title}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="stats-section" aria-label="Portfolio stats">
          {stats.map((item) => (
            <div className="stat-block" key={item.label} data-reveal>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="experience-section" id="experience">
          <div className="section-inner experience-grid">
            <div className="section-title light-title" data-reveal>
              <p>Experience</p>
              <h2>EXPERIENCE</h2>
            </div>

            <div className="experience-list">
              {timeline.map((item) => (
                <article className="experience-item" key={`${item.year}-${item.title}`} data-reveal>
                  <div>
                    <span>{item.year}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-inner">
            <div className="section-title dark-title" data-reveal>
              <p>Selected builds</p>
              <h2>WORK</h2>
            </div>

            <WorkStack
              title="Website Work"
              kicker="Client websites and visual demos"
              projects={websiteProjects}
              previewImages={featuredPreview}
              startAt={1}
            />

            <WorkStack
              title="Software Work"
              kicker="Backend systems and GitHub projects"
              projects={softwareProjects}
              variant="software"
              startAt={websiteProjects.length + 1}
            />
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-inner">
            <div className="section-title light-title" data-reveal>
              <p>Technical range</p>
              <h2>SKILLS</h2>
            </div>

            <div className="skill-grid">
              {skills.map((group) => (
                <article className="skill-card" key={group.title} data-reveal>
                  <h3>{group.title}</h3>
                  <div className="tag-row">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="proof-grid" data-reveal>
              <div>
                <strong>Certifications</strong>
                {certifications.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div>
                <strong>Strengths</strong>
                {strengths.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about-band">
          <div className="section-inner about-grid">
            <div data-reveal>
              <p className="eyebrow">About Saurav</p>
              <h2>Useful products, clean flows, and client-ready delivery.</h2>
            </div>
            <div className="about-copy-block" data-reveal>
              <p>{profile.summary}</p>
              <div className="about-meta">
                <span>
                  <MapPin size={17} aria-hidden="true" />
                  {profile.location}
                </span>
                <span>
                  <BadgeCheck size={17} aria-hidden="true" />
                  {profile.degree}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2>LET'S WORK TOGETHER</h2>
            <p>
              Have a project, internship, or freelance website in mind? Send the brief
              and I will help shape it into a fast, responsive web experience.
            </p>
            <GradientButton href={`mailto:${profile.email}`} className="contact-cta">
              Start a Conversation
              <Send size={17} aria-hidden="true" />
            </GradientButton>

            <div className="contact-cards">
              {contactLinks.map(({ label, value, href, Icon, external }) => (
                <a
                  href={href}
                  key={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Copyright 2026 {profile.name}. All rights reserved.</span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </footer>
    </div>
  )
}

export default App
