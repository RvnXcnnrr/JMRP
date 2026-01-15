import { useParallaxTilt } from '../hooks/useParallaxTilt'
import { profile } from '../data/profile'

const TAGS = ['IoT Programming', 'Backend APIs', 'System Admin'] as const

const NODES = [
  { top: '10%', left: '18%', size: 6, delayMs: 0 },
  { top: '22%', left: '74%', size: 8, delayMs: 450 },
  { top: '48%', left: '8%', size: 7, delayMs: 900 },
  { top: '62%', left: '88%', size: 6, delayMs: 250 },
  { top: '84%', left: '22%', size: 8, delayMs: 700 },
] as const

export function Hero() {
  const headshotTiltRef = useParallaxTilt({ maxTiltDeg: 6, perspectivePx: 1000 })

  return (
    <section
      id="home"
      tabIndex={-1}
      className="relative scroll-mt-24 overflow-hidden bg-white/70 px-4 py-14 backdrop-blur dark:bg-[#0a0a0a] sm:px-6 sm:py-18 lg:px-10 2xl:px-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/16 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/22 dark:via-blue-500/12" />
        <div className="absolute -bottom-24 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-blue-500/12 via-cyan-500/10 to-transparent blur-3xl dark:from-blue-500/16" />
        <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_55%_at_50%_40%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="hero-intro flex flex-wrap gap-2" style={{ transitionDelay: '60ms' }} data-reveal>
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-cyan-600/20 bg-white/70 px-3 py-1 text-xs font-medium text-cyan-700 shadow-sm backdrop-blur font-mono tracking-tight dark:border-cyan-400/25 dark:bg-white/5 dark:text-cyan-100/90"
                >
                  {t}
                </span>
              ))}
            </div>

            <p
              className="hero-intro mt-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl"
              style={{ transitionDelay: '140ms' }}
              data-reveal
            >
              Javy Malisud Rodillon
            </p>

            <h1
              className="hero-intro mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-5xl"
              style={{ transitionDelay: '220ms' }}
              data-reveal
            >
              Building Reliable IoT Systems &amp; Secure Backends.
            </h1>

            <p
              className="hero-intro mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-white/70 sm:text-lg"
              style={{ transitionDelay: '300ms' }}
              data-reveal
            >
              I bridge the gap between connected devices and stable infrastructure. Focused on maintainability, accessibility,
              and professional delivery. Also open for website and mobile app development commissions.
            </p>

            <div className="hero-intro mt-8 flex flex-wrap gap-3" style={{ transitionDelay: '380ms' }} data-reveal>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white hover:border-slate-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:border-white/20 dark:bg-white/0 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30"
              >
                Contact Me
              </a>

              <a
                href={profile.resumeSrc}
                download
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white hover:border-slate-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:border-white/20 dark:bg-white/0 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="hero-intro relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
              style={{ transitionDelay: '260ms' }}
              data-reveal
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/12" />
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(8,145,178,0.40),rgba(59,130,246,0.22),rgba(8,145,178,0.10))] opacity-25 blur-2xl dark:bg-[conic-gradient(from_180deg,rgba(34,211,238,0.45),rgba(59,130,246,0.25),rgba(34,211,238,0.10))]" />
                <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 dark:border-cyan-300/25" />
                <div className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/12 dark:border-blue-300/15" />

                {NODES.map((n, i) => (
                  <span
                    key={i}
                    className="absolute"
                    style={{ top: n.top, left: n.left, width: n.size, height: n.size }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-cyan-500/40 motion-safe:animate-ping dark:bg-cyan-300/50"
                      style={{ animationDelay: `${n.delayMs}ms` }}
                    />
                    <span aria-hidden="true" className="relative block h-full w-full rounded-full bg-cyan-600 dark:bg-cyan-200" />
                  </span>
                ))}
              </div>

              <div className="relative aspect-square">
                <div ref={headshotTiltRef} className="tilt-card h-full w-full">
                  <div className="relative h-full w-full rounded-full border border-slate-200 bg-white/80 p-2 shadow-[0_20px_60px_rgba(2,6,23,0.18)] dark:border-white/12 dark:bg-white/5 dark:shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
                    <img
                      src={profile.avatarSrc}
                      alt="Javy Malisud Rodillon headshot"
                      loading="eager"
                      decoding="async"
                      className="h-full w-full rounded-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-slate-900/5 dark:ring-white/10"
                    />
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/5 -translate-x-1/2 rounded-full bg-cyan-500/18 blur-2xl dark:bg-cyan-400/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
