import type { PropsWithChildren } from 'react'

type ChipProps = PropsWithChildren<{ className?: string }>

export function Chip({ className, children }: ChipProps) {
  return (
    <span
      className={
        'inline-flex items-center rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 shadow-[0_1px_0_rgba(15,23,42,0.03)] transition-colors duration-300 hover:bg-white hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:border-white/20 ' +
        (className ?? '')
      }
    >
      {children}
    </span>
  )
}
