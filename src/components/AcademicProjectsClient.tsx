'use client'

import { motion } from 'framer-motion'
import { FileText, PlayCircle } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AcademicProjectsClient({ content }: { content: any }) {
  const projects = content?.academic?.academic_projects || []

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Research Projects
          </h1>
          <div className="h-1 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
            Highlighting key academic research and capstone engineering projects.
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((p: any, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="grid lg:grid-cols-2 gap-8 items-start"
            >
              {/* Left Column: Video Embed */}
              <div className="w-full aspect-video bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200 relative group">
                {p.video_id ? (
                  <iframe
                    className="w-full h-full absolute inset-0"
                    src={`https://www.youtube.com/embed/${p.video_id}`}
                    title={p.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <PlayCircle size={48} className="mb-2 opacity-50" />
                    <span>No video available</span>
                  </div>
                )}
              </div>

              {/* Right Column: Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--ac-navy)' }}>
                  {p.title}
                </h2>
                
                {p.description && (
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {p.description}
                  </p>
                )}

                {p.paper_link && (
                  <div className="pt-4">
                    <a 
                      href={p.paper_link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-5 py-2.5 rounded-lg font-bold transition-colors border border-blue-200 shadow-sm"
                    >
                      <FileText size={18} />
                      Read the Paper
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {projects.length === 0 && (
            <p className="text-slate-500 italic">No academic projects available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
