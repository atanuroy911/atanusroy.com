'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectModal({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) {
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>

            {/* Left Column (GIF/Image) */}
            <div className="w-full md:w-[45%] bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 flex items-center justify-center relative overflow-hidden min-h-50 md:min-h-full">
              {project.gif ? (
                  <img src={project.gif} alt={project.title} className="w-full h-full object-cover" />
               ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ExternalLink size={48} />
                </div>
               )}
            </div>

            {/* Right Column (Details) */}
            <div className="w-full md:w-[55%] p-8 md:p-12 overflow-y-auto flex flex-col">
               <div className="mb-6">
                  {project.type && (
                    <div className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">
                      {project.type}
                    </div>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    {project.title}
                  </h2>
                  
                  <p className="text-gray-600 text-lg line-clamp-none leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags?.map((t: string) => (
                      <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
               </div>
               
               <div className="mt-auto pt-8 flex flex-wrap gap-4 border-t border-gray-100">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Live Site <ExternalLink size={18} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      GitHub <Code2 size={18} />
                    </a>
                  )}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
