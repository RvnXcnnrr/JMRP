import { useEffect, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'
import { approvedTestimonials } from '../data/testimonials'

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
      {children}
    </label>
  )
}

function formatMeta(t: { role?: string; company?: string }) {
  const left = t.role?.trim()
  const right = t.company?.trim()
  if (left && right) return `${left} • ${right}`
  return left || right || ''
}

export function TestimonialsSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!confirmOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setConfirmOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [confirmOpen])

  useEffect(() => {
    if (confirmOpen) closeButtonRef.current?.focus()
  }, [confirmOpen])

  const submitToNetlify = async (form: HTMLFormElement) => {
    const formData = new FormData(form)
    if (!formData.get('form-name')) formData.set('form-name', 'testimonials')

    const body = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') body.append(key, value)
    }

    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    if (!res.ok) throw new Error(`Request failed (${res.status})`)
  }

  return (
    <section
      id="testimonials"
      tabIndex={-1}
      className="relative scroll-mt-24 overflow-hidden bg-white/70 px-4 py-14 backdrop-blur dark:bg-[#0a0a0a] sm:px-6 sm:py-18 lg:px-10 2xl:px-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[440px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent blur-3xl dark:from-cyan-500/12" />
        <div className="absolute -bottom-24 left-[-10%] h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-500/8 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(60%_55%_at_50%_35%,black,transparent)] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.12)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="relative" data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">Testimonials</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">
          What Clients Say
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/70">
          Testimonials are reviewed first and only displayed after approval.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {approvedTestimonials.length === 0 ? (
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]">
              <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">No testimonials yet</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/70">
                If we’ve worked together, you can submit a testimonial below.
              </p>
            </div>
          ) : (
            approvedTestimonials.map((t, i) => {
              const meta = formatMeta(t)
              return (
                <figure
                  key={`${t.name}-${i}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] dark:hover:border-cyan-300/30"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-16 -z-10 opacity-45 blur-2xl transition-opacity duration-300 group-hover:opacity-70 bg-gradient-to-br from-cyan-500/14 via-blue-500/10 to-transparent"
                  />

                  <blockquote className="relative text-sm leading-7 text-slate-700 dark:text-white/80">
                    “{t.message}”
                  </blockquote>

                  <figcaption className="relative mt-5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">{t.name}</p>
                    {meta ? <p className="mt-1 text-sm text-slate-600 dark:text-white/70">{meta}</p> : null}
                    {t.project ? (
                      <p className="mt-1 text-xs text-slate-500 dark:text-white/55">Project: {t.project}</p>
                    ) : null}
                    {t.date ? <p className="mt-1 text-xs text-slate-500 dark:text-white/55">{t.date}</p> : null}
                  </figcaption>
                </figure>
              )
            })
          )}
        </div>

        <div className="mt-8 group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 opacity-45 blur-2xl bg-gradient-to-br from-blue-500/14 via-cyan-500/10 to-transparent"
          />

          <form
            name="testimonials"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.currentTarget
              setErrorMessage(null)
              setStatus('submitting')

              try {
                await submitToNetlify(form)
                form.reset()
                setStatus('success')
                setConfirmOpen(true)
              } catch (err) {
                setStatus('error')
                setErrorMessage(err instanceof Error ? err.message : 'Failed to send testimonial')
              }
            }}
          >
            <input type="hidden" name="form-name" value="testimonials" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="t-name">Name</FieldLabel>
                <input
                  id="t-name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="t-email">Email (optional)</FieldLabel>
                <input
                  id="t-email"
                  name="email"
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="t-role">Role (optional)</FieldLabel>
                <input
                  id="t-role"
                  name="role"
                  type="text"
                  placeholder="e.g., Founder, Manager"
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="t-company">Company (optional)</FieldLabel>
                <input
                  id="t-company"
                  name="company"
                  type="text"
                  placeholder="e.g., ACME Co."
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="t-project">Project / Service (optional)</FieldLabel>
              <input
                id="t-project"
                name="project"
                type="text"
                placeholder="e.g., Website development, Mobile app"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="t-message">Testimonial</FieldLabel>
              <textarea
                id="t-message"
                name="message"
                rows={5}
                required
                placeholder="Share your experience working with me…"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting' ? true : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 active:scale-[0.99] dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                <Send size={18} aria-hidden="true" />
                {status === 'submitting' ? 'Sending…' : 'Submit Testimonial'}
              </button>
              <p className="text-xs text-slate-500 dark:text-white/55">
                Submissions are reviewed before they appear on the site.
              </p>
            </div>

            {status === 'error' ? (
              <p className="text-sm text-rose-600 dark:text-rose-300">{errorMessage || 'Failed to send testimonial.'}</p>
            ) : null}
          </form>
        </div>

        {confirmOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Testimonial sent confirmation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setConfirmOpen(false)
            }}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-50">Thanks for the testimonial</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    It’s been received and will be reviewed before being displayed.
                  </p>
                </div>
                <button
                  type="button"
                  ref={closeButtonRef}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                  onClick={() => setConfirmOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                  onClick={() => setConfirmOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
