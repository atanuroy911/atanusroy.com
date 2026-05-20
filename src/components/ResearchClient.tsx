'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, X } from 'lucide-react'

function ResearchDetailModal({
  item,
  onClose,
}: {
  item: any
  onClose: () => void
}) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-3 md:p-4">
      <button
        aria-label="Close research details"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:bg-slate-950 dark:border-white/10 flex flex-col md:flex-row">
        <div className="w-full md:w-[42%] min-h-55 md:min-h-full bg-slate-100 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10">
          {item.featured_image ? (
            <img src={item.featured_image} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center p-8 text-center text-slate-500">
              <div>
                <FlaskConical size={44} className="mx-auto mb-3 text-slate-400" />
                <p className="text-sm uppercase tracking-widest font-semibold">Research Detail</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-[58%] p-5 md:p-7 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Research Focus</p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: 'var(--ac-navy)' }}>{item.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:text-black hover:border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
            {item.long_description || item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {(item.topics || []).map((topic: string) => (
              <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ResearchClient({ content }: { content: any }) {
  const research = content?.academic?.research_statements || []
  const [selected, setSelected] = useState<any | null>(null)

  return (
    <>
      <div className="py-6 md:py-8" style={{ minHeight: '100vh' }}>
        <div className="max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Research Focus
            </h1>
            <div className="h-1 w-16 md:w-20 mt-3 md:mt-4" style={{ background: 'var(--ac-gold)' }} />
            <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
              My research lies at the intersection of Computer Vision, Robotics, and Embedded Systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {research.map((r: any, i: number) => (
              <motion.button
                key={i}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(r)}
                className="group text-left overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {r.featured_image ? (
                    <img src={r.featured_image} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center p-8 text-slate-400">
                      <FlaskConical size={48} />
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 dark:bg-slate-900 dark:border-slate-800">
                      <FlaskConical size={18} className="text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-bold leading-snug text-slate-800 dark:text-slate-100 line-clamp-2">
                        {r.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                    {r.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <ResearchDetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
