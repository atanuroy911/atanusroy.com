'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, BookOpen, FileText } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ProjectModal } from '@/components/ui/ProjectModal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectsPreview({ content, locale }: { content: any; locale: string }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  if (isDev) return <DevProjects content={content} locale={locale} />
  return <AcademicPublications content={content} locale={locale} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DevProjects({ content, locale }: { content: any; locale: string }) {
  const projects = (content?.developer?.projects || []).filter((p: { featured?: boolean }) => p.featured)
  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="font-mono-dev text-sm text-black dark:text-white uppercase font-bold mb-2 block tracking-widest bg-[#ffde00] dark:bg-[#ff3366] w-fit px-2 py-0.5 border-2 border-black dark:border-white">// selected_work</span>
            <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter">Featured Projects</h2>
            <div className="h-2 w-24 mt-3 bg-black dark:bg-white" />
          </div>
          <Link href={`/${locale}/developer/projects`}
            className="font-mono-dev text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-1 border-2 border-transparent hover:border-black dark:hover:border-white px-2 py-1 transition-all">
            view all <ExternalLink size={12} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p: { title: string; description: string; tags: string[]; type?: string; github?: string; link?: string }, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setSelectedProject(p)}
              className="dev-glass rounded-2xl p-6 dev-border-glow group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-none flex items-center justify-center border-2 border-black dark:border-white bg-[#00d9ff] shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                  <FileText size={18} className="text-black" />
                </div>
                {p.type && (
                  <Badge variant="outline"
                    className="font-mono-dev font-bold uppercase tracking-widest text-[10px] border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                    {p.type}
                  </Badge>
                )}
              </div>
              <h3 className="text-black dark:text-white font-black uppercase text-lg mb-2 group-hover:underline transition-colors leading-snug">
                {p.title}
              </h3>
              <p className="text-black dark:text-white font-medium text-sm leading-relaxed mb-4 line-clamp-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t: string) => (
                  <span key={t} className="font-mono-dev text-[10px] font-bold uppercase px-2 py-0.5 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">
                    {t}
                  </span>
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
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AcademicPublications({ content, locale }: { content: any; locale: string }) {
  const pubs = (content?.academic?.publications || []).slice(0, 4)

  const typeColor = (type: string) =>
    type === 'journal' ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-green-700 bg-green-50 border-green-200'

  return (
    <section id="publications" className="py-24 bg-secondary/10 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="ac-font-serif text-4xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
              Selected Publications
            </h2>
            <div className="h-0.5 w-16 mt-2" style={{ background: 'var(--ac-gold)' }} />
          </div>
          <Link href={`/${locale}/projects`}
            className="text-sm font-medium hover:underline flex items-center gap-1"
            style={{ color: 'var(--ac-navy)' }}>
            All publications <ExternalLink size={12} />
          </Link>
        </motion.div>

        <div className="space-y-4">
          {pubs.map((pub: { title: string; authors: string; venue: string; year: number; type: string; tags: string[] }, i: number) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="ac-paper rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={14} style={{ color: 'var(--ac-navy)' }} />
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor(pub.type)}`}>
                      {pub.type === 'journal' ? 'Journal' : 'Conference'}
                    </span>
                    <span className="text-xs text-slate-400">{pub.year}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug mb-1.5">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-500 italic mb-1">{pub.authors}</p>
                  <p className="text-xs font-medium" style={{ color: 'var(--ac-navy)' }}>{pub.venue}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

