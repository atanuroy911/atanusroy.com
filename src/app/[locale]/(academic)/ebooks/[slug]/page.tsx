import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BookOpen, Download } from 'lucide-react'
import { LOCALES, type Locale } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { getEbook, getEbooks } from '@/lib/ebooks'
import { ShareButtons } from '@/components/ShareButtons'

const SITE_URL = 'https://www.atanusroy.com'

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getEbooks(locale).map((b) => ({ locale, slug: b.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const b = getEbook(locale as Locale, slug)
  if (!b) return {}
  return buildMetadata({
    title: `${b.title}: ${b.subtitle} (Free Ebook)`,
    description: b.description,
    path: `/${locale}/ebooks/${b.slug}`,
    locale,
    type: 'book',
    image: `${SITE_URL}${b.share_image}`,
    keywords: [b.title, 'Free Ebook', 'PDF', 'AI', 'Research', 'RARL AI Practitioner Series'],
  })
}

export default async function EbookPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const b = getEbook(locale as Locale, slug)
  if (!b) notFound()
  const companion = b.companion ? getEbook(locale as Locale, b.companion) : undefined
  const fileName = `${b.title}.pdf`

  const bookLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: `${b.title}: ${b.subtitle}`,
    description: b.description,
    image: `${SITE_URL}${b.cover}`,
    url: `${SITE_URL}/${locale}/ebooks/${b.slug}`,
    bookFormat: 'https://schema.org/EBook',
    numberOfPages: b.pages,
    datePublished: String(b.year),
    inLanguage: 'en',
    isAccessibleForFree: true,
    isPartOf: { '@type': 'BookSeries', name: 'RARL AI Practitioner Series' },
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Atanu Shuvam Roy' },
    publisher: { '@type': 'Organization', name: 'Robotics & Automation Research Lab (RARL)', url: 'https://www.rarl-lab.com' },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    associatedMedia: { '@type': 'MediaObject', contentUrl: `${SITE_URL}${encodeURI(b.link)}`, encodingFormat: 'application/pdf' },
  }

  const btn = 'inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  return (
    <article className="py-8 max-w-5xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookLd).replace(/</g, '\\u003c') }} />

      <div className="grid gap-8 md:grid-cols-[18rem_1fr] md:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={b.cover}
          alt={`Cover of ${b.title}`}
          width={900}
          height={1275}
          className="w-56 md:w-full rounded-lg shadow-xl border border-slate-200 dark:border-slate-700"
        />
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Free ebook · {b.series}
          </p>
          <h1 className="font-bold ac-font-serif leading-tight" style={{ color: 'var(--ac-navy)', fontSize: 'clamp(2.25rem, 4.5vw, 3rem)' }}>{b.title}</h1>
          <p className="text-xl italic text-slate-700 dark:text-slate-300">{b.subtitle}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            By Atanu Shuvam Roy · {b.pages} pages · PDF · {b.year} · Supported by{' '}
            <a href="https://www.rarl-lab.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              RARL<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">{b.description}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={b.link} className={`${btn} bg-[color:var(--ac-navy)] text-white hover:opacity-90`}>
              <BookOpen size={16} aria-hidden="true" /> Read now
            </a>
            <a href={b.link} download={fileName} data-no-viewer className={`${btn} border border-slate-300 text-slate-800 hover:border-slate-500 dark:border-slate-600 dark:text-slate-200`}>
              <Download size={16} aria-hidden="true" /> Download PDF
            </a>
          </div>
        </div>
      </div>

      <section aria-labelledby="inside" className="mt-12 space-y-3">
        <h2 id="inside" className="text-xl font-bold" style={{ color: 'var(--ac-navy)' }}>What&apos;s inside</h2>
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-slate-700 dark:text-slate-300">
          {b.contents.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>

      {companion && (
        <section aria-labelledby="companion" className="mt-12">
          <h2 id="companion" className="text-xl font-bold mb-4" style={{ color: 'var(--ac-navy)' }}>Companion volume</h2>
          <Link
            href={`/${locale}/ebooks/${companion.slug}`}
            className="ac-paper group flex items-center gap-4 rounded-xl p-4 max-w-xl hover:shadow-md transition-shadow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={companion.cover} alt="" loading="lazy" className="w-16 rounded shadow" />
            <span>
              <span className="block font-semibold text-slate-900 dark:text-slate-100 group-hover:underline underline-offset-4">{companion.title}</span>
              <span className="block text-sm text-slate-600 dark:text-slate-400">{companion.subtitle}</span>
            </span>
          </Link>
        </section>
      )}

      <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">
        <ShareButtons title={`${b.title}: ${b.subtitle} — free ebook by Atanu Shuvam Roy`} url={`${SITE_URL}/${locale}/ebooks/${b.slug}`} />
      </div>
    </article>
  )
}
