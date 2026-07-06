'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Showcase3DProps {
  image?: string
  glyph?: string
  hint?: string
  badge?: string
  url?: string
}

export function Showcase3D({ image, glyph = '✦', hint = 'Live project', badge, url }: Showcase3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div className="showcase-3d-wrap">
      <motion.div
        ref={ref}
        className="showcase-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        <div className="showcase-3d-media">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={hint} loading="lazy" />
          ) : (
            <div className="showcase-3d-fallback">
              <span className="s3d-glyph">{glyph}</span>
              <span className="s3d-hint">{hint}</span>
            </div>
          )}
          <div className="showcase-3d-glare" />
        </div>
        {(badge || url) && (
          <div className="showcase-3d-bar">
            {badge && <span className="s3d-badge">{badge}</span>}
            {url && <span className="s3d-url">{url}</span>}
          </div>
        )}
      </motion.div>
    </div>
  )
}
