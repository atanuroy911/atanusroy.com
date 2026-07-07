'use client'

import { useEffect, useRef } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], .dev-timeline-card, .case-study-card, .reason-card, .service-card, .process-step, .dev-proj-card, .dev-blog-card, .showcase-3d, input, textarea, select'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)
  const hovering = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    function handleMove(e: PointerEvent) {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    function handleOver(e: PointerEvent) {
      const target = e.target as Element | null
      const isInteractive = !!target?.closest?.(INTERACTIVE_SELECTOR)
      if (isInteractive !== hovering.current) {
        hovering.current = isInteractive
        ringRef.current?.classList.toggle('is-hovering', isInteractive)
      }
    }

    function tick() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.2
      ring.current.y += (pos.current.y - ring.current.y) * 0.2
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x - 220}px, ${pos.current.y - 220}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    document.documentElement.classList.add('dev-cursor-none')
    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerover', handleOver, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('dev-cursor-none')
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerover', handleOver)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="cursor-glow-layer" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow-spot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
