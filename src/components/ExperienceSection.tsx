type TimelineItem = {
  title: string
  org: string
  period: string
  description: string
}

const TIMELINE: TimelineItem[] = [
  {
    title: 'TESDA Graduate — Computer System Servicing (CSS)',
    org: 'Crossroads Training Institute Inc. — Kolambog, Lapasan, Cagayan de Oro City, Philippines, 9000',
    period: 'TESDA NC II',
    description:
      'Completed TESDA training in Computer System Servicing (CSS).',
  },
  {
    title: 'Computer Technician (Hardware & Software)',
    org: 'Hube Computer',
    period: 'Previous',
    description:
      'Diagnosed common PC/laptop issues, performed OS installs and driver setup, and supported customers with clear technical explanations.',
  },
  {
    title: 'BSIT Student',
    org: 'University of Science and Technology of Southern Philippines (USTP) — 1st–4th Year',
    period: 'SY 2022–2026',
    description:
      'Focused on IoT programming and backend development, with hands-on troubleshooting and systems fundamentals.',
  },
  {
    title: 'Capstone Researcher — SmarTanom',
    org: 'IoT Hydroponics Monitoring',
    period: 'Current',
    description:
      'Building and validating an IoT monitoring system with stable telemetry, clear thresholds, and reliable data flow from devices to dashboards.',
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" tabIndex={-1} className="scroll-mt-24 py-14 sm:py-18">
      <div data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">Experience</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">
          Timeline
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/70">
          A quick snapshot of what I’m doing now and the practical experience I bring.
        </p>

        <div className="mt-10 grid gap-4">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-2 bottom-2 w-px bg-slate-200 dark:bg-white/10"
            />

            <div className="space-y-4">
              {TIMELINE.map((item) => (
                <div key={item.title} className="relative pl-12">
                  <div
                    aria-hidden="true"
                    className="absolute left-2.5 top-6 h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.18)] dark:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
                  />

                  <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-16 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-80 bg-gradient-to-br from-cyan-500/16 via-blue-500/10 to-transparent"
                    />

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-base font-semibold text-slate-900 dark:text-[#e5e5e5]">{item.title}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
                        {item.period}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-white/70">{item.org}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
