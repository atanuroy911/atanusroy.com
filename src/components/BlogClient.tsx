'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ExternalLink, Pin, Search, ArrowRight, Code2, Tag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { BlogPost, BlogCategory } from '@/lib/blog'

// ─── Academic Blog Index ───────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AcademicBlogClient({ content }: { content: any }) {
  const posts: BlogPost[] = content?.academic?.blog_posts || []
  const categories: BlogCategory[] = content?.academic?.blog_categories || []
  const pathname = usePathname()
  const basePath = pathname.replace(/\/$/, '')

  return <BlogIndex posts={posts} categories={categories} mode="academic" basePath={basePath} />
}

// ─── Developer Blog Index ──────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DeveloperBlogClient({ content }: { content: any }) {
  const posts: BlogPost[] = content?.developer?.blog_posts || []
  const categories: BlogCategory[] = content?.developer?.blog_categories || []
  const pathname = usePathname()
  const basePath = pathname.replace(/\/$/, '')

  return <BlogIndex posts={posts} categories={categories} mode="developer" basePath={basePath} />
}

// ─── Shared Blog Index ─────────────────────────────────────────────────────────
function BlogIndex({
  posts,
  categories,
  mode,
  basePath,
}: {
  posts: BlogPost[]
  categories: BlogCategory[]
  mode: 'academic' | 'developer'
  basePath: string
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const isDev = mode === 'developer'

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [posts])

  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = [...posts].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
    result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory)
    if (activeTag) result = result.filter((p) => p.tags?.includes(activeTag))
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
  }, [posts, activeCategory, activeTag, searchQuery])

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
              <input
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
                    onClick={() => setActiveCategory(isActive ? 'all' : cat.id)}
                    className="dev-filter-btn"
                    style={isActive ? { background: cat.color, color: '#fff', borderColor: cat.color } : { background: cat.bg, color: cat.color, borderColor: cat.color + '66' }}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Tag chips */}
            {allTags.length > 0 && (
              <div className="dev-tag-filters">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`dev-tag-btn ${activeTag === tag ? 'active' : ''}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
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
                          href={`${basePath}/${post.id}`} 
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

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="dev-blog-card-tags">
                              {post.tags.slice(0, 5).map((t) => (
                                <span key={t} className="pill">#{t}</span>
                              ))}
                            </div>
                          )}
                        </div>

                          {/* Footer */}
                          <div className="dev-blog-card-footer" style={{ position: 'relative', zIndex: 3 }}>
                            <Link href={`${basePath}/${post.id}`} style={{ textDecoration: 'none' }} className="project-cta">
                              Read post <ArrowRight size={14} />
                            </Link>
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
  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold ac-font-serif" style={{ color: 'var(--ac-navy)' }}>News &amp; Updates</h1>
          <div className="h-1 w-20 mt-3" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed text-sm">
            Research updates, publications, conference announcements, and other academic news.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative mb-5">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 placeholder:text-slate-400"
            style={{ '--tw-ring-color': 'var(--ac-navy)' } as React.CSSProperties} />
        </motion.div>

        {/* Category pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-3">
          <button onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${activeCategory === 'all' ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-600 border-slate-200 hover:border-slate-400'}`}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
              style={activeCategory === cat.id ? { background: cat.color, borderColor: cat.color, color: '#fff' } : { borderColor: cat.color + '66', color: cat.color }}
              className="px-3 py-1 rounded-full text-xs font-semibold border transition-all hover:opacity-90">
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Tag chips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-1.5 mb-8">
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${activeTag === tag ? 'bg-amber-600 text-white border-amber-600' : 'text-slate-500 border-slate-200 hover:border-slate-400'}`}>
              #{tag}
            </button>
          ))}
        </motion.div>

        {/* Card list */}
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p key="empty" className="text-slate-400 text-center py-16">No posts found.</motion.p>
            ) : filtered.map((post, i) => {
              const cat = getCategoryMeta(post.category)
              return (
                <motion.article key={post.id} layout
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ delay: i * 0.04 }}
                  className="ac-paper rounded-xl overflow-hidden group"
                >
                  {post.cover_image && (
                    <img src={post.cover_image} alt={post.title} className="w-full h-44 object-cover" />
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {post.pinned && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Pin size={9} /> Pinned
                        </span>
                      )}
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: cat.bg, color: cat.color }}>{cat.label}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={11} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 leading-snug group-hover:underline">{post.title}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{post.summary}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags?.map((t) => (
                        <button key={t} onClick={() => setActiveTag(activeTag === t ? null : t)}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${activeTag === t ? 'bg-amber-600 text-white border-amber-600' : 'text-slate-400 border-slate-200 hover:border-slate-400'}`}>
                          #{t}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Link href={`${basePath}/${post.id}`}
                        className="flex items-center gap-1 text-xs font-semibold hover:underline transition-colors"
                        style={{ color: 'var(--ac-navy)' }}>
                        Read more <ArrowRight size={12} />
                      </Link>
                      {post.link && (
                        <a href={post.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors ml-auto">
                          <ExternalLink size={11} /> Paper
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
