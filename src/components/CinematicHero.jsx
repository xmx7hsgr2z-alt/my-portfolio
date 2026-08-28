import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import ImageSequenceCanvas from './ImageSequenceCanvas.jsx'
import { profile } from '../data/portfolio.js'

export default function CinematicHero() {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollableHeight = rect.height - windowHeight

      if (totalScrollableHeight <= 0) return

      const currentScroll = -rect.top
      const rawProgress = currentScroll / totalScrollableHeight
      const clampedProgress = Math.max(0, Math.min(1, rawProgress))

      setProgress(clampedProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Text phase opacities
  const phase1Opacity = Math.max(0, Math.min(1, (0.2 - progress) / 0.12))
  
  const phase2Opacity =
    progress >= 0.25 && progress <= 0.6
      ? Math.sin(((progress - 0.25) / 0.35) * Math.PI)
      : 0

  const phase3Opacity =
    progress >= 0.62 && progress <= 0.92
      ? Math.sin(((progress - 0.62) / 0.3) * Math.PI)
      : 0

  return (
    <section ref={containerRef} id="intro" className="relative w-full h-[270vh] sm:h-[360vh] bg-[#050505]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas Background Sequence */}
        <ImageSequenceCanvas
          folder="scene-1"
          frameCount={300}
          progress={progress}
          priorityStep={2}
          objectFit="cover"
          className="absolute inset-0"
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)] pointer-events-none" />

        {/* EDITORIAL OVERLAYS */}

        {/* PHASE 1: INTRO IDENTITY */}
        <div
          className="absolute inset-0 w-full px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-16 sm:py-32 pointer-events-none transition-all duration-500"
          style={{ opacity: phase1Opacity, transform: `translateY(${progress * -30}px)` }}
        >
          {/* Top Status Badge */}
          <div className="flex items-center space-x-2 pt-12 sm:pt-0">
            <span className="inline-flex items-center space-x-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md text-cyan-400 text-[10px] sm:text-xs font-mono tracking-wider">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{profile.availability}</span>
            </span>
          </div>

          {/* Center Main Headline */}
          <div className="max-w-5xl space-y-3 sm:space-y-6 my-auto">
            <p className="text-[10px] sm:text-sm font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-cyan-400/90 font-semibold">
              CREATIVE DEVELOPER & BRAND EXPERIENCE
            </p>
            <h1 className="text-4xl sm:text-7xl lg:text-9xl font-sans font-extrabold tracking-tight text-white uppercase leading-[0.95] drop-shadow-2xl">
              KUMAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">SAURAV</span>
            </h1>
            <p className="text-sm sm:text-2xl font-sans text-white/80 max-w-3xl font-light leading-relaxed">
              {profile.headline}
            </p>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/50 border-t border-white/10 pt-3 pb-4 sm:pb-0">
            <div className="flex items-center space-x-2">
              <Sparkles size={13} className="text-cyan-400 shrink-0" />
              <span className="uppercase tracking-widest truncate">{profile.name} — PORTFOLIO</span>
            </div>
            <div className="flex items-center space-x-1.5 animate-bounce text-cyan-400 font-semibold">
              <span className="uppercase tracking-wider">Scroll</span>
              <ArrowDown size={13} />
            </div>
          </div>
        </div>

        {/* PHASE 2: DESIGNER / DEVELOPER STORY */}
        <div
          className="absolute inset-0 w-full px-6 sm:px-12 lg:px-16 flex items-center justify-center sm:justify-start pointer-events-none transition-all duration-500"
          style={{ opacity: phase2Opacity }}
        >
          <div className="max-w-[92vw] sm:max-w-2xl p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0A0A0C]/80 sm:bg-[#0A0A0C]/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400 uppercase">
              01 // CORE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Design Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                + Full-Stack Code.
              </span>
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-light leading-relaxed">
              {profile.summary}
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] sm:text-xs font-mono text-cyan-300">
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">React 19</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">PHP / Node.js</span>
              <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10">MySQL / MongoDB</span>
            </div>
          </div>
        </div>

        {/* PHASE 3: HOLOGRAPHIC / EXPERIENCE CRAFT */}
        <div
          className="absolute inset-0 w-full px-6 sm:px-12 lg:px-16 flex items-center justify-center sm:justify-end pointer-events-none transition-all duration-500"
          style={{ opacity: phase3Opacity }}
        >
          <div className="max-w-[92vw] sm:max-w-2xl p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0A0A0C]/80 sm:bg-[#0A0A0C]/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 text-left sm:text-right">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400 uppercase">
              02 // DIGITAL INTERFACE
            </span>
            <h2 className="text-2xl sm:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Cinematic Motion <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                End-to-End Execution.
              </span>
            </h2>
            <p className="text-xs sm:text-base text-white/70 font-light leading-relaxed">
              Shipping high-converting landing pages, healthcare management portals, local booking applications, and e-commerce platforms with pixel precision.
            </p>
            <div className="pt-2 flex justify-start sm:justify-end gap-2 text-[10px] sm:text-xs font-mono text-cyan-300">
              <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30">16+ Real Projects</span>
              <span className="px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30">6 Public Repos</span>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#0050FF] via-cyan-400 to-[#00D6FF] transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
