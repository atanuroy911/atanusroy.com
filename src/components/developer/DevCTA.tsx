import React from 'react';
import Link from 'next/link';

export function DevCTA({ content }: { content: any }) {
  const { cta } = content.developer;

  return (
    <section className="cta-sec section-split items-center" style={{ alignItems: 'center' }}>
      <div className="split-left">
        <div className="cta-badge">
          <div className="dot"></div>
          <span>{cta.badge}</span>
        </div>
        <div className="cta-title">{cta.title}</div>
        <div className="cta-sub">{cta.sub}</div>
      </div>
      <div className="split-right flex flex-col justify-center">
        <div className="cta-btns">
          <Link href="https://calendly.com/atanusroy" target="_blank" className="btn-primary" rel="noopener noreferrer">
            Book a free call
          </Link>
          <Link href="/en/developer/projects" className="btn-ghost">
            See all projects
          </Link>
        </div>
        <div className="cta-reply">{cta.reply_text}</div>
      </div>
    </section>
  );
}
