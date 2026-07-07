'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2 } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DevProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="dev-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="dev-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="dev-modal-close" onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>
            <div className="dev-modal-media">
              {project.showcase_image || project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.showcase_image || project.image} alt={project.title} />
              ) : (
                <span>{project.mockup_icon || '✦'}</span>
              )}
            </div>
            <div className="dev-modal-body">
              {project.featured && <div className="dev-modal-year">Featured Project</div>}
              <div className="dev-modal-title">{project.title}</div>
              <div className="dev-modal-details">{project.description}</div>
              {project.tags && project.tags.length > 0 && (
                <div className="tech-pills">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {project.tags.map((t: string) => (
                    <div key={t} className="pill"><span>{t}</span></div>
                  ))}
                </div>
              )}
              {(project.link || project.github) && (
                <div className="dev-modal-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Live Site <ExternalLink size={15} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                      GitHub <Code2 size={15} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
