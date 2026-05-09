import { useEffect, useState } from 'react'
import './CloudTransition.css'

export default function CloudTransition() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [isOpening, setIsOpening] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (!isVisible) return undefined

    const openTimer = window.setTimeout(() => setIsOpening(true), 1700)
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 3900)
    const removeTimer = window.setTimeout(() => setIsVisible(false), 5200)

    return () => {
      window.clearTimeout(openTimer)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className={`cloud-transition ${isOpening ? 'is-opening' : ''} ${isLeaving ? 'is-leaving' : ''}`}
      aria-hidden="true"
    >
      <div className="cloud-sky" />
      <div className="cloud-light" />
      <div className="cloud-depth cloud-depth-back" />
      <div className="cloud-depth cloud-depth-mid" />

      <div className="cloud-curtain cloud-curtain-left">
        <span className="cloud-bank cloud-bank-1" />
        <span className="cloud-bank cloud-bank-2" />
        <span className="cloud-bank cloud-bank-3" />
        <span className="cloud-bank cloud-bank-4" />
      </div>

      <div className="cloud-curtain cloud-curtain-right">
        <span className="cloud-bank cloud-bank-5" />
        <span className="cloud-bank cloud-bank-6" />
        <span className="cloud-bank cloud-bank-7" />
        <span className="cloud-bank cloud-bank-8" />
      </div>

      <div className="cloud-depth cloud-depth-front" />
      <div className="cloud-flash" />
      <div className="cloud-grain" />

      <div className="cloud-letterbox cloud-letterbox-top" />
      <div className="cloud-letterbox cloud-letterbox-bottom" />

      <div className="cloud-loader">
        <span />
      </div>
    </div>
  )
}
