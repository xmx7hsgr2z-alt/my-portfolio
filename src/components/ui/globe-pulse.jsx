import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { skills } from '../../data/portfolio.js'

export default function GlobePulse() {
  const mountRef = useRef(null)
  const [activeSkillGroup, setActiveSkillGroup] = useState(skills[0])
  const [hoveredSkill, setHoveredSkill] = useState(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 400
    const height = container.clientHeight || 400

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 220

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Glowing Cybernetic Sphere
    const geometry = new THREE.IcosahedronGeometry(75, 3)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d6ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const sphere = new THREE.Mesh(geometry, wireframeMaterial)
    scene.add(sphere)

    // Inner Glow Core
    const coreGeometry = new THREE.SphereGeometry(68, 32, 32)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0050ff,
      transparent: true,
      opacity: 0.08,
    })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(coreMesh)

    // Pulsing Particles Outer Atmosphere
    const particlesCount = 350
    const positions = new Float32Array(particlesCount * 3)
    const scales = new Float32Array(particlesCount)

    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 78 + Math.random() * 8

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      scales[i] = Math.random() * 2 + 1
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 2.2,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // Animation Loop
    let animationFrameId
    const animate = () => {
      sphere.rotation.y += 0.003
      sphere.rotation.x += 0.001
      particleSystem.rotation.y += 0.002
      particleSystem.rotation.x -= 0.001

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      wireframeMaterial.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full rounded-3xl bg-[#050505] border border-white/10 p-6 sm:p-10 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3D WebGL Globe Container */}
      <div className="relative w-full lg:w-1/2 h-[320px] sm:h-[400px] flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Skill Pulse Nodes */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-72 h-72 rounded-full border border-cyan-500/20 animate-ping opacity-25" />
        </div>
      </div>

      {/* Skill Categories & Interactive Matrix */}
      <div className="w-full lg:w-1/2 space-y-6 z-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
            3D GLOBE PULSE // NETWORK MATRIX
          </span>
          <h3 className="text-2xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            FULL-STACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CAPABILITIES</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light mt-2 leading-relaxed">
            Click stack domains to pulse network nodes and view technology proficiencies.
          </p>
        </div>

        {/* Skill Category Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((group) => (
            <button
              key={group.title}
              onClick={() => setActiveSkillGroup(group)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeSkillGroup.title === group.title
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>

        {/* Active Category Skill Badges Grid */}
        <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-white/10 space-y-3">
          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            {activeSkillGroup.title} STACK NODES ({activeSkillGroup.items.length})
          </h4>

          <div className="flex flex-wrap gap-2">
            {activeSkillGroup.items.map((skill) => (
              <span
                key={skill}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-sm cursor-pointer transition-colors hover:bg-cyan-500/20 hover:border-cyan-400"
              >
                {skill}
              </span>
            ))}
          </div>

          {hoveredSkill && (
            <p className="text-[11px] font-mono text-white/50 pt-2 border-t border-white/5 animate-fade-in">
              Active Node: <span className="text-white font-semibold">{hoveredSkill}</span> · Production Ready
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
