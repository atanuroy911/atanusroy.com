import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicPublicationsSEO } from '@/lib/seo'
import { PublicationsPage } from '@/components/Publications'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicPublicationsSEO(locale as Locale))
}

export default async function Publications({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const p = content.personal
  const ext = 'font-semibold text-primary hover:underline underline-offset-4'

  return (
    <div className="py-8 max-w-5xl">
      <h1 className="text-4xl font-bold ac-font-serif" style={{ color: 'var(--ac-navy)' }}>Publications</h1>
      <div className="h-1 w-20 mt-3" style={{ background: 'var(--ac-gold)' }} aria-hidden="true" />
      <p className="mt-4 mb-8 max-w-4xl leading-relaxed text-slate-700 dark:text-slate-300">
        Journal papers, conference papers and book chapters. Select a paper for its abstract, figures and
        citation. Citation counts are on{' '}
        <a href={p.google_scholar} target="_blank" rel="noopener noreferrer" className={ext}>
          Google Scholar<span className="sr-only"> (opens in a new tab)</span>
        </a>{' '}
        and{' '}
        <a href={p.dblp} target="_blank" rel="noopener noreferrer" className={ext}>
          DBLP<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
      <PublicationsPage pubs={content.academic.publications || []} locale={locale} />
    </div>
  )
}
