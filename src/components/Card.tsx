import type { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{ className?: string }>

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={
        'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/35 ' +
        (className ?? '')
      }
    >
      {children}
    </div>
  )
}
