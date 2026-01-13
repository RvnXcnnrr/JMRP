import { useEffect, useMemo, useRef, useState } from 'react'

type NavLink = { href: string; label: string }

type NavbarProps = {
  links: NavLink[]
  resumeHref: string
  onToggleTheme: () => void
  themeLabel: string
}

export function Navbar({ links, resumeHref, onToggleTheme, themeLabel }: NavbarProps) {
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

      <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
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
                className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-slate-200 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}

            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            >
              Resume
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
              aria-label={themeLabel}
              title={themeLabel}
            >
              <span className="hidden sm:inline">Theme</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                  className="stroke-slate-700 dark:stroke-slate-200"
                  strokeWidth="2"
                />
                <path
                  d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64 4.22 4.22M19.78 19.78l-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42"
                  className="stroke-slate-700 dark:stroke-slate-200"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              ref={menuButtonRef}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d={open ? 'M18 6 6 18M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div className="md:hidden" id="mobile-menu" ref={mobilePanelRef}>
            <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
              <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
                <nav className="flex flex-col" aria-label="Mobile">
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noreferrer"
                    ref={firstMobileLinkRef}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-slate-100 dark:hover:bg-white/5"
                  >
                    Resume
                  </a>
                  {linkItems.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => {
                        if (scrollToHash(l.href)) e.preventDefault()
                        setOpen(false)
                      }}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
