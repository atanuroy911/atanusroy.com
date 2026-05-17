import { getContent, type Locale } from '@/lib/content'
import { TeachingClient } from '@/components/TeachingClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicTeachingSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicTeachingSEO(locale as Locale))
}

export default async function TeachingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return (
    <div id="teaching">
      <TeachingClient content={content} />
    </div>
  )
}
