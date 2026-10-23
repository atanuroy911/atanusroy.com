import { getContent, pickContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getDevHomeSEO } from '@/lib/seo'
import { DevHome } from '@/components/developer/DevHome'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevHomeSEO(locale as Locale))
}

export default async function DevHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return (
    <div className="port">
      <DevHome
        content={pickContent(content, [
          'developer.hero',
          'developer.services',
          'developer.process',
          'developer.quote',
          'developer.cta',
          'developer.projects',
        ])}
        locale={locale}
      />
    </div>
  )
}
