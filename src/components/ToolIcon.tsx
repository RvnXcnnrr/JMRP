import type { ReactElement } from 'react'

type ToolIconProps = {
  label: string
  className?: string
}

type IconSpec = {
  colorClassName: string
  svg: (className: string) => ReactElement
}

const iconBaseClass = 'h-3.5 w-3.5 shrink-0'

const glyphs = {
  chip: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M9 3h6M9 21h6M6 7H4m16 0h-2M6 17H4m16 0h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  radar: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0-9-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  wifiHome: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.5a3.5 3.5 0 0 1 3.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13.8a1.2 1.2 0 0 1 1.2 1.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  waves: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 12a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 12a1.5 1.5 0 0 1 3 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  chart: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M7 15l3-3 3 2 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="15" r="1" fill="currentColor" />
      <circle cx="10" cy="12" r="1" fill="currentColor" />
      <circle cx="13" cy="14" r="1" fill="currentColor" />
      <circle cx="18" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  cloudArrow: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M7.5 18a4.5 4.5 0 0 1 0-9 5.5 5.5 0 0 1 10.7 1.8A3.8 3.8 0 0 1 18.5 18H7.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v7m0 0 3-3m-3 3-3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  server: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="13" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h.01M8 16h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  api: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M8 7h8M8 17h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 9 3 12l3 3M18 9l3 3-3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  key: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M14.5 10.5a4.5 4.5 0 1 0-4.5 4.5H12l2 2h2v2h3v-3.5l-4-4H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8.5 10.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  database: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="2" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  leaf: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 4c-7 1-12 6-13 13 7-1 12-6 13-13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M7 17c0 2 1 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  shield: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3 20 7v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.5 11 14l3.5-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  window: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9h16" stroke="currentColor" strokeWidth="2" />
      <path d="M8 5v14" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    </svg>
  ),
  terminal: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10l2 2-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  network: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8M16.7 7.3 8.5 11.2M16.7 16.7 8.5 12.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  wrench: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M14 7a4 4 0 0 0-5.6 5.6L4 17v3h3l4.4-4.4A4 4 0 0 0 17 10l-3 3-2-2 3-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
  headset: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12v5a2 2 0 0 0 2 2h2v-7H6a2 2 0 0 0-2 2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M20 12v5a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  gitBranch: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 7v10a3 3 0 0 0 3 3h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 7v3a3 3 0 0 1-3 3H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="20" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  layers: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 4 3 9l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 17l9 5 9-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
    </svg>
  ),
  pencil: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 3.5 20.5 7.5 8 20H4v-4L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  atom: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="2" />
      <path d="M5 5l14 14" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    </svg>
  ),
  devices: (className: string) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="9" width="2" height="8" rx="1" fill="currentColor" />
    </svg>
  ),
} as const

function specForLabel(label: string): IconSpec {
  const normalized = label.trim().toLowerCase()

  const table: Record<string, IconSpec> = {
    // IoT
    'esp32/arduino': {
      colorClassName: 'text-emerald-700 dark:text-emerald-300',
      svg: glyphs.chip,
    },
    sensors: { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.radar },
    mqtt: { colorClassName: 'text-cyan-700 dark:text-cyan-300', svg: glyphs.waves },
    'device telemetry': { colorClassName: 'text-indigo-700 dark:text-indigo-300', svg: glyphs.chart },
    'edge-to-cloud': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.cloudArrow },
    'home automation': { colorClassName: 'text-amber-700 dark:text-amber-300', svg: glyphs.wifiHome },

    // Backend
    'node.js': { colorClassName: 'text-emerald-700 dark:text-emerald-300', svg: glyphs.server },
    express: { colorClassName: 'text-slate-700 dark:text-slate-200', svg: glyphs.api },
    'rest apis': { colorClassName: 'text-indigo-700 dark:text-indigo-300', svg: glyphs.api },
    'auth (jwt)': { colorClassName: 'text-amber-700 dark:text-amber-300', svg: glyphs.key },
    'postgresql/mysql': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.database },
    mongodb: { colorClassName: 'text-emerald-700 dark:text-emerald-300', svg: glyphs.leaf },
    'api security (basics)': { colorClassName: 'text-rose-700 dark:text-rose-300', svg: glyphs.shield },

    // System Administration
    'windows admin (basics)': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.window },
    'linux (basics)': { colorClassName: 'text-slate-700 dark:text-slate-200', svg: glyphs.terminal },
    'networking (lan/wan basics)': { colorClassName: 'text-indigo-700 dark:text-indigo-300', svg: glyphs.network },
    troubleshooting: { colorClassName: 'text-amber-700 dark:text-amber-300', svg: glyphs.wrench },
    'hardware/software support': { colorClassName: 'text-emerald-700 dark:text-emerald-300', svg: glyphs.headset },
    'backups & documentation': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.cloudArrow },

    // Tools & Technologies
    'git/github': { colorClassName: 'text-slate-700 dark:text-slate-200', svg: glyphs.gitBranch },
    'cisco netacad': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.network },
    'packet tracer': { colorClassName: 'text-indigo-700 dark:text-indigo-300', svg: glyphs.layers },
    postman: { colorClassName: 'text-amber-700 dark:text-amber-300', svg: glyphs.pencil },
    'docker (basics)': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.layers },
    'figma (minimal ui)': { colorClassName: 'text-fuchsia-700 dark:text-fuchsia-300', svg: glyphs.layers },

    // Minimal Frontend
    html5: { colorClassName: 'text-amber-700 dark:text-amber-300', svg: glyphs.api },
    css3: { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.pencil },
    'tailwind css': { colorClassName: 'text-cyan-700 dark:text-cyan-300', svg: glyphs.waves },
    'react (ui integration)': { colorClassName: 'text-sky-700 dark:text-sky-300', svg: glyphs.atom },
    'responsive layout': { colorClassName: 'text-indigo-700 dark:text-indigo-300', svg: glyphs.devices },
  }

  return (
    table[normalized] ?? {
      colorClassName: 'text-slate-700 dark:text-slate-200',
      svg: glyphs.layers,
    }
  )
}

export function ToolIcon({ label, className }: ToolIconProps) {
  const spec = specForLabel(label)
  return spec.svg([iconBaseClass, spec.colorClassName, className].filter(Boolean).join(' '))
}
