import { getContent, type Locale } from '@/lib/content'

export interface BlogCategory {
  id: string
  label: string
  color: string
  bg: string
}

export interface BlogPost {
  id: string
  title: string
  date: string
  category: string
  tags: string[]
  cover_image?: string
  summary: string
  content?: string
  link?: string
  github?: string
  pinned?: boolean
}

export function getAcademicBlogPosts(locale: Locale): { posts: BlogPost[]; categories: BlogCategory[] } {
  const content = getContent(locale)
  return {
    posts: (content?.academic?.blog_posts || []) as BlogPost[],
    categories: (content?.academic?.blog_categories || []) as BlogCategory[],
  }
}

export function getDeveloperBlogPosts(locale: Locale): { posts: BlogPost[]; categories: BlogCategory[] } {
  const content = getContent(locale)
  return {
    posts: (content?.developer?.blog_posts || []) as BlogPost[],
    categories: (content?.developer?.blog_categories || []) as BlogCategory[],
  }
}

export function getAcademicPostById(locale: Locale, id: string): BlogPost | undefined {
  return getAcademicBlogPosts(locale).posts.find((p) => p.id === id)
}

export function getDeveloperPostById(locale: Locale, id: string): BlogPost | undefined {
  return getDeveloperBlogPosts(locale).posts.find((p) => p.id === id)
}

export function formatBlogDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export type BlogListItem = Omit<BlogPost, 'content'> & { href: string }

// One feed for both sides of the site: academic news and developer posts together.
// Each post keeps its own URL; the body is left out because lists only show summaries.
export function getCombinedBlog(locale: Locale): { posts: BlogListItem[]; categories: BlogCategory[] } {
  const ac = getAcademicBlogPosts(locale)
  const dev = getDeveloperBlogPosts(locale)
  const strip = (p: BlogPost, href: string): BlogListItem => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...rest } = p
    return { ...rest, href }
  }
  const posts = [
    ...ac.posts.map((p) => strip(p, `/${locale}/blog/${p.id}`)),
    ...dev.posts.map((p) => strip(p, `/${locale}/developer/blog/${p.id}`)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const seen = new Set<string>()
  const categories = [...ac.categories, ...dev.categories].filter((c) => !seen.has(c.id) && !!seen.add(c.id))
  return { posts, categories }
}
