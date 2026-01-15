import type { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{ className?: string }>

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={
        'rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.65),0_18px_50px_rgba(2,6,23,0.08)] backdrop-blur transition duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)] ' +
        (className ?? '')
      }
    >
      {children}
    </div>
  )
}
