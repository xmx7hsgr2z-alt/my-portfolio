import { Award, Calendar, CheckCircle, Cpu, ShieldCheck } from 'lucide-react'
import GlobePulse from './ui/globe-pulse.jsx'
import FileTree from './ui/file-tree.jsx'
import { certifications, strengths } from '../data/portfolio.js'

export default function SkillsExperienceSection() {
  return (
    <section id="skills" className="relative py-20 sm:py-36 bg-[#0A0A0C] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,214,255,0.06),transparent_60%)] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-16 sm:space-y-24">
        {/* ====================================================
            SKILLS MATRIX WITH 3D GLOBE PULSE
        ==================================================== */}
        <div className="space-y-8 sm:space-y-12">
          <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-mono mb-2 sm:mb-3">
                <Cpu size={13} />
                <span>TECHNICAL MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-6xl font-sans font-extrabold text-white tracking-tight uppercase leading-none">
                SKILLS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">STACK</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-white/50 max-w-md">
              Comprehensive full-stack capability across frontends, databases, server APIs, and creative tooling.
            </p>
          </div>

          {/* 21st.dev 3D Globe Pulse Skill Network */}
          <GlobePulse />

          {/* Certifications & Strengths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6">
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#050505] border border-white/10 space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 text-cyan-400">
                <Award size={18} />
                <h4 className="text-base sm:text-lg font-bold text-white font-sans uppercase tracking-wide">
                  Certifications
                </h4>
              </div>
              <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                {certifications.map((item) => (
                  <div key={item} className="flex items-start space-x-2.5 text-xs sm:text-sm text-white/80">
                    <CheckCircle size={15} className="text-cyan-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#050505] border border-white/10 space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 text-cyan-400">
                <ShieldCheck size={18} />
                <h4 className="text-base sm:text-lg font-bold text-white font-sans uppercase tracking-wide">
                  Core Strengths
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                {strengths.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] sm:text-xs font-mono text-cyan-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            CAREER & ACADEMIC TIMELINE WITH 21st.dev FILE TREE
        ==================================================== */}
        <div className="space-y-8 sm:space-y-12 pt-8 sm:pt-12 border-t border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-mono mb-2 sm:mb-3">
              <Calendar size={13} />
              <span>CHRONOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-sans font-extrabold text-white tracking-tight uppercase leading-none">
              EXPERIENCE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MILESTONES</span>
            </h2>
          </div>

          {/* 21st.dev File Tree Directory Explorer */}
          <FileTree />
        </div>
      </div>
    </section>
  )
}
