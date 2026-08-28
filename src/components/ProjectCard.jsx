import { ExternalLink, GitBranch } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const paddedIndex = String(index + 1).padStart(2, '0')

  return (
    <article className="group relative rounded-2xl sm:rounded-3xl bg-[#0A0A0C] border border-white/10 hover:border-cyan-500/50 overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between hover:shadow-cyan-500/10">
      {/* Top Accent Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Preview Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B0F19] to-[#050505] p-5 text-center border-b border-white/5">
            <span className="font-mono text-cyan-400 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">
              {project.accent ? `{ ${project.accent.toUpperCase()} BUILD }` : '{ SYSTEM ARCHITECTURE }'}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white font-sans tracking-tight">
              {project.title}
            </h4>
          </div>
        )}

        {/* Floating Number Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#050505]/85 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-xs text-white/80">
          #{paddedIndex}
        </div>

        {/* Floating Status Pill */}
        {(project.result || project.type) && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 font-mono text-[10px] sm:text-[11px] text-cyan-300 truncate max-w-[150px] sm:max-w-none">
            {project.result || project.type}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest">
            {project.category || project.type || 'Web Application'}
          </div>
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack & Links Footer */}
        <div className="space-y-4 pt-3 sm:pt-4 border-t border-white/10">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(project.stack || []).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono text-white/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-1">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-200 transition-colors group/link"
              >
                <span>Live Storefront</span>
                <ExternalLink size={13} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                <GitBranch size={13} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
