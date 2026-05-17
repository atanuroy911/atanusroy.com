'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Mode = 'academic' | 'developer'

interface ModeContextType {
  mode: Mode
  setMode: (m: Mode) => void
  isAnimating: boolean
}

const ModeContext = createContext<ModeContextType>({
  mode: 'developer',
  setMode: () => {},
  isAnimating: false,
})

export function ModeProvider({ children, forcedMode }: { children: ReactNode, forcedMode?: Mode }) {
  const [mode, setModeState] = useState<Mode>(forcedMode || 'developer')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (forcedMode) return
    const saved = localStorage.getItem('site-mode') as Mode | null
    if (saved === 'academic' || saved === 'developer') setModeState(saved)
  }, [forcedMode])

  const setMode = (m: Mode) => {
    if (forcedMode) return // If forced, ignore changes
    if (m === mode) return
    setIsAnimating(true)
    setTimeout(() => {
      setModeState(m)
      localStorage.setItem('site-mode', m)
      setIsAnimating(false)
    }, 400)
  }

  return (
    <ModeContext.Provider value={{ mode: forcedMode || mode, setMode, isAnimating }}>
      <div data-mode={forcedMode || mode} className="contents">
        {children}
      </div>
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}

