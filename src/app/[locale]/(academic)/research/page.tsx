import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/content'
import { buildMetadata, getAcademicResearchSEO } from '@/lib/seo'
import { getResearchAreas, findPapers } from '@/lib/research'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicResearchSEO(locale as Locale))
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { intro, areas } = getResearchAreas(locale as Locale)

  return (
    <div id="research" className="py-8 max-w-5xl">
      <h1 className="text-4xl font-bold ac-font-serif" style={{ color: 'var(--ac-navy)' }}>Research</h1>
      <div className="h-1 w-20 mt-3" style={{ background: 'var(--ac-gold)' }} aria-hidden="true" />
      <p className="mt-4 mb-10 max-w-4xl leading-relaxed text-slate-700 dark:text-slate-300">{intro}</p>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {areas.map((a) => {
          const count = findPapers(locale as Locale, a.papers).length
          return (
            <li key={a.slug}>
              <article
                className="ac-paper group relative flex h-full flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2"
                style={{ '--tw-ring-color': 'var(--ac-navy)' } as React.CSSProperties}
              >
                {a.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    className="h-44 w-full border-b border-slate-200 bg-white object-contain p-2 dark:border-slate-700"
                  />
                )}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">{a.status}</p>
                  <h2 className="ac-font-serif text-xl font-bold leading-snug text-slate-900 dark:text-slate-100">
                    <Link
                      href={`/${locale}/research/${a.slug}`}
                      className="after:absolute after:inset-0 focus:outline-none group-hover:underline underline-offset-4"
                    >
                      {a.title}
                    </Link>
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{a.summary}</p>
                  <p
                    className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold"
                    style={{ color: 'var(--ac-navy)' }}
                    aria-hidden="true"
                  >
                    {count > 0 ? `${count} paper${count > 1 ? 's' : ''}` : 'Ongoing work'} <ArrowRight size={14} />
                  </p>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
