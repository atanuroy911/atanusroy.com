'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Hammer, Rocket, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

const STEP_ICONS: LucideIcon[] = [Search, Compass, Hammer, Rocket];

export function DevProcess({ content }: { content: any }) {
  const { process } = content.developer;

  return (
    <section className="process-sec">
      <div className="process-sec-inner">
        <div className="process-header">
          <div className="sec-label">// {process.label}</div>
          <div className="sec-title">{process.title}</div>
        </div>

        <motion.div
          className="process-track"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="process-track-fill"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {process.steps.map((step: any, index: number) => {
            const Icon = STEP_ICONS[index] || Search;
            return (
              <motion.div
                key={index}
                className="process-step"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="step-ghost-num">{String(index + 1).padStart(2, '0')}</div>
                <div className="step-icon">
                  <Icon size={20} />
                </div>
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="https://calendly.com/atanusroy" target="_blank" className="btn-primary" rel="noopener noreferrer">
            Book a Free Call
          </Link>
        </div>
      </div>
    </section>
  );
}
