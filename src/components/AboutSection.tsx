import { Shield, User, Wrench } from 'lucide-react'

type FeatureCardProps = {
  title: string
  description: string
  icon: React.ReactNode
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] dark:hover:border-cyan-300/30">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/16 via-blue-500/10 to-transparent" />
      <div className="relative">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/60 text-cyan-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-cyan-200">
          {icon}
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">{title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/70">{description}</p>
      </div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 py-14 backdrop-blur dark:border-white/10 dark:bg-[#0a0a0a] sm:py-18"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/12 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/14" />
        <div className="absolute -bottom-24 left-[-10%] h-[380px] w-[520px] rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-500/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(65%_60%_at_50%_35%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative" data-reveal>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">About</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">
              More Than Just Code.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-white/70">
              I enjoy solving real problems with technology—connecting devices, moving data safely, and keeping systems stable.
              My work is backend-first and practical.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur dark:border-white/12 dark:bg-white/5 dark:text-white/80">
              <span aria-hidden="true" className="inline-flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center">🟢</span>
              </span>
              Open for OJT / Internship January 2026
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-4">
              <FeatureCard
                title="Backend-First Thinking"
                description="Reliable APIs & Data Flow."
                icon={<Shield size={20} aria-hidden="true" />}
              />
              <FeatureCard
                title="Hands-on Troubleshooting"
                description="Hardware/Software support."
                icon={<Wrench size={20} aria-hidden="true" />}
              />
              <FeatureCard
                title="Professional Work Ethic"
                description="Clear communication & documentation."
                icon={<User size={20} aria-hidden="true" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
