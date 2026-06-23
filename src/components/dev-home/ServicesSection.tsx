'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Code, ScanFace, Combine, TestTubeDiagonal } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      title: 'AI Solutions',
      description: 'Custom machine learning models and intelligent systems designed to solve specific business problems, reduce costs, or unlock new capabilities.',
      icon: BrainCircuit,
    },
    {
      title: 'Custom Software Development',
      description: 'End-to-end architecture, development, and deployment of robust web and mobile applications using modern frameworks and cloud infrastructure.',
      icon: Code,
    },
    {
      title: 'Computer Vision Systems',
      description: 'Production-ready vision systems for object detection, segmentation, and automated visual inspection deployed on edge devices or cloud servers.',
      icon: ScanFace,
    },
    {
      title: 'Automation & Integration',
      description: 'Connecting disparate systems, automating manual workflows, and building reliable data pipelines to improve operational efficiency.',
      icon: Combine,
    },
    {
      title: 'Research & Prototyping',
      description: 'Rapid proof-of-concept development and technical feasibility studies to de-risk ambitious technology initiatives before major investments.',
      icon: TestTubeDiagonal,
    },
  ]

  return (
    <section className="py-24 border-t border-[#E2E8F0] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6">Expertise & Services</h2>
          <p className="text-[#475569] text-lg leading-relaxed">
            I partner with forward-thinking companies to build specialized software and integrate artificial intelligence into their core operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all hover:shadow-sm"
            >
              <div className="w-12 h-12 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl flex items-center justify-center mb-6 text-[#2563EB]">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">{service.title}</h3>
              <p className="text-[#475569] leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
