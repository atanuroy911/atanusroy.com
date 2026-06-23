'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function WhyWorkWithMe() {
  const points = [
    {
      title: 'Scalable Systems Architecture',
      description: 'Designing system structures that handle traffic growth, security compliance, and fast read/write throughput from day one.'
    },
    {
      title: 'Software Engineering Expertise',
      description: 'I write clean, maintainable, and thoroughly tested production code that your engineering team can easily extend.'
    },
    {
      title: 'End-to-End Delivery',
      description: 'Capable of handling the entire product lifecycle—from user stories and API design to DevOps pipelines and AWS deployments.'
    },
    {
      title: 'Business-Outcome Focus',
      description: 'I focus on understanding the core business challenge and user needs before writing code, ensuring maximum return on engineering spend.'
    },
    {
      title: 'Clear Communication',
      description: 'Consistent daily status updates, transparent timelines, and collaborative Slack/GitHub integration.'
    }
  ]

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0F172A] tracking-tight mb-6">Why Work With Me</h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-8">
              Hiring an independent senior developer shouldn't feel like a risk. I combine extensive industry experience with modern engineering principles to deliver software systems that are both fast-shipping and highly dependable.
            </p>
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm">
              <blockquote className="text-[#0F172A] font-medium text-lg leading-relaxed mb-4">
                "The goal is not just to write code, but to deliver measurable business value and speed to market through clean engineering."
              </blockquote>
            </div>
          </motion.div>

          <div className="space-y-8">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 bg-[#16A34A]/10 rounded-full p-1 border border-[#16A34A]/20">
                  <CheckCircle2 size={20} className="text-[#16A34A]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">{point.title}</h3>
                  <p className="text-[#475569] leading-relaxed text-sm">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
