'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, FileText, X, Tag } from 'lucide-react'
import { GitHubLogoIcon as Github } from '@radix-ui/react-icons'

type AcademicProject = {
  title: string
  description?: string
  abstract?: string
  image?: string
  paper_link?: string
  github_link?: string
  demo_link?: string
  blog_link?: string
  year?: string | number
  venue?: string
  tags?: string[]
}

function ProjectLinks({ p, size = 'sm' }: { p: AcademicProject; size?: 'sm' | 'md' }) {
  const base =
    size === 'md'
      ? 'inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors'
      : 'inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors'
  return (
    <div className="flex flex-wrap gap-2">
      {p.paper_link && (
        <a
          href={p.paper_link}
          target="_blank"
          rel="noreferrer"
          className={`${base} border-blue-700 bg-blue-700 text-white hover:bg-blue-800`}
          onClick={(e) => e.stopPropagation()}
        >
          <FileText size={size === 'md' ? 15 : 12} />
          Paper
        </a>
      )}
      {p.github_link && (
        <a
          href={p.github_link}
          target="_blank"
          rel="noreferrer"
          className={`${base} border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <Github width={size === 'md' ? 15 : 12} height={size === 'md' ? 15 : 12} />
          Code
        </a>
      )}
      {p.demo_link && (
        <a
          href={p.demo_link}
          target="_blank"
          rel="noreferrer"
          className={`${base} border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={size === 'md' ? 15 : 12} />
          Demo
        </a>
      )}
      {p.blog_link && (
        <a
          href={p.blog_link}
          target="_blank"
          rel="noreferrer"
          className={`${base} border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50`}
          onClick={(e) => e.stopPropagation()}
        >
          <FileText size={size === 'md' ? 15 : 12} />
          Blog
        </a>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: AcademicProject; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Close modal"
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between gap-3 bg-white border-b border-slate-100 px-5 pt-5 pb-4">
            <div className="min-w-0">
              {project.venue && (
                <span className="inline-block mb-2 rounded-md bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-blue-700">
                  {project.venue}
                </span>
              )}
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{project.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-5 py-5 space-y-5">
            {/* Image */}
            {project.image && (
              <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover"
                  style={{ maxHeight: '280px' }}
                />
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Year badge */}
            {project.year && (
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {project.year}
              </span>
            )}

            {/* Abstract */}
            {project.abstract && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Abstract</p>
                <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{project.abstract.trim()}</p>
              </div>
            )}

            {/* Links */}
            {(project.paper_link || project.github_link || project.demo_link || project.blog_link) && (
              <div className="pt-1">
                <ProjectLinks p={project} size="md" />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AcademicProjectsClient({ content }: { content: any }) {
  const projects = (content?.academic?.academic_projects || []) as AcademicProject[]
  const [activeProject, setActiveProject] = useState<AcademicProject | null>(null)
  const placeholderImage = '/assets/placeholder-generic.svg'

  const sorted = [...projects].sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Research Projects</h1>
          <div className="h-1 w-16 mt-3 bg-blue-600" />
          <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-slate-600">
            Highlighting key academic research and capstone engineering projects. Click any project to read the full abstract.
          </p>
        </motion.div>

        <div className="space-y-4">
          {sorted.map((p, i) => (
            <motion.div
              key={`${p.year}-${p.title}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActiveProject(p)}
              className="group flex gap-4 items-start rounded-xl border border-slate-200 bg-white p-3 md:p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              {/* Thumbnail — left */}
              <div className="shrink-0 w-28 h-20 md:w-36 md:h-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <img
                  src={p.image || placeholderImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Text — right */}
              <div className="min-w-0 flex-1 space-y-1.5">
                {/* Venue tag + year */}
                <div className="flex flex-wrap items-center gap-2">
                  {p.venue && (
                    <span className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-blue-700">
                      {p.venue}
                    </span>
                  )}
                  {p.year && (
                    <span className="text-[10px] md:text-xs font-semibold text-slate-400">{p.year}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold leading-snug text-slate-900 group-hover:text-blue-800 transition-colors">
                  {p.title}
                </h3>

                {/* Description (one-liner) */}
                {p.description && (
                  <p className="text-xs md:text-sm text-slate-500 leading-snug line-clamp-2">
                    <span className="font-semibold text-blue-700">TL;DR</span>{' '}
                    {p.description}
                  </p>
                )}

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <div className="hidden md:flex flex-wrap gap-1 pt-0.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                  <ProjectLinks p={p} size="sm" />
                </div>
              </div>
            </motion.div>
          ))}

          {sorted.length === 0 && (
            <p className="text-slate-500 italic">No academic projects available.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}
