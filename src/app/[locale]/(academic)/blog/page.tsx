import { getContent, type Locale } from '@/lib/content'
import { AcademicBlogClient } from '@/components/BlogClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicBlogIndexSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicBlogIndexSEO(locale as Locale))
}

export default async function AcademicBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return <AcademicBlogClient content={content} />
}
