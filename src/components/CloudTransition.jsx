import { useEffect, useState } from 'react'
import './CloudTransition.css'

export default function CloudTransition() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (!isVisible) return undefined

    const fadeTimer = window.setTimeout(() => setIsFading(true), 3300)
    const removeTimer = window.setTimeout(() => setIsVisible(false), 4700)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className={`cloud-transition ${isFading ? 'is-fading' : ''}`} aria-hidden="true">
      <video className="cloud-video" autoPlay muted playsInline loop preload="auto">
        <source src={`${import.meta.env.BASE_URL}clouds-intro.webm`} type="video/webm" />
      </video>
      <div className="cloud-vignette" />
      <div className="cloud-glow" />
      <div className="cloud-mist" />

      <div className="cloud-loader">
        <span />
      </div>
    </div>
  )
}
