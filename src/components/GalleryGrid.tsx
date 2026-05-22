'use client'

import { motion } from 'framer-motion'

export function GalleryGrid({ images, isDev }: { images: { src: string; caption: string }[], isDev?: boolean }) {
  if (!images || images.length === 0) {
    return <div className="text-center text-muted-foreground py-12">No images available yet.</div>
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`break-inside-avoid relative group overflow-hidden bg-card ${
            isDev 
              ? 'rounded-none border-4 border-black dark:border-white shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#fff] transition-all'
              : 'rounded-xl border border-border'
          }`}
        >
          <img
            src={img.src || '/assets/placeholder-generic.svg'}
            alt={img.caption}
            className={`w-full h-auto object-cover ${isDev ? 'grayscale hover:grayscale-0 transition-all duration-300' : ''}`}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 ${isDev ? 'border-t-4 border-black dark:border-white bg-[#ff3366]/80' : ''}`}>
            <p className={`text-white font-medium ${isDev ? 'font-mono-dev font-bold uppercase tracking-widest text-xs' : 'text-sm'}`}>{img.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
