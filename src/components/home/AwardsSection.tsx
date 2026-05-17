'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Trophy, Award } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AwardsSection({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  const awards = content?.academic?.awards || []

  if (isDev) return null // Dev mode doesn't show awards prominently

  return (
    <section className="py-20 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="ac-font-serif text-4xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
            Awards & Honors
          </h2>
          <div className="h-0.5 w-16 mt-2" style={{ background: 'var(--ac-gold)' }} />
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {awards.map((a: { year: string; title: string; org: string }, i: number) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="ac-paper rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(184, 134, 11, 0.12)' }}>
                {i === 0 ? <Trophy size={15} style={{ color: 'var(--ac-gold)' }} /> : <Award size={15} style={{ color: 'var(--ac-gold)' }} />}
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 mb-0.5">{a.year}</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{a.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{a.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

