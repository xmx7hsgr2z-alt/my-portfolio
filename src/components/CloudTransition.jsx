import { useEffect, useState } from 'react'
import './CloudTransition.css'

export default function CloudTransition() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Start transition effect after 3 seconds
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true)
    }, 3000)

    // Start fading out after 4.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 4500)

    // Completely remove after fade animation completes (1.5s)
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    return () => {
      clearTimeout(transitionTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`cloud-transition ${isFadingOut ? 'is-fading-out' : ''} ${isTransitioning ? 'is-transitioning' : ''}`}>
      <div className="clouds-container">
        <div className="cloud-layer layer-1">
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </div>
        <div className="cloud-layer layer-2">
          <div className="cloud cloud-4" />
          <div className="cloud cloud-5" />
          <div className="cloud cloud-6" />
        </div>
        <div className="cloud-layer layer-3">
          <div className="cloud cloud-7" />
          <div className="cloud cloud-8" />
          <div className="cloud cloud-9" />
        </div>
      </div>
      <div className="transition-overlay">
        <div className="loading-bar">
          <div className="loading-progress" />
        </div>
      </div>
    </div>
  )
}
