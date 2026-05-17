import { getAcademicBlogPosts, getAcademicPostById, formatBlogDate, type BlogCategory } from '@/lib/blog'
import { type Locale, LOCALES } from '@/lib/content'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  const params: { locale: string; postId: string }[] = []
  for (const locale of LOCALES) {
    const { posts } = getAcademicBlogPosts(locale)
    for (const post of posts) {
      params.push({ locale, postId: post.id })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; postId: string }>
}): Promise<Metadata> {
  const { locale, postId } = await params
  const post = getAcademicPostById(locale as Locale, postId)
  if (!post) return {}
  return buildMetadata({
    title: `${post.title} | News — Atanu Shuvam Roy`,
    description: post.summary,
    path: `/${locale}/blog/${postId}`,
    locale,
    type: 'article',
    publishedAt: post.date,
    keywords: ['Academic', 'Research'],
    tags: post.tags || [],
    image: post.cover_image || undefined,
  })
}

export default async function AcademicBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; postId: string }>
}) {
  const { locale, postId } = await params
  const post = getAcademicPostById(locale as Locale, postId)
  if (!post) notFound()

  const { categories } = getAcademicBlogPosts(locale as Locale)
  const cat = (categories as BlogCategory[]).find((c) => c.id === post.category) || {
    label: post.category, color: '#64748b', bg: '#f1f5f9', id: post.category,
  }

  return (
    <div className="py-8 min-h-screen" style={{ background: 'var(--ac-bg)' }}>
      <article className="max-w-3xl">
        {/* Back link */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to News
        </Link>

        {/* Cover image */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl shadow-sm mb-8 border border-slate-100"
          />
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full border"
              style={{ background: cat.bg, color: cat.color, borderColor: cat.color + '44' }}
            >
              {cat.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={11} /> {formatBlogDate(post.date)}
            </span>
          </div>

          <h1 className="ac-font-serif text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--ac-text)' }}>
            {post.title}
          </h1>

          <div className="h-0.5 w-16 mb-5" style={{ background: 'var(--ac-gold)' }} />

          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            {post.summary}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              <Tag size={12} className="text-slate-400 mt-0.5" />
              {post.tags.map((t) => (
                <span key={t} className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 mb-8" />

        {/* Markdown body */}
        {post.content ? (
          <div className="prose-sm max-w-none">
            <MarkdownRenderer content={post.content} mode="academic" />
          </div>
        ) : (
          <p className="text-slate-500 italic">No content available for this post.</p>
        )}

        {/* Footer links */}
        {(post.link || post.github) && (
          <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4">
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all hover:opacity-90"
                style={{ borderColor: 'var(--ac-navy)', color: 'var(--ac-navy)' }}>
                <ExternalLink size={14} /> View Paper / Link
              </a>
            )}
          </footer>
        )}
      </article>
    </div>
  )
}
