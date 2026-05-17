import { getContent, type Locale } from '@/lib/content'
import { AcademicProjectsClient } from '@/components/AcademicProjectsClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicProjectsSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicProjectsSEO(locale as Locale))
}

export default async function AcademicProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return (
    <div id="projects">
      <AcademicProjectsClient content={content} />
    </div>
  )
}
