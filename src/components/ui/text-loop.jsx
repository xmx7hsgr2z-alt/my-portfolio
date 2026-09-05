import { useState, useEffect, Children } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function TextLoop({
  children,
  className = '',
  interval = 3, // seconds per slide
  direction = 'up', // 'up' | 'down'
  transition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = Children.toArray(children)

  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval * 1000)

    return () => clearInterval(timer)
  }, [items.length, interval])

  const variants = {
    initial: {
      y: direction === 'up' ? 20 : -20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: direction === 'up' ? -20 : 20,
      opacity: 0,
    },
  }

  if (items.length === 0) return null

  return (
    <div className={`inline-block overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={transition}
          className="inline-block"
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TextLoop
