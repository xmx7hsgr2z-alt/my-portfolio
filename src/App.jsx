import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Send,
  Sparkles,
  Star,
} from 'lucide-react'
import './App.css'
import Scene3D from './components/Scene3D.jsx'
import {
  certifications,
  featuredProjects,
  freelanceProjects,
  profile,
  services,
  skills,
  stats,
  strengths,
} from './data/portfolio.js'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const serviceIcons = {
  Websites: MonitorSmartphone,
  Apps: Code2,
  Content: Sparkles,
}

const socialLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'Phone', href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: Phone },
  { label: 'GitHub', href: profile.github, Icon: GitBranch, external: true },
  { label: 'Resume', href: profile.resume, Icon: Download, external: true },
]

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const heroProjects = useMemo(() => freelanceProjects.slice(0, 4), [])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const openWhatsApp = (name, message) => {
    const whatsappUrl = `https://wa.me/919548374594?text=${encodeURIComponent(
      `Hi Saurav, I am ${name}. ${message}`,
    )}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="site-shell">
      <header className="nav-shell">
        <a className="brand-lockup" href="#home" aria-label={`${profile.name} home`}>
          <span>{profile.initials}</span>
          <small>Portfolio</small>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          Hire Me
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <Scene3D />
          <div className="hero-grid">
            <div className="hero-copy-block" data-reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                {profile.availability}
              </p>
              <h1>
                Kumar
                <span>Saurav</span>
              </h1>
              <p className="hero-copy">{profile.headline}</p>

              <div className="hero-actions">
                <a className="button primary" href="#work">
                  Explore Work
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button ghost" href={profile.resume} target="_blank" rel="noreferrer">
                  Resume
                  <Download size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="portrait-stage" data-reveal>
              <div className="portrait-card">
                <img src={profile.photo} alt={profile.name} />
              </div>
              <div className="floating-note note-top">
                <Star size={15} aria-hidden="true" />
                Full-stack Developer
              </div>
              <div className="floating-note note-bottom">
                <BadgeCheck size={15} aria-hidden="true" />
                Client-ready UI
              </div>
            </div>
          </div>

          <div className="hero-project-strip" aria-label="Featured portfolio previews">
            {heroProjects.map((project, index) => (
              <button
                className="mini-project"
                key={project.title}
                type="button"
                onClick={() => setSelectedProject(project)}
                data-reveal
                style={{ '--delay': `${index * 70}ms` }}
              >
                <img src={project.image} alt="" />
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{project.title}</strong>
              </button>
            ))}
          </div>
        </section>

        <div className="marquee-container" aria-hidden="true">
          <div className="marquee-content">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="marquee-group">
                <span>React</span>
                <span>PHP</span>
                <span>Node.js</span>
                <span>MySQL</span>
                <span>MongoDB</span>
                <span>Figma to Code</span>
                <span>Responsive UI</span>
              </div>
            ))}
          </div>
        </div>

        <section className="stats-section" aria-label="Portfolio stats">
          <div className="stats-grid">
            {stats.map((item) => (
              <div className="stat-block" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Selected Work</p>
              <h2>Websites that look sharp and move visitors toward action.</h2>
            </div>

            <div className="work-gallery">
              {freelanceProjects.map((project, index) => (
                <button
                  className="visual-card"
                  key={project.title}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  data-reveal
                  style={{ '--card-index': index + 1 }}
                >
                  <img src={project.image} alt={`${project.title} website preview`} />
                  <div className="visual-caption">
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.result}</p>
                    <i>
                      Open Case
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </i>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-inner split-heading">
            <div data-reveal>
              <p className="section-kicker">GitHub Projects</p>
              <h2>Backend-aware builds with real workflows.</h2>
            </div>
            <p data-reveal>
              Auth, roles, dashboards, records, booking flows, exports, deployments,
              and database-backed systems built beyond static landing pages.
            </p>
          </div>

          <div className="system-grid">
            {featuredProjects.map((project) => (
              <article className="system-card" key={project.title} data-reveal>
                <div className="system-topline">
                  <span>{project.type}</span>
                  <Code2 size={18} aria-hidden="true" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row" aria-label={`${project.title} tech stack`}>
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Source
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-layout">
            <div className="about-copy" data-reveal>
              <p className="section-kicker">About Me</p>
              <h2>I build calm interfaces for useful web products.</h2>
              <p>
                {profile.summary} I work where design clarity, backend logic, and
                practical delivery need to meet.
              </p>
              <div className="about-meta">
                <span>
                  <MapPin size={18} aria-hidden="true" />
                  {profile.location}
                </span>
                <span>
                  <BadgeCheck size={18} aria-hidden="true" />
                  {profile.degree}
                </span>
              </div>
            </div>

            <div className="about-cards">
              {services.map((service) => {
                const Icon = serviceIcons[service.type] ?? Sparkles
                return (
                  <article className="about-card" key={service.title} data-reveal>
                    <span className="icon-tile">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Toolbox</p>
              <h2>Frontend polish, backend structure, and creative delivery.</h2>
            </div>

            <div className="skill-grid">
              {skills.map((group) => (
                <article className="skill-card" key={group.title} data-reveal>
                  <h3>{group.title}</h3>
                  <div className="tag-row" aria-label={`${group.title} skills`}>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="proof-line" data-reveal>
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

        <section className="contact-section" id="contact">
          <div className="contact-inner" data-reveal>
            <p className="section-kicker">Contact</p>
            <h2>Let's create something useful, sharp, and ready to ship.</h2>
            <p>
              Send the idea, business type, photos, and contact details. I can turn
              them into a responsive website, portfolio, dashboard, or full-stack app.
            </p>

            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.target)
                openWhatsApp(formData.get('name'), formData.get('message'))
              }}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <textarea name="message" placeholder="Your Message" rows={4} required />
              <button type="submit" className="button primary contact-cta">
                Send Message
                <Send size={18} aria-hidden="true" />
              </button>
            </form>

            <div className="social-row" aria-label="Contact links">
              {socialLinks.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
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

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              &times;
            </button>

            <div className="modal-content">
              <div className="modal-hero">
                {selectedProject.image ? (
                  <img src={selectedProject.image} alt={selectedProject.title} />
                ) : (
                  <div className="modal-image-placeholder">
                    <Code2 size={48} aria-hidden="true" />
                    <span>Project Codebase</span>
                  </div>
                )}
              </div>

              <div className="modal-details">
                <div className="modal-header">
                  <span className="modal-category">{selectedProject.category || selectedProject.type}</span>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                </div>

                <p className="modal-desc">{selectedProject.description}</p>

                {selectedProject.result ? (
                  <div className="modal-meta-section">
                    <h3>Outcome</h3>
                    <p className="modal-result">{selectedProject.result}</p>
                  </div>
                ) : null}

                <div className="modal-meta-grid">
                  <div className="modal-meta-item">
                    <h4>Tech Stack & Services</h4>
                    <div className="modal-tags">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-meta-item">
                    <h4>Timeline</h4>
                    <span>2024 - 2026</span>
                  </div>
                </div>

                <div className="modal-actions">
                  {selectedProject.live ? (
                    <a href={selectedProject.live} target="_blank" rel="noreferrer" className="button primary">
                      Launch Project
                      <ExternalLink size={18} aria-hidden="true" />
                    </a>
                  ) : null}
                  {selectedProject.link ? (
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="button ghost">
                      Source Code
                      <GitBranch size={18} aria-hidden="true" />
                    </a>
                  ) : null}
                  <a
                    href={`https://wa.me/919548374594?text=${encodeURIComponent(
                      `Hi Saurav, I saw your project "${selectedProject.title}" on your portfolio and would like to talk about building a similar website/app.`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="button whatsapp-btn"
                  >
                    Inquire via WhatsApp
                    <Phone size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
