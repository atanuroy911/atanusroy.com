import { getContent, type Locale } from '@/lib/content'
import { DevJourneyTimeline } from '@/components/developer/DevJourneyTimeline'
import type { Metadata } from 'next'
import { buildMetadata, getDevJourneySEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevJourneySEO(locale as Locale))
}

export default async function DevJourney({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const journey = content.developer.journey

  return (
    <div className="port">
      <div className="dev-journey-page">
        <div className="mb-16 text-center">
          <div className="sec-label">// my_journey</div>
          <div className="sec-title">{journey?.title || 'Developer Journey'}</div>
          <div className="sec-sub max-w-2xl mx-auto">{journey?.description}</div>
        </div>
        <DevJourneyTimeline timeline={journey?.timeline || []} />
      </div>
    </div>
  )
}
