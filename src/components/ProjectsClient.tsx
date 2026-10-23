'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// The modal pulls in animation code, so load it only when a card is opened
const DevProjectModal = dynamic(() => import('@/components/developer/DevProjectModal').then((m) => m.DevProjectModal))

const PAGE_SIZE = 9

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Project = any

type Product = {
  name: string
  tagline: string
  description: string
  link: string
  video?: string
  poster?: string
  cta_primary?: string
  learn_more?: string
}

/** Developer projects: the product first, then every project as a card that opens a popup. */
export function ProjectsClient({ projects, product, locale }: { projects: Project[]; product?: Product; locale: string }) {
  const [active, setActive] = useState<Project | null>(null)
  const [opened, setOpened] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const sentinel = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const list = projects.filter((p) => p.title !== product?.name)
  const hasMore = visible < list.length

  // Reveal more cards as the visitor scrolls (lazy loading)
  useEffect(() => {
    if (!hasMore || !sentinel.current) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible((c) => c + PAGE_SIZE), { rootMargin: '600px' })
    io.observe(sentinel.current)
    return () => io.disconnect()
  }, [hasMore])

  // Product demo plays only while on screen
  useEffect(() => {
    const v = videoRef.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const open = (p: Project) => {
    setOpened(true)
    setActive(p)
  }

  return (
    <div className="port">
      <section className="ap-section" aria-labelledby="projects-title">
        <div className="ap-wrap">
          <div className="ap-head">
            <h1 id="projects-title" className="sec-title">Projects.</h1>
            <p className="sec-sub">Things I&apos;ve built, from my own product to production systems for clients.</p>
          </div>

          {product && (
            <section className="ap-product" aria-labelledby="product-title">
              <div>
                <p className="ap-product-kicker">My product</p>
                <h2 id="product-title" className="ap-product-title">{product.name}</h2>
                <p className="ap-product-desc">
                  <strong>{product.tagline}</strong> {product.description}
                </p>
                <div className="ap-product-links">
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {product.cta_primary || 'Try it'}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <Link href={`/${locale}/developer/certsend`} className="ap-link">{product.learn_more || 'Learn more'}</Link>
                </div>
              </div>
              {product.video ? (
                <video ref={videoRef} src={product.video} poster={product.poster} muted loop playsInline preload="none" aria-label={`${product.name} demo`} />
              ) : (
                product.poster && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.poster} alt={`${product.name} preview`} loading="lazy" decoding="async" />
                )
              )}
            </section>
          )}

          <ul className="ap-proj-grid">
            {list.slice(0, visible).map((p) => {
              const img = p.showcase_image || p.image
              return (
                <li key={p.title} className={`ap-card ${img ? '' : 'ap-card-text'}`}>
                  {img ? (
                    <div className="ap-card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" loading="lazy" decoding="async" />
                    </div>
                  ) : (
                    p.mockup_icon && <p className="ap-card-icon" aria-hidden="true">{p.mockup_icon}</p>
                  )}
                  <div className="ap-card-body">
                    <h2 className="ap-card-title">
                      <button type="button" aria-haspopup="dialog" onClick={() => open(p)}>
                        {p.title}
                      </button>
                    </h2>
                    <p className="ap-card-desc">{p.description}</p>
                    {p.tags?.length > 0 && (
                      <div className="tech-pills" aria-label="Built with">
                        {p.tags.slice(0, 4).map((t: string) => (
                          <span key={t} className="pill">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          {hasMore && <div ref={sentinel} aria-hidden="true" style={{ height: 1 }} />}
        </div>
      </section>

      {opened && <DevProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  )
}
