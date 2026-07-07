import type { Metadata } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { PageTransitionProvider } from '@/providers/PageTransitionProvider'
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

  const SITE_URL = 'https://www.atanusroy.com'
  const nav = content.nav || {}

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: p.name,
    url: SITE_URL,
    image: `${SITE_URL}${p.academic_photo || '/assets/academic_photo.jpg'}`,
    email: p.email,
    jobTitle: 'Lecturer, Researcher & Software Engineer',
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Liberal Arts Bangladesh',
      url: 'https://ulab.edu.bd',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Technology Kanpur',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jiangxi University of Science & Technology',
      },
    ],
    sameAs: [
      p.linkedin,
      p.github,
      p.google_scholar,
      p.researchgate,
      p.orcid,
      p.youtube,
      p.instagram,
    ].filter(Boolean),
  }

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: p.name,
    inLanguage: locale,
    publisher: { '@id': `${SITE_URL}/#person` },
  }

  const navItems: { name: string; path: string }[] = [
    { name: nav.home || 'Home', path: '' },
    { name: nav.about || 'About', path: '/about' },
    { name: nav.research || 'Research', path: '/research' },
    { name: nav.publications || 'Publications', path: '/publications' },
    { name: nav.projects || 'Projects', path: '/projects' },
    { name: nav.teaching || 'Teaching', path: '/teaching' },
    { name: nav.students || 'Students', path: '/students' },
    { name: nav.journey || 'Journey', path: '/journey' },
    { name: nav.blog || 'Blog', path: '/blog' },
    { name: nav.contact || 'Contact', path: '/contact' },
  ]

  const siteNavLd = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: navItems.map((n) => n.name),
    url: navItems.map((n) => `${SITE_URL}/${locale}${n.path}`),
  }

  const jsonLd = [personLd, websiteLd, siteNavLd]

  return (
    <ThemeProvider>
      <TooltipProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <PageTransitionProvider>
          <div className={isBn ? 'font-bangla' : undefined}>
            {children}
          </div>
        </PageTransitionProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

