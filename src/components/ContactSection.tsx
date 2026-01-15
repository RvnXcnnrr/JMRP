import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Send, X } from 'lucide-react'
import { profile } from '../data/profile'

function ActionLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:bg-cyan-400 dark:hover:bg-cyan-300 sm:w-auto"
    >
      <span className="text-slate-950">{icon}</span>
      {label}
    </a>
  )
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55">
      {children}
    </label>
  )
}

export function ContactSection() {
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
    // Ensure Netlify receives the form name.
    if (!formData.get('form-name')) formData.set('form-name', 'contact')

    const body = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') body.append(key, value)
    }

    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`)
    }
  }

  return (
    <section id="contact" tabIndex={-1} className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-18 lg:px-10 2xl:px-16">
      <div data-reveal className="w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-200/80">Contact</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#e5e5e5] sm:text-4xl">
          Ready to contribute to your team?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/70">
          Email is best for OJT/internship inquiries. LinkedIn works great for quick updates.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ActionLink href={`mailto:${profile.email}`} label="Email" icon={<Mail size={18} aria-hidden="true" />} />
          <ActionLink href={profile.socials.linkedin} label="LinkedIn" icon={<Linkedin size={18} aria-hidden="true" />} />
        </div>

        <div className="mt-8 group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 opacity-45 blur-2xl bg-gradient-to-br from-cyan-500/14 via-blue-500/10 to-transparent"
          />

          <form
            name="contact"
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
                setErrorMessage(err instanceof Error ? err.message : 'Failed to send message')
              }
            }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
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
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </div>

            {status === 'error' ? (
              <p className="text-sm text-rose-600 dark:text-rose-300">{errorMessage || 'Failed to send message.'}</p>
            ) : null}
          </form>
        </div>

        {confirmOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Message sent confirmation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setConfirmOpen(false)
            }}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-50">Message sent</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    Thanks! Your message has been received.
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
