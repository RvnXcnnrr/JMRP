import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
        el.classList.add('is-visible')
      }
      return
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])
}
