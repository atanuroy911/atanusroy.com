import { getDeveloperBlogPosts, getDeveloperPostById, formatBlogDate, type BlogCategory } from '@/lib/blog'
import { type Locale, LOCALES } from '@/lib/content'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, ExternalLink, Code2 } from 'lucide-react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateStaticParams() {
  const params: { locale: string; postId: string }[] = []
  for (const locale of LOCALES) {
    const { posts } = getDeveloperBlogPosts(locale)
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
  const post = getDeveloperPostById(locale as Locale, postId)
  if (!post) return {}
  return buildMetadata({
    title: `${post.title} | Blog — Atanu Shuvam Roy`,
    description: post.summary,
    path: `/${locale}/developer/blog/${postId}`,
    locale,
    type: 'article',
    publishedAt: post.date,
    keywords: ['Developer', 'Software Engineering', 'Programming'],
    tags: post.tags || [],
    image: post.cover_image || undefined,
  })
}

export default async function DevBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; postId: string }>
}) {
  const { locale, postId } = await params
  const post = getDeveloperPostById(locale as Locale, postId)
  if (!post) notFound()

  const { categories } = getDeveloperBlogPosts(locale as Locale)
  const cat = (categories as BlogCategory[]).find((c) => c.id === post.category) || {
    label: post.category, color: '#64748b', bg: '#f9fafb', id: post.category,
  }

  return (
    <div className="port pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href={`/${locale}/developer/blog`}
          className="inline-flex items-center gap-2 font-mono-dev text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Cover image */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl border border-gray-100 shadow-sm mb-12"
          />
        )}

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className="text-sm font-semibold uppercase tracking-widest px-3 py-1 rounded-md"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.label}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar size={16} /> {formatBlogDate(post.date)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.summary}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Thick separator */}
        <div className="h-px w-full bg-gray-200 mb-12" />

        {/* Markdown body */}
        {post.content ? (
          <div className="max-w-none prose prose-lg prose-gray">
            <MarkdownRenderer content={post.content} mode="developer" />
          </div>
        ) : (
          <p className="font-mono-dev text-slate-500 italic">// no_content_found</p>
        )}

        {/* Footer CTAs */}
        {(post.link || post.github) && (
          <footer className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <ExternalLink size={18} /> External Link
              </a>
            )}
            {post.github && (
              <a href={post.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                <Code2 size={18} /> View on GitHub
              </a>
            )}
          </footer>
        )}
      </div>
    </div>
  )
}
