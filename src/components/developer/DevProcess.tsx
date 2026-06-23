import React from 'react';

import { ArrowRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function DevProcess({ content }: { content: any }) {
  const { process } = content.developer;

  return (
    <section className="process-sec mb-32 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="sec-label">// {process.label}</div>
        <div className="sec-title text-5xl">{process.title}</div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-4 lg:gap-6">
        {process.steps.map((step: any, index: number) => (
          <React.Fragment key={index}>
            <div className="process-step w-full max-w-sm flex-1 bg-white border border-gray-100 shadow-sm rounded-2xl p-8 relative flex flex-col justify-start hover:-translate-y-1 transition-transform">
              <div className="step-num text-3xl font-black text-gray-200 mb-4">{step.num}</div>
              <div className="step-title text-2xl font-bold mb-3">{step.title}</div>
              <div className="step-desc text-gray-600 leading-relaxed">{step.desc}</div>
            </div>
            
            {/* Arrow between steps */}
            {index < process.steps.length - 1 && (
              <div className="flex items-center justify-center py-4 lg:py-0 text-gray-300">
                <ArrowRight className="hidden lg:block" size={32} />
                <ArrowDown className="block lg:hidden" size={32} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link href="https://calendly.com/atanusroy" target="_blank" className="btn-primary items-center gap-2" rel="noopener noreferrer">
          Book a Free Call
        </Link>
      </div>
    </section>
  );
}
