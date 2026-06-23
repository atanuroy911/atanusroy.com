'use client'

import { motion } from 'framer-motion'
import { Laptop, Database, Zap, Rocket, Terminal } from 'lucide-react'

interface Service {
  title: string
  description: string
  tags: string[]
  example: string
}

export function WhatIBuild({ content }: { content: any }) {
  const home = content?.developer
  const services: Service[] = home?.services || []

  if (services.length === 0) return null

  // Helper to map title strings to standard Lucide icons
  const getIcon = (title: string) => {
    const lowercase = title.toLowerCase()
    if (lowercase.includes('full-stack') || lowercase.includes('web')) {
      return <Laptop className="w-8 h-8 text-[#2563EB]" />
    }
    if (lowercase.includes('api') || lowercase.includes('backend')) {
      return <Database className="w-8 h-8 text-[#2563EB]" />
    }
    if (lowercase.includes('performance') || lowercase.includes('optimization')) {
      return <Zap className="w-8 h-8 text-[#2563EB]" />
    }
    return <Rocket className="w-8 h-8 text-[#2563EB]" />
  }

  return (
    <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-[#2563EB] font-semibold uppercase tracking-wider text-sm block mb-3">
            Core Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">
            What I Build
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Focusing on execution speed, reliability, and business impact.
          </p>
        </div>

        {/* Grid cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle accent border on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[#2563EB] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

              <div>
                <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center mb-6 group-hover:bg-[#2563EB]/10 transition-colors">
                  {getIcon(service.title)}
                </div>

                <h3 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight group-hover:text-[#2563EB] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#475569] text-base leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Example reveal card area */}
                <div className="pt-4 border-t border-[#E2E8F0] overflow-hidden">
                  <div className="flex items-start gap-2.5 text-sm text-[#475569] bg-slate-50 border border-slate-100 p-3 rounded-lg opacity-85 group-hover:opacity-100 transition-opacity">
                    <Terminal size={15} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800 text-[13px] block">Impact Case:</span>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{service.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
