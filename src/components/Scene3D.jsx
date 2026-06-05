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

function makeArc(index) {
  const points = Array.from({ length: 44 }, (_, pointIndex) => {
    const progress = pointIndex / 43
    const angle = progress * Math.PI * 2.2 + index * 0.7
    const radius = 2.8 + Math.sin(progress * Math.PI * 3 + index) * 0.38
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      (progress - 0.5) * 3.4 + Math.sin(angle * 1.6) * 0.25,
      Math.sin(angle) * 0.9,
    )
  })

  return new THREE.CatmullRomCurve3(points)
}

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0.35, 9)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0xffffff, 0)
    mount.appendChild(renderer.domElement)

    const root = new THREE.Group()
    root.position.set(0.8, -0.22, 0)
    root.rotation.set(-0.35, 0.42, -0.18)
    root.scale.setScalar(1.18)
    scene.add(root)

    const ambient = new THREE.HemisphereLight(0xffffff, 0xdfe4ee, 3.2)
    const key = new THREE.DirectionalLight(0xffffff, 3.4)
    key.position.set(-4, 6, 5)
    const fill = new THREE.PointLight(0xdde2ee, 12, 18)
    fill.position.set(4, -3, 5)
    scene.add(ambient, key, fill)

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf1f2f5,
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.64,
    })

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 2), glassMaterial)
    root.add(core)

    const edgeLines = new THREE.LineSegments(
      new THREE.EdgesGeometry(core.geometry),
      new THREE.LineBasicMaterial({
        color: 0xcfd3dd,
        transparent: true,
        opacity: 0.34,
      }),
    )
    root.add(edgeLines)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8dbe4,
      transparent: true,
      opacity: 0.28,
    })

    const rings = [
      [2.45, 0.018, 0.32],
      [3.05, 0.014, -0.2],
      [3.5, 0.012, 0.12],
    ].map(([radius, tube, tilt], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 16, 160),
        ringMaterial.clone(),
      )
      ring.rotation.set(Math.PI / 2 + tilt, tilt, index * 0.25)
      root.add(ring)
      return ring
    })

    const arcMaterial = new THREE.MeshBasicMaterial({
      color: 0xe7e3dc,
      transparent: true,
      opacity: 0.34,
    })

    const arcs = Array.from({ length: 4 }, (_, index) => {
      const arc = new THREE.Mesh(
        new THREE.TubeGeometry(makeArc(index), 120, 0.012 + index * 0.002, 10, false),
        arcMaterial.clone(),
      )
      arc.rotation.z = index * 0.34
      root.add(arc)
      return arc
    })

    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 140
    const positions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 4 + Math.random() * 5.2
      const angle = Math.random() * Math.PI * 2
      positions[index * 3] = Math.cos(angle) * radius
      positions[index * 3 + 1] = (Math.random() - 0.5) * 5.4
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.55
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xd7d9e1,
        size: 0.028,
        transparent: true,
        opacity: 0.46,
      }),
    )
    scene.add(particles)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0, scroll: 0 }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let baseY = -0.22

    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.42
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.32
    }

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height || 1
      camera.updateProjectionMatrix()

      const compact = width < 760
      root.position.x = compact ? 0.15 : 0.78
      baseY = compact ? -0.8 : -0.22
      root.position.y = baseY
      root.scale.setScalar(compact ? 0.72 : 1.18)
    }

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        target.x += (pointer.x - target.x) * 0.04
        target.y += (pointer.y - target.y) * 0.04
        target.scroll += (window.scrollY - target.scroll) * 0.035

        const scrollLift = Math.min(target.scroll / 900, 1)
        root.rotation.y = 0.42 + elapsed * 0.08 + target.x + scrollLift * 0.28
        root.rotation.x = -0.35 + Math.sin(elapsed * 0.22) * 0.08 + target.y
        root.rotation.z = -0.18 + scrollLift * 0.18
        root.position.y = baseY + Math.sin(elapsed * 0.32) * 0.08

        core.rotation.y = elapsed * 0.12
        edgeLines.rotation.y = -elapsed * 0.09
        particles.rotation.y = elapsed * 0.012

        rings.forEach((ring, index) => {
          ring.rotation.z = elapsed * (0.05 + index * 0.018)
        })

        arcs.forEach((arc, index) => {
          arc.rotation.y = Math.sin(elapsed * 0.18 + index) * 0.18
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
