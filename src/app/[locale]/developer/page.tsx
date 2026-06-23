import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getDevHomeSEO } from '@/lib/seo'

import { DevHero } from '@/components/developer/DevHero'
import { DevProjects } from '@/components/developer/DevProjects'
import { DevServices } from '@/components/developer/DevServices'
import { DevProcess } from '@/components/developer/DevProcess'
import { DevQuote } from '@/components/developer/DevQuote'
import { DevCTA } from '@/components/developer/DevCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevHomeSEO(locale as Locale))
}

export default async function DevHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return (
    <div className="port">
      <h2 className="sr-only">Atanu Shuvam Roy — Developer Portfolio</h2>
      <DevHero content={content} />
      <DevProjects content={content} />
      <DevServices content={content} />
      <DevProcess content={content} />
      <DevQuote content={content} />
      <DevCTA content={content} />
    </div>
  )
}
