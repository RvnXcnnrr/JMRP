import type { PropsWithChildren, ReactNode } from 'react'

type ChipProps = PropsWithChildren<{ className?: string; startIcon?: ReactNode }>

export function Chip({ className, startIcon, children }: ChipProps) {
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-xs font-medium text-slate-800 shadow-sm transition duration-300 hover:bg-white hover:border-slate-300/80 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.07] dark:hover:border-white/20 ' +
        (className ?? '')
      }
    >
      {startIcon ? <span aria-hidden="true">{startIcon}</span> : null}
      {children}
    </span>
  )
}
