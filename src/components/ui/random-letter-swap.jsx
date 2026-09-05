import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

export function RandomLetterSwap({
  label = '',
  className = '',
  transition = { duration: 0.6, type: 'spring' },
  onClick,
  href,
}) {
  const [displayText, setDisplayText] = useState(label)
  const [isHovered, setIsHovered] = useState(false)

  const triggerAnimation = useCallback(() => {
    let iteration = 0
    const maxIterations = label.length * 3
    const interval = setInterval(() => {
      const animated = label
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '—' || char === '·') return char
          if (index < iteration / 3) {
            return label[index]
          }
          return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
        })
        .join('')

      setDisplayText(animated)

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(label)
      }
      iteration += 1
    }, 25)

    return () => clearInterval(interval)
  }, [label])

  useEffect(() => {
    if (isHovered) {
      const cleanup = triggerAnimation()
      return cleanup
    }
  }, [isHovered, triggerAnimation])

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setDisplayText(label)
      }}
      className={`inline-block font-mono tracking-wider transition-colors duration-200 select-none ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={transition}
    >
      {displayText}
    </Component>
  )
}

export default RandomLetterSwap
