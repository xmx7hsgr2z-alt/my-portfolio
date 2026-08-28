import { GraduationCap, MapPin, UserCheck } from 'lucide-react'
import { profile } from '../data/portfolio.js'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-36 bg-[#050505] text-white">
      <div className="w-full px-6 sm:px-12 lg:px-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#0A0A0C] via-[#0E1322] to-[#0A0A0C] border border-white/10 p-6 sm:p-16 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Column 1 */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-mono">
                <UserCheck size={14} />
                <span>ABOUT & PHILOSOPHY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight uppercase leading-tight">
                CRAFTING HIGH-PERFORMANCE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  DIGITAL PRODUCTS
                </span>
              </h2>
              <div className="space-y-2.5 sm:space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-white/80 font-mono">
                  <MapPin size={16} className="text-cyan-400 shrink-0" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-white/80 font-mono">
                  <GraduationCap size={16} className="text-cyan-400 shrink-0" />
                  <span>{profile.degree} — {profile.university}</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-white/80 font-light leading-relaxed text-sm sm:text-lg border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-12">
              <p>
                {profile.summary}
              </p>
              <p className="text-xs sm:text-base text-white/60">
                Specialized in building client-ready websites for coaching institutes, clinics, dental practices, and retail storefronts, combined with robust backend API engineering in PHP and Node.js.
              </p>
              <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                  CURRENT FOCUS
                </span>
                <p className="text-xs sm:text-sm font-mono text-white/90">
                  {profile.focus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
