import { useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Send,
  Server,
  Sparkles,
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
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const serviceIcons = {
  Websites: MonitorSmartphone,
  Apps: Server,
  Content: Sparkles,
}

const socialLinks = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: 'Phone',
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    Icon: Phone,
  },
  {
    label: 'GitHub',
    href: profile.github,
    Icon: GitBranch,
    external: true,
  },
  {
    label: 'Resume',
    href: profile.resume,
    Icon: Download,
    external: true,
  },
]

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <header className="nav-shell">
        <a className="brand-lockup" href="#home" aria-label={`${profile.name} home`}>
          <span>Saurav.</span>
          <small>Full-stack portfolio</small>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-icon-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub">
          <GitBranch size={19} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <Scene3D />
          <div className="hero-content" data-reveal>
            <p className="eyebrow">
              <span aria-hidden="true" />
              {profile.availability}
            </p>
            <h1>Full-Stack Developer</h1>
            <p className="hero-copy">
              {profile.headline} I turn clean design systems into fast React, PHP,
              Node.js, MySQL, and MongoDB products.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                View My Work
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button secondary" href="#contact">
                Get in Touch
                <Send size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <ArrowRight size={28} />
          </div>
        </section>

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
            <div className="section-intro" data-reveal>
              <p className="section-kicker">Selected Work</p>
              <h2>Client-ready websites with product logic underneath.</h2>
              <p>
                A focused collection of local business, education, healthcare, and
                service websites shaped for trust, clarity, and fast action.
              </p>
            </div>

            <div className="work-gallery">
              {freelanceProjects.map((project) => {
                const Card = project.live ? 'a' : 'article'

                return (
                  <Card
                    className="visual-card"
                    key={project.title}
                    data-reveal
                    href={project.live}
                    target={project.live ? '_blank' : undefined}
                    rel={project.live ? 'noreferrer' : undefined}
                    aria-label={project.live ? `Open ${project.title} live demo` : undefined}
                  >
                    <img src={project.image} alt={`${project.title} website preview`} />
                    <div className="visual-caption">
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.result}</p>
                      {project.live ? (
                        <span className="visual-action">
                          Open live demo
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section systems-section" id="projects">
          <div className="section-inner">
            <div className="section-intro" data-reveal>
              <p className="section-kicker">GitHub Projects</p>
              <h2>Backend-aware builds, dashboards, and real workflows.</h2>
              <p>
                Public repositories showing auth, roles, bookings, records, exports,
                and deployable frontend patterns.
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
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-inner">
            <div className="about-copy" data-reveal>
              <p className="section-kicker">About Me</p>
              <h2>Kumar Saurav builds calm interfaces for useful web products.</h2>
              <p>
                {profile.summary} I work best where design clarity, database-backed
                workflows, and practical delivery all need to meet.
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
                const Icon = serviceIcons[service.type] ?? Layers3
                return (
                  <article className="about-card" key={service.title} data-reveal>
                    <span className="icon-tile">
                      <Icon size={25} aria-hidden="true" />
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
            <div className="section-intro" data-reveal>
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

            <a className="button primary contact-cta" href={`mailto:${profile.email}`}>
              Get in Touch
              <Mail size={18} aria-hidden="true" />
            </a>

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
    </div>
  )
}

export default App
