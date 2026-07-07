'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const dot = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    function handleMove(e: PointerEvent) {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    function tick() {
      dot.current.x += (pos.current.x - dot.current.x) * 0.15
      dot.current.y += (pos.current.y - dot.current.y) * 0.15
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x - 220}px, ${pos.current.y - 220}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x - 4}px, ${dot.current.y - 4}px, 0)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="cursor-glow-layer" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow-spot" />
      <div ref={dotRef} className="cursor-glow-dot" />
    </div>
  )
}
