import { getContent, type Locale } from '@/lib/content'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicHomeSEO } from '@/lib/seo'
import { Newspaper, ArrowRight } from 'lucide-react'
import { HomeProjectsSection } from '@/components/home/HomeProjectsSection'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicHomeSEO(locale as Locale))
}

export default async function AcademicHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  // Get top 5 news/blog posts sorted by date desc
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPosts: any[] = content?.academic?.blog_posts || []
  const latestNews = [...allPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // Get latest 3 projects sorted by year desc
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allProjects: any[] = content?.academic?.academic_projects || []
  const latestProjects = [...allProjects]
    .sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0))
    .slice(0, 3)

  return (
    <div className="space-y-14 pb-16">

      {/* ── About (summary) ───────────────────────────────────────── */}
      <section id="about" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>
          About
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap max-w-3xl">
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
            Recent News
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="text-xs font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
          >
            All news <ArrowRight size={12} />
          </Link>
        </div>
        <ul className="space-y-2.5">
          {latestNews.map((post: any) => (
            <li key={post.id} className="flex items-start gap-2.5 text-sm md:text-base">
              <Newspaper size={15} className="text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground text-xs md:text-sm shrink-0 pt-0.5 font-mono-dev">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </span>
              <span className="leading-snug text-foreground">{post.summary?.trim() || post.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Latest Projects ───────────────────────────────────────── */}
      <section id="latest-projects" className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Latest Projects
          </h2>
          <Link
            href={`/${locale}/projects`}
            className="text-xs font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
          >
            All projects <ArrowRight size={12} />
          </Link>
        </div>
        {/* Client component handles the modal interaction */}
        <HomeProjectsSection projects={latestProjects} />
      </section>

    </div>
  )
}
