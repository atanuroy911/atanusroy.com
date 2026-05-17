import { getContent, type Locale } from '@/lib/content'
import { StudentsClient } from '@/components/StudentsClient'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicStudentsSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicStudentsSEO(locale as Locale))
}

export default async function StudentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return (
    <div id="students">
      <StudentsClient content={content} />
    </div>
  )
}
