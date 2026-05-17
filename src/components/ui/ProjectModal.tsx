'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Code2, Layers } from 'lucide-react'
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-5xl bg-white dark:bg-black border-[3px] border-black dark:border-white shadow-[12px_12px_0px_#000] dark:shadow-[12px_12px_0px_#fff] overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-[#ff3366] border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] dark:hover:shadow-[1px_1px_0px_#fff] transition-all"
            >
              <X size={16} className="text-white font-bold" />
            </button>

            {/* Left Column (GIF/Image) */}
            <div className="w-full md:w-[45%] bg-[#f8f9fa] dark:bg-[#111] border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white flex items-center justify-center relative overflow-hidden min-h-[200px] md:min-h-full">
               {project.gif ? (
                  <img src={project.gif} alt={project.title} className="w-full h-full object-cover" />
               ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 relative z-0 dev-grid-bg">
                    <Layers size={64} className="mb-4 opacity-50 text-black dark:text-white" />
                    <span className="font-mono-dev font-bold uppercase tracking-widest text-sm text-black dark:text-white bg-white dark:bg-black px-3 py-1 border-2 border-black dark:border-white">Visual Demo Pending</span>
                  </div>
               )}
            </div>

            {/* Right Column (Details) */}
            <div className="w-full md:w-[55%] p-6 sm:p-8 overflow-y-auto flex flex-col">
               <div className="mb-6">
                  {project.type && (
                    <Badge variant="outline" className="font-mono-dev font-bold uppercase tracking-widest text-[10px] border-2 border-black dark:border-white bg-[#00d9ff] text-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] mb-4">
                      {project.type}
                    </Badge>
                  )}
                  <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white uppercase leading-none mb-4">
                    {project.title}
                  </h2>
                  <div className="h-1.5 w-16 bg-[#ffde00] border-t-2 border-b-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] mb-6" />
                  
                  <p className="text-black dark:text-white font-medium text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags?.map((t: string) => (
                      <span key={t} className="font-mono-dev text-[10px] font-bold uppercase px-2 py-0.5 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">
                        {t}
                      </span>
                    ))}
                  </div>
               </div>
               
               <div className="mt-auto pt-6 flex flex-wrap gap-4 border-t-2 border-black dark:border-white border-dashed">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ffde00] border-2 border-black dark:border-white font-bold text-black uppercase tracking-widest text-xs sm:text-sm shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#fff] transition-all">
                      Live Site <ExternalLink size={16} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black dark:bg-white border-2 border-black dark:border-white font-bold text-white dark:text-black uppercase tracking-widest text-xs sm:text-sm shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#fff] transition-all">
                      GitHub <Code2 size={16} />
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
