'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Book, FolderOpen, Link as LinkIcon, FileText } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArchivedCoursesClient({ content }: { content: any }) {
  const pathname = usePathname()
  const parentPath = pathname.replace('/archived', '')

  const courses = content?.academic?.teaching_courses || []
  const archivedCourses = courses.filter((c: any) => c.archived)

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({})
  const toggle = (key: string) => setOpenMap((s) => ({ ...s, [key]: !s[key] }))

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href={parentPath} className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-medium">
            <ArrowLeft size={16} />
            Go Back
          </Link>

          <h1 className="text-3xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Past Courses
          </h1>
          <div className="h-1 w-16 mt-4 mb-6" style={{ background: 'var(--ac-gold)' }} />
          <p className="text-slate-600">
            Archive of courses taught in previous semesters.
          </p>
        </motion.div>

        <div className="space-y-4">
          {archivedCourses.map((c: any, i: number) => {
            const key = c.code || c.name || String(i)
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="ac-paper rounded-xl border border-slate-200 overflow-hidden"
              >
                <div
                  className={`p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${openMap[key] ? 'border-b border-slate-100' : ''}`}
                  onClick={() => toggle(key)}
                >
                  <div className="flex items-center gap-4">
                    <Book className="text-slate-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold text-slate-700 text-lg">{c.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{c.code}</span>
                        {c.semester && (
                          <span className="text-xs font-medium text-slate-400">{c.semester}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400">{openMap[key] ? '▲' : '▼'}</div>
                </div>

                <AnimatePresence>
                  {openMap[key] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-5 bg-slate-50 border-t border-slate-100">
                        {c.description && (
                          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{c.description}</p>
                        )}

                        {c.syllabus_link && (
                          <a href={c.syllabus_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors mb-4 border border-blue-100">
                            <FileText size={16} />
                            Course Syllabus & Details
                          </a>
                        )}

                        {c.materials && c.materials.length > 0 ? (
                          <div className="space-y-6">
                            {c.materials.map((group: any, idx: number) => (
                              <div key={idx}>
                                <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                  <FolderOpen size={16} className="text-slate-400" />
                                  {group.title}
                                </h5>
                                <ul className="space-y-2 pl-6">
                                  {group.items?.map((item: any, ii: number) => (
                                    <li key={ii} className="relative">
                                      <div className="absolute -left-4 top-2 w-1.5 h-1.5 rounded-full bg-slate-300" />
                                      <a href={item.link} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-blue-600 hover:underline flex items-center gap-1.5 transition-colors group">
                                        <LinkIcon size={12} className="text-slate-400 group-hover:text-blue-500" />
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500 italic">No materials uploaded yet.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {archivedCourses.length === 0 && (
            <p className="text-slate-500 italic">No archived courses available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
