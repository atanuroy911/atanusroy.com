'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Book } from 'lucide-react'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArchivedCoursesClient({ content }: { content: any }) {
  const pathname = usePathname()
  const parentPath = pathname.replace('/archived', '')
  
  const courses = content?.academic?.teaching_courses || []
  const archivedCourses = courses.filter((c: any) => c.archived)

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
          {archivedCourses.map((c: any, i: number) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <Book className="text-slate-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-bold text-slate-700 text-lg">{c.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{c.code}</span>
                  {c.semester && (
                    <span className="text-xs font-medium text-slate-400">{c.semester}</span>
                  )}
                </div>
                {c.description && (
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">{c.description}</p>
                )}
              </div>
            </motion.div>
          ))}
          
          {archivedCourses.length === 0 && (
            <p className="text-slate-500 italic">No archived courses available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
