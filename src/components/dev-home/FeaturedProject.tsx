'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Play, Pause } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

interface Project {
  id: string
  title: string
  screenshot: string
  testimonial_id: string
  problem: string
  solution: string
  result: string
  tags: string[]
}

export function FeaturedProject({ content, locale }: { content: any; locale: string }) {
  const home = content?.developer
  const projects: Project[] = home?.featured_projects || []
  const testimonials: Testimonial[] = home?.testimonials || []

  if (projects.length === 0) return null

  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-20 text-center sm:text-left">
          <span className="text-[#2563EB] font-semibold uppercase tracking-wider text-sm block mb-3">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight">
            Selected Work & Impact
          </h2>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const testimonial = testimonials.find(t => t.id === project.testimonial_id)
            const isEven = index % 2 === 0

            return (
              <ProjectRow
                key={project.id}
                project={project}
                testimonial={testimonial}
                isEven={isEven}
                locale={locale}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ 
  project, 
  testimonial, 
  isEven, 
  locale 
}: { 
  project: Project
  testimonial?: Testimonial
  isEven: boolean
  locale: string 
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: false, amount: 0.3 })

  return (
    <div 
      ref={rowRef}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Left Column: Interactive Simulation Mockup in Browser Frame */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 w-full"
      >
        <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] shadow-md overflow-hidden group">
          {/* Browser Tab Bar */}
          <div className="bg-[#FFFFFF] border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/30 group-hover:bg-[#EF4444] transition-colors" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/30 group-hover:bg-[#F59E0B] transition-colors" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/30 group-hover:bg-[#10B981] transition-colors" />
            </div>
            <div className="bg-[#F1F5F9] rounded-md px-3 py-1 text-xs text-[#64748B] w-48 truncate text-center select-none">
              {project.title.toLowerCase().replace(/\s+/g, '-')}.app
            </div>
            <div className="flex items-center gap-1.5">
              {isInView ? (
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Live
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" /> Idle
                </span>
              )}
            </div>
          </div>

          {/* Simulated Autoplay GIF/Graphics Area */}
          <div className="h-[280px] sm:h-[350px] relative overflow-hidden flex items-center justify-center p-6 bg-[#FFFFFF]">
            <MockupSimulator projectId={project.id} isPlaying={isInView} />
          </div>
        </div>
      </motion.div>

      {/* Right Column: Problem-Solution-Result + Testimonial Pairing */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        className="flex-1 w-full"
      >
        <h3 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-6">
          {project.title}
        </h3>

        {/* Problem → Solution → Result list */}
        <div className="space-y-4 mb-8">
          <div className="flex gap-3">
            <CheckCircle2 size={20} className="text-[#2563EB] mt-1 flex-shrink-0" />
            <div>
              <strong className="text-[#0F172A] font-semibold block text-[15px]">Challenge</strong>
              <p className="text-[#475569] text-base mt-0.5">{project.problem}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={20} className="text-[#2563EB] mt-1 flex-shrink-0" />
            <div>
              <strong className="text-[#0F172A] font-semibold block text-[15px]">Implementation</strong>
              <p className="text-[#475569] text-base mt-0.5">{project.solution}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 size={20} className="text-[#16A34A] mt-1 flex-shrink-0" />
            <div>
              <strong className="text-[#16A34A] font-bold block text-[15px]">Business Outcome</strong>
              <p className="text-[#475569] text-base mt-0.5">{project.result}</p>
            </div>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case Study CTA Link */}
        <div className="mb-8">
          <Link href={`/${locale}/developer/work`}>
            <span className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold text-base inline-flex items-center gap-1 hover:underline cursor-pointer group/link">
              View Full Case Study 
              <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Integrated Testimonial Card */}
        {testimonial && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#F8FAFC] border-l-4 border-[#2563EB] p-5 rounded-r-xl shadow-sm"
          >
            <p className="text-slate-700 italic text-[14px] sm:text-base leading-relaxed mb-3">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <cite className="not-italic text-sm font-semibold text-[#0F172A] block">
                  {testimonial.author}
                </cite>
                <span className="text-xs text-[#64748B]">
                  {testimonial.role}, {testimonial.company}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function MockupSimulator({ projectId, isPlaying }: { projectId: string; isPlaying: boolean }) {
  // Simulator states & calculations
  const [logs, setLogs] = useState<string[]>([])
  const [agriStats, setAgriStats] = useState({ flowRate: 85, dropRate: 0.004, activeSensors: 504 })
  const [robotPos, setRobotPos] = useState({ x: 10, y: 50 })
  const [robotTarget, setRobotTarget] = useState({ x: 80, y: 30 })

  // Project 1 (Fintech Transaction Engine) Simulator
  useEffect(() => {
    if (projectId !== 'project-1' || !isPlaying) return
    const initialLogs = [
      'Initializing blockchain RPC client connection...',
      'Connected to Bitcoin Core node via RPC [SUCCESS]',
      'Syncing block headers...',
      'Listening for mempool events...'
    ]
    setLogs(initialLogs)

    let idx = 0
    const txHashes = [
      'f3e098a8', '9c23fb18', '2b88aa09', 'dd82efaa', 
      '19a8bc4a', 'fa8839cb', '7c82deea', '038fa88d'
    ]

    const interval = setInterval(() => {
      const hash = txHashes[Math.floor(Math.random() * txHashes.length)]
      const timestamp = new Date().toLocaleTimeString()
      const txLog = `[${timestamp}] TX ${hash}... - Executed (120ms)`
      setLogs(prev => [...prev.slice(-5), txLog])
    }, 1500)

    return () => clearInterval(interval)
  }, [projectId, isPlaying])

  // Project 2 (Smart Agriculture IoT) Simulator
  useEffect(() => {
    if (projectId !== 'project-2' || !isPlaying) return
    const interval = setInterval(() => {
      setAgriStats(prev => ({
        flowRate: 80 + Math.floor(Math.random() * 12),
        dropRate: Number((0.002 + Math.random() * 0.003).toFixed(5)),
        activeSensors: 500 + Math.floor(Math.random() * 8)
      }))
    }, 1200)

    return () => clearInterval(interval)
  }, [projectId, isPlaying])

  // Project 3 (Autonomous Path Planning) Simulator
  useEffect(() => {
    if (projectId !== 'project-3' || !isPlaying) return
    const interval = setInterval(() => {
      // Robot slides back and forth between robotPos and target
      setRobotPos(prev => {
        const dx = robotTarget.x - prev.x
        const dy = robotTarget.y - prev.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < 4) {
          // Swap target
          setRobotTarget(t => t.x === 80 ? { x: 10, y: 50 } : { x: 80, y: 30 })
          return prev
        }
        return {
          x: prev.x + (dx / dist) * 3,
          y: prev.y + (dy / dist) * 3
        }
      })
    }, 50)

    return () => clearInterval(interval)
  }, [projectId, isPlaying, robotTarget])

  // Render different simulators based on project-id
  switch (projectId) {
    case 'project-1': // Fintech Transaction Dashboard simulation
      return (
        <div className="w-full h-full bg-[#0F172A] rounded-lg p-4 font-mono text-[11px] text-green-400 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-slate-400 text-xs">node-monitor@rpc-gateway:~</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          </div>
          <div className="flex-1 space-y-1.5 overflow-hidden text-left">
            {logs.map((log, i) => (
              <div key={i} className={i === logs.length - 1 ? 'text-white' : 'opacity-80'}>
                <span className="text-blue-400">&gt; </span>
                {log}
              </div>
            ))}
            {isPlaying && (
              <div className="w-2 h-3.5 bg-green-400 animate-pulse inline-block" />
            )}
          </div>
          <div className="border-t border-slate-800 pt-2 mt-2 flex items-center justify-between text-slate-400">
            <span>MEM: 42.1MB</span>
            <span>LAG: 120ms</span>
          </div>
        </div>
      )

    case 'project-2': // IoT Agriculture telemetry simulation
      return (
        <div className="w-full h-full bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] p-4 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#0F172A]">AWS telemetry cluster</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center my-auto">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wide">Flow Rate</span>
              <span className="text-lg font-bold text-[#2563EB]">{agriStats.flowRate}/s</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wide">Drop Rate</span>
              <span className="text-lg font-bold text-[#16A34A]">{(agriStats.dropRate * 100).toFixed(3)}%</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg">
              <span className="text-[10px] text-[#64748B] block uppercase tracking-wide">Nodes Online</span>
              <span className="text-lg font-bold text-[#0F172A]">{agriStats.activeSensors}</span>
            </div>
          </div>
          <div className="h-20 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden relative flex items-end">
            {/* Telemetry wave graphic */}
            <svg viewBox="0 0 100 20" className="w-full text-blue-500 fill-blue-500/10">
              <path d="M0,10 Q15,18 30,12 T60,15 T90,5 L100,20 L0,20 Z" className="animate-pulse" />
            </svg>
          </div>
        </div>
      )

    case 'project-3': // Path Visualizer simulator
      return (
        <div className="w-full h-full bg-[#0F172A] rounded-lg relative overflow-hidden select-none border border-slate-800 flex items-center justify-center">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-[#64748B] z-10">
            Grid system resolution: 1.2m
          </div>
          
          <svg className="w-full h-full bg-slate-950">
            {/* Grid overlay */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Static obstacles */}
            <circle cx="150" cy="90" r="15" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1" />
            <circle cx="280" cy="180" r="22" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1" />

            {/* Planned Path line */}
            <line x1="20" y1="180" x2="150" y2="140" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="150" y1="140" x2="350" y2="100" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" />

            {/* Robot target coordinate indicator */}
            <circle cx={robotTarget.x * 4} cy={robotTarget.y * 3.2} r="6" fill="#16A34A" fillOpacity="0.4" />
            <circle cx={robotTarget.x * 4} cy={robotTarget.y * 3.2} r="2" fill="#16A34A" />

            {/* Moving Robot node */}
            <circle cx={robotPos.x * 4} cy={robotPos.y * 3.2} r="8" fill="#2563EB" className="animate-pulse" />
            <circle cx={robotPos.x * 4} cy={robotPos.y * 3.2} r="3" fill="#FFFFFF" />
          </svg>
        </div>
      )

    default:
      return (
        <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
          <Pause size={32} />
          <span>Interactive Preview</span>
        </div>
      )
  }
}
