'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/Magnetic'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero({ content, locale }: { content: any; locale: string }) {
  const home = content?.developer
  const title = "I build web products that ship fast and scale"
  const subtitle = home?.description || "I help startups and product teams ship fast, scalable web applications."
  
  const ctaPrimary = home?.cta_primary || { label: "Hire Me", href: "/contact" }
  const ctaSecondary = home?.cta_secondary || { label: "See My Work", href: "/work" }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0]">
      {/* Morphing Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft blue morphing bubbles */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-200/40 to-[#60A5FA]/10 blur-[120px]"
          style={{
            animation: 'floatBubble1 20s infinite alternate ease-in-out'
          }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-blue-100/30 to-blue-200/20 blur-[100px]"
          style={{
            animation: 'floatBubble2 25s infinite alternate ease-in-out'
          }}
        />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]"
        />
      </div>

      <style jsx global>{`
        @keyframes floatBubble1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, 60px) scale(1.1); }
          100% { transform: translate(-20px, -30px) scale(0.95); }
        }
        @keyframes floatBubble2 {
          0% { transform: translate(0px, 0px) scale(0.95); }
          50% { transform: translate(-50px, -40px) scale(1.05); }
          100% { transform: translate(30px, 50px) scale(1); }
        }
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-600 text-sm font-semibold mb-8 hover:bg-blue-100/50 transition-colors"
        >
          <Sparkles size={14} className="text-blue-500 animate-pulse" />
          <span>Full-Stack Engineering Partner</span>
        </motion.div>

        {/* Big Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-[72px] font-bold text-[#0F172A] leading-[1.08] tracking-tight mb-8 max-w-4xl"
        >
          {title}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-[22px] text-[#475569] leading-relaxed max-w-2xl mb-12"
        >
          {subtitle}
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <Magnetic>
            <Link href={`/${locale}/developer${ctaPrimary.href}`}>
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 h-14 text-base font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md shadow-blue-200/50 hover:shadow-lg transition-all"
              >
                {ctaPrimary.label}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </Magnetic>

          <Magnetic>
            <Link href={`/${locale}/developer${ctaSecondary.href}`}>
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-xl px-8 h-14 text-base font-bold border-[#E2E8F0] bg-white/80 hover:bg-slate-50 text-[#0F172A] hover:border-[#CBD5E1] transition-all"
              >
                {ctaSecondary.label}
              </Button>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
