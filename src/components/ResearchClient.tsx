'use client'

import { motion } from 'framer-motion'
import { FlaskConical } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResearchClient({ content }: { content: any }) {
  const research = content?.academic?.research_statements || []

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Research Focus
          </h1>
          <div className="h-1 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
            My research lies at the intersection of Computer Vision, Robotics, and Embedded Systems.
          </p>
        </motion.div>

        <div className="space-y-8">
          {research.map((r: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="ac-paper rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 border border-blue-100">
                  <FlaskConical size={20} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{r.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
