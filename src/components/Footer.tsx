type FooterProps = {
  quickLinks: { href: string; label: string }[]
  socialLinks?: { href: string; label: string }[]
}

export function Footer({ quickLinks, socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-10 backdrop-blur dark:border-white/10 dark:bg-[#0a0a0a]">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-16">
        <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Portfolio</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Built for internships, job applications, and freelance work.
            </p>
          </div>

          <div className="grid gap-4 sm:justify-items-end">
            <nav
              className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:justify-end sm:gap-x-5"
              aria-label="Footer"
            >
              {quickLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:text-slate-300 dark:hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {socialLinks && socialLinks.length > 0 ? (
              <nav
                className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:justify-end sm:gap-x-5"
                aria-label="Social"
              >
                {socialLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:text-slate-300 dark:hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-slate-500 dark:text-slate-400">Responsive • Accessible • Fast</p>
        </div>
      </div>
    </footer>
  )
}
