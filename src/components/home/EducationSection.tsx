'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { GraduationCap, School } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EducationSection({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  const edu = content?.academic?.education || []

  if (isDev) {
    // Dev mode: compact strip at bottom
    return (
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="font-mono-dev text-sm text-black dark:text-white uppercase font-bold mb-2 block tracking-widest bg-[#ff3366] text-white w-fit px-2 py-0.5 border-2 border-black">// education</span>
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white uppercase tracking-tighter">Academic Background</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {edu.slice(0, 2).map((e: { degree: string; institution: string; period: string; grade: string }, i: number) => (
              <motion.div
                key={e.institution}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="dev-glass rounded-none p-4 dev-border-glow bg-white dark:bg-black"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-[#00d9ff] dark:bg-[#ff3366] border-2 border-black dark:border-white p-1.5 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                    <GraduationCap size={20} className="text-black dark:text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-black dark:text-white font-black uppercase text-sm leading-snug">{e.degree}</p>
                    <p className="font-mono-dev font-bold tracking-widest text-xs text-black dark:text-black mt-1 bg-[#ffde00] px-1 w-fit border border-black dark:border-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">{e.institution}</p>
                    <div className="flex items-center gap-3 mt-2 border-t-2 border-black dark:border-white pt-1">
                      <span className="font-mono-dev font-bold text-[10px] uppercase text-black dark:text-white">{e.period}</span>
                      <span className="font-mono-dev font-bold text-[10px] uppercase text-white dark:text-black bg-black dark:bg-white px-1 border border-black dark:border-white shadow-[1px_1px_0px_#ff3366] dark:shadow-[1px_1px_0px_#00d9ff]">{e.grade}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Academic mode: full timeline
  return (
    <section className="py-24 bg-secondary/10 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="ac-font-serif text-4xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
            Education
          </h2>
          <div className="h-0.5 w-16 mt-2" style={{ background: 'var(--ac-gold)' }} />
        </motion.div>
        <div className="space-y-4">
          {edu.map((e: { degree: string; institution: string; location: string; period: string; grade: string }, i: number) => (
            <motion.div
              key={e.institution + i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="ac-paper rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(26, 46, 74, 0.08)' }}>
                {i < 2 ? <GraduationCap size={18} style={{ color: 'var(--ac-navy)' }} /> : <School size={18} style={{ color: 'var(--ac-navy)' }} />}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{e.degree}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--ac-navy)' }}>{e.institution}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{e.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-slate-600">{e.period}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{e.grade}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

