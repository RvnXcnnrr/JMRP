type FooterProps = {
  quickLinks: { href: string; label: string }[]
}

export function Footer({ quickLinks }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-10 backdrop-blur dark:border-white/10 dark:bg-slate-950/25">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Portfolio</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Built for internships, job applications, and freelance work.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {quickLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-slate-300 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-slate-500 dark:text-slate-400">Responsive • Accessible • Fast</p>
        </div>
      </div>
    </footer>
  )
}
