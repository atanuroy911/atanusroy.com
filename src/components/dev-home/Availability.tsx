'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/Magnetic'
import { Calendar, Download, Clock } from 'lucide-react'

export function Availability({ content, locale }: { content: any; locale: string }) {
  const home = content?.developer
  const personal = content?.personal
  const avail = home?.availability

  const badgeText = avail?.badge || "Available for projects"
  const headlineText = avail?.headline || "Let's build something together"
  const etaText = avail?.eta || "I reply within 24 hours"
  const cvUrl = personal?.cv_url || "/assets/cv.pdf"

  return (
    <section className="py-24 bg-[#F8FAFC] flex items-center justify-center border-b border-[#E2E8F0] relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Pulsing Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm text-sm text-slate-800 font-semibold mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
          </span>
          <span>{badgeText}</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-6 max-w-2xl"
        >
          {headlineText}
        </motion.h2>

        {/* ETA response time */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-1.5 text-[#64748B] text-base mb-10"
        >
          <Clock size={16} className="text-[#2563EB]" />
          <span>{etaText}</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <Magnetic>
            <Link href={`/${locale}/developer/contact`}>
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 h-14 text-base font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md shadow-blue-200/50 hover:shadow-lg transition-all"
              >
                <Calendar size={18} className="mr-2" />
                Start a Project
              </Button>
            </Link>
          </Magnetic>

          <Magnetic>
            <a href={cvUrl} download target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 h-14 text-base font-bold border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#0F172A] hover:border-[#CBD5E1] transition-all"
              >
                <Download size={18} className="mr-2 text-[#475569]" />
                Download Resume
              </Button>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
