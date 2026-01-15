import { useEffect, useRef, useState } from 'react'
import { Check, Send, Trash2, X } from 'lucide-react'
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
  const [testimonials, setTestimonials] = useState(approvedTestimonials)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const [adminToken, setAdminToken] = useState<string>(() => localStorage.getItem('testimonials_admin_token') || '')
  const [adminOpen, setAdminOpen] = useState(false)
  const [pending, setPending] = useState<any[]>([])
  const [adminStatus, setAdminStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [adminError, setAdminError] = useState<string | null>(null)

  const [tokenModalOpen, setTokenModalOpen] = useState(false)
  const [tokenDraft, setTokenDraft] = useState('')
  const [tokenModalError, setTokenModalError] = useState<string | null>(null)
  const tokenInputRef = useRef<HTMLInputElement | null>(null)
  const tokenCloseButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // Public list is fetched only on the deployed site.
    if (!import.meta.env.PROD) return

    const load = async () => {
      try {
        const res = await fetch('/.netlify/functions/testimonials-approved', { headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(`Failed to load testimonials (${res.status})`)
        const data = await res.json()
        if (data && data.ok && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials)
        }
      } catch {
        // Keep local fallback.
      }
    }

    void load()
  }, [])

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

  useEffect(() => {
    if (!tokenModalOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setTokenModalOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [tokenModalOpen])

  useEffect(() => {
    if (tokenModalOpen) tokenInputRef.current?.focus()
  }, [tokenModalOpen])

  const openTokenModal = () => {
    setTokenDraft(adminToken)
    setTokenModalError(null)
    setTokenModalOpen(true)
  }

  const submitToNetlify = async (form: HTMLFormElement) => {
    if (import.meta.env.DEV) {
      throw new Error('Testimonial submissions work on the deployed site (Netlify), not on `npm run dev`.')
    }

    const formData = new FormData(form)
    const payload: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') payload[key] = value
    }

    const res = await fetch('/.netlify/functions/testimonials-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json().catch(() => null)
    if (!res.ok || !data?.ok) {
      throw new Error((data && data.error) || `Request failed (${res.status})`)
    }
  }

  const loadPending = async (tokenOverride?: string) => {
    if (!import.meta.env.PROD) {
      setAdminError('Admin approvals are available on the deployed Netlify site.')
      setAdminStatus('error')
      return
    }

    const token = (tokenOverride ?? adminToken).trim()
    if (!token) {
      setAdminError('Missing admin token.')
      setAdminStatus('error')
      return
    }

    setAdminStatus('loading')
    setAdminError(null)

    try {
      const res = await fetch('/.netlify/functions/testimonials-pending', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw new Error((data && data.error) || `Failed (${res.status})`)
      setPending(Array.isArray(data.pending) ? data.pending : [])
      setAdminStatus('idle')
    } catch (err) {
      setAdminStatus('error')
      setAdminError(err instanceof Error ? err.message : 'Failed to load pending testimonials')
    }
  }

  const moderate = async (id: string, action: 'approve' | 'decline') => {
    if (!import.meta.env.PROD) return

    setAdminStatus('loading')
    setAdminError(null)

    let failed = false

    try {
      const res = await fetch('/.netlify/functions/testimonials-moderate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ id, action }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw new Error((data && data.error) || `Failed (${res.status})`)

      // Refresh both lists.
      await loadPending()
      try {
        const a = await fetch('/.netlify/functions/testimonials-approved', { headers: { Accept: 'application/json' } })
        const j = await a.json().catch(() => null)
        if (a.ok && j?.ok && Array.isArray(j.testimonials)) setTestimonials(j.testimonials)
      } catch {
        // ignore
      }
    } catch (err) {
      failed = true
      setAdminStatus('error')
      setAdminError(err instanceof Error ? err.message : 'Failed to update testimonial')
    } finally {
      if (!failed) setAdminStatus('idle')
    }
  }

  const deleteApproved = async (id: string) => {
    if (!import.meta.env.PROD) return
    if (!adminToken.trim()) return

    setAdminStatus('loading')
    setAdminError(null)

    let failed = false

    try {
      const res = await fetch('/.netlify/functions/testimonials-delete-approved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ id }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) throw new Error((data && data.error) || `Failed (${res.status})`)

      // Refresh public list.
      try {
        const a = await fetch('/.netlify/functions/testimonials-approved', { headers: { Accept: 'application/json' } })
        const j = await a.json().catch(() => null)
        if (a.ok && j?.ok && Array.isArray(j.testimonials)) setTestimonials(j.testimonials)
      } catch {
        // ignore
      }
    } catch (err) {
      failed = true
      setAdminStatus('error')
      setAdminError(err instanceof Error ? err.message : 'Failed to delete testimonial')
    } finally {
      if (!failed) setAdminStatus('idle')
    }
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
          {testimonials.length === 0 ? (
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]">
              <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">No testimonials yet</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/70">
                If we’ve worked together, you can submit a testimonial below.
              </p>
            </div>
          ) : (
            testimonials.map((t: any, i: number) => {
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
                    {t.date || t.approvedAt ? (
                      <p className="mt-1 text-xs text-slate-500 dark:text-white/55">
                        {t.date || new Date(String(t.approvedAt)).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              )
            })
          )}
        </div>

        <div className="mt-8">
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900 dark:text-white/55 dark:hover:text-white"
            onClick={async () => {
              const next = !adminOpen
              setAdminOpen(next)
              if (next) {
                if (!adminToken.trim()) {
                  openTokenModal()
                  return
                }
                await loadPending()
              }
            }}
          >
            {adminOpen ? 'Hide Admin' : 'Admin: Approve/Decline'}
          </button>

          {adminOpen ? (
            <div className="mt-4 group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 -z-10 opacity-45 blur-2xl bg-gradient-to-br from-slate-500/10 via-cyan-500/10 to-transparent"
              />

              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">Pending testimonials</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    Approve to publish, decline to discard.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                    onClick={() => loadPending()}
                    disabled={adminStatus === 'loading'}
                  >
                    Refresh
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                    onClick={openTokenModal}
                    disabled={adminStatus === 'loading'}
                  >
                    Change Token
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                    onClick={() => {
                      localStorage.removeItem('testimonials_admin_token')
                      setAdminToken('')
                      setPending([])
                    }}
                  >
                    Clear Token
                  </button>
                </div>
              </div>

              {adminError ? <p className="relative mt-4 text-sm text-rose-600 dark:text-rose-300">{adminError}</p> : null}

              <div className="relative mt-6 grid gap-4 md:grid-cols-2">
                {pending.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                    No pending items.
                  </div>
                ) : (
                  pending.map((t) => {
                    const meta = formatMeta(t)
                    return (
                      <div
                        key={t.id}
                        className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5"
                      >
                        <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">{t.name}</p>
                        {meta ? <p className="mt-1 text-sm text-slate-600 dark:text-white/70">{meta}</p> : null}
                        {t.project ? (
                          <p className="mt-1 text-xs text-slate-500 dark:text-white/55">Project: {t.project}</p>
                        ) : null}
                        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-white/80">“{t.message}”</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 disabled:opacity-60"
                            onClick={() => moderate(t.id, 'approve')}
                            disabled={adminStatus === 'loading'}
                          >
                            <Check size={18} aria-hidden="true" />
                            Approve
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                            onClick={() => moderate(t.id, 'decline')}
                            disabled={adminStatus === 'loading'}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                            Decline
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="relative mt-8">
                <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">Approved (published)</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-white/70">You can remove published testimonials here.</p>

                <div className="mt-4 grid gap-3">
                  {testimonials.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                      No published testimonials.
                    </div>
                  ) : (
                    testimonials.map((t: any, i: number) => {
                      const meta = formatMeta(t)
                      const id = typeof t.id === 'string' ? t.id : ''
                      return (
                        <div
                          key={id || `${t.name}-${i}`}
                          className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-[#e5e5e5]">{t.name}</p>
                            {meta ? <p className="mt-1 text-sm text-slate-600 dark:text-white/70">{meta}</p> : null}
                            <p className="mt-2 text-sm text-slate-700 dark:text-white/80 line-clamp-2">“{t.message}”</p>
                          </div>

                          <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                            onClick={() => {
                              if (!id) {
                                setAdminError('This testimonial cannot be deleted because it has no id. Resubmit/approve again to get an id.')
                                setAdminStatus('error')
                                return
                              }
                              if (window.confirm('Delete this published testimonial?')) {
                                void deleteApproved(id)
                              }
                            }}
                            disabled={adminStatus === 'loading'}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          ) : null}
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

        {tokenModalOpen ? (
          <div
            className="fixed inset-0 z-50 grid place-items-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Admin token dialog"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setTokenModalOpen(false)
            }}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0a0a0a]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-50">Admin token</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-white/70">
                    Enter your secret token to approve/decline testimonials. Stored only in this browser.
                  </p>
                </div>
                <button
                  type="button"
                  ref={tokenCloseButtonRef}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                  onClick={() => setTokenModalOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 space-y-2">
                <label
                  htmlFor="admin-token"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/55"
                >
                  Token
                </label>
                <input
                  id="admin-token"
                  ref={tokenInputRef}
                  value={tokenDraft}
                  onChange={(e) => {
                    setTokenDraft(e.target.value)
                    setTokenModalError(null)
                  }}
                  type="password"
                  autoComplete="off"
                  placeholder="Paste TESTIMONIALS_ADMIN_TOKEN"
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                {tokenModalError ? (
                  <p className="text-sm text-rose-600 dark:text-rose-300">{tokenModalError}</p>
                ) : null}
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                  onClick={() => setTokenModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                  onClick={async () => {
                    const cleaned = tokenDraft.trim()
                    if (!cleaned) {
                      setTokenModalError('Token is required.')
                      return
                    }

                    localStorage.setItem('testimonials_admin_token', cleaned)
                    setAdminToken(cleaned)
                    setTokenModalOpen(false)
                    setAdminOpen(true)
                    await loadPending(cleaned)
                  }}
                >
                  Save &amp; Load Pending
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
