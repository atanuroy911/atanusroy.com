import { getContent, type Locale } from '@/lib/content'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicHomeSEO } from '@/lib/seo'
import { Newspaper, ArrowRight, BookOpen, Download } from 'lucide-react'
import { getBlogList } from '@/lib/blog'
import { PublicationList } from '@/components/Publications'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicHomeSEO(locale as Locale))
}

export default async function AcademicHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  const latestNews = getBlogList(locale as Locale, 'academic').posts.slice(0, 5)


  const ebooks: { title: string; description?: string; link: string }[] = content?.academic?.free_ebooks || []

  return (
    <div className="space-y-14 pb-16">
      <h1 className="sr-only">{content.personal.name}: {content.academic.hero?.role}, {content.academic.hero?.institution}</h1>

      {/* ── About (summary) ───────────────────────────────────────── */}
      <section id="about" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>
          About
        </h2>
        <p className="text-[15px] md:text-base leading-relaxed text-muted-foreground whitespace-pre-wrap max-w-5xl">
          {content.academic.bio}
        </p>
        <div className="pt-1">
          <h3 className="font-bold text-base md:text-lg mb-2.5">Research Interests</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {content.academic.research_interests?.map((ri: string) => (
              <li key={ri} className="flex items-center gap-2 text-sm md:text-base">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{ri}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-1">
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            Full profile &amp; CV <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Recent News ───────────────────────────────────────────── */}
      <section id="news" className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Latest from the Blog
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="text-xs font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
          >
            All posts <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
        <ul className="space-y-2.5">
          {latestNews.map((post) => (
            <li key={post.href} className="flex items-start gap-2.5 text-sm md:text-base">
              <Newspaper size={15} className="text-muted-foreground shrink-0 mt-1" aria-hidden="true" />
              <time dateTime={post.date} className="text-muted-foreground text-xs md:text-sm shrink-0 pt-0.5 font-mono-dev w-20 whitespace-nowrap">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </time>
              <Link href={post.href} className="leading-snug text-foreground hover:underline underline-offset-4">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Publications ──────────────────────────────────────────── */}
      <section id="publications" aria-labelledby="publications-heading" className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2">
          <h2 id="publications-heading" className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Recent Publications
          </h2>
          <a
            href={content.personal.google_scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
          >
            All papers on Google Scholar <ArrowRight size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">Recent papers. Select a card for the abstract, figures and citation.</p>
        <PublicationList pubs={(content.academic.publications || []).slice(0, 3)} locale={locale} />
        <Link
          href={`/${locale}/publications`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          All publications <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </section>

      {/* ── Free Ebooks ───────────────────────────────────────────── */}
      {ebooks.length > 0 && (
        <section id="free-ebooks" className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--ac-navy)' }}>
              Free Ebooks
            </h2>
            <Link
              href={`/${locale}/teaching`}
              className="text-xs font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
            >
              Teaching <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ebooks.map((b) => (
              <a
                key={b.link}
                href={b.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border p-4 hover:bg-muted/50 transition-colors"
              >
                <BookOpen size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-sm md:text-base">{b.title}</span>
                  {b.description && <span className="block text-xs md:text-sm text-muted-foreground mt-0.5">{b.description}</span>}
                </span>
                <Download size={16} className="text-muted-foreground shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
