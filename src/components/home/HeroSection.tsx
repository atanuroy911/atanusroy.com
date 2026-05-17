'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Mail, FileText, ExternalLink } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

const Github = (props: any) => <GitHubLogoIcon width={props.size || 24} height={props.size || 24} {...props} />
const Linkedin = (props: any) => <LinkedInLogoIcon width={props.size || 24} height={props.size || 24} {...props} />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HeroSection({ content, locale }: { content: any; locale: string }) {
  const { mode, isAnimating } = useMode()
  const isDev = mode === 'developer'
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const devH = content?.developer?.hero
  const acH = content?.academic?.hero
  const p = content?.personal
  const roles: string[] = devH?.roles || []

  // Typewriter effect for developer mode
  useEffect(() => {
    if (!isDev || !roles.length) return
    const current = roles[roleIndex]
    const speed = isDeleting ? 60 : 110

    timerRef.current = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1800)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1))
        } else {
          setIsDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [isDev, displayed, isDeleting, roleIndex, roles])

  // Reset typewriter when mode changes
  useEffect(() => {
    setDisplayed('')
    setIsDeleting(false)
    setRoleIndex(0)
  }, [mode])

  const socials = [
    { href: p?.github, icon: Github, label: 'GitHub' },
    { href: p?.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${p?.email}`, icon: Mail, label: 'Email' },
    { href: p?.google_scholar, icon: ExternalLink, label: 'Scholar' },
  ].filter(s => s.href)

  return (
    <AnimatePresence mode="wait">
      {isDev ? (
        <DevHero
          key="dev-hero"
          devH={devH}
          p={p}
          displayed={displayed}
          socials={socials}
          locale={locale}
          isAnimating={isAnimating}
        />
      ) : (
        <AcademicHero
          key="ac-hero"
          acH={acH}
          p={p}
          content={content}
          socials={socials}
          locale={locale}
          isAnimating={isAnimating}
        />
      )}
    </AnimatePresence>
  )
}

// ── Developer Hero ──────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DevHero({ devH, p, displayed, socials, locale, isAnimating }: any) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimating ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
     
    >
      {/* Animated grid */}
      <div className="absolute inset-0 dev-grid-bg opacity-100" />

      {/* Decorative shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-4 border-black bg-[#ffde00] opacity-80 mix-blend-multiply dark:mix-blend-screen dark:border-white animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border-4 border-black bg-[#ff3366] opacity-80 mix-blend-multiply dark:mix-blend-screen dark:border-white" style={{ transform: 'rotate(15deg)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl w-full"
          >
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black w-fit px-4 py-1.5 font-bold uppercase tracking-widest text-xs border-2 border-transparent dark:border-black shadow-[4px_4px_0px_#ff3366]"
          >
            {devH?.greeting || 'Hey, I\'m'}
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden"
          >
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 leading-none tracking-tighter"
          >
            <span className="dev-text-gradient uppercase">{devH?.name || 'Atanu.'}</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mb-6 h-10"
          >
            <span className="font-mono-dev text-xl sm:text-2xl font-bold bg-[#00d9ff] text-black px-2 py-1 transform -rotate-1 shadow-[4px_4px_0px_#000]">
              {displayed}<span className="animate-blink text-black">|</span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl font-medium max-w-xl mb-3 border-l-4 border-black dark:border-white pl-4"
          >
            {devH?.tagline}
          </motion.p>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-mono-dev text-sm text-slate-600 mb-8"
          >
            📍 {p?.location} · M.Tech IIT Kanpur
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center gap-4 mb-10 mt-8"
          >
            <Link href={`/${locale}/developer/projects`}>
              <Button
                className="group rounded-none px-6 py-6 text-sm font-bold uppercase tracking-widest dev-glow-cyan"
              >
                {devH?.cta_primary || 'See My Projects'}
                <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/${locale}/developer/contact`}>
              <Button variant="outline"
                className="rounded-none px-6 py-6 text-sm font-bold uppercase tracking-widest bg-white text-black border-2 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] dark:hover:shadow-[6px_6px_0px_#fff] transition-all"
              >
                <Mail size={14} className="mr-2" />
                {devH?.cta_secondary || "Let's Talk"}
              </Button>
            </Link>
            {p?.cv_url && (
              <Link href={p.cv_url} target="_blank">
                <Button variant="outline"
                  className="rounded-none px-6 py-6 text-sm font-bold uppercase tracking-widest bg-[#ffde00] text-black border-2 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] dark:hover:shadow-[6px_6px_0px_#fff] transition-all"
                >
                  <FileText size={14} className="mr-2" />
                  resume.pdf
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-4"
          >
            {socials.map(({ href, icon: Icon, label }: any) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-black dark:text-white hover:text-[#00d9ff] dark:hover:text-[#ffde00] transition-colors duration-200"
                title={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side Photo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="hidden lg:block w-72 h-96 relative border-4 border-black dark:border-white shadow-[8px_8px_0px_#00d9ff] dark:shadow-[8px_8px_0px_#ff3366] rotate-3 hover:rotate-0 transition-all duration-300 bg-white"
        >
          <img src={p?.developer_photo || "/images/dev_profile.jpg"} alt={p?.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          {/* Decorative tag on photo */}
          <div className="absolute -bottom-4 -left-4 bg-[#ffde00] border-2 border-black dark:border-white px-3 py-1 font-mono-dev text-black font-bold text-sm shadow-[2px_2px_0px_#000]">
            <span className="animate-pulse mr-2 inline-block w-2 h-2 bg-black rounded-full" />
            ONLINE
          </div>
        </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="font-mono-dev text-xs">scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      {/* Corner decoration */}
      <div className="absolute top-24 right-8 hidden lg:block">
        <div className="font-mono-dev text-xs text-slate-700 text-right space-y-1">
          <div className="text-cyan-800">// Dhaka, Bangladesh</div>
          <div className="text-slate-700">const me = &#123;</div>
          <div className="text-slate-700 pl-4">passion: <span className="text-green-700">&quot;building&quot;</span>,</div>
          <div className="text-slate-700 pl-4">research: <span className="text-green-700">&quot;CV + Robotics&quot;</span>,</div>
          <div className="text-slate-700 pl-4">coffee: <span className="text-cyan-700">true</span></div>
          <div className="text-slate-700">&#125;</div>
        </div>
      </div>
    </motion.section>
  )
}

// ── Academic Hero ────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AcademicHero({ acH, p, content, socials, locale, isAnimating }: any) {
  const stats = [
    { label: 'Publications', value: '8+' },
    { label: 'Years Research', value: '6+' },
    { label: 'Countries', value: '3' },
  ]

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isAnimating ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center dark:bg-slate-950 bg-background"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left: text */}
          <div className="lg:col-span-3">
            {/* Affiliation badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(26, 46, 74, 0.08)', color: 'var(--ac-navy)', border: '1px solid rgba(26, 46, 74, 0.15)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {acH?.institution} · {acH?.department}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="ac-font-serif text-5xl sm:text-6xl font-bold mb-3 leading-tight dark:text-white"
              style={{ color: 'var(--ac-text)' }}
            >
              {acH?.title || p?.name}
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xl font-medium mb-1"
              style={{ color: 'var(--ac-navy)' }}
            >
              {acH?.role}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-0.5 w-24 mb-5 origin-left"
              style={{ background: 'var(--ac-gold)' }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-600 dark:text-slate-400 text-base max-w-md mb-8 leading-relaxed"
            >
              {acH?.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link href="#publications">
                <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  {acH?.cta_primary || 'View Publications'}
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="outline" className="rounded-full px-6 border-2 border-slate-400 dark:border-slate-500 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Mail size={14} className="mr-2" />
                  {acH?.cta_secondary || 'Contact Me'}
                </Button>
              </Link>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              {socials.map(({ href, icon: Icon, label }: any) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title={label}>
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: stats + research interests */}
          <div className="lg:col-span-2 space-y-4">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-3 gap-3"
            >
              {stats.map((s) => (
                <div key={s.label} className="ac-paper rounded-xl p-4 text-center">
                  <div className="ac-font-serif text-3xl font-bold mb-1" style={{ color: 'var(--ac-navy)' }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Research interests */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="ac-paper rounded-xl p-5"
            >
              <h3 className="ac-font-serif text-sm font-semibold uppercase tracking-wider mb-3 text-slate-500">
                Research Interests
              </h3>
              <ul className="space-y-2">
                {content?.academic?.research_interests?.map((ri: string) => (
                  <li key={ri} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-400">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--ac-gold)' }} />
                    {ri}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Location & contact quick */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-slate-500 space-y-1 px-1"
            >
              <div>📍 {p?.location}</div>
              <div>✉️ <a href={`mailto:${p?.email}`} className="hover:underline">{p?.email}</a></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

