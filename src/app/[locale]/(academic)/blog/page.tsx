import type { Locale } from '@/lib/content'
import { getCombinedBlog } from '@/lib/blog'
import { AcademicBlogClient } from '@/components/BlogClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicBlogIndexSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicBlogIndexSEO(locale as Locale))
}

export default async function AcademicBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { posts, categories } = getCombinedBlog(locale as Locale)
  return <AcademicBlogClient posts={posts} categories={categories} />
}
