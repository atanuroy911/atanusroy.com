'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

export function FinalCTA({ locale }: { locale: string }) {
  return (
    <section className="py-32 bg-[#FFFFFF] border-t border-[#E2E8F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6 tracking-tight">Ready to build something exceptional?</h2>
          <p className="text-xl text-[#475569] leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you need a custom AI solution, robust software architecture, or specialized research, I'm available for new opportunities. Let's discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/developer/contact`}>
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all shadow-sm">
                Start a Conversation
              </Button>
            </Link>
            <Link href={`/${locale}/developer/contact`} /* Placeholder for calendly link if any */>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#FFFFFF] hover:border-[#2563EB]/50 text-[#0F172A] rounded-lg transition-all shadow-sm">
                <Calendar className="mr-2 text-[#475569]" size={18} />
                Book a Call
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
