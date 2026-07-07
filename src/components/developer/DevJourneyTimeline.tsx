'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface TimelineEntry {
  year: string
  title: string
  summary: string
  details?: string
  tags?: string[]
  image?: string
}

export function DevJourneyTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  const [active, setActive] = useState<TimelineEntry | null>(null)

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <>
      <div className="dev-timeline">
        {timeline.map((entry, i) => (
          <motion.div
            key={`${entry.year}-${i}`}
            className="dev-timeline-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="dev-timeline-marker">
              <div className="dev-timeline-dot" />
              <div className="dev-timeline-year">{entry.year}</div>
            </div>

            <div className="dev-timeline-card" onClick={() => setActive(entry)}>
              <div className="dev-timeline-card-title">{entry.title}</div>
              <div className="dev-timeline-card-summary">{entry.summary}</div>
              {entry.tags && entry.tags.length > 0 && (
                <div className="dev-timeline-card-tags">
                  {entry.tags.map((t) => (
                    <span key={t} className="pill"><span>{t}</span></span>
                  ))}
                </div>
              )}
              <div className="dev-timeline-card-cta">Read more →</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="dev-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="dev-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="dev-modal-close" onClick={() => setActive(null)} aria-label="Close">
                <X size={16} />
              </button>
              <div className="dev-modal-media">
                {active.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={active.image} alt={active.title} />
                ) : (
                  <span>{active.year}</span>
                )}
              </div>
              <div className="dev-modal-body">
                <div className="dev-modal-year">{active.year}</div>
                <div className="dev-modal-title">{active.title}</div>
                <div className="dev-modal-details">{active.details || active.summary}</div>
                {active.tags && active.tags.length > 0 && (
                  <div className="tech-pills">
                    {active.tags.map((t) => (
                      <div key={t} className="pill"><span>{t}</span></div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
