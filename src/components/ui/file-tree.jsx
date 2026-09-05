import { useState } from 'react'
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  FileCode,
  GitBranch,
  GraduationCap,
  Briefcase,
  Terminal,
  FileText,
} from 'lucide-react'
import { timeline } from '../../data/portfolio.js'

const fileTreeData = [
  {
    year: '2026',
    folderName: '2026_latest_launches',
    isOpen: true,
    files: [
      {
        name: 'cafe_radix_gourmet_dining.tsx',
        icon: FileCode,
        timelineIndex: 0,
        type: 'Cafe & Dining Web App',
      },
      {
        name: 'bb_constructions_real_estate.tsx',
        icon: FileCode,
        timelineIndex: 1,
        type: 'Real Estate Web App',
      },
      {
        name: 'viralvaultx_shopify_storefront.ts',
        icon: FileCode,
        timelineIndex: 3,
        type: 'Shopify E-Commerce UI',
      },
    ],
  },
  {
    year: '2025',
    folderName: '2025_open_source_and_freelance',
    isOpen: true,
    files: [
      {
        name: 'github_public_repositories.git',
        icon: GitBranch,
        timelineIndex: 2,
        type: '6 Public Repositories',
      },
      {
        name: 'freelance_client_websites.work',
        icon: Briefcase,
        timelineIndex: 5,
        type: 'Web Presence Builds',
      },
    ],
  },
  {
    year: '2023-2026',
    folderName: 'academic_bca_degree',
    isOpen: false,
    files: [
      {
        name: 'bca_uttaranchal_university.edu',
        icon: GraduationCap,
        timelineIndex: 4,
        type: 'Degree Studies',
      },
    ],
  },
  {
    year: '2022-2023',
    folderName: 'media_executive_role',
    isOpen: false,
    files: [
      {
        name: 'media_executive_ngo.role',
        icon: Briefcase,
        timelineIndex: 6,
        type: 'Media & Production',
      },
    ],
  },
]

export default function FileTree() {
  const [tree, setTree] = useState(fileTreeData)
  const [selectedFile, setSelectedFile] = useState(fileTreeData[0].files[0])

  const toggleFolder = (folderIndex) => {
    setTree((prev) =>
      prev.map((folder, idx) =>
        idx === folderIndex ? { ...folder, isOpen: !folder.isOpen } : folder
      )
    )
  }

  const activeMilestone = timeline[selectedFile.timelineIndex] || timeline[0]

  return (
    <div className="w-full rounded-3xl bg-[#050505] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-6">
      {/* IDE Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-white/50 pl-2">
            <Terminal size={14} className="text-cyan-400" />
            <span>~/experience-and-milestones/explorer</span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
          IDE FILE TREE VIEW
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Tree Directory */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0A0A0C] border border-white/10 p-4 space-y-2 font-mono text-xs text-white/80">
          <div className="text-[11px] font-bold text-cyan-400 tracking-wider pb-2 border-b border-white/5 uppercase">
            CHRONOLOGY DIRECTORY
          </div>

          {tree.map((folder, folderIdx) => (
            <div key={folder.folderName} className="space-y-1">
              {/* Folder Node Header */}
              <button
                onClick={() => toggleFolder(folderIdx)}
                className="w-full flex items-center space-x-2 py-1.5 px-2 rounded-lg hover:bg-white/5 text-white font-semibold transition-colors text-left"
              >
                {folder.isOpen ? (
                  <ChevronDown size={14} className="text-cyan-400 shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-white/50 shrink-0" />
                )}
                {folder.isOpen ? (
                  <FolderOpen size={16} className="text-cyan-400 shrink-0" />
                ) : (
                  <Folder size={16} className="text-cyan-400/70 shrink-0" />
                )}
                <span className="truncate">{folder.folderName}</span>
                <span className="ml-auto text-[10px] text-white/40">{folder.year}</span>
              </button>

              {/* Folder Files List */}
              {folder.isOpen && (
                <div className="pl-6 space-y-1 border-l border-white/10 ml-3.5">
                  {folder.files.map((file) => {
                    const IconComponent = file.icon || FileText
                    const isSelected = selectedFile.name === file.name
                    return (
                      <button
                        key={file.name}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full flex items-center space-x-2.5 py-1.5 px-2.5 rounded-md text-xs font-mono transition-all text-left ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <IconComponent size={14} className={isSelected ? 'text-cyan-300' : 'text-white/50'} />
                        <span className="truncate">{file.name}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Active File Code / Detail Inspector */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0A0A0C] border border-cyan-500/30 p-6 space-y-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <FileCode size={16} className="text-cyan-400" />
              <span className="font-mono text-xs text-white font-bold">{selectedFile.name}</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold">
              {activeMilestone.year}
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight">
              {activeMilestone.title}
            </h3>

            <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
              {activeMilestone.description}
            </p>
          </div>

          {/* IDE Mock Code Preview Box */}
          <div className="p-4 rounded-xl bg-[#050505] border border-white/10 font-mono text-[11px] text-cyan-300 space-y-1 overflow-x-auto custom-scrollbar">
            <p className="text-white/40">// Metadata specs</p>
            <p>
              <span className="text-purple-400">const</span> milestone = &#123;
            </p>
            <p className="pl-4">
              year: <span className="text-green-400">"{activeMilestone.year}"</span>,
            </p>
            <p className="pl-4">
              title: <span className="text-green-400">"{activeMilestone.title}"</span>,
            </p>
            <p className="pl-4">
              type: <span className="text-green-400">"{selectedFile.type}"</span>,
            </p>
            <p className="pl-4">
              status: <span className="text-yellow-400">"VERIFIED_PRODUCTION"</span>
            </p>
            <p>&#125;</p>
          </div>
        </div>
      </div>
    </div>
  )
}
