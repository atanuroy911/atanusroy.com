'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ExternalLink, Pin, Search, ArrowRight, Code2 } from 'lucide-react'
import Link from 'next/link'
import type { BlogCategory, BlogListItem } from '@/lib/blog'

type BlogIndexProps = { posts: BlogListItem[]; categories: BlogCategory[] }

// ─── Academic Blog Index ───────────────────────────────────────────────────────
export function AcademicBlogClient({ posts, categories }: BlogIndexProps) {
  return <BlogIndex posts={posts} categories={categories} mode="academic" />
}

// ─── Developer Blog Index ──────────────────────────────────────────────────────
export function DeveloperBlogClient({ posts, categories }: BlogIndexProps) {
  return <BlogIndex posts={posts} categories={categories} mode="developer" />
}

// ─── Shared Blog Index ─────────────────────────────────────────────────────────
function BlogIndex({
  posts,
  categories,
  mode,
}: {
  posts: BlogListItem[]
  categories: BlogCategory[]
  mode: 'academic' | 'developer'
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const isDev = mode === 'developer'


  const filtered = useMemo(() => {
    let result = [...posts].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [posts, activeCategory, searchQuery])

  const getCategoryMeta = (catId: string) =>
    categories.find((c) => c.id === catId) || { label: catId, color: '#64748b', bg: '#f1f5f9', id: catId }

  if (isDev) {
    return (
      <div className="port">
        <div className="dev-blog-page">
          {/* Header */}
          <div className="dev-blog-header">
            <div className="sec-label">// blog</div>
            <h1 className="sec-title">Blog &amp; Notes</h1>
            <p className="sec-sub" style={{ marginBottom: 32 }}>
              Dev logs, project write-ups, tools, and technical deep-dives.
            </p>

            {/* Search */}
            <div className="dev-blog-search-wrap">
              <Search size={16} />
              <label htmlFor="dev-blog-search" className="sr-only">Search posts</label>
              <input
                id="dev-blog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="dev-blog-search"
              />
            </div>

            {/* Category filters */}
            <div className="dev-blog-filters">
              <button
                onClick={() => setActiveCategory('all')}
                className={`dev-filter-btn ${activeCategory === 'all' ? 'active-all' : ''}`}
              >
                All
              </button>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(isActive ? 'all' : cat.id)}
                    className="dev-filter-btn"
                    style={isActive ? { background: cat.color, color: '#fff', borderColor: cat.color } : { background: cat.bg, color: cat.color, borderColor: cat.color + '66' }}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

          </div>

          {/* Posts */}
          <div className="dev-blog-list">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="sec-sub"
                  style={{ textAlign: 'center', padding: '64px 0' }}
                >
                  No posts found.
                </motion.div>
              ) : (
                filtered.map((post, i) => {
                  const cat = getCategoryMeta(post.category)
                  return (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <article className="dev-blog-card" style={{ position: 'relative' }}>
                        <Link 
                          href={post.href} 
                          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
                          aria-label={`Read ${post.title}`}
                        />
                        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
                          {/* Meta row */}
                          <div className="dev-blog-card-meta">
                            {post.pinned && (
                              <span className="dev-pinned-badge">
                                <Pin size={9} /> Pinned
                              </span>
                            )}
                            <span
                              className="dev-blog-cat-badge"
                              style={{ background: cat.bg, color: cat.color, borderColor: cat.color + '55' }}
                            >
                              {cat.label}
                            </span>
                            <span className="dev-blog-date">
                              <Calendar size={12} />
                              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="dev-blog-card-title">{post.title}</h2>

                          {/* Summary */}
                          <p className="dev-blog-card-summary">{post.summary}</p>

                        </div>

                          {/* Footer */}
                          <div className="dev-blog-card-footer" style={{ position: 'relative', zIndex: 3 }}>
                            <span className="project-cta" aria-hidden="true">
                              Read post <ArrowRight size={14} />
                            </span>
                            {post.github && (
                              <a
                                href={post.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: 'var(--dev-text-3)', textDecoration: 'none' }}
                              >
                                <Code2 size={14} /> GitHub
                              </a>
                            )}
                            {post.link && (
                              <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: 'var(--dev-text-3)', textDecoration: 'none' }}
                              >
                                <ExternalLink size={14} /> Link
                              </a>
                            )}
                          </div>
                        </article>
                      </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  // ── Academic mode ────────────────────────────────────────────────────────────
  // Posts grouped by year as a simple timeline. Each card is one link (the title's
  // link stretches over the card), so clicking anywhere on it opens the post.
  const years = [...new Set(filtered.map((p) => new Date(p.date).getFullYear()))]

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold ac-font-serif" style={{ color: 'var(--ac-navy)' }}>Blog</h1>
        <div className="h-1 w-20 mt-3" style={{ background: 'var(--ac-gold)' }} aria-hidden="true" />
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-4xl leading-relaxed">
          Papers, conference talks and other news from my research and teaching.
        </p>

        <div className="mt-8 mb-10 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <label htmlFor="news-search" className="sr-only">Search posts</label>
            <input
              id="news-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts"
              className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ '--tw-ring-color': 'var(--ac-navy)' } as React.CSSProperties}
            />
          </div>

          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            {[{ id: 'all', label: 'All' }, ...categories].map((cat) => {
              const active = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(active && cat.id !== 'all' ? 'all' : cat.id)}
                  className={`min-h-9 px-3.5 rounded-full text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                      : 'text-slate-700 border-slate-300 hover:border-slate-500 dark:text-slate-300 dark:border-slate-600'
                  }`}
                  style={{ '--tw-ring-color': 'var(--ac-navy)' } as React.CSSProperties}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{filtered.length} posts shown</p>

        {filtered.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400 text-center py-16">No posts match your search.</p>
        ) : (
          <div className="space-y-12">
            {years.map((year) => (
              <section key={year} aria-labelledby={`year-${year}`}>
                <h2 id={`year-${year}`} className="text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400 mb-4">
                  {year}
                </h2>
                <ol className="space-y-4 border-l border-slate-200 dark:border-slate-700 pl-5">
                  {filtered.filter((p) => new Date(p.date).getFullYear() === year).map((post) => {
                    const cat = getCategoryMeta(post.category)
                    return (
                      <li key={post.id} className="relative">
                        <span
                          className="absolute -left-[26px] top-6 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-slate-950"
                          style={{ background: cat.color }}
                          aria-hidden="true"
                        />
                        <article className="ac-paper group relative flex gap-5 rounded-xl p-5 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2"
                          style={{ '--tw-ring-color': 'var(--ac-navy)' } as React.CSSProperties}>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1.5">
                              <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200"><span className="h-2 w-2 rounded-full" style={{ background: cat.color }} aria-hidden="true" />{cat.label}</span>
                              <span aria-hidden="true"> · </span>
                              <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </time>
                            </p>
                            <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-slate-100">
                              <Link
                                href={post.href}
                                className="after:absolute after:inset-0 after:rounded-xl focus:outline-none group-hover:underline underline-offset-4"
                              >
                                {post.title}
                              </Link>
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300 line-clamp-3">{post.summary}</p>
                          </div>
                          {post.cover_image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.cover_image}
                              alt=""
                              loading="lazy"
                              className="hidden sm:block w-36 h-28 shrink-0 rounded-lg object-cover bg-white border border-slate-200 dark:border-slate-700"
                            />
                          )}
                        </article>
                      </li>
                    )
                  })}
                </ol>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
