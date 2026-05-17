import { getContent, type Locale } from '@/lib/content'
import { DeveloperBlogClient } from '@/components/BlogClient'
import type { Metadata } from 'next'
import { buildMetadata, getDevBlogIndexSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevBlogIndexSEO(locale as Locale))
}

export default async function DevBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return <DeveloperBlogClient content={content} />
}
