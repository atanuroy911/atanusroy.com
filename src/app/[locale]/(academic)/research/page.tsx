import { getContent, type Locale } from '@/lib/content'
import { ResearchClient } from '@/components/ResearchClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicResearchSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicResearchSEO(locale as Locale))
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return (
    <div id="research">
      <ResearchClient content={content} />
    </div>
  )
}
