'use client'

import { motion } from 'framer-motion'

interface GalleryImage {
  src: string
  caption: string
}

export function DevGalleryGrid({ images }: { images: GalleryImage[] }) {
  if (!images || images.length === 0) {
    return <p className="sec-sub" style={{ textAlign: 'center', padding: '48px 0' }}>No images yet — check back soon.</p>
  }

  return (
    <div className="dev-gallery-grid">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: (i % 6) * 0.06, duration: 0.4 }}
          className="dev-gallery-card"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.caption} loading="lazy" />
          <div className="dev-gallery-overlay">
            <p>{img.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
