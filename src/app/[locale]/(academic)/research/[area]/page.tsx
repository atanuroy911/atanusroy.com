import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { LOCALES, type Locale } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { getResearchAreas, findPapers } from '@/lib/research'
import { RichText } from '@/components/RichText'
import { PublicationList } from '@/components/Publications'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getResearchAreas(locale).areas.map((a) => ({ locale, area: a.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; area: string }> }): Promise<Metadata> {
  const { locale, area } = await params
  const a = getResearchAreas(locale as Locale).areas.find((x) => x.slug === area)
  if (!a) return {}
  return buildMetadata({
    title: `${a.title} — Research`,
    description: a.summary,
    path: `/${locale}/research/${a.slug}`,
    locale,
    image: a.image,
    keywords: [a.title, 'Research', 'Robotics', 'Computer Vision'],
  })
}

export default async function ResearchAreaPage({ params }: { params: Promise<{ locale: string; area: string }> }) {
  const { locale, area } = await params
  const a = getResearchAreas(locale as Locale).areas.find((x) => x.slug === area)
  if (!a) notFound()
  const papers = findPapers(locale as Locale, a.papers)
  const related = findPapers(locale as Locale, a.related)
  const prose = 'leading-relaxed text-slate-700 dark:text-slate-300'
  const h2 = 'text-xl font-bold'

  return (
    <article className="py-8 max-w-5xl space-y-10">
      <div>
        <Link
          href={`/${locale}/research`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft size={14} aria-hidden="true" /> All research areas
        </Link>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">{a.status}</p>
        <h1 className="mt-1 text-4xl font-bold ac-font-serif" style={{ color: 'var(--ac-navy)' }}>{a.title}</h1>
        <div className="h-1 w-20 mt-3" style={{ background: 'var(--ac-gold)' }} aria-hidden="true" />
      </div>

      <div className={a.image ? 'grid gap-8 lg:grid-cols-[1fr_22rem]' : ''}>
        <div className="max-w-3xl space-y-4">
          <RichText text={a.intro} locale={locale} className={prose} />
        </div>
        {a.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={a.image}
            alt={a.image_alt || ''}
            className="w-full self-start rounded-lg border border-slate-200 bg-white dark:border-slate-700"
          />
        )}
      </div>

      {a.questions && a.questions.length > 0 && (
        <section aria-labelledby="questions" className="space-y-3">
          <h2 id="questions" className={h2} style={{ color: 'var(--ac-navy)' }}>
            Questions I&apos;m working on
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            {a.questions.map((q) => (
              <li key={q}>
                <RichText text={q} locale={locale} className={`inline ${prose}`} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {papers.length > 0 && (
        <section aria-labelledby="papers" className="space-y-4">
          <h2 id="papers" className={h2} style={{ color: 'var(--ac-navy)' }}>Papers</h2>
          <PublicationList pubs={papers} locale={locale} />
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related" className="space-y-4">
          <h2 id="related" className={h2} style={{ color: 'var(--ac-navy)' }}>Earlier work that leads here</h2>
          <PublicationList pubs={related} locale={locale} />
        </section>
      )}
    </article>
  )
}
