import type { ReactNode } from 'react'

type IconProps = {
  title: string
  children: ReactNode
  className?: string
}

export function Icon({ title, children, className }: IconProps) {
  return (
    <span className={className} role="img" aria-label={title}>
      {children}
    </span>
  )
}
