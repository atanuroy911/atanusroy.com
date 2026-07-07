import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/content'
import { getAcademicBlogPosts, getDeveloperBlogPosts } from '@/lib/blog'

const SITE_URL = 'https://www.atanusroy.com'

const staticAcademicRoutes = [
  '',             // home
  '/about',
  '/blog',
  '/contact',
  '/journey',
  '/projects',
  '/publications',
  '/research',
  '/students',
  '/teaching',
  '/teaching/archived',
]

const staticDevRoutes = [
  '/developer',
  '/developer/hire-me',
  '/developer/blog',
  '/developer/contact',
  '/developer/journey',
  '/developer/gallery',
  '/developer/projects',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    // Static academic pages
    for (const route of staticAcademicRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${route}`])),
        },
      })
    }

    // Static developer pages
    for (const route of staticDevRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/developer' ? 'weekly' : 'monthly',
        priority: route === '/developer' ? 0.9 : route === '/developer/hire-me' ? 0.85 : 0.7,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${route}`])),
        },
      })
    }

    // Dynamic academic blog posts
    const { posts: acPosts } = getAcademicBlogPosts(locale)
    for (const post of acPosts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: post.pinned ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/blog/${post.id}`])),
        },
      })
    }

    // Dynamic developer blog posts
    const { posts: devPosts } = getDeveloperBlogPosts(locale)
    for (const post of devPosts) {
      entries.push({
        url: `${SITE_URL}/${locale}/developer/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: post.pinned ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/developer/blog/${post.id}`])),
        },
      })
    }
  }

  return entries
}
