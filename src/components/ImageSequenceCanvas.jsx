import { useEffect, useRef, useState } from 'react'

export default function ImageSequenceCanvas({
  folder = 'scene-1',
  frameCount = 300,
  progress = 0,
  fileNamePrefix = 'ezgif-frame-',
  fileNameDigits = 3,
  fileExtension = '.jpg',
  objectFit = 'cover',
  className = '',
  overlayOpacity = 0,
  priorityStep = 3,
}) {
  const canvasRef = useRef(null)
  const imagesRef = useRef(new Map())
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false)
  const currentFrameIndexRef = useRef(1)
  const [isMobile, setIsMobile] = useState(false)

  // Detect Mobile / Touch Screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getFramePath = (index) => {
    const padded = String(index).padStart(fileNameDigits, '0')
    const baseUrl = import.meta.env.BASE_URL || '/'
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
    return `${cleanBase}${folder}/${fileNamePrefix}${padded}${fileExtension}`
  }

  // Preload Images with Adaptive Step for Mobile vs Desktop
  useEffect(() => {
    let isMounted = true
    const imagesMap = imagesRef.current
    const effectiveStep = isMobile ? priorityStep * 2 : priorityStep

    const loadSingleFrame = (index) => {
      if (imagesMap.has(index)) return Promise.resolve(imagesMap.get(index))

      return new Promise((resolve) => {
        const img = new Image()
        const srcPath = getFramePath(index)

        img.onload = () => {
          if (isMounted) {
            imagesMap.set(index, img)
            if (index === 1) setIsFirstFrameLoaded(true)
          }
          resolve(img)
        }

        img.onerror = () => {
          resolve(null)
        }

        img.src = srcPath

        if (img.complete && img.naturalWidth > 0) {
          if (isMounted) {
            imagesMap.set(index, img)
            if (index === 1) setIsFirstFrameLoaded(true)
          }
          resolve(img)
        }
      })
    }

    // Key milestone frames
    const keyFrames = []
    for (let i = 1; i <= frameCount; i += effectiveStep) {
      keyFrames.push(i)
    }
    if (!keyFrames.includes(frameCount)) keyFrames.push(frameCount)

    Promise.all(keyFrames.map(loadSingleFrame)).then(() => {
      if (!isMounted) return

      const remainingFrames = []
      for (let i = 1; i <= frameCount; i++) {
        if (!imagesMap.has(i)) remainingFrames.push(i)
      }

      const loadNextBatch = (startIndex) => {
        if (!isMounted || startIndex >= remainingFrames.length) return
        const batchSize = isMobile ? effectiveStep * 2 : effectiveStep * 4
        const batch = remainingFrames.slice(startIndex, startIndex + batchSize)
        Promise.all(batch.map(loadSingleFrame)).then(() => {
          if (isMounted) {
            setTimeout(() => loadNextBatch(startIndex + batch.length), isMobile ? 80 : 40)
          }
        })
      }

      loadNextBatch(0)
    })

    return () => {
      isMounted = false
    }
  }, [folder, frameCount, priorityStep, isMobile])

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth
    const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight
    // Limit dpr to 1.5 on mobile to save GPU memory & boost fps
    const maxDpr = isMobile ? 1.5 : 2
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)

    const targetWidth = Math.round(containerWidth * dpr)
    const targetHeight = Math.round(containerHeight * dpr)

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth
      canvas.height = targetHeight
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const imagesMap = imagesRef.current
    let imgToDraw = imagesMap.get(frameIndex)

    // Fallback to closest available frame
    if (!imgToDraw) {
      let minDelta = Infinity
      for (const [idx, img] of imagesMap.entries()) {
        const delta = Math.abs(idx - frameIndex)
        if (delta < minDelta) {
          minDelta = delta
          imgToDraw = img
        }
      }
    }

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, containerWidth, containerHeight)

    if (imgToDraw && imgToDraw.naturalWidth > 0) {
      const imgWidth = imgToDraw.naturalWidth
      const imgHeight = imgToDraw.naturalHeight
      const containerRatio = containerWidth / containerHeight
      const imageRatio = imgWidth / imgHeight

      let drawWidth, drawHeight

      if (objectFit === 'cover') {
        if (containerRatio > imageRatio) {
          drawWidth = containerWidth
          drawHeight = containerWidth / imageRatio
        } else {
          drawHeight = containerHeight
          drawWidth = containerHeight * imageRatio
        }
      } else {
        if (containerRatio > imageRatio) {
          drawHeight = containerHeight
          drawWidth = containerHeight * imageRatio
        } else {
          drawWidth = containerWidth
          drawHeight = containerWidth / imageRatio
        }
      }

      const offsetX = (containerWidth - drawWidth) / 2
      const offsetY = (containerHeight - drawHeight) / 2

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = isMobile ? 'medium' : 'high'
      ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight)

      if (overlayOpacity > 0) {
        ctx.fillStyle = `rgba(5, 5, 5, ${overlayOpacity})`
        ctx.fillRect(0, 0, containerWidth, containerHeight)
      }
    }

    ctx.restore()
  }

  const displayedFrameRef = useRef(1)

  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    const targetFrame = Math.max(1, Math.min(frameCount, Math.round(1 + clampedProgress * (frameCount - 1))))
    currentFrameIndexRef.current = targetFrame

    let animationFrameId
    const render = () => {
      const diff = currentFrameIndexRef.current - displayedFrameRef.current
      if (Math.abs(diff) > 0.05) {
        displayedFrameRef.current += diff * 0.3
      } else {
        displayedFrameRef.current = currentFrameIndexRef.current
      }

      drawFrame(Math.round(displayedFrameRef.current))

      if (Math.abs(currentFrameIndexRef.current - displayedFrameRef.current) > 0.05) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [progress, frameCount, overlayOpacity, objectFit, isFirstFrameLoaded])

  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameIndexRef.current)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#050505] ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isFirstFrameLoaded ? 1 : 0 }}
      />

      {!isFirstFrameLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] text-white/50 space-y-3 p-4 text-center">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest font-mono">Initializing Visual Engine</span>
        </div>
      )}
    </div>
  )
}
