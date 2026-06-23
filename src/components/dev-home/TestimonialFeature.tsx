'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

export function TestimonialFeature({ content }: { content: any }) {
  const home = content?.developer
  const feat = home?.testimonial_feature

  if (!feat) return null

  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, amount: 0.3 })

  return (
    <section 
      ref={rowRef}
      className="relative py-28 bg-[#0F172A] text-white overflow-hidden border-b border-slate-800"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-10 text-[#60A5FA]"
        >
          <Quote size={28} className="fill-[#60A5FA]" />
        </motion.div>

        {/* Cinematic Pull Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-relaxed text-slate-100 mb-10 text-center italic"
        >
          "{feat.quote}"
        </motion.blockquote>

        {/* Client Info */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Avatar placeholder */}
          <div className="w-14 h-14 rounded-full border border-slate-700 bg-slate-900 overflow-hidden mb-3 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-500" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          
          <cite className="not-italic font-bold text-lg text-white block">
            {feat.author}
          </cite>
          <span className="text-sm text-slate-400">
            {feat.role}, <span className="text-[#60A5FA] font-medium">{feat.company}</span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
