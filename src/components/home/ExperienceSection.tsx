'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Briefcase, FlaskConical, GraduationCap } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExperienceSection({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  if (isDev) return <DevExperience content={content?.developer} />
  return <AcademicExperience content={content?.academic} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DevExperience({ content }: { content: any }) {
  const exp = content?.experience || []

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono-dev text-sm text-black dark:text-white uppercase font-bold mb-2 block tracking-widest bg-[#00d9ff] w-fit px-2 py-0.5 border-2 border-black">// work_history</span>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter">Industry Experience</h2>
          <div className="h-2 w-24 mt-3 bg-black dark:bg-white" />
        </motion.div>

        <div className="space-y-4">
          {exp.map((e: { role: string; org: string; period: string; location: string; bullets: string[] }, i: number) => (
            <motion.div
              key={e.org + i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="dev-glass rounded-none p-6 dev-border-glow"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-black dark:text-white font-black text-xl uppercase tracking-tight">{e.role}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Briefcase size={14} className="text-black dark:text-white" />
                    <span className="text-black dark:text-white bg-[#ffde00] dark:bg-[#00d9ff] px-2 py-0.5 font-mono-dev font-bold uppercase tracking-widest text-xs border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">{e.org}</span>
                  </div>
                </div>
                <div className="text-left md:text-right bg-white dark:bg-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] p-2 w-full md:w-auto mt-2 md:mt-0">
                  <div className="font-mono-dev font-bold uppercase text-xs text-black dark:text-white">{e.period}</div>
                  <div className="font-mono-dev text-xs text-black dark:text-white mt-1 border-t-2 border-black dark:border-white pt-1">{e.location}</div>
                </div>
              </div>
              <ul className="space-y-2 mt-6">
                {e.bullets.map((b: string) => (
                  <li key={b} className="text-black dark:text-white text-sm flex items-start gap-3 font-medium">
                    <span className="text-white dark:text-black bg-[#ff3366] dark:bg-[#ffde00] px-1 border-2 border-black dark:border-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff] mt-0.5 flex-shrink-0 font-mono-dev font-bold">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AcademicExperience({ content }: { content: any }) {
  const exp = content?.experience || []

  const typeIcon = (type: string) => {
    if (type === 'teaching') return <GraduationCap size={14} />
    if (type === 'research') return <FlaskConical size={14} />
    return <Briefcase size={14} />
  }
  const typeColor = (type: string) => {
    if (type === 'teaching') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    if (type === 'research') return 'bg-blue-50 text-blue-700 border-blue-200'
    return 'bg-amber-50 text-amber-700 border-amber-200'
  }

  return (
    <section className="py-24 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="ac-font-serif text-4xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
            Experience
          </h2>
          <div className="h-0.5 w-16 mt-2" style={{ background: 'var(--ac-gold)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[17px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700" />
          <div className="space-y-8">
            {exp.map((e: { role: string; org: string; type: string; period: string; location: string; bullets: string[] }, i: number) => (
              <motion.div
                key={e.org + i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 w-9 h-9 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-900 ${typeColor(e.type)}`}>
                  {typeIcon(e.type)}
                </div>

                <div className="ac-paper rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200">{e.role}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--ac-navy)' }}>{e.org}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">{e.period}</div>
                      <div className="text-xs text-slate-400">{e.location}</div>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {e.bullets.map((b: string) => (
                      <li key={b} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-slate-400 mt-1.5 flex-shrink-0">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

