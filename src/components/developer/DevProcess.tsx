import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function DevProcess({ content }: { content: any }) {
  const { process } = content.developer;

  return (
    <section className="process-sec">
      <div className="process-sec-inner">
        <div className="process-header">
          <div className="sec-label">// {process.label}</div>
          <div className="sec-title">{process.title}</div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4">
          {process.steps.map((step: any, index: number) => (
            <React.Fragment key={index}>
              <div className="process-step">
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>

              {index < process.steps.length - 1 && (
                <div className="flex items-center justify-center text-[var(--dev-border-2)] flex-shrink-0 py-2 lg:py-0">
                  <ArrowRight className="hidden lg:block" size={20} />
                  <ArrowDown className="block lg:hidden" size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
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
