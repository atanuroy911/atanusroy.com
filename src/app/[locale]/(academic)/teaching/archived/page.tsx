import { getContent, type Locale } from '@/lib/content'
import { ArchivedCoursesClient } from '@/components/ArchivedCoursesClient'
import type { Metadata } from 'next'
import { buildMetadata, getArchivedCoursesSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getArchivedCoursesSEO(locale as Locale))
}

export default async function ArchivedCoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return (
    <div id="archived-courses">
      <ArchivedCoursesClient content={content} />
    </div>
  )
}
