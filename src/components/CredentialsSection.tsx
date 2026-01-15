import { certifications } from '../data/portfolio'
import { CertificationCard } from './CertificationCard'

export function CredentialsSection() {
  return (
    <section
      id="certifications"
      tabIndex={-1}
      className="relative scroll-mt-24 overflow-hidden bg-white/70 px-4 py-14 backdrop-blur dark:bg-[#0a0a0a] sm:px-6 sm:py-18 lg:px-10 2xl:px-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-[440px] w-[640px] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-24 right-[-10%] h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative" data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">Credentials</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">
          Certifications &amp; Training
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/70">
          Certificates are available upon request.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert) => (
            <CertificationCard key={cert.title} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
