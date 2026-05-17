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
    <div className="py-24 bg-white dark:bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="font-mono-dev text-sm text-black dark:text-black uppercase font-bold mb-2 block tracking-widest bg-[#00d9ff] w-fit px-2 py-0.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">// all_projects</span>
          <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">My Work</h1>
          <div className="h-2 w-24 mt-4 bg-black dark:bg-white" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: { title: string; description: string; tags: string[]; type?: string; highlight?: boolean; featured?: boolean; link?: string; github?: string }, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.01 }}
              onClick={() => setSelectedProject(p)}
              className={`dev-glass rounded-none p-6 dev-border-glow bg-white dark:bg-black group flex flex-col h-full cursor-pointer ${p.featured || p.highlight ? 'border-[3px] border-[#ff3366] dark:border-[#00d9ff]' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-none flex items-center justify-center border-2 border-black dark:border-white bg-[#ffde00] shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                  <Layers size={18} className="text-black" />
                </div>
                {p.type && (
                  <Badge variant="outline" className="font-mono-dev font-bold uppercase tracking-widest text-[10px] border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                    {p.type}
                  </Badge>
                )}
              </div>
              <h3 className="text-xl text-black dark:text-white font-black uppercase mb-2 group-hover:text-[#ff3366] dark:group-hover:text-[#00d9ff] transition-colors">
                {p.title}
              </h3>
              <p className="text-black dark:text-white font-medium text-sm leading-relaxed mb-6 flex-grow">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.tags.map((t: string) => (
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
