'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, BookOpen, Layers, GitBranch, Globe, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DevProjectModal } from '@/components/developer/DevProjectModal'

const PAGE_SIZE = 6

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectsClient({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  const isAc = mode === 'academic'

  if (isDev) return <DevProjects content={content?.developer} />
  if (isAc) return <AcademicProjects content={content?.academic} />
  return null
}

function DevProjects({ content }: { content: any }) {
  const projects = content?.projects || []
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, projects.length))
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, projects.length])

  return (
    <div className="port">
      <div className="dev-projects-page">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div className="sec-label">// all_projects</div>
          <h1 className="sec-title">My Work</h1>
          <p className="sec-sub">A collection of things I&apos;ve shipped — from side projects to production systems.</p>
        </div>

        {/* Project grid */}
        <div className="dev-proj-grid">
          {visibleProjects.map((p: any, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % PAGE_SIZE) * 0.06 }}
              className="dev-proj-card"
              onClick={() => setSelectedProject(p)}
            >
              {p.image && (
                <div className="dev-proj-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.title} className="dev-proj-image" loading="lazy" />
                </div>
              )}
              <div className="dev-proj-card-inner">
                {/* Top row: icon + links */}
                <div className="dev-proj-card-top">
                  <div className="dev-proj-icon">
                    <Layers size={22} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {p.featured && (
                      <span className="dev-proj-featured-badge">Featured</span>
                    )}
                    <div className="dev-proj-links">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dev-proj-link-btn"
                          title="View on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                        <GitBranch size={16} />
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dev-proj-link-btn"
                          title="Live demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="dev-proj-title">{p.title}</div>

                {/* Description */}
                <div className="dev-proj-desc">{p.description}</div>

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <div className="dev-proj-tags">
                    {p.tags.map((t: string) => (
                      <span key={t} className="dev-proj-tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div ref={sentinelRef} className="dev-proj-load-more">
            <Loader2 size={18} className="animate-spin" />
            <span>Loading more projects…</span>
          </div>
        )}
      </div>

      <DevProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AcademicProjects({ content }: { content: any }) {
  const publications = content?.publications || []

  const typeColor = (type: string) =>
    type === 'journal' ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-green-700 bg-green-50 border-green-200'

  return (
    <div className="py-24 dark:bg-slate-950" style={{ background: 'var(--ac-bg)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="ac-font-serif text-5xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
            Publications
          </h1>
          <div className="h-0.5 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive list of my peer-reviewed journal and conference papers spanning computer vision, robotics, and IoT systems.
          </p>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub: { title: string; authors: string; venue: string; year: number; type: string; tags: string[] }, i: number) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="ac-paper rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <BookOpen size={16} style={{ color: 'var(--ac-navy)' }} />
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor(pub.type)}`}>
                      {pub.type === 'journal' ? 'Journal Article' : 'Conference Paper'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{pub.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 leading-tight">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 italic">
                    {pub.authors}
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--ac-navy)' }}>
                    {pub.venue}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pub.tags.map((t: string) => (
                      <Badge key={t} variant="secondary" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
