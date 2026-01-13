import { useState } from 'react'
import { Card } from './Card'
import { Chip } from './Chip'
import type { Project } from '../data/portfolio'

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const hue = (index * 56) % 360
  const [imageBroken, setImageBroken] = useState(false)
  const showImage = Boolean(project.imageSrc) && !imageBroken

  return (
    <Card className="group h-full overflow-hidden p-0">
      <div className="relative h-32 w-full border-b border-slate-200/70 dark:border-white/10">
        {showImage ? (
          <img
            src={project.imageSrc}
            alt={project.imageAlt || project.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setImageBroken(true)}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                `radial-gradient(900px 260px at 20% 20%, hsla(${hue}, 92%, 64%, 0.30), transparent 55%),` +
                `radial-gradient(700px 240px at 80% 30%, hsla(${(hue + 36) % 360}, 90%, 60%, 0.22), transparent 60%),` +
                `linear-gradient(135deg, rgba(15, 23, 42, 0.06), rgba(79, 70, 229, 0.06))`,
            }}
            aria-hidden="true"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent dark:from-slate-950/35"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {project.title}
          </h3>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
            Project
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Live Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 3h7v7"
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M10 14 21 3"
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          ) : null}

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            >
              GitHub
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  className="stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
