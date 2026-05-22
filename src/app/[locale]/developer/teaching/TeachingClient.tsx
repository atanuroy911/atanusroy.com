'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { BookOpen, Users, Code, Server, Cpu, Activity, GraduationCap } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TeachingClient({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'
  
  const courses = content?.academic?.teaching_courses || []

  // Assign icons/colors to courses based on name keywords
  const getCourseMeta = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('data structure') || n.includes('algorithm')) return { icon: Code, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
    if (n.includes('operating')) return { icon: Server, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }
    if (n.includes('embedded') || n.includes('hardware')) return { icon: Cpu, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' }
    if (n.includes('statistic') || n.includes('math')) return { icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
    return { icon: BookOpen, color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }
  }

  if (isDev) {
    return (
      <div className="py-24 bg-white dark:bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="font-mono-dev text-sm text-black dark:text-black uppercase font-bold mb-2 block tracking-widest bg-[#00d9ff] w-fit px-2 py-0.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">// education_delivery</span>
            <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">Teaching</h1>
            <div className="h-2 w-24 mt-4 bg-black dark:bg-white" />
            <p className="mt-6 text-black dark:text-white font-medium bg-[#ffde00] p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] max-w-xl dark:text-black">
              Lecturer @ ULAB, Dept of CSE. Sharing knowledge on systems and software.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c: { name: string; code: string }, i: number) => {
              const meta = getCourseMeta(c.name)
              const Icon = meta.icon
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`dev-glass rounded-none p-6 dev-border-glow bg-white dark:bg-black`}
                >
                  <div className={`w-10 h-10 rounded-none flex items-center justify-center mb-4 ${meta.bg} ${meta.border} border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]`}>
                    <Icon size={18} className="text-black dark:text-white" />
                  </div>
                  <div className="font-mono-dev font-bold uppercase text-[10px] tracking-widest text-black dark:text-white mb-2 bg-[#ff3366] text-white dark:text-black w-fit px-1 border border-black dark:border-white">{c.code}</div>
                  <h3 className="text-black dark:text-white font-black uppercase text-sm leading-snug">{c.name}</h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Academic mode
  return (
    <div className="py-24 dark:bg-slate-950" style={{ background: 'var(--ac-bg)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="ac-font-serif text-5xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
            Teaching
          </h1>
          <div className="h-0.5 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            I serve as a Lecturer in the Department of Computer Science & Engineering at the University of Liberal Arts Bangladesh (ULAB), guiding students in core computer science principles and supervising capstone engineering projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="ac-font-serif text-xl font-bold mb-4" style={{ color: 'var(--ac-navy)' }}>Courses Taught</h3>
            {courses.map((c: { name: string; code: string }, i: number) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="ac-paper rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 border border-blue-100 flex-shrink-0">
                  <BookOpen size={18} className="text-blue-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 leading-snug">{c.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{c.code} · Undergraduate Level</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="ac-paper rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-amber-600" />
                <h3 className="ac-font-serif text-xl font-bold" style={{ color: 'var(--ac-navy)' }}>Student Supervision</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I actively guide undergraduate students in their final year capstone projects. My supervision focuses on solving complex engineering problems within the domains of computer vision, IoT systems, and robotics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="ac-paper rounded-xl p-6"
              style={{ background: 'var(--ac-navy)', color: 'white' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-blue-200" />
                <h3 className="ac-font-serif text-xl font-bold">Current Affiliation</h3>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                Lecturer, Dept. of CSE<br />
                University of Liberal Arts Bangladesh<br />
                Dhaka, Bangladesh
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
