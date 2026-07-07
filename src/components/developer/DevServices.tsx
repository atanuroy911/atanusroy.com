'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Cloud, Webhook, Rocket } from 'lucide-react';

// Map tabler icon class names → lucide icons
const iconMap: Record<string, React.ReactNode> = {
  'ti-layout-dashboard': <LayoutDashboard size={22} />,
  'ti-cloud':           <Cloud size={22} />,
  'ti-api':             <Webhook size={22} />,
  'ti-rocket':          <Rocket size={22} />,
};

function ServiceIcon({ icon }: { icon: string }) {
  const lucideIcon = iconMap[icon];
  if (lucideIcon) return <>{lucideIcon}</>;
  return <i className={`ti ${icon}`} aria-hidden="true" />;
}

export function DevServices({ content }: { content: any }) {
  const { services } = content.developer;

  return (
    <section className="services-sec">
      <div className="services-header">
        <div className="sec-label">{services.label}</div>
        <div className="sec-title">{services.title}</div>
        {services.sub && <div className="sec-sub max-w-xl mt-3">{services.sub}</div>}
      </div>

      <div className="bento-grid">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {services.items.map((service: any, index: number) => (
          <motion.div
            key={index}
            className={`bento-card ${index === 0 ? 'bento-card-lg' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <div className="bento-ghost-num">{String(index + 1).padStart(2, '0')}</div>
            <div className="bento-icon">
              <ServiceIcon icon={service.icon} />
            </div>
            <div className="bento-title">{service.title}</div>
            <div className="bento-desc">{service.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <a
          href="https://calendly.com/atanusroy"
          target="_blank"
          className="btn-primary"
          rel="noopener noreferrer"
        >
          Book a Free Call
        </a>
      </div>
    </section>
  );
}
