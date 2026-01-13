import { useMemo, useState } from 'react'

type AvatarProps = {
  name: string
  src?: string
  size?: number
  priority?: boolean
}

function initialsFromName(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (first + last).toUpperCase() || 'ME'
}

export function Avatar({ name, src, size = 120, priority = false }: AvatarProps) {
  const [broken, setBroken] = useState(false)
  const initials = useMemo(() => initialsFromName(name), [name])
  const showImage = Boolean(src) && !broken

  return (
    <div
      className="relative grid place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-white/85 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
      style={{ width: size, height: size }}
      aria-label={name}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-slate-900/0">
          <span className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            {initials}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/10"
      />
    </div>
  )
}
