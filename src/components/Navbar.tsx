import { useEffect, useMemo, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'

type NavLink = { href: string; label: string }
type Theme = 'light' | 'dark'

type NavbarProps = {
  links: NavLink[]
  onToggleTheme: () => void
  themeLabel: string
  theme: Theme
}

export function Navbar({ links, onToggleTheme, themeLabel, theme }: NavbarProps) {
  const [open, setOpen] = useState(false)

  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobilePanelRef = useRef<HTMLDivElement | null>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null)

  const linkItems = useMemo(() => links, [links])

  const scrollToHash = (href: string) => {
    if (!href.startsWith('#')) return false
    const target = document.querySelector<HTMLElement>(href)
    if (!target) return false

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scroll on the next frame to avoid layout timing issues.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    })

    // Keep keyboard users oriented by moving focus *after* scrolling.
    // Focusing immediately can cause an instant jump in some browsers.
    const focusDelayMs = prefersReducedMotion ? 0 : 450
    window.setTimeout(() => {
      try {
        target.focus({ preventScroll: true })
      } catch {
        // noop
      }
    }, focusDelayMs)

    // Preserve URL hash without relying on default anchor jump.
    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState(null, '', href)
    }

    return true
  }

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }

      if (e.key !== 'Tab') return
      const panel = mobilePanelRef.current
      if (!panel) return

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')

      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (open) {
      firstMobileLinkRef.current?.focus()
      return
    }

    menuButtonRef.current?.focus()
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:ring-white/10"
      >
        Skip to content
      </a>

      <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#0a0a0a]/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#home" className="group inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 ring-1 ring-slate-200 dark:ring-white/10">
              <span className="text-[11px] font-semibold tracking-wide text-slate-800 dark:text-slate-100">
                JMRP
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {linkItems.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  if (scrollToHash(l.href)) e.preventDefault()
                }}
                className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:text-slate-200 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
              aria-label={themeLabel}
              title={themeLabel}
            >
              <span className="hidden sm:inline">Theme</span>
              {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              ref={menuButtonRef}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={
          'md:hidden fixed inset-0 z-50 transition ' +
          (open ? 'pointer-events-auto' : 'pointer-events-none')
        }
        aria-hidden={open ? undefined : true}
      >
        <div
          className={
            'absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ' +
            (open ? 'opacity-100' : 'opacity-0')
          }
          onClick={() => setOpen(false)}
        />

        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          className={
            'absolute right-0 top-0 h-full w-[min(340px,86vw)] border-l border-slate-200 bg-white/90 p-4 shadow-2xl transition-transform duration-300 dark:border-white/10 dark:bg-[#0a0a0a]/90 ' +
            (open ? 'translate-x-0' : 'translate-x-full')
          }
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Navigation</p>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-4 flex flex-col" aria-label="Mobile">
            {linkItems.map((l, idx) => (
              <a
                key={l.href}
                href={l.href}
                ref={idx === 0 ? firstMobileLinkRef : undefined}
                onClick={(e) => {
                  if (scrollToHash(l.href)) e.preventDefault()
                  setOpen(false)
                }}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:text-slate-200 dark:hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-6">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
              Toggle theme
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
