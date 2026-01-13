import { useEffect, useRef } from 'react'

type ParallaxTiltOptions = {
  maxTiltDeg?: number
  perspectivePx?: number
  disabled?: boolean
}

export function useParallaxTilt(options: ParallaxTiltOptions = {}) {
  const { maxTiltDeg = 5, perspectivePx = 900, disabled = false } = options
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (disabled || prefersReducedMotion) return

    let raf = 0
    let lastX = 0
    let lastY = 0

    const apply = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const px = (lastX - rect.left) / rect.width
      const py = (lastY - rect.top) / rect.height

      const dx = px - 0.5
      const dy = py - 0.5

      const rx = (-dy * maxTiltDeg).toFixed(3)
      const ry = (dx * maxTiltDeg).toFixed(3)

      el.style.transform = `perspective(${perspectivePx}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
    }

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (raf) return
      raf = window.requestAnimationFrame(apply)
    }

    const onLeave = () => {
      if (raf) {
        window.cancelAnimationFrame(raf)
        raf = 0
      }
      el.style.transform = `perspective(${perspectivePx}px) rotateX(0deg) rotateY(0deg) translateZ(0)`
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [maxTiltDeg, perspectivePx, disabled])

  return ref
}
