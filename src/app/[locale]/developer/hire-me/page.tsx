import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { DevHireMe } from '@/components/developer/DevHireMe'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: 'Why Hire Me — Atanu Shuvam Roy',
    description: 'Full-stack, DevOps, and ML engineer with a real production track record — direct communication, no agency overhead, and a 30-day support guarantee on every project.',
    path: `/${locale}/developer/hire-me`,
    locale,
    keywords: ['Hire a Developer', 'Full-Stack Engineer', 'DevOps', 'Freelance Developer', 'Software Engineer for Hire'],
  })
}

export default async function DevHireMePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return <DevHireMe content={content} locale={locale} />
}
