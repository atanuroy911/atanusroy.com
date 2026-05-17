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
    <div className="py-24 bg-white dark:bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
        {/* Back link */}
        <Link
          href={`/${locale}/developer/blog`}
          className="inline-flex items-center gap-2 font-mono-dev text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:text-[#00d9ff] dark:hover:text-[#00d9ff] transition-colors mb-10 border-b-2 border-transparent hover:border-[#00d9ff] pb-0.5"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Cover image */}
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-64 object-cover border-4 border-black dark:border-white shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] mb-10"
          />
        )}

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="font-mono-dev text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]"
              style={{ background: cat.bg, color: cat.color }}
            >
              {cat.label}
            </span>
            <span className="flex items-center gap-1.5 font-mono-dev text-xs text-slate-500 dark:text-slate-400">
              <Calendar size={11} /> {formatBlogDate(post.date)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter leading-none mb-5">
            {post.title}
          </h1>

          <div className="h-2 w-24 bg-[#00d9ff] border-2 border-black dark:border-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#fff] mb-6" />

          <p className="text-lg font-medium text-black dark:text-white leading-relaxed opacity-70 max-w-2xl">
            {post.summary}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((t) => (
                <span key={t} className="font-mono-dev text-[10px] font-bold uppercase px-2 py-0.5 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[1px_1px_0px_#000] dark:shadow-[1px_1px_0px_#fff]">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Thick separator */}
        <div className="h-1 w-full bg-black dark:bg-white mb-10" />

        {/* Markdown body */}
        {post.content ? (
          <div className="max-w-none">
            <MarkdownRenderer content={post.content} mode="developer" />
          </div>
        ) : (
          <p className="font-mono-dev text-slate-500 italic">// no_content_found</p>
        )}

        {/* Footer CTAs */}
        {(post.link || post.github) && (
          <footer className="mt-16 pt-6 border-t-2 border-black dark:border-white flex flex-wrap gap-4">
            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ffde00] border-2 border-black dark:border-white font-bold text-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#fff] transition-all">
                <ExternalLink size={14} /> External Link
              </a>
            )}
            {post.github && (
              <a href={post.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white border-2 border-black dark:border-white font-bold text-white dark:text-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#fff] transition-all">
                <Code2 size={14} /> View on GitHub
              </a>
            )}
          </footer>
        )}
      </div>
    </div>
  )
}
