import React from 'react';

export function DevServices({ content }: { content: any }) {
  const { services } = content.developer;

  return (
    <section className="services-sec section-split">
      <div className="split-left flex flex-col justify-between">
        <div>
          <div className="sec-label">{services.label}</div>
          <div className="sec-title">{services.title}</div>
        </div>
        
        <div className="mt-12 hidden md:block">
          <a href="https://calendly.com/atanusroy" target="_blank" className="btn-primary inline-flex items-center gap-2" rel="noopener noreferrer">
            Book a Free Call
          </a>
        </div>
      </div>
      <div className="split-right">
        <div className="services-grid mb-12 md:mb-0">
          {services.items.map((service: any, index: number) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={`ti ${service.icon}`} aria-hidden="true"></i>
              </div>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.desc}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 block md:hidden flex justify-center">
          <a href="https://calendly.com/atanusroy" target="_blank" className="btn-primary inline-flex items-center gap-2" rel="noopener noreferrer">
            Book a Free Call
          </a>
        </div>
      </div>
    </section>
  );
}
