type TagProps = { children: string }

function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
      {children}
    </span>
  )
}

type ActionButtonProps = {
  href: string
  children: string
  variant: 'primary' | 'secondary'
}

function ActionButton({ href, children, variant }: ActionButtonProps) {
  const className =
    variant === 'primary'
      ? 'inline-flex items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400'
      : 'inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white hover:border-slate-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.99] motion-safe:hover:scale-[1.02] dark:border-white/20 dark:bg-white/0 dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30'

  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className={className}>
      {children}
    </a>
  )
}

export function ProjectsSection() {
  const smarTanomImage = '/assets/projects/smartanom.jpg'
  const smartSimsImage = '/assets/projects/smartsims.jpg'

  return (
    <section
      id="projects"
      tabIndex={-1}
      className="relative scroll-mt-24 overflow-hidden bg-white/70 px-4 py-14 backdrop-blur dark:bg-[#0a0a0a] sm:px-6 sm:py-18 lg:px-10 2xl:px-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/12" />
        <div className="absolute -bottom-24 right-[-10%] h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-500/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(62%_56%_at_50%_35%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative" data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">Projects</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">Selected Work</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/70">Real-world constraints, stable architecture.</p>

        {/* Featured */}
        <div className="mt-10">
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] dark:hover:border-cyan-300/30">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-16 -z-10 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-85 bg-gradient-to-br from-cyan-500/14 via-blue-500/10 to-transparent" />

            <div className="grid gap-0 lg:grid-cols-12">
              {/* Visual */}
              <div className="relative lg:col-span-5">
                <div className="h-full min-h-[220px] w-full">
                  <img
                    src={smarTanomImage}
                    alt="SmarTanom project preview"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/25 via-green-500/10 to-slate-950/15" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.20),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(34,197,94,0.14),transparent_50%)]" />
                  <div className="absolute inset-0 opacity-35 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px]" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700/80 dark:text-emerald-200/80">The STAR</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-3xl">
                    SmarTanom - IoT Hydroponics Monitoring.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/70">
                    Automated pH and nutrient tracking for growers. Built with ESP32, MQTT, and sensors to ensure stable water
                    conditions.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag>[Sensors]</Tag>
                    <Tag>[Threshold Alerts]</Tag>
                    <Tag>[Hydroponics]</Tag>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <ActionButton href="https://smartanom.me/" variant="primary">
                      View Live
                    </ActionButton>
                    <ActionButton href="https://github.com/SmarTanom/SmarTanom" variant="secondary">
                      GitHub
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] dark:hover:border-cyan-300/30">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-16 -z-10 opacity-45 blur-2xl transition-opacity duration-300 group-hover:opacity-70 bg-gradient-to-br from-blue-500/14 via-cyan-500/10 to-transparent" />

            <div className="relative mb-5 h-28 overflow-hidden rounded-2xl border border-slate-200/70 dark:border-white/10">
              <img
                src={smartSimsImage}
                alt="SmartSims project preview"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                }}
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5]">SmartSims - Inventory POS.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/70">
              A web-based POS focused on straightforward transaction flows and clear summaries.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>[React]</Tag>
              <Tag>[TypeScript]</Tag>
              <Tag>[Tailwind]</Tag>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ActionButton href="https://smartsims.netlify.app/" variant="primary">
                View Demo
              </ActionButton>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] dark:hover:border-cyan-300/30">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-16 -z-10 opacity-35 blur-2xl transition-opacity duration-300 group-hover:opacity-60 bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-transparent" />

            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5]">More Projects</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/70">
              I’m continuously building—ask and I’ll share additional work, demos, and source code.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>[IoT]</Tag>
              <Tag>[Backend]</Tag>
              <Tag>[Systems]</Tag>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
