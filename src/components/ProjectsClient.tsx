'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Badge } from '@/components/ui/badge'
import { FileText, ExternalLink, BookOpen, Layers } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { ProjectModal } from '@/components/ui/ProjectModal'

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

  return (
    <div className="port pt-40 pb-32 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-24 text-center">
          <div className="sec-label">// all_projects</div>
          <div className="sec-title">My Work</div>
        </div>

        <div className="grid gap-12">
          {projects.map((p: any, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedProject(p)}
              className="service-card cursor-pointer !items-start w-full"
            >
              <div className="flex items-start justify-between w-full mb-6">
                <div className="service-icon mb-0">
                  <Layers size={32} />
                </div>
                {p.type && (
                  <div className="project-tag !text-[12px]">{p.type}</div>
                )}
              </div>
              <div className="project-title !text-3xl !mb-4 group-hover:text-blue-600 transition-colors">
                {p.title}
              </div>
              <div className="project-desc !text-lg mb-8 flex-grow max-w-3xl">
                {p.description}
              </div>
              <div className="tech-pills mt-auto">
                {p.tags.map((t: string) => (
                  <div key={t} className="pill">{t}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
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
