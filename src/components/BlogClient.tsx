'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ExternalLink, Pin, Search, ArrowRight, Code2 } from 'lucide-react'
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
      <div className="py-24 bg-white dark:bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="font-mono-dev text-sm text-black dark:text-black uppercase font-bold mb-2 block tracking-widest bg-[#00d9ff] w-fit px-2 py-0.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">// blog</span>
            <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">Blog & Notes</h1>
            <div className="h-2 w-24 mt-4 bg-black dark:bg-white" />
            <p className="mt-4 text-black dark:text-white font-medium text-base max-w-2xl">
              Dev logs, project write-ups, tools, and technical deep-dives.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative mb-5">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white opacity-50" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-9 pr-4 py-2.5 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white text-sm font-mono-dev focus:outline-none shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] focus:shadow-[2px_2px_0px_#000] dark:focus:shadow-[2px_2px_0px_#fff] transition-all placeholder:text-slate-400" />
          </motion.div>

          {/* Category pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-3">
            {['all', ...categories.map((c) => c.id)].map((catId) => {
              const cat = catId === 'all' ? null : getCategoryMeta(catId)
              return (
                <button key={catId} onClick={() => setActiveCategory(catId)}
                  style={activeCategory === catId && cat ? { background: cat.color, color: '#fff', borderColor: cat.color } : cat ? { background: cat.bg, color: cat.color, borderColor: cat.color + '88' } : {}}
                  className={`font-mono-dev text-xs font-bold uppercase tracking-widest px-3 py-1 border-2 transition-all hover:translate-y-[1px] shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:shadow-[1px_1px_0px_#000] dark:hover:shadow-[1px_1px_0px_#fff] ${activeCategory === catId && !cat ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : !cat ? 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white' : ''}`}>
                  {catId === 'all' ? 'ALL' : cat?.label}
                </button>
              )
            })}
          </motion.div>

          {/* Tag chips */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-1.5 mb-10">
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`font-mono-dev text-[10px] font-bold uppercase px-2 py-0.5 border-2 border-black dark:border-white transition-all ${activeTag === tag ? 'bg-[#ff3366] text-white shadow-[1px_1px_0px_#000]' : 'bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]'}`}>
                #{tag}
              </button>
            ))}
          </motion.div>

          {/* Card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div key="empty" className="col-span-3 py-24 text-center font-mono-dev text-black dark:text-white font-bold uppercase tracking-widest opacity-40">
                  // no_posts_found
                </motion.div>
              ) : filtered.map((post, i) => {
                const cat = getCategoryMeta(post.category)
                return (
                  <motion.article key={post.id} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`dev-glass dev-border-glow bg-white dark:bg-black flex flex-col group ${post.pinned ? 'border-[3px] border-[#ff3366] dark:border-[#00d9ff]' : ''}`}
                  >
                    {/* Cover image strip or colored bar */}
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} className="w-full h-36 object-cover border-b-2 border-black dark:border-white" />
                    ) : (
                      <div className="h-2 w-full" style={{ background: cat.color }} />
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {post.pinned && (
                          <span className="flex items-center gap-1 text-[9px] font-mono-dev font-bold uppercase text-white bg-[#ff3366] px-2 py-0.5 border border-black dark:border-white shadow-[1px_1px_0px_#000]">
                            <Pin size={8} /> PINNED
                          </span>
                        )}
                        <span className="font-mono-dev text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border-2 border-black dark:border-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]"
                          style={{ background: cat.bg, color: cat.color }}>
                          {cat.label}
                        </span>
                        <span className="flex items-center gap-1 font-mono-dev text-[10px] text-slate-500 dark:text-slate-400">
                          <Calendar size={9} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <h2 className="text-lg font-black uppercase text-black dark:text-white leading-snug mb-2 group-hover:text-[#00d9ff] transition-colors">{post.title}</h2>
                      <p className="text-sm text-black dark:text-white font-medium leading-relaxed mb-3 flex-1 opacity-70">{post.summary}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags?.slice(0, 4).map((t) => (
                          <span key={t} className="font-mono-dev text-[9px] uppercase px-1.5 py-0.5 border border-black/30 dark:border-white/30 text-black dark:text-white opacity-60">#{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t-2 border-black dark:border-white">
                        <Link href={`${basePath}/${post.id}`}
                          className="flex items-center gap-1.5 font-mono-dev text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:text-[#00d9ff] dark:hover:text-[#00d9ff] transition-colors">
                          Read Post <ArrowRight size={12} />
                        </Link>
                        {post.github && (
                          <a href={post.github} target="_blank" rel="noopener noreferrer" className="ml-auto font-mono-dev text-xs font-bold uppercase text-black dark:text-white hover:text-[#00d9ff] transition-colors flex items-center gap-1">
                            <Code2 size={11} /> GitHub
                          </a>
                        )}
                        {post.link && (
                          <a href={post.link} target="_blank" rel="noopener noreferrer" className="ml-auto font-mono-dev text-xs font-bold uppercase text-black dark:text-white hover:text-[#00d9ff] transition-colors flex items-center gap-1">
                            <ExternalLink size={11} /> Link
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

  // ── Academic mode ────────────────────────────────────────────────────────────
  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold ac-font-serif" style={{ color: 'var(--ac-navy)' }}>News & Updates</h1>
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
