'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

type TargetMode = 'academic' | 'developer'

interface PageTransitionContextValue {
  beginModeTransition: (href: string, targetMode: TargetMode) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) throw new Error('usePageTransition must be used within PageTransitionProvider')
  return ctx
}

const MIN_DISPLAY_MS = 550
const PRE_NAVIGATE_MS = 220

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false)
  const [targetMode, setTargetMode] = useState<TargetMode>('developer')
  const startedAt = useRef<number>(0)
  const pathname = usePathname()
  const prevPathname = useRef(pathname)
  const router = useRouter()

  const beginModeTransition = useCallback((href: string, mode: TargetMode) => {
    setTargetMode(mode)
    setActive(true)
    startedAt.current = Date.now()
    window.setTimeout(() => {
      router.push(href)
    }, PRE_NAVIGATE_MS)
  }, [router])

  useEffect(() => {
    if (pathname === prevPathname.current) return
    prevPathname.current = pathname
    if (!active) return
    const elapsed = Date.now() - startedAt.current
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
    const t = window.setTimeout(() => setActive(false), remaining)
    return () => window.clearTimeout(t)
  }, [pathname, active])

  const isDev = targetMode === 'developer'

  return (
    <PageTransitionContext.Provider value={{ beginModeTransition }}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            style={{
              background: isDev ? '#09090b' : '#fafafa',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <div
                className="font-bold tracking-tight"
                style={{
                  fontFamily: isDev ? "'JetBrains Mono', monospace" : "'EB Garamond', Georgia, serif",
                  fontSize: 34,
                  color: isDev ? '#fafafa' : '#0f172a',
                }}
              >
                {isDev ? (
                  <>ASR<span style={{ color: '#34d399' }}>_</span></>
                ) : (
                  <>Atanu Shuvam Roy</>
                )}
              </div>
              <div
                style={{
                  width: 120,
                  height: 2,
                  borderRadius: 999,
                  background: isDev ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '50%',
                    height: '100%',
                    background: isDev ? '#34d399' : '#b8860b',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isDev ? '#71717a' : '#64748b',
                }}
              >
                {isDev ? 'Loading developer mode' : 'Loading academic mode'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}
