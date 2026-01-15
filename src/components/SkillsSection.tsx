const SKILLS = {
  'IoT Programming': ['ESP32', 'MQTT', 'Sensors', 'Device Telemetry'],
  Backend: ['Node.js', 'Express', 'REST APIs', 'SQL/NoSQL'],
  'System Admin': ['Linux (Basics)', 'Windows Admin', 'Networking', 'Troubleshooting'],
  Tools: ['Git', 'Docker', 'Postman', 'Cisco Packet Tracer'],
  'Frontend (Secondary)': ['React', 'Tailwind', 'HTML/CSS'],
} as const

type SkillCardProps = {
  title: keyof typeof SKILLS
  items: readonly string[]
  highlight?: boolean
  className?: string
}

function SkillPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/75">
      {children}
    </span>
  )
}

function SkillCard({ title, items, highlight = false, className }: SkillCardProps) {
  return (
    <div
      className={
        'group relative overflow-hidden rounded-2xl border bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] dark:hover:border-cyan-300/35 ' +
        (highlight
          ? 'border-cyan-500/25 shadow-[0_0_0_1px_rgba(6,182,212,0.12)] dark:border-cyan-400/20 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.08)] '
          : 'border-slate-200 dark:border-white/10 ') +
        (className ?? '')
      }
    >
      <div
        aria-hidden="true"
        className={
          'pointer-events-none absolute -inset-16 -z-10 blur-2xl transition-opacity duration-300 ' +
          (highlight ? 'opacity-80 group-hover:opacity-100' : 'opacity-45 group-hover:opacity-70')
        }
      >
        <div
          className={
            'h-full w-full bg-gradient-to-br ' +
            (title === 'IoT Programming'
              ? 'from-cyan-500/18 via-blue-500/10 to-transparent'
              : title === 'Backend'
                ? 'from-blue-500/18 via-cyan-500/10 to-transparent'
                : title === 'System Admin'
                  ? 'from-slate-500/18 via-blue-500/10 to-transparent'
                  : title === 'Tools'
                    ? 'from-cyan-500/12 via-slate-500/10 to-transparent'
                    : 'from-blue-500/12 via-cyan-500/10 to-transparent')
          }
        />
      </div>

      <div className="relative">
        <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">{title}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((s) => (
            <SkillPill key={s}>{s}</SkillPill>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 py-14 backdrop-blur dark:border-white/10 dark:bg-[#0a0a0a] sm:py-18"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-[440px] w-[640px] rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/12" />
        <div className="absolute -bottom-24 left-[-10%] h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-500/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative" data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">Skills</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">
          Tech Stack &amp; Arsenal
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-flow-row-dense">
          <SkillCard
            title="IoT Programming"
            items={SKILLS['IoT Programming']}
            highlight
            className="md:col-span-3 md:row-span-2"
          />
          <SkillCard title="Backend" items={SKILLS.Backend} highlight className="md:col-span-3 md:row-span-2" />
          <SkillCard title="System Admin" items={SKILLS['System Admin']} className="md:col-span-2" />
          <SkillCard title="Tools" items={SKILLS.Tools} className="md:col-span-2" />
          <SkillCard title="Frontend (Secondary)" items={SKILLS['Frontend (Secondary)']} className="md:col-span-2" />
        </div>
      </div>
    </section>
  )
}
