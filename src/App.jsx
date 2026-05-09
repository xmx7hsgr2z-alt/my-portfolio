import { useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
  Rocket,
  Send,
  Server,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import './App.css'
import Scene3D from './components/Scene3D.jsx'
import CloudTransition from './components/CloudTransition.jsx'
import {
  certifications,
  featuredProjects,
  freelanceProjects,
  navItems,
  profile,
  services,
  skills,
  stats,
  strengths,
  timeline,
} from './data/portfolio.js'

const serviceIcons = {
  Websites: MonitorSmartphone,
  Apps: Server,
  Content: BrainCircuit,
}

const skillIcons = {
  Frontend: Code2,
  Backend: Server,
  Databases: Database,
  Tools: Layers3,
  Creative: Sparkles,
  Languages: FileText,
}

function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const sections = document.querySelectorAll('main > section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-section-visible', entry.isIntersecting)
        })
      },
      { threshold: 0.16, rootMargin: '-8% 0px -18% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    sections.forEach((section) => {
      section.classList.add('scroll-section')
      sectionObserver.observe(section)
    })

    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
      sections.forEach((section) => section.classList.remove('scroll-section', 'is-section-visible'))
    }
  }, [])

  return (
    <div className="site">
      <CloudTransition />
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${profile.name} home`}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-text">
            <strong>{profile.name}</strong>
            <small>full-stack dev</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-action" href={profile.github} target="_blank" rel="noreferrer">
          <Code2 size={18} aria-hidden="true" />
          GitHub
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <Scene3D />
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-grid">
            <div className="hero-content" data-reveal>
              <p className="eyebrow">
                <Sparkles size={18} aria-hidden="true" />
                {profile.availability}
              </p>
              <h1>
                <span>Full-stack</span>
                <span className="gradient-text">web energy.</span>
                <span>Client-ready builds.</span>
              </h1>
              <p className="hero-role">{profile.role}</p>
              <p className="hero-copy">{profile.headline}</p>

              <div className="hero-actions" aria-label="Portfolio actions">
                <a className="button primary" href="#freelance">
                  <Rocket size={19} aria-hidden="true" />
                  See freelance work
                </a>
                <a className="button secondary" href={profile.github} target="_blank" rel="noreferrer">
                  <Code2 size={18} aria-hidden="true" />
                  Open GitHub
                </a>
                <a className="button ghost" href={profile.resume} target="_blank" rel="noreferrer">
                  <Download size={18} aria-hidden="true" />
                  Resume
                </a>
              </div>
            </div>

            <aside className="portrait-card" data-reveal aria-label="Profile photo and quick details">
              <div className="portrait-wrap">
                <img src={profile.photo} alt="Portrait of Kumar Saurav" />
              </div>
              <div className="portrait-sticker sticker-top">
                <Zap size={17} aria-hidden="true" />
                React + PHP + Node
              </div>
              <div className="portrait-sticker sticker-bottom">
                <MapPin size={17} aria-hidden="true" />
                {profile.location}
              </div>
              <div className="mini-terminal" aria-label="Profile summary">
                <span className="terminal-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <p>npm run build:skills</p>
                <strong>8+ real projects shipped</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="stats-strip" aria-label="Portfolio stats">
          {stats.map((item) => (
            <div key={item.label} className="stat-item" data-reveal>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">About</p>
            <h2>Developer brain, creator taste, and enough backend grit to finish the job.</h2>
          </div>

          <div className="about-grid">
            <div className="about-card glass-card" data-reveal>
              <p>{profile.summary}</p>
              <div className="about-meta">
                <span>
                  <GraduationCap size={18} aria-hidden="true" />
                  {profile.degree}
                </span>
                <span>
                  <BriefcaseBusiness size={18} aria-hidden="true" />
                  {profile.focus}
                </span>
              </div>
            </div>

            <div className="service-grid">
              {services.map((service) => {
                const Icon = serviceIcons[service.type] ?? Layers3
                return (
                  <article className="service-card glass-card" key={service.title} data-reveal>
                    <Icon size={24} aria-hidden="true" />
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading split" data-reveal>
            <div>
              <p className="section-kicker">GitHub Projects</p>
              <h2>Public repos with real product logic, not just pretty screens.</h2>
            </div>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
              Visit GitHub
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <article className={`featured-card accent-${project.accent}`} key={project.title} data-reveal>
                <div className="featured-topline">
                  <span>{project.type}</span>
                  <Star size={18} aria-hidden="true" />
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

        <section className="section freelance-section" id="freelance">
          <div className="section-heading split" data-reveal>
            <div>
              <p className="section-kicker">Freelance Lab</p>
              <h2>Six Dropbox projects turned into a client-work showcase.</h2>
            </div>
            <a className="text-link" href="https://www.dropbox.com/t/zYfYvW8jaaQWNndB" target="_blank" rel="noreferrer">
              Source transfer
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          <div className="freelance-grid">
            {freelanceProjects.map((project) => (
              <article className="freelance-card" key={project.title} data-reveal>
                <div className="freelance-image">
                  <img src={project.image} alt={`${project.title} website preview`} />
                </div>
                <div className="freelance-body">
                  <span className="project-type">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-result">
                    <BadgeCheck size={17} aria-hidden="true" />
                    {project.result}
                  </div>
                  <div className="tag-row" aria-label={`${project.title} stack`}>
                    {project.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading" data-reveal>
            <p className="section-kicker">Skills</p>
            <h2>Full-stack stack with design and content instincts built in.</h2>
          </div>

          <div className="skills-grid">
            {skills.map((group) => {
              const Icon = skillIcons[group.title] ?? Sparkles
              return (
                <article className="skill-card glass-card" key={group.title} data-reveal>
                  <div className="skill-title">
                    <Icon size={22} aria-hidden="true" />
                    <h3>{group.title}</h3>
                  </div>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section timeline-section" id="experience">
          <div className="section-heading split" data-reveal>
            <div>
              <p className="section-kicker">Experience</p>
              <h2>The path so far: student, builder, creator, shipper.</h2>
            </div>
            <span className="pill">English + Hindi | Dehradun</span>
          </div>

          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.title} data-reveal>
                <span className="timeline-dot" aria-hidden="true" />
                <p>{item.year}</p>
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </article>
            ))}
          </div>

          <div className="proof-strip" data-reveal>
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
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-content" data-reveal>
            <p className="section-kicker">Contact</p>
            <h2>Need a website that looks alive and actually works?</h2>
            <p>
              Send the project idea, business type, photos, and contact details.
              I can turn it into a responsive website, portfolio, dashboard, or
              full-stack app.
            </p>

            <div className="contact-actions">
              <a className="button primary" href={`mailto:${profile.email}`}>
                <Mail size={19} aria-hidden="true" />
                {profile.email}
              </a>
              <a className="icon-link" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                <Phone size={18} aria-hidden="true" />
                {profile.phone}
              </a>
              <a className="icon-link" href={profile.github} target="_blank" rel="noreferrer">
                <Code2 size={18} aria-hidden="true" />
                GitHub
              </a>
              <a className="icon-link" href={profile.resume} target="_blank" rel="noreferrer">
                <Download size={18} aria-hidden="true" />
                Resume
              </a>
            </div>

            <a className="floating-send" href={`mailto:${profile.email}`}>
              <Send size={18} aria-hidden="true" />
              Start a collab
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
