import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import ProjectCard from './ProjectCard.jsx'
import { featuredProjects, freelanceProjects } from '../data/portfolio.js'

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('all')

  const allProjects = [
    ...freelanceProjects.map((p) => ({ ...p, isFreelance: true })),
    ...featuredProjects.map((p) => ({ ...p, isSoftware: true })),
  ]

  const filteredProjects = allProjects.filter((project) => {
    if (activeTab === 'websites') return project.isFreelance
    if (activeTab === 'software') return project.isSoftware
    return true
  })

  return (
    <section id="work" className="relative py-20 sm:py-36 bg-[#050505] text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,80,255,0.08),transparent_60%)] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-10 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 sm:pb-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-mono">
              <Briefcase size={13} />
              <span>PORTFOLIO CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-sans font-extrabold text-white tracking-tight uppercase leading-none">
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">WORKS</span>
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-light max-w-2xl">
              Real projects delivered for clients, storefronts, clinic automation, attendance tracking, and web platforms.
            </p>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-full overflow-x-auto max-w-full shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              ALL ({allProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('websites')}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'websites'
                  ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              WEBSITES ({freelanceProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'software'
                  ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              SYSTEMS ({featuredProjects.length})
            </button>
          </div>
        </div>

        {/* Full-Width Grid: 1 col phone, 2 cols tablet, 3 cols desktop, 4 cols ultra-wide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
