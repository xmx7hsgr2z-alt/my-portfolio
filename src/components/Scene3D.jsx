import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose()
    }

    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose())
      } else {
        child.material.dispose()
      }
    }
  })
}

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.8, 8)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const root = new THREE.Group()
    root.position.set(1.4, 0.1, 0)
    scene.add(root)

    const ambient = new THREE.HemisphereLight(0xffffff, 0x314b4a, 2.4)
    const key = new THREE.PointLight(0xff765f, 34, 18)
    key.position.set(-4, 4, 7)
    const fill = new THREE.PointLight(0x1e9186, 24, 16)
    fill.position.set(5, -2, 5)
    scene.add(ambient, key, fill)

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e9186,
      roughness: 0.44,
      metalness: 0.18,
      clearcoat: 0.7,
      clearcoatRoughness: 0.22,
    })
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 1),
      coreMaterial,
    )
    root.add(core)

    const edgeLines = new THREE.LineSegments(
      new THREE.EdgesGeometry(core.geometry),
      new THREE.LineBasicMaterial({
        color: 0xffd166,
        transparent: true,
        opacity: 0.68,
      }),
    )
    root.add(edgeLines)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x151718,
      transparent: true,
      opacity: 0.32,
    })

    const rings = [
      [2.25, 0.018, 0.38],
      [2.78, 0.014, -0.24],
      [3.18, 0.012, 0.08],
    ].map(([radius, tube, tilt]) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 12, 128),
        ringMaterial.clone(),
      )
      ring.rotation.set(Math.PI / 2 + tilt, tilt, 0.1)
      root.add(ring)
      return ring
    })

    const satelliteMaterial = new THREE.MeshStandardMaterial({
      color: 0xf26a4f,
      roughness: 0.52,
      metalness: 0.1,
    })

    const satellites = Array.from({ length: 12 }, (_, index) => {
      const size = 0.14 + (index % 3) * 0.035
      const geometry =
        index % 2 === 0
          ? new THREE.BoxGeometry(size, size, size)
          : new THREE.TetrahedronGeometry(size * 0.75)
      const mesh = new THREE.Mesh(geometry, satelliteMaterial.clone())
      const angle = (index / 12) * Math.PI * 2
      const radius = 2.35 + (index % 4) * 0.32
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(index * 1.7) * 0.9,
        Math.sin(angle) * radius * 0.42,
      )
      root.add(mesh)
      return { mesh, angle, radius, speed: 0.16 + index * 0.008 }
    })

    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 170
    const positions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 4 + Math.random() * 4.8
      const angle = Math.random() * Math.PI * 2
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = (Math.random() - 0.5) * 5.2
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.58
    }
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    )
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x4b5258,
        size: 0.025,
        transparent: true,
        opacity: 0.45,
      }),
    )
    scene.add(particles)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.55
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.45
    }

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height || 1
      camera.updateProjectionMatrix()

      const compact = width < 760
      root.position.x = compact ? 0 : 1.45
      root.position.y = compact ? -2.05 : 0.05
      root.scale.setScalar(compact ? 0.42 : 1)
    }

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        target.x += (pointer.x - target.x) * 0.04
        target.y += (pointer.y - target.y) * 0.04
        root.rotation.y = elapsed * 0.16 + target.x
        root.rotation.x = Math.sin(elapsed * 0.34) * 0.12 + target.y
        core.rotation.y = elapsed * 0.18
        edgeLines.rotation.y = -elapsed * 0.12
        particles.rotation.y = elapsed * 0.018

        rings.forEach((ring, index) => {
          ring.rotation.z = elapsed * (0.08 + index * 0.025)
        })

        satellites.forEach((item, index) => {
          const angle = item.angle + elapsed * item.speed
          item.mesh.position.x = Math.cos(angle) * item.radius
          item.mesh.position.z = Math.sin(angle) * item.radius * 0.42
          item.mesh.rotation.x = elapsed * 0.45 + index
          item.mesh.rotation.y = elapsed * 0.32 + index
        })
      }

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      disposeObject(scene)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="scene3d" ref={mountRef} aria-hidden="true" />
}
