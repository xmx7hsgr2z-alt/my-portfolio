import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/portfolio.js'

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-[#050505] border-t border-white/10 text-xs font-mono text-white/50">
      <div className="w-full px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold">{profile.name}</span>
          <span>© 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <span>Resume</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  )
}
