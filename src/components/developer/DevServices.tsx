import React from 'react';
import { LayoutDashboard, Cloud, Webhook, Rocket } from 'lucide-react';

// Map tabler icon class names → lucide icons
const iconMap: Record<string, React.ReactNode> = {
  'ti-layout-dashboard': <LayoutDashboard size={20} />,
  'ti-cloud':           <Cloud size={20} />,
  'ti-api':             <Webhook size={20} />,
  'ti-rocket':          <Rocket size={20} />,
};

function ServiceIcon({ icon }: { icon: string }) {
  const lucideIcon = iconMap[icon];
  if (lucideIcon) return <>{lucideIcon}</>;
  // Fallback: render original tabler icon class
  return <i className={`ti ${icon}`} aria-hidden="true" />;
}

export function DevServices({ content }: { content: any }) {
  const { services } = content.developer;

  return (
    <section className="services-sec">
      <div className="section-split">
        <div className="split-left">
          <div className="sec-label">{services.label}</div>
          <div className="sec-title">{services.title}</div>
          {services.sub && (
            <div className="sec-sub mt-4">{services.sub}</div>
          )}

          <div className="mt-10 hidden md:block">
            <a
              href="https://calendly.com/atanusroy"
              target="_blank"
              className="btn-primary"
              rel="noopener noreferrer"
            >
              Book a Free Call
            </a>
          </div>
        </div>

        <div className="split-right">
          <div className="services-grid mb-8 md:mb-0">
            {services.items.map((service: any, index: number) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <ServiceIcon icon={service.icon} />
                </div>
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 block md:hidden">
            <a
              href="https://calendly.com/atanusroy"
              target="_blank"
              className="btn-primary w-full justify-center"
              rel="noopener noreferrer"
            >
              Book a Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
