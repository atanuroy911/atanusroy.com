'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StudentsClient({ content }: { content: any }) {
  const students = content?.academic?.students || []

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Students
          </h1>
          <div className="h-1 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
            I actively guide undergraduate students in their final year capstone projects. My supervision focuses on solving complex engineering problems within the domains of computer vision, IoT systems, and robotics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((s: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="ac-paper rounded-xl p-5 flex items-start gap-5 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-200">
                <img 
                  src={s.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=random`} 
                  alt={s.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{s.name}</h3>
                <p className="text-sm font-medium text-slate-500 mb-2">{s.details}</p>
                {s.project && <p className="text-sm text-slate-600"><span className="font-semibold">Project:</span> {s.project}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
