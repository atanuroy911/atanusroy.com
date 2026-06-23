'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Compass, Cpu, CheckCircle } from 'lucide-react'

interface ProcessStep {
  step: number
  title: string
  description: string
}

export function Process({ content }: { content: any }) {
  const home = content?.developer
  const steps: ProcessStep[] = home?.process || []

  if (steps.length === 0) return null

  // Helpers to get Lucide icon for each step
  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <Search size={22} className="text-[#2563EB]" />
      case 2: return <Compass size={22} className="text-[#2563EB]" />
      case 3: return <Cpu size={22} className="text-[#2563EB]" />
      case 4: return <CheckCircle size={22} className="text-[#2563EB]" />
      default: return null
    }
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section ref={containerRef} className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-[#2563EB] font-semibold uppercase tracking-wider text-sm block mb-3">
            Execution Flow
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
            How We Work Together
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-0.5 bg-slate-100 z-0" />
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-4 relative z-10 justify-between">
            {steps.map((stepItem, idx) => (
              <motion.div
                key={stepItem.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center md:w-[22%] gap-6 md:gap-0"
              >
                {/* Mobile connector line */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden absolute left-[30px] top-[70px] bottom-0 w-0.5 bg-slate-100 z-0" 
                    style={{
                      height: 'calc(100% - 40px)',
                      top: `${idx * 140 + 64}px`
                    }}
                  />
                )}

                {/* Step Circle */}
                <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-[#FFFFFF] border-2 border-blue-500 shadow-md shadow-blue-50 flex items-center justify-center flex-shrink-0 md:mb-6 group hover:border-[#1D4ED8] transition-colors relative z-10">
                  {getStepIcon(stepItem.step)}
                  <span className="absolute -top-1 -right-1 bg-[#2563EB] text-[#FFFFFF] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {stepItem.step}
                  </span>
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2 md:mb-3">
                    {stepItem.title}
                  </h3>
                  <p className="text-[#475569] text-[15px] sm:text-base leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
