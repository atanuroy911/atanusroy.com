'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// The modal pulls in animation code, so load it only when a tile is opened
const DevProjectModal = dynamic(() => import('./DevProjectModal').then((m) => m.DevProjectModal))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = any

// Muted demo videos play only while on screen, and never for reduced-motion users
function InViewVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
}

export function DevWorkTiles({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null)
  const [opened, setOpened] = useState(false)

  return (
    <>
      <div className="ap-tiles">
        {projects.map((p, i) => {
          const img = p.showcase_image || p.image
          return (
            <article key={p.title} className={`ap-tile ${i === 0 ? 'ap-tile-wide' : ''}`}>
              <div className="ap-tile-text">
                {p.tags?.length > 0 && <p className="ap-tile-kicker">{p.tags.slice(0, 3).join(' · ')}</p>}
                <h3 className="ap-tile-title">
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => {
                      setOpened(true)
                      setActive(p)
                    }}
                  >
                    {p.title}
                  </button>
                </h3>
                <p className="ap-tile-desc">{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="ap-link">
                    Visit site<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
              <div className="ap-tile-media">
                {p.video ? (
                  <InViewVideo src={p.video} poster={img} label={`${p.title} demo`} />
                ) : img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt={`${p.title} screenshot`} loading="lazy" decoding="async" />
                ) : (
                  <div className="ap-tile-glyph" aria-hidden="true">{p.mockup_icon || '✦'}</div>
                )}
              </div>
            </article>
          )
        })}
      </div>
      {opened && <DevProjectModal project={active} onClose={() => setActive(null)} />}
    </>
  )
}
