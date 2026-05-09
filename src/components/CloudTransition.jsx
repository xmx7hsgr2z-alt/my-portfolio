import { useEffect, useState } from 'react'
import './CloudTransition.css'

const youtubeIntroUrl =
  'https://www.youtube-nocookie.com/embed/PeY9pWJ2Mbk?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=PeY9pWJ2Mbk&start=0'

export default function CloudTransition() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (!isVisible) return undefined

    const fadeTimer = window.setTimeout(() => setIsFading(true), 5200)
    const removeTimer = window.setTimeout(() => setIsVisible(false), 6600)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className={`cloud-transition ${isFading ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="cloud-video-wrap">
        <iframe
          className="cloud-video"
          src={youtubeIntroUrl}
          title="Intro transition video"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="cloud-vignette" />
      <div className="cloud-glow" />
      <div className="cloud-mist" />

      <div className="cloud-loader">
        <span />
      </div>
    </div>
  )
}
