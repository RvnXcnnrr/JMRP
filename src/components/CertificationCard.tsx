import { Card } from './Card'
import type { CertificationItem } from '../data/portfolio'

type CertificationCardProps = {
  cert: CertificationItem
}

export function CertificationCard({ cert }: CertificationCardProps) {
  const src = cert.imageSrc
  const isPdf = Boolean(src) && src!.toLowerCase().endsWith('.pdf')
  // Privacy-first: always blur certificate images and never allow preview/click-through.
  const showBlurredImage = Boolean(src) && !isPdf

  return (
    <Card className="p-0 overflow-hidden">
      <div className="border-b border-slate-200/70 dark:border-white/10">
        <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/8 to-transparent">
          {showBlurredImage ? (
            <img
              src={src}
              alt={cert.imageAlt || cert.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className="h-full w-full select-none object-cover blur-[6px] brightness-90"
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {isPdf ? 'Certificate (document)' : 'Certificate'}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Available upon request</p>
              </div>
            </div>
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
      </div>

      <div className="p-6">
        <p className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">{cert.title}</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cert.issuer}</p>
        {cert.notes ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cert.notes}</p>
        ) : null}
      </div>
    </Card>
  )
}
