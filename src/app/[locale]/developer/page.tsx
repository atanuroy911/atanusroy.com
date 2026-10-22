import { getContent, pickContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getDevHomeSEO } from '@/lib/seo'

import { DevHero } from '@/components/developer/DevHero'
import { DevProjects } from '@/components/developer/DevProjects'
import { DevHireMeTeaser } from '@/components/developer/DevHireMeTeaser'
import { DevServices } from '@/components/developer/DevServices'
import { DevProcess } from '@/components/developer/DevProcess'
import { DevQuote } from '@/components/developer/DevQuote'
import { DevCTA } from '@/components/developer/DevCTA'
import { DevProductBanner } from '@/components/developer/DevProductBanner'

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
      <DevHero content={pickContent(content, ['developer.hero'])} locale={locale} />
      <DevProductBanner product={content.developer.certsend} locale={locale} />
      <DevProjects content={pickContent(content, ['developer.projects'])} locale={locale} />
      <DevHireMeTeaser locale={locale} />
      <DevServices content={pickContent(content, ['developer.services'])} />
      <DevProcess content={pickContent(content, ['developer.process'])} />
      <DevQuote content={pickContent(content, ['developer.quote'])} />
      <DevCTA content={pickContent(content, ['developer.cta'])} locale={locale} />
    </div>
  )
}
