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
  const displayedFrameRef = useRef(1)
  const targetFrameRef = useRef(1)
  const animFrameIdRef = useRef(null)
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

  // Preload Images Aggressively for Maximum Smoothness
  useEffect(() => {
    let isMounted = true
    const imagesMap = imagesRef.current

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

    // Step 1: Preload key milestone frames first to make scene responsive instantly
    const keyFrames = []
    const step = isMobile ? priorityStep * 2 : priorityStep
    for (let i = 1; i <= frameCount; i += step) {
      keyFrames.push(i)
    }
    if (!keyFrames.includes(frameCount)) keyFrames.push(frameCount)

    Promise.all(keyFrames.map(loadSingleFrame)).then(() => {
      if (!isMounted) return

      // Step 2: Stream-load ALL remaining frames in high-concurrency batches
      const remainingFrames = []
      for (let i = 1; i <= frameCount; i++) {
        if (!imagesMap.has(i)) remainingFrames.push(i)
      }

      const loadNextBatch = (startIndex) => {
        if (!isMounted || startIndex >= remainingFrames.length) return
        const batchSize = isMobile ? 6 : 12
        const batch = remainingFrames.slice(startIndex, startIndex + batchSize)
        Promise.all(batch.map(loadSingleFrame)).then(() => {
          if (isMounted) {
            setTimeout(() => loadNextBatch(startIndex + batch.length), 20)
          }
        })
      }

      loadNextBatch(0)
    })

    return () => {
      isMounted = false
    }
  }, [folder, frameCount, priorityStep, isMobile])

  const drawFrame = (primaryIndex, exactFloatIndex = null) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth
    const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight
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
    let imgToDraw = imagesMap.get(primaryIndex)

    // Fallback to closest available frame if primary is missing
    if (!imgToDraw) {
      let minDelta = Infinity
      for (const [idx, img] of imagesMap.entries()) {
        const delta = Math.abs(idx - primaryIndex)
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

      // Sub-frame motion crossfade blending for liquid smooth playback
      if (exactFloatIndex !== null && !isMobile) {
        const floorFrame = Math.floor(exactFloatIndex)
        const ceilFrame = Math.ceil(exactFloatIndex)
        const fraction = exactFloatIndex - floorFrame

        const floorImg = imagesMap.get(floorFrame)
        const ceilImg = imagesMap.get(ceilFrame)

        if (floorImg && ceilImg && floorFrame !== ceilFrame && fraction > 0.08 && fraction < 0.92) {
          ctx.globalAlpha = 1
          ctx.drawImage(floorImg, offsetX, offsetY, drawWidth, drawHeight)

          ctx.globalAlpha = fraction
          ctx.drawImage(ceilImg, offsetX, offsetY, drawWidth, drawHeight)
          ctx.globalAlpha = 1
        } else {
          ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight)
        }
      } else {
        ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight)
      }

      if (overlayOpacity > 0) {
        ctx.fillStyle = `rgba(5, 5, 5, ${overlayOpacity})`
        ctx.fillRect(0, 0, containerWidth, containerHeight)
      }
    }

    ctx.restore()
  }

  // Update target frame float whenever progress prop changes
  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    targetFrameRef.current = 1 + clampedProgress * (frameCount - 1)
  }, [progress, frameCount])

  // Continuous RAF loop for physics-based frame lerp interpolation
  useEffect(() => {
    let running = true

    const loop = () => {
      if (!running) return

      const target = targetFrameRef.current
      const current = displayedFrameRef.current
      const diff = target - current

      // Smooth exponential lerp
      const lerpSpeed = isMobile ? 0.22 : 0.16
      if (Math.abs(diff) > 0.001) {
        displayedFrameRef.current += diff * lerpSpeed
      } else {
        displayedFrameRef.current = target
      }

      const frameToDraw = Math.max(1, Math.min(frameCount, Math.round(displayedFrameRef.current)))
      drawFrame(frameToDraw, displayedFrameRef.current)

      animFrameIdRef.current = requestAnimationFrame(loop)
    }

    animFrameIdRef.current = requestAnimationFrame(loop)

    return () => {
      running = false
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [frameCount, overlayOpacity, objectFit, isFirstFrameLoaded, isMobile])

  useEffect(() => {
    const handleResize = () => {
      const frameToDraw = Math.max(1, Math.min(frameCount, Math.round(displayedFrameRef.current)))
      drawFrame(frameToDraw, displayedFrameRef.current)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [frameCount])

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
