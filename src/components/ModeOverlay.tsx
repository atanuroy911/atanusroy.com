'use client'

import { useMode } from '@/providers/ModeProvider'
import { motion, AnimatePresence } from 'framer-motion'

export function ModeOverlay() {
  const { isAnimating, mode } = useMode()

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: mode === 'developer'
              ? 'radial-gradient(ellipse at center, rgba(0,217,255,0.15) 0%, #04040d 60%)'
              : 'radial-gradient(ellipse at center, rgba(255,254,249,0.9) 0%, #fffef9 60%)',
          }}
        />
      )}
    </AnimatePresence>
  )
}

