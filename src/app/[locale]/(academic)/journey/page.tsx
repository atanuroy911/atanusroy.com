import { getContent, type Locale } from '@/lib/content'
import { GalleryGrid } from '@/components/GalleryGrid'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicJourneySEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicJourneySEO(locale as Locale))
}

export default async function AcademicJourney({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const journey = content.academic.journey

  return (
    <div id="journey" className="space-y-8 pb-24">
      <section className="space-y-4 border-b border-border pb-6">
        <h1 className="text-4xl font-bold">{journey?.title || 'Academic Journey'}</h1>
        <p className="text-lg text-muted-foreground">{journey?.description}</p>
      </section>
      <GalleryGrid images={journey?.images || []} />
    </div>
  )
}
