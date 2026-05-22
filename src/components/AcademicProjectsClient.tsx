'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, PlayCircle } from 'lucide-react'

type AcademicProject = {
  title: string
  description?: string
  video_id?: string
  paper_link?: string
  year?: string | number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AcademicProjectsClient({ content }: { content: any }) {
  const projects = (content?.academic?.academic_projects || []) as AcademicProject[]
  const [year, setYear] = useState<'all' | string>('all')

  const years = useMemo(
    () => [...new Set(projects.map((project) => project.year).filter(Boolean))].sort((a, b) => Number(b) - Number(a)),
    [projects]
  )

  const groupedProjects = useMemo(() => {
    const filtered = projects.filter((project) => year === 'all' || String(project.year) === year)
    const groups = new Map<string, AcademicProject[]>()

    filtered.forEach((project) => {
      const groupYear = String(project.year ?? 'Other')
      const list = groups.get(groupYear) || []
      list.push(project)
      groups.set(groupYear, list)
    })

    return [...groups.entries()]
      .map(([groupYear, items]) => ({ year: groupYear, projects: items }))
      .sort((a, b) => Number(b.year) - Number(a.year))
  }, [projects, year])

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Research Projects
          </h1>
          <div className="h-1 w-16 mt-3 bg-blue-600" />
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-slate-600">
            Highlighting key academic research and capstone engineering projects, grouped by year.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 shadow-sm dark:border-blue-900/40 dark:bg-slate-950/60">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Year</span>
          <button
            type="button"
            onClick={() => setYear('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${year === 'all' ? 'border-blue-700 bg-blue-700 text-white' : 'border-blue-200 bg-white text-blue-700 hover:border-blue-700 hover:bg-blue-50'}`}
          >
            All
          </button>
          {years.map((value) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => setYear(String(value))}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${year === String(value) ? 'border-blue-700 bg-blue-700 text-white' : 'border-blue-200 bg-white text-blue-700 hover:border-blue-700 hover:bg-blue-50'}`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="space-y-10 md:space-y-12">
          {groupedProjects.map((group, groupIndex) => (
            <section key={group.year} id={`year-${group.year}`} className="space-y-4 md:space-y-5 scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: groupIndex * 0.06 }}
                className="flex items-center gap-3"
              >
                <h2 className="text-xl md:text-2xl font-bold text-blue-800">{group.year}</h2>
                <div className="h-1 flex-1 bg-blue-100" />
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {group.projects.length} project{group.projects.length > 1 ? 's' : ''}
                </span>
              </motion.div>

              <div className="space-y-6">
                {group.projects.map((p, projectIndex) => (
                  <motion.article
                    key={`${group.year}-${p.title}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ delay: projectIndex * 0.05 }}
                    className="grid gap-4 border-b border-slate-200 pb-6 last:border-b-0 last:pb-0 dark:border-slate-800 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-8"
                  >
                    <div className="order-2 relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 md:order-2 md:col-start-2 md:row-start-1 md:row-span-2 md:self-start">
                      {p.video_id ? (
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${p.video_id}`}
                          title={p.title}
                          loading="lazy"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                          <PlayCircle size={40} className="mb-2 opacity-50" />
                          <span className="text-sm">No video available</span>
                        </div>
                      )}
                    </div>

                    <div className="order-1 space-y-3 md:order-1 md:col-start-1 md:row-start-1">
                      <h3 className="text-base md:text-lg font-bold leading-snug text-blue-800">
                        {p.title}
                      </h3>
                    </div>

                    <div className="order-3 space-y-3 md:order-3 md:col-start-1 md:row-start-2">
                      {p.description && (
                        <p className="text-sm md:text-[0.95rem] leading-relaxed text-slate-600">
                          {p.description}
                        </p>
                      )}

                      {p.paper_link && (
                        <div className="pt-1">
                          <a
                            href={p.paper_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-300 hover:bg-blue-100"
                          >
                            <FileText size={16} />
                            Read the Paper
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}

          {groupedProjects.length === 0 && (
            <p className="text-slate-500 italic">No academic projects available for the selected year.</p>
          )}
        </div>
      </div>
    </div>
  )
}
