'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { usePageTransition } from '@/providers/PageTransitionProvider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  GraduationCap, Code2, Menu, X, FlaskConical, Laptop2, Globe
} from 'lucide-react'
import { LanguageToggle } from '@/components/LanguageToggle'
import type { Locale } from '@/lib/content'

interface Props {
  content: Record<string, unknown>
  locale: Locale
  isDev?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function get(obj: any, path: string) {
  return path.split('.').reduce((o, k) => o?.[k], obj)
}

export function Navbar({ content, locale, isDev }: Props) {
  const { mode, setMode } = useMode()
  const { beginModeTransition } = usePageTransition()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = get(content, 'nav') as Record<string, string>

  const links = isDev ? [
    { href: `/${locale}/developer`, label: nav?.home || 'Home' },
    { href: `/${locale}/developer/projects`, label: nav?.projects || 'Projects' },
    { href: `/${locale}/developer/blog`, label: nav?.blog || 'Blog' },
    { href: `/${locale}/developer/journey`, label: nav?.journey || 'Journey' },
    { href: `/${locale}/developer/gallery`, label: nav?.gallery || 'Gallery' },
    { href: `/${locale}/developer/contact`, label: nav?.contact || 'Contact' },
  ] : [
    { href: `/${locale}`, label: nav?.home || 'Home' },
    { href: `/${locale}/about`, label: nav?.about || 'About' },
    { href: `/${locale}/research`, label: nav?.research || 'Research' },
    { href: `/${locale}/publications`, label: nav?.publications || 'Publications' },
    { href: `/${locale}/projects`, label: nav?.projects || 'Projects' },
    { href: `/${locale}/teaching`, label: nav?.teaching || 'Teaching' },
    { href: `/${locale}/students`, label: nav?.students || 'Students' },
    { href: `/${locale}/blog`, label: nav?.blog || 'News' },
    { href: `/${locale}/journey`, label: nav?.gallery || 'Gallery' },
    { href: `/${locale}/contact`, label: nav?.contact || 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}/developer` || href === `/${locale}`) {
      return pathname === href || pathname === `${href}/`
    }
    return pathname.startsWith(href)
  }

  // Developer Layout uses Navbar. We don't use ModeProvider to toggle anymore, we route to Academic Profile.
  const isDevLayout = isDev !== undefined ? isDev : true 

  const navBg = scrolled
    ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
    : 'bg-transparent'

  const logoText = (
    <span className="font-mono-dev font-bold text-lg text-foreground hover:text-primary transition-colors">
      ASR<span className="animate-blink text-primary">_</span>
    </span>
  )

  const linkClass = (href: string) => {
    const active = isActive(href)
    return `relative text-[0.9rem] font-sans tracking-wide transition-colors duration-200 ${
      active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'
    }`
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            {logoText}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center justify-center gap-6">
            {links.map(link => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-end gap-2">
            {/* Mode Link */}
            {isDev ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => beginModeTransition(`/${locale}`, 'academic')}
                className="hidden sm:flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5 transition-all border border-border text-muted-foreground hover:text-primary hover:border-primary/50"
                title={nav?.switch_to_academic || 'Academic Profile'}
              >
                <GraduationCap size={13} />
                <span className="font-mono-dev">Academic</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => beginModeTransition(`/${locale}/developer`, 'developer')}
                className="hidden sm:flex items-center gap-1.5 text-xs rounded-full px-3 py-1.5 transition-all border border-border text-muted-foreground hover:text-primary hover:border-primary/50"
                title={nav?.switch_to_developer || 'Developer Profile'}
              >
                <Laptop2 size={13} />
                <span className="font-mono-dev">Developer</span>
              </Button>
            )}

            {/* Language toggle — compact globe icon; hovering expands the EN/বাং pill
                inline, which (via justify-end) nudges the mode-switch button left
                to make room, and everything settles back on mouse-leave. */}
            <div className="lang-reveal hidden sm:flex items-center">
              <div className="lang-expand">
                <LanguageToggle locale={locale} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-primary shrink-0"
                title={nav?.language}
              >
                <Globe size={15} />
              </Button>
            </div>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={linkClass(link.href) + ' text-base py-2'}
                >
                  {link.label}
                </Link>
              ))}
              {isDev ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false)
                    beginModeTransition(`/${locale}`, 'academic')
                  }}
                  className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <GraduationCap size={14} />
                  {nav?.switch_to_academic || 'Academic Profile'}
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false)
                    beginModeTransition(`/${locale}/developer`, 'developer')
                  }}
                  className="w-full justify-start gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Laptop2 size={14} />
                  {nav?.switch_to_developer || 'Developer Profile'}
                </Button>
              )}
              <div className="pt-1">
                <LanguageToggle locale={locale} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

