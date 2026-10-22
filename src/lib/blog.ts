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

// Posts for one side of the site, for list pages. Academic and developer blogs are
// kept separate. The body is left out because lists only show summaries.
export function getBlogList(locale: Locale, mode: 'academic' | 'developer'): { posts: BlogListItem[]; categories: BlogCategory[] } {
  const { posts, categories } = mode === 'academic' ? getAcademicBlogPosts(locale) : getDeveloperBlogPosts(locale)
  const base = mode === 'academic' ? `/${locale}/blog` : `/${locale}/developer/blog`
  return {
    posts: posts
      .map((p) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content, ...rest } = p
        return { ...rest, href: `${base}/${p.id}` }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    categories,
  }
}
