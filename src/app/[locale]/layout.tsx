import type { Metadata } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { getContent, getStaticLocaleParams, type Locale } from '@/lib/content'
import { TooltipProvider } from '@/components/ui/tooltip'
import { buildMetadata, getAcademicHomeSEO } from '@/lib/seo'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getStaticLocaleParams()
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const seo = getAcademicHomeSEO(locale as Locale)
  return buildMetadata(seo)
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const isBn = locale === 'bn'
  const p = content.personal

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    url: 'https://www.atanusroy.com',
    image: `https://www.atanusroy.com${p.academic_photo || '/assets/academic_photo.jpg'}`,
    email: p.email,
    jobTitle: 'Researcher & Software Engineer',
    affiliation: {
      '@type': 'Organization',
      name: 'University of Liberal Arts Bangladesh',
      url: 'https://ulab.edu.bd',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indian Institute of Technology Kanpur',
    },
    sameAs: [
      p.linkedin,
      p.github,
      p.google_scholar,
    ].filter(Boolean),
  }

  return (
    <ThemeProvider>
      <TooltipProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <div className={isBn ? 'font-bangla' : undefined}>
          {children}
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

