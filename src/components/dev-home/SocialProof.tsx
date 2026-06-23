'use client'

import { motion } from 'framer-motion'

interface Quote {
  quote: string
  author: string
  role: string
  company: string
}

export function SocialProof({ content }: { content: any }) {
  const home = content?.developer
  const quotes: Quote[] = home?.social_proof_testimonials || []

  if (quotes.length === 0) return null

  // Duplicate quotes list to ensure seamless infinite loop scrolling
  const marqueeItems = [...quotes, ...quotes, ...quotes]

  return (
    <section className="relative py-16 bg-[#0F172A] text-white overflow-hidden border-y border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-[#0F172A] z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center sm:text-left">
        <span className="text-[#60A5FA] font-mono text-xs uppercase tracking-widest">
          Trusted by Growth Teams
        </span>
      </div>

      {/* Infinite Scrolling Marquee Wrapper */}
      <div className="flex overflow-hidden relative w-full">
        <div 
          className="flex whitespace-nowrap gap-8 py-4 animate-marquee"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 40s linear infinite'
          }}
        >
          {marqueeItems.map((item, index) => (
            <div 
              key={index} 
              className="inline-flex flex-col justify-center bg-slate-900 border border-slate-800/80 rounded-xl p-6 w-[350px] sm:w-[400px] whitespace-normal flex-shrink-0 select-none shadow-md hover:border-blue-500/30 transition-all hover:bg-slate-900/80"
            >
              <p className="text-slate-200 text-[15px] sm:text-base italic leading-relaxed mb-4">
                "{item.quote}"
              </p>
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {item.author}
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  {item.role}, <span className="text-[#60A5FA] font-medium">{item.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  )
}
