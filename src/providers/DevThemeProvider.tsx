'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type DevTheme = 'light' | 'dark'

interface DevThemeContextValue {
  devTheme: DevTheme
  toggleDevTheme: () => void
  mounted: boolean
}

const STORAGE_KEY = 'dev-theme'

const DevThemeContext = createContext<DevThemeContextValue | null>(null)

export function useDevTheme() {
  const ctx = useContext(DevThemeContext)
  if (!ctx) throw new Error('useDevTheme must be used within DevThemeProvider')
  return ctx
}

/** Safe variant for components (like Navbar) shared between academic and developer trees — returns null outside a DevThemeProvider instead of throwing. */
export function useOptionalDevTheme() {
  return useContext(DevThemeContext)
}

export function DevThemeProvider({ children }: { children: React.ReactNode }) {
  const [devTheme, setDevTheme] = useState<DevTheme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as DevTheme | null
    if (stored === 'dark' || stored === 'light') setDevTheme(stored)
    setMounted(true)
  }, [])

  const toggleDevTheme = () => {
    setDevTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return (
    <DevThemeContext.Provider value={{ devTheme, toggleDevTheme, mounted }}>
      <div className={devTheme === 'dark' ? 'dark' : undefined}>{children}</div>
    </DevThemeContext.Provider>
  )
}
