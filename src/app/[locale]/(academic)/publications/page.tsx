import { getContent, type Locale } from '@/lib/content'
import { PublicationsClient } from '@/components/PublicationsClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicPublicationsSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicPublicationsSEO(locale as Locale))
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return (
    <div id="publications">
      <PublicationsClient content={content} />
    </div>
  )
}
