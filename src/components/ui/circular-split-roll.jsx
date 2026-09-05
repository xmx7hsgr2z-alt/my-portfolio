import { useEffect, useRef, useState, useMemo } from 'react'
import { ExternalLink, GitBranch, Globe, Code, Layers } from 'lucide-react'
import { freelanceProjects, featuredProjects } from '../../data/portfolio.js'

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return prefersReducedMotion
}

export default function CircularSplitRoll() {
  const scrollTrackRef = useRef(null)
  const leftRollRef = useRef(null)
  const rightRollRef = useRef(null)
  const [activeTab, setActiveTab] = useState('websites') // 'websites' | 'software'
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const targetProgressRef = useRef(0)
  const smoothProgressRef = useRef(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  const projects = useMemo(() => {
    if (activeTab === 'websites') {
      return freelanceProjects
    }
    return featuredProjects
  }, [activeTab])

  const activeProject = projects[activeIndex] || projects[0]

  // Continuous RAF Scroll Lerping (Smooth like Scene 1 and Scene 2)
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      if (!scrollTrackRef.current) return
      const rect = scrollTrackRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollableHeight = rect.height - windowHeight

      if (totalScrollableHeight <= 0) return

      const currentScroll = -rect.top
      const rawProgress = currentScroll / totalScrollableHeight
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))

      targetProgressRef.current = clampedProgress
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    let rafId
    const updateLerp = () => {
      const diff = targetProgressRef.current - smoothProgressRef.current
      if (Math.abs(diff) > 0.0001) {
        smoothProgressRef.current += diff * 0.08
        const currentSmoothProgress = smoothProgressRef.current
        setProgress(currentSmoothProgress)

        const calculatedIndex = Math.min(
          projects.length - 1,
          Math.floor(currentSmoothProgress * projects.length)
        )
        setActiveIndex(calculatedIndex)
      }
      rafId = requestAnimationFrame(updateLerp)
    }

    rafId = requestAnimationFrame(updateLerp)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [projects.length, prefersReducedMotion])

  // Auto-scroll active card into view within scroll containers
  useEffect(() => {
    const activeEl = document.getElementById(`roll-card-${activeIndex}`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [activeIndex])

  return (
    <div
      ref={scrollTrackRef}
      className="relative w-full h-[250vh] sm:h-[320vh] bg-[#050505]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen text-white py-4 sm:py-8 md:py-12 px-4 sm:px-8 flex flex-col justify-between overflow-hidden">
        {/* Category Toggle Tabs Header */}
        <div className="z-20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-3 sm:pb-5">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Layers size={18} className="sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold font-sans tracking-tight uppercase text-white">
                WORK <span className="text-cyan-400">SHOWCASE</span>
              </h3>
              <p className="text-[11px] sm:text-xs font-mono text-white/50">
                3D Circular Roll — {projects.length} {activeTab} ({Math.round(progress * 100)}% Scrolled)
              </p>
            </div>
          </div>

          {/* Website / Software Category Buttons */}
          <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/10">
            <button
              onClick={() => {
                setActiveTab('websites')
                setActiveIndex(0)
                smoothProgressRef.current = 0
                targetProgressRef.current = 0
              }}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all ${
                activeTab === 'websites'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Globe size={13} />
              <span>WEBSITES ({freelanceProjects.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('software')
                setActiveIndex(0)
                smoothProgressRef.current = 0
                targetProgressRef.current = 0
              }}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-semibold transition-all ${
                activeTab === 'software'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Code size={13} />
              <span>SOFTWARE ({featuredProjects.length})</span>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Horizontal Project Selector Carousel (< 1024px) */}
        <div className="lg:hidden z-20 py-2 overflow-x-auto custom-scrollbar flex items-center space-x-2 w-full">
          {projects.map((proj, idx) => (
            <button
              id={`roll-card-mobile-${idx}`}
              key={`mobile-${proj.title || idx}`}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-all flex items-center space-x-2 ${
                activeIndex === idx
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <span className="text-cyan-400 font-bold">0{idx + 1}</span>
              <span className="truncate max-w-[120px]">{proj.title}</span>
            </button>
          ))}
        </div>

        {/* 3D Split Roll Viewport */}
        <div className="relative my-auto py-2 sm:py-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          {/* Left Circular Roll (Desktop Only > 1024px) */}
          <div
            ref={leftRollRef}
            className="hidden lg:flex lg:col-span-4 h-[360px] perspective-[1000px] items-center justify-center"
          >
            <div className="relative w-full h-full flex flex-col gap-3 overflow-y-auto custom-scrollbar p-2">
              {projects.slice(0, Math.ceil(projects.length / 2)).map((proj, idx) => (
                <div
                  id={`roll-card-${idx}`}
                  key={proj.title || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`roll-card p-4 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                    activeIndex === idx
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-xl scale-[1.02]'
                      : 'bg-[#0A0A0C]/80 border-white/10 hover:border-cyan-500/40 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                    <span>0{idx + 1}</span>
                    <span className="truncate max-w-[140px]">{proj.category || proj.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Center Spotlight Project Feature Card */}
          <div className="lg:col-span-4 z-10 w-full max-w-lg lg:max-w-none mx-auto">
            <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#0A0A0C] border border-cyan-500/30 shadow-2xl space-y-3 sm:space-y-4 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {activeProject?.image && (
                <div className="relative w-full h-36 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-2 sm:mb-3">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    {activeProject?.category || activeProject?.type || 'FEATURED WORK'}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    0{activeIndex + 1} / {projects.length}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white font-sans tracking-tight truncate">
                  {activeProject?.title}
                </h3>
              </div>

              <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                {activeProject?.description}
              </p>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                {activeProject?.stack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-mono text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="pt-2 sm:pt-3 flex items-center space-x-2 sm:space-x-3 border-t border-white/10">
                {activeProject?.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-cyan-500 text-black text-[11px] sm:text-xs font-mono font-bold hover:bg-cyan-400 transition-colors"
                  >
                    <ExternalLink size={13} />
                    <span>LIVE DEMO</span>
                  </a>
                )}
                {activeProject?.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs font-mono font-semibold hover:bg-white/20 transition-colors"
                  >
                    <GitBranch size={13} />
                    <span>GITHUB</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Circular Roll (Desktop Only > 1024px) */}
          <div
            ref={rightRollRef}
            className="hidden lg:flex lg:col-span-4 h-[360px] perspective-[1000px] items-center justify-center"
          >
            <div className="relative w-full h-full flex flex-col gap-3 overflow-y-auto custom-scrollbar p-2">
              {projects.slice(Math.ceil(projects.length / 2)).map((proj, idx) => {
                const realIndex = idx + Math.ceil(projects.length / 2)
                return (
                  <div
                    id={`roll-card-${realIndex}`}
                    key={proj.title || realIndex}
                    onClick={() => setActiveIndex(realIndex)}
                    className={`roll-card p-4 rounded-xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                      activeIndex === realIndex
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-xl scale-[1.02]'
                        : 'bg-[#0A0A0C]/80 border-white/10 hover:border-cyan-500/40 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                      <span>0{realIndex + 1}</span>
                      <span className="truncate max-w-[140px]">{proj.category || proj.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
