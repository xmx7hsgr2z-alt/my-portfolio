import { useState } from 'react'
import { ArrowUpRight, Check, Copy, GitBranch, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/portfolio.js'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact" className="relative py-20 sm:py-36 bg-[#050505] text-white">
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-12 sm:space-y-16">
        {/* Main CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-tr from-[#0A0A0C] via-[#0D1527] to-[#0A0A0C] border border-white/15 p-6 sm:p-16 text-center space-y-6 sm:space-y-8 overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0050FF]/20 to-[#00D6FF]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] sm:text-xs font-mono">
              <Send size={13} />
              <span>LET'S BUILD TOGETHER</span>
            </span>
            <h2 className="text-3xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-white uppercase leading-none">
              START A <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">PROJECT</span>
            </h2>
            <p className="text-xs sm:text-xl font-light text-white/80 leading-relaxed">
              Have a website brief, full-stack application, clinic portal, or freelance opportunity? Reach out directly and let's craft an impressive digital experience.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href={`mailto:${profile.email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0050FF] via-cyan-500 to-[#00D6FF] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 active:scale-95"
            >
              <Mail size={18} />
              <span>Send Email</span>
            </a>

            <button
              onClick={copyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-white text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 hover:bg-white/20 active:scale-95"
            >
              {copied ? <Check size={18} className="text-cyan-400" /> : <Copy size={18} />}
              <span>{copied ? 'Email Copied!' : profile.email}</span>
            </button>
          </div>

          {/* Full Width Contact Details Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 w-full max-w-6xl mx-auto border-t border-white/10">
            <a
              href={`mailto:${profile.email}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors text-left space-y-1 group"
            >
              <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase block">EMAIL</span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-white group-hover:text-cyan-300 transition-colors truncate block">
                {profile.email}
              </span>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors text-left space-y-1 group"
            >
              <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase block">PHONE</span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-white group-hover:text-cyan-300 transition-colors block">
                {profile.phone}
              </span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-colors text-left space-y-1 group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono text-white/50 uppercase block">GITHUB</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-white group-hover:text-cyan-300 transition-colors block">
                  xmx7hsgr2z-alt
                </span>
              </div>
              <ArrowUpRight size={16} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
