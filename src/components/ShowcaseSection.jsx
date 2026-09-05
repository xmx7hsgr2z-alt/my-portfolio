import { useEffect, useRef, useState } from 'react'
import { Layers } from 'lucide-react'
import ImageSequenceCanvas from './ImageSequenceCanvas.jsx'
import { stats } from '../data/portfolio.js'

export default function ShowcaseSection() {
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

  const overlayOpacity = Math.sin(progress * Math.PI)

  return (
    <section ref={containerRef} id="showcase" className="relative w-full h-[250vh] sm:h-[320vh] bg-[#050505]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Scene 2 Canvas Sequence */}
        <ImageSequenceCanvas
          folder="scene-2"
          frameCount={300}
          progress={progress}
          priorityStep={2}
          objectFit="cover"
          className="absolute inset-0"
        />

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

        {/* Full Width Metrics Overlay */}
        <div className="absolute inset-0 w-full px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-16 sm:py-20 pointer-events-none">
          {/* Top Headline */}
          <div
            className="transition-all duration-500 max-w-3xl space-y-2 sm:space-y-3 pt-6 sm:pt-0"
            style={{ opacity: Math.max(0, 1 - progress * 2.5) }}
          >
            <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] sm:text-xs font-mono">
              <Layers size={12} />
              <span>MULTIPLE WEBSITE SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-7xl font-sans font-extrabold text-white tracking-tight uppercase leading-none">
              PRODUCTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                SHOWCASE
              </span>
            </h2>
            <p className="text-xs sm:text-lg font-light text-white/80 max-w-xl">
              A rapid visual montage of client storefronts, booking systems, and full-stack web platforms engineered for performance.
            </p>
          </div>

          {/* Center Dynamic Label */}
          <div
            className="self-center transition-all duration-500 text-center space-y-1 sm:space-y-2 px-2"
            style={{ opacity: overlayOpacity }}
          >
            <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              DIGITAL REEL // {Math.round(progress * 100)}%
            </span>
            <div className="text-xl sm:text-5xl font-sans font-bold text-white tracking-wide uppercase drop-shadow-xl">
              CRAFTING CUSTOM WEBSITES & BACKENDS
            </div>
          </div>

          {/* Bottom Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pointer-events-auto pb-4 sm:pb-0">
            {stats.map((item) => (
              <div
                key={item.label}
                className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 shadow-xl group hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="text-2xl sm:text-5xl font-sans font-black text-white group-hover:text-cyan-400 transition-colors">
                  {item.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-white/60 tracking-wider mt-1 uppercase truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  )
}
