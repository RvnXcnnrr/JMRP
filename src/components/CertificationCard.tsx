import { useEffect, useRef, useState } from 'react'
import { Card } from './Card'
import type { CertificationItem } from '../data/portfolio'

type CertificationCardProps = {
  cert: CertificationItem
}

export function CertificationCard({ cert }: CertificationCardProps) {
  const src = cert.imageSrc
  const isPdf = Boolean(src) && src!.toLowerCase().endsWith('.pdf')
  const isSensitive = Boolean(cert.isSensitive)
  const canPreviewImage = Boolean(src) && !isSensitive && !isPdf

  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    lastActiveElementRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const prevBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevBodyOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) return
    lastActiveElementRef.current?.focus?.()
  }, [isOpen])

  const open = () => {
    if (!canPreviewImage) return
    setIsOpen(true)
  }

  const onPreviewKeyDown: React.KeyboardEventHandler = (e) => {
    if (!canPreviewImage) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      open()
    }
  }

  return (
    <Card className="p-0 overflow-hidden">
      {src ? (
        <div className="border-b border-slate-200/70 dark:border-white/10">
          {isSensitive ? (
            <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-sky-500/10 to-indigo-500/10">
              {isPdf ? (
                <div className="grid h-full w-full place-items-center">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Certificate (private)</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Available upon request</p>
                  </div>
                </div>
              ) : (
                <img
                  src={src}
                  alt={cert.imageAlt || cert.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover blur-[5px] brightness-90"
                />
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent dark:from-slate-950/40"
              />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  Available upon request
                </p>
              </div>
            </div>
          ) : isPdf ? (
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="grid h-44 w-full place-items-center bg-gradient-to-br from-sky-500/10 to-indigo-500/10"
              aria-label={`View certificate for ${cert.title}`}
              title="View certificate"
            >
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">View Certificate</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Opens in a new tab</p>
              </div>
            </a>
          ) : (
            <button
              type="button"
              className="block w-full"
              onClick={open}
              onKeyDown={onPreviewKeyDown}
              aria-label={`Preview certificate image for ${cert.title}`}
              title="Preview certificate"
            >
              <img
                src={src}
                alt={cert.imageAlt || cert.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                className="h-44 w-full select-none object-cover"
              />
            </button>
          )}
        </div>
      ) : (
        <div
          className="h-44 w-full border-b border-slate-200/70 bg-gradient-to-br from-sky-500/10 to-indigo-500/10 dark:border-white/10"
          aria-hidden="true"
        />
      )}

      <div className="p-6">
        <p className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">{cert.title}</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cert.issuer}</p>
        {cert.notes ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cert.notes}</p>
        ) : null}
      </div>

      {isOpen && canPreviewImage ? (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate preview: ${cert.title}`}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close preview"
          />

          <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center p-4">
            <div className="w-full max-h-[90vh] overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/75">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-slate-900/75">
                <p className="min-w-0 truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {cert.title}
                </p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="shrink-0 inline-flex min-w-[72px] items-center justify-center rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="max-h-[calc(90vh-52px)] overflow-auto p-2">
                <img
                  src={src}
                  alt={cert.imageAlt || cert.title}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  className="mx-auto w-full select-none object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
