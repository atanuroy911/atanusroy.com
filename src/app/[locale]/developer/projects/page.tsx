import { getContent, type Locale } from '@/lib/content'
import { ProjectsClient } from '@/components/ProjectsClient'
import type { Metadata } from 'next'
import { buildMetadata, getDevProjectsSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevProjectsSEO(locale as Locale))
}

export default async function DevProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return <ProjectsClient content={content} />
}
