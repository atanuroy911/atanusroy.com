'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Badge } from '@/components/ui/badge'
import { Code2, Layers, Cpu, Database } from 'lucide-react'

const ICONS = { Code2, Layers, Cpu, Database }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AboutSection({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'

  const devContent = content?.developer
  const acContent = content?.academic

  if (isDev) return <DevAbout content={devContent} personal={content?.personal} />
  return <AcademicAbout content={acContent} personal={content?.personal} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DevAbout({ content, personal }: { content: any; personal: any }) {
  const stack = content?.tech_stack || []

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono-dev text-sm text-black dark:text-black uppercase font-bold mb-2 block tracking-widest bg-[#00d9ff] w-fit px-2 py-0.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">// about me</span>
          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter mb-4">What I Do</h2>
          <div className="h-2 w-24 bg-black dark:bg-white" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-black dark:text-black font-medium text-lg leading-relaxed mb-6 bg-[#ffde00] p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff]">
              {content?.bio}
            </p>
            <p className="font-mono-dev font-bold uppercase tracking-widest text-sm text-black dark:text-white bg-white dark:bg-black w-fit px-3 py-1 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
              📍 {personal?.location}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {content?.stats?.map((s: { label: string; value: string }) => (
                <div key={s.label} className="dev-glass rounded-none p-4 dev-border-glow">
                  <div className="text-3xl font-black mb-1 text-black dark:text-white">{s.value}</div>
                  <div className="text-xs font-mono-dev font-bold uppercase tracking-widest text-black dark:text-white">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start"
          >
            {stack.map((cat: { category: string; items: string[] }, i: number) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="font-mono-dev text-xs font-bold uppercase tracking-widest mb-2 text-white dark:text-black bg-[#ff3366] dark:bg-[#ffde00] w-fit px-2 py-0.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                  {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item: string) => (
                    <span
                      key={item}
                      className="font-mono-dev font-bold uppercase tracking-widest text-xs px-2.5 py-1 text-black dark:text-white bg-white dark:bg-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] dark:hover:shadow-[1px_1px_0px_#fff] transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AcademicAbout({ content, personal }: { content: any; personal: any }) {
  return (
    <section className="py-24 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="ac-font-serif text-4xl font-bold mb-2 dark:text-white" style={{ color: 'var(--ac-text)' }}>
            About
          </h2>
          <div className="h-0.5 w-16 ac-divider border-0" style={{ background: 'var(--ac-gold)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <p className="text-slate-700 dark:text-slate-300 text-lg leading-loose mb-6">
              {content?.bio}
            </p>

            {/* Skills grid for academic */}
            {[
              { cat: 'Programming', items: ['Python', 'C/C++', 'JavaScript', 'MATLAB'] },
              { cat: 'ML Frameworks', items: ['PyTorch', 'TensorFlow', 'OpenCV', 'Scikit-learn'] },
              { cat: 'Systems', items: ['Raspberry Pi', 'Arduino', 'LoRaWAN', 'MQTT', 'Linux'] },
            ].map((g) => (
              <div key={g.cat} className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">{g.cat}</span>
                <div className="flex flex-wrap gap-2">
                  {g.items.map(i => (
                    <Badge key={i} variant="secondary" className="text-xs">{i}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="ac-paper rounded-xl p-5">
              <h4 className="ac-font-serif font-semibold text-sm uppercase tracking-widest text-slate-500 mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div><span className="font-medium">Email:</span> {personal?.email}</div>
                <div><span className="font-medium">Phone:</span> {personal?.phone}</div>
                <div><span className="font-medium">Location:</span> {personal?.location}</div>
              </div>
            </div>
            <div className="ac-paper rounded-xl p-5">
              <h4 className="ac-font-serif font-semibold text-sm uppercase tracking-widest text-slate-500 mb-3">Research Interests</h4>
              <ul className="space-y-1.5">
                {content?.research_interests?.map((ri: string) => (
                  <li key={ri} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--ac-gold)' }} />
                    {ri}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

