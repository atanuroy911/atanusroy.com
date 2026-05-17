'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import Link from 'next/link'
import { BookOpen, Users, Code, Server, Cpu, Activity, GraduationCap, Link as LinkIcon, ChevronDown, ChevronUp, FileText, FolderOpen, History } from 'lucide-react'

import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TeachingClient({ content }: { content: any }) {
  const { mode } = useMode()
  const pathname = usePathname()
  const isDev = mode === 'developer'
  const courses = content?.academic?.teaching_courses || []

  const activeCourses = courses.filter((c: any) => !c.archived)
  const archivedCourses = courses.filter((c: any) => c.archived)

  const coursesBySemester = activeCourses.reduce((acc: any, course: any) => {
    const sem = course.semester || 'Other'
    if (!acc[sem]) acc[sem] = []
    acc[sem].push(course)
    return acc
  }, {})

  const getCourseMeta = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('data structure') || n.includes('algorithm')) return { icon: Code, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' }
    if (n.includes('operating')) return { icon: Server, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' }
    if (n.includes('embedded') || n.includes('hardware')) return { icon: Cpu, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' }
    if (n.includes('statistic') || n.includes('math')) return { icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' }
    return { icon: BookOpen, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' }
  }

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Teaching & Mentorship
          </h1>
          <div className="h-1 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
            I serve as a Lecturer in the Department of Computer Science & Engineering at the University of Liberal Arts Bangladesh (ULAB), guiding students in core computer science principles and supervising capstone engineering projects.
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(coursesBySemester).map(([semester, sCourses], semIdx) => (
            <div key={semester}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {semester}
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                {(sCourses as any[]).map((c: any, i: number) => (
                  <CourseCard key={c.name} course={c} index={i} meta={getCourseMeta(c.name)} />
                ))}
              </div>
            </div>
          ))}

          {archivedCourses.length > 0 && (
            <div className="pt-8 mt-8 border-t border-slate-200">
              <Link href={`${pathname}/archived`} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
                <History size={18} />
                Show Past Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CourseCard({ course, index, meta }: { course: any, index: number, meta: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="ac-paper rounded-xl border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div 
        className={`p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${isOpen ? 'border-b border-slate-100' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${meta.bg} ${meta.border} flex-shrink-0`}>
            <Icon size={24} className={meta.color} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg leading-snug">{course.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{course.code}</span>
              {course.semester && (
                <span className="text-xs font-medium text-slate-400">{course.semester}</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-slate-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-slate-50 border-t border-slate-100">
              {course.description && (
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{course.description}</p>
              )}

              {course.syllabus_link && (
                <a href={course.syllabus_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors mb-6 border border-blue-100">
                  <FileText size={16} />
                  Course Syllabus & Details
                </a>
              )}

              {/* Materials groups */}
              {course.materials && course.materials.length > 0 && (
                <div className="space-y-6">
                  {course.materials.map((group: any, idx: number) => (
                    <div key={idx}>
                      <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <FolderOpen size={16} className="text-slate-400" />
                        {group.title}
                      </h5>
                      <ul className="space-y-2 pl-6">
                        {group.items?.map((item: any, i: number) => (
                          <li key={i} className="relative">
                            <div className="absolute -left-4 top-2 w-1.5 h-1.5 rounded-full bg-slate-300" />
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-sm text-slate-600 hover:text-blue-600 hover:underline flex items-center gap-1.5 transition-colors group"
                            >
                              <LinkIcon size={12} className="text-slate-400 group-hover:text-blue-500" />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              
              {(!course.materials || course.materials.length === 0) && (
                <p className="text-sm text-slate-500 italic">No materials uploaded yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
