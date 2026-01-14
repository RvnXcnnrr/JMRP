import { useMemo, useState } from 'react'
import { Card } from './components/Card'
import { Chip } from './components/Chip'
import { Avatar } from './components/Avatar'
import { CertificationCard } from './components/CertificationCard'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ProjectCard } from './components/ProjectCard'
import { SectionHeader } from './components/SectionHeader'
import { ToolIcon } from './components/ToolIcon'
import { profile } from './data/profile'
import { certifications, experience, projects, skillGroups } from './data/portfolio'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useParallaxTilt } from './hooks/useParallaxTilt'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  useScrollReveal()
  const profileTiltRef = useParallaxTilt({ maxTiltDeg: 5, perspectivePx: 900 })

  const links = useMemo(
    () => [
      { href: '#home', label: 'Home' },
      { href: '#about', label: 'About' },
      { href: '#skills', label: 'Skills' },
      { href: '#certifications', label: 'Certifications' },
      { href: '#projects', label: 'Projects' },
      { href: '#experience', label: 'Experience' },
      { href: '#contact', label: 'Contact' },
    ],
    [],
  )

  const [contactStatus, setContactStatus] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-slate-900/0 blur-3xl dark:from-sky-500/20 dark:via-indigo-500/10" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-slate-900/0 blur-3xl dark:from-indigo-500/14" />
      </div>

      <Navbar
        links={links}
        onToggleTheme={toggleTheme}
        themeLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      />

      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-4 sm:px-6">
        <section id="home" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p
                className="hero-intro inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                style={{ transitionDelay: '40ms' }}
                data-reveal
              >
                <span className="relative inline-flex h-2 w-2">
                  <span
                    aria-hidden="true"
                    className="pulse-soft absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/60 to-indigo-500/60"
                  />
                  <span
                    aria-hidden="true"
                    className="relative h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                  />
                </span>
                Open to internships • OJT • freelance
              </p>

              <h1
                className="hero-intro mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl"
                style={{ transitionDelay: '120ms' }}
                data-reveal
              >
                {profile.name}
              </h1>
              <p
                className="hero-intro mt-3 text-base font-semibold text-slate-700 dark:text-slate-200 sm:text-lg"
                style={{ transitionDelay: '200ms' }}
                data-reveal
              >
                {profile.role} • <span className="text-indigo-600 dark:text-indigo-300">{profile.focus}</span>
              </p>
              <p
                className="hero-intro mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300"
                style={{ transitionDelay: '280ms' }}
                data-reveal
              >
                {profile.tagline}
              </p>

              <div className="hero-intro mt-7 flex flex-wrap gap-3" style={{ transitionDelay: '360ms' }} data-reveal>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  View Projects
                </a>

                <a
                  href={profile.resumeSrc}
                  download
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                >
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                >
                  Contact Me
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2" aria-label="Highlights">
                <span className="hero-intro" style={{ transitionDelay: '440ms' }} data-reveal>
                  <Chip>{profile.location}</Chip>
                </span>
                <span className="hero-intro" style={{ transitionDelay: '500ms' }} data-reveal>
                  <Chip>IoT programming</Chip>
                </span>
                <span className="hero-intro" style={{ transitionDelay: '560ms' }} data-reveal>
                  <Chip>Backend APIs</Chip>
                </span>
                <span className="hero-intro" style={{ transitionDelay: '620ms' }} data-reveal>
                  <Chip>System administration</Chip>
                </span>
                <span className="hero-intro" style={{ transitionDelay: '680ms' }} data-reveal>
                  <Chip>Troubleshooting</Chip>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="hero-intro" style={{ transitionDelay: '240ms' }} data-reveal>
                <div className="animate-hero-float">
                  <div ref={profileTiltRef} className="tilt-card">
                    <Card className="relative p-0">
                      <div
                        aria-hidden="true"
                        className="hero-glow pointer-events-none absolute -inset-10 -z-10 rounded-[28px] bg-gradient-to-br from-sky-500/15 via-indigo-500/12 to-transparent blur-2xl dark:from-sky-500/18 dark:via-indigo-500/12"
                      />

                      <div className="rounded-2xl p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative">
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-transparent blur-xl"
                            />
                            <div className="sm:hidden">
                              <Avatar name={profile.name} src={profile.avatarSrc} priority size={176} />
                            </div>
                            <div className="hidden sm:block lg:hidden">
                              <Avatar name={profile.name} src={profile.avatarSrc} priority size={208} />
                            </div>
                            <div className="hidden lg:block">
                              <Avatar name={profile.name} src={profile.avatarSrc} priority size={240} />
                            </div>
                          </div>

                          <p className="mt-5 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                            {profile.name}
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                            {profile.role}
                          </p>
                          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{profile.focus}</p>
                        </div>

                        <div className="mt-4 grid gap-3">
                          <div
                            data-reveal
                            className="rounded-xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                              Focus
                            </p>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                              IoT programming, backend APIs, and system administration with practical troubleshooting.
                            </p>
                          </div>
                          <div
                            data-reveal
                            className="rounded-xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                              What I value
                            </p>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                              Maintainability, accessibility, and a professional finish that ships.
                            </p>
                          </div>
                          <div
                            data-reveal
                            className="rounded-xl border border-slate-200 bg-white/90 p-4 dark:border-white/10 dark:bg-white/5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                              Availability
                            </p>
                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                              Part-time • remote-friendly • project-based
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal>
            <SectionHeader
              eyebrow="About"
              title="BSIT student focused on IoT and systems"
              subtitle="BSIT 4th Year student focused on IoT, backend systems, and practical IT support."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Card>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    I enjoy solving real problems with technology—connecting devices, moving data safely, and keeping systems stable.
                    My work is backend-first and practical, with a clean, minimal UI when needed.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    I’m currently looking for an OJT/internship where I can contribute, learn fast, and grow into an IoT/backend/systems role.
                  </p>
                </Card>
              </div>

              <div className="lg:col-span-5">
                <Card>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">What you can expect</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                      <span>Clear communication, documentation, and a professional work ethic.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                      <span>Backend-first thinking: reliable APIs, data flow, and security basics.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                      <span>Hands-on troubleshooting from hardware/software to networking basics.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal>
            <SectionHeader
              eyebrow="Skills"
              title="Tools I use to build"
              subtitle="A balanced stack for product-grade web apps and IoT prototypes—organized by focus area."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {skillGroups.map((g) => {
                const accent =
                  g.title === 'IoT Programming'
                    ? 'from-sky-500/20 via-indigo-500/10 to-transparent'
                    : g.title === 'Backend'
                      ? 'from-indigo-500/20 via-sky-500/10 to-transparent'
                      : g.title === 'System Administration'
                        ? 'from-slate-500/20 via-indigo-500/10 to-transparent'
                        : g.title === 'Tools & Technologies'
                          ? 'from-sky-500/15 via-slate-500/10 to-transparent'
                          : 'from-indigo-500/15 via-sky-500/10 to-transparent'

                const chipClassName =
                  g.title === 'IoT Programming'
                    ? 'border-sky-300/70 bg-gradient-to-r from-sky-500/20 to-indigo-500/10 text-sky-900 hover:from-sky-500/30 hover:to-indigo-500/15 hover:border-sky-300 dark:border-sky-400/35 dark:from-sky-400/25 dark:to-indigo-400/15 dark:text-sky-100 dark:hover:from-sky-400/35 dark:hover:to-indigo-400/20'
                    : g.title === 'Backend'
                      ? 'border-indigo-300/70 bg-gradient-to-r from-indigo-500/20 to-sky-500/10 text-indigo-900 hover:from-indigo-500/30 hover:to-sky-500/15 hover:border-indigo-300 dark:border-indigo-400/35 dark:from-indigo-400/25 dark:to-sky-400/15 dark:text-indigo-100 dark:hover:from-indigo-400/35 dark:hover:to-sky-400/20'
                      : g.title === 'System Administration'
                        ? 'border-slate-300/70 bg-gradient-to-r from-slate-500/15 to-indigo-500/10 text-slate-900 hover:from-slate-500/22 hover:to-indigo-500/15 hover:border-slate-300 dark:border-white/16 dark:from-slate-400/18 dark:to-indigo-400/14 dark:text-slate-100 dark:hover:from-slate-400/26 dark:hover:to-indigo-400/18'
                        : g.title === 'Tools & Technologies'
                          ? 'border-sky-300/60 bg-gradient-to-r from-sky-500/15 to-slate-500/10 text-slate-900 hover:from-sky-500/22 hover:to-slate-500/14 hover:border-sky-300 dark:border-white/14 dark:from-sky-400/18 dark:to-slate-400/12 dark:text-slate-100 dark:hover:from-sky-400/26 dark:hover:to-slate-400/16'
                          : 'border-indigo-300/60 bg-gradient-to-r from-indigo-500/15 to-slate-500/10 text-slate-900 hover:from-indigo-500/22 hover:to-slate-500/14 hover:border-indigo-300 dark:border-white/14 dark:from-indigo-400/18 dark:to-slate-400/12 dark:text-slate-100 dark:hover:from-indigo-400/26 dark:hover:to-slate-400/16'

                return (
                  <Card
                    key={g.title}
                    className="group relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div
                      aria-hidden="true"
                      className={
                        'pointer-events-none absolute -inset-16 -z-10 bg-gradient-to-br blur-2xl transition-opacity duration-300 opacity-70 group-hover:opacity-100 ' +
                        accent
                      }
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/5 transition-colors duration-300 group-hover:ring-indigo-500/20 dark:ring-white/10 dark:group-hover:ring-indigo-400/20"
                    />

                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{g.title}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <Chip key={it} className={chipClassName} startIcon={<ToolIcon label={it} />}>
                          {it}
                        </Chip>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal>
            <SectionHeader
              eyebrow="Projects"
              title="Selected work"
              subtitle="Production-minded projects with clean UI, solid architecture, and real-world constraints."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {projects.map((p, i) => (
                <div key={p.title} className="h-full" data-reveal>
                  <ProjectCard project={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal>
            <SectionHeader
              eyebrow="Credentials & training"
              title="Credentials & training"
              subtitle="Available upon request."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {certifications.map((c) => (
                <div key={c.title} data-reveal>
                  <CertificationCard cert={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal>
            <SectionHeader
              eyebrow="Experience"
              title="Practical work & current status"
              subtitle="Hands-on technician experience plus my current availability as an undergraduate seeking OJT/internship placement."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {experience.map((e) => (
                <Card key={e.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-base font-semibold text-slate-900 dark:text-slate-50">{e.title}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {e.period}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{e.org}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {e.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
          <div data-reveal>
            <SectionHeader
              eyebrow="Contact"
              title="Let’s build something"
              subtitle="Send a message, share a project idea, or ask for my CV—happy to connect."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Card>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const data = new FormData(form)
                      const name = String(data.get('name') ?? '').trim()
                      const email = String(data.get('email') ?? '').trim()
                      const message = String(data.get('message') ?? '').trim()

                      const subject = encodeURIComponent(`Portfolio contact from ${name || 'visitor'}`)
                      const body = encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
                      )

                      setContactStatus('Opening your email client…')
                      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
                      window.setTimeout(() => setContactStatus(null), 2500)
                    }}
                  >
                    <noscript>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        JavaScript is required for the prefilled message. You can email me directly at{' '}
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-semibold text-slate-700 underline underline-offset-4 dark:text-slate-200"
                        >
                          {profile.email}
                        </a>
                        .
                      </p>
                    </noscript>
                    <div className="grid gap-1.5">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="h-11 rounded-xl border border-slate-200 bg-white/85 px-4 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="h-11 rounded-xl border border-slate-200 bg-white/85 px-4 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="grid gap-1.5">
                      <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="resize-none rounded-xl border border-slate-200 bg-white/85 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                        placeholder="Tell me about your project, timeline, and goals…"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                        >
                          Send Message
                        </button>

                        <a
                          href={`mailto:${profile.email}`}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                        >
                          Email directly
                        </a>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
                        {contactStatus}
                      </p>
                    </div>
                  </form>
                </Card>
              </div>

              <div className="lg:col-span-5">
                <Card>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Social</p>
                  <div className="mt-4 grid gap-3">
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 dark:hover:border-white/20"
                    >
                      GitHub
                      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{profile.socials.github}</span>
                    </a>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 dark:hover:border-white/20"
                    >
                      LinkedIn
                      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                        {profile.socials.linkedin}
                      </span>
                    </a>
                    <a
                      href={profile.socials.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 dark:hover:border-white/20"
                    >
                      Facebook
                      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                        {profile.socials.facebook}
                      </span>
                    </a>
                    <a
                      href={`mailto:${profile.email}`}
                      className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10 dark:hover:border-white/20"
                    >
                      Email
                      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{profile.email}</span>
                    </a>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-4 dark:border-white/10">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Prefer a quick message?</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Use the form to open a prefilled email, or message me on LinkedIn.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        quickLinks={[{ href: '#home', label: 'Home' }, ...links]}
        socialLinks={[
          { href: profile.socials.github, label: 'GitHub' },
          { href: profile.socials.linkedin, label: 'LinkedIn' },
          { href: profile.socials.facebook, label: 'Facebook' },
          { href: `mailto:${profile.email}`, label: 'Email' },
        ]}
      />
    </div>
  )
}

export default App
