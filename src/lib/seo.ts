import type { Metadata } from 'next'
import { getContent, type Locale } from '@/lib/content'

const SITE_URL = 'https://www.atanusroy.com'
const SITE_NAME = 'Atanu Shuvam Roy'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

// ─── Base metadata that every page inherits ───────────────────────────────────
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  manifest: '/manifest.webmanifest',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_ID',  // add when you have it
  },
}

// ─── Helper: build full Metadata for a given page ────────────────────────────
export interface PageSEOOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  locale?: string
  type?: 'website' | 'article' | 'profile'
  publishedAt?: string
  modifiedAt?: string
  tags?: string[]
}

// Search engines show ~155 characters; cut at a word boundary instead of mid-word
function trimDescription(text: string, max = 158): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  return clean.slice(0, clean.lastIndexOf(' ', max - 1)).replace(/[,;:.\s]+$/, '') + '…'
}

export function buildMetadata(opts: PageSEOOptions): Metadata {
  let { description } = opts
  const {
    title,
    path,
    keywords = [],
    image = OG_IMAGE,
    locale = 'en',
    type = 'website',
    publishedAt,
    modifiedAt,
    tags = [],
  } = opts

  const url = `${SITE_URL}${path}`
  description = trimDescription(description)
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const allKeywords = [SITE_NAME, 'Atanu Roy', 'IIT Kanpur', 'ULAB', 'Bangladesh', ...keywords, ...tags]

  return {
    ...baseMetadata,
    title: fullTitle,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en${path.replace(/^\/(en|bn)/, '')}`,
        'bn': `${SITE_URL}/bn${path.replace(/^\/(en|bn)/, '')}`,
        'x-default': `${SITE_URL}/en${path.replace(/^\/(en|bn)/, '')}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      type: type === 'article' ? 'article' : type === 'profile' ? 'profile' : 'website',
      ...(type === 'article' && publishedAt ? { publishedTime: publishedAt } : {}),
      ...(type === 'article' && modifiedAt ? { modifiedTime: modifiedAt } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@atanusroy',
    },
  }
}

// ─── Per-page SEO configs ─────────────────────────────────────────────────────
export function getAcademicHomeSEO(locale: Locale): PageSEOOptions {
  const c = getContent(locale)
  return {
    title: `${c.personal.name} — Researcher & Educator`,
    description: (c.academic?.bio as string) || 'Academic profile of Atanu Shuvam Roy — Researcher, Computer Vision, Robotics, IIT Kanpur.',
    path: `/${locale}`,
    locale,
    type: 'profile',
    keywords: ['Computer Vision', 'Robotics', 'Machine Learning', 'IoT', 'Researcher', 'Educator', 'Lecturer', 'IIT Kanpur', 'ULAB'],
  }
}

export function getAcademicAboutSEO(locale: Locale): PageSEOOptions {
  const c = getContent(locale)
  return {
    title: `About — ${c.personal.name}`,
    description: `Experience, education and awards of ${c.personal.name}: Lecturer in CSE at ULAB, M.Tech IIT Kanpur, researcher in computer vision, robotics and IoT.`,
    path: `/${locale}/about`,
    locale,
    type: 'profile',
    keywords: ['About', 'CV', 'Resume', 'Experience', 'Education', 'Computer Vision', 'Robotics', 'IIT Kanpur', 'ULAB'],
  }
}

export function getAcademicResearchSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Research — Atanu Shuvam Roy',
    description: 'Research by Atanu Shuvam Roy in computer vision, autonomous ground vehicles, IoT anomaly detection, and deep learning.',
    path: `/${locale}/research`,
    locale,
    keywords: ['Computer Vision', 'AGV', 'Autonomous Vehicles', 'Deep Reinforcement Learning', 'IoT', 'Edge Computing', 'Research'],
  }
}

export function getAcademicPublicationsSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Publications — Atanu Shuvam Roy',
    description: 'Peer-reviewed publications by Atanu Shuvam Roy in IEEE, VISAPP, and other leading venues.',
    path: `/${locale}/publications`,
    locale,
    keywords: ['Publications', 'IEEE', 'VISAPP', 'Journal', 'Conference', 'Papers', 'Computer Vision', 'Robotics'],
  }
}

export function getAcademicProjectsSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Projects — Atanu Shuvam Roy',
    description: 'Research projects by Atanu Shuvam Roy including AGV navigation, stress detection, smart surveillance, and more.',
    path: `/${locale}/projects`,
    locale,
    keywords: ['Research Projects', 'Computer Vision Projects', 'Robotics Projects', 'ML Projects'],
  }
}

export function getAcademicTeachingSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Teaching — Atanu Shuvam Roy',
    description: 'Courses taught by Atanu Shuvam Roy at ULAB: IoT, Python, Algorithms, Statistics and Software Engineering, with lecture slides and free ebooks to download.',
    path: `/${locale}/teaching`,
    locale,
    keywords: ['Teaching', 'Courses', 'Lecture Notes', 'ULAB', 'Computer Science', 'Educator'],
  }
}

export function getAcademicStudentsSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Students — Atanu Shuvam Roy',
    description: 'Current and past undergraduate students supervised by Atanu Shuvam Roy at ULAB, and their capstone projects in computer vision, IoT and robotics.',
    path: `/${locale}/students`,
    locale,
    keywords: ['Students', 'Supervision', 'Capstone', 'Undergraduate Research', 'ULAB'],
  }
}

export function getAcademicJourneySEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Academic Journey — Atanu Shuvam Roy',
    description: 'Academic and professional journey of Atanu Shuvam Roy from undergraduate studies to IIT Kanpur and beyond.',
    path: `/${locale}/journey`,
    locale,
    keywords: ['Academic Journey', 'Education', 'Career', 'IIT Kanpur', 'ULAB', 'Timeline'],
  }
}

export function getAcademicContactSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Contact — Atanu Shuvam Roy',
    description: 'Get in touch with Atanu Shuvam Roy for research collaborations, academic inquiries, or general contact.',
    path: `/${locale}/contact`,
    locale,
    keywords: ['Contact', 'Email', 'Collaboration', 'Research Inquiry'],
  }
}

export function getAcademicBlogIndexSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'News & Updates — Atanu Shuvam Roy',
    description: 'Research updates, publication announcements, conference reports, and academic news from Atanu Shuvam Roy.',
    path: `/${locale}/blog`,
    locale,
    keywords: ['Research News', 'Publications', 'Academic Blog', 'Updates', 'Conference'],
  }
}

export function getArchivedCoursesSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Archived Courses — Atanu Shuvam Roy',
    description: 'Past courses taught by Atanu Shuvam Roy at ULAB, with course outlines, lecture slides and practice material free to download.',
    path: `/${locale}/teaching/archived`,
    locale,
    keywords: ['Courses', 'Teaching', 'Archived', 'ULAB'],
  }
}

// ─── Developer SEO ─────────────────────────────────────────────────────────────
export function getDevHomeSEO(locale: Locale): PageSEOOptions {
  const c = getContent(locale)
  return {
    title: `${c.personal.name} — Software Engineer & Developer`,
    description: 'Full-stack developer, DevOps and ML engineer. I build fast web apps, products like CertSend, automation tools and data pipelines for clients worldwide.',
    path: `/${locale}/developer`,
    locale,
    type: 'profile',
    keywords: ['Software Engineer', 'Full-Stack Developer', 'DevOps', 'Web Development', 'React', 'Next.js', 'Cloud'],
  }
}

export function getDevProjectsSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Projects — Atanu Shuvam Roy (Developer)',
    description: 'Software projects by Atanu Shuvam Roy — web apps, automation tools, ML applications, and more.',
    path: `/${locale}/developer/projects`,
    locale,
    keywords: ['Software Projects', 'GitHub', 'Web Apps', 'Automation', 'Open Source'],
  }
}

export function getDevJourneySEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Developer Journey — Atanu Shuvam Roy',
    description: 'The professional journey of Atanu Shuvam Roy as a software engineer, DevOps practitioner, and full-stack developer.',
    path: `/${locale}/developer/journey`,
    locale,
    keywords: ['Career', 'Developer Journey', 'Experience', 'Full-Stack', 'DevOps'],
  }
}

export function getDevGallerySEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Gallery — Atanu Shuvam Roy',
    description: 'Screens, demos, and moments from projects shipped by Atanu Shuvam Roy.',
    path: `/${locale}/developer/gallery`,
    locale,
    keywords: ['Gallery', 'Screenshots', 'Demos', 'Software Engineer'],
  }
}

export function getDevContactSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Contact — Atanu Shuvam Roy (Developer)',
    description: 'Get in touch with Atanu Shuvam Roy for software projects, freelance work, or professional inquiries.',
    path: `/${locale}/developer/contact`,
    locale,
    keywords: ['Contact', 'Hire', 'Freelance', 'Software Development', 'Collaboration'],
  }
}

export function getDevBlogIndexSEO(locale: Locale): PageSEOOptions {
  return {
    title: 'Blog & Notes — Atanu Shuvam Roy',
    description: 'Dev logs, project write-ups, technical deep-dives, and tools from Atanu Shuvam Roy.',
    path: `/${locale}/developer/blog`,
    locale,
    keywords: ['Dev Blog', 'Dev Logs', 'Technical Writing', 'Projects', 'Engineering'],
  }
}

// ─── JSON-LD for a blog/news post ─────────────────────────────────────────────
export function blogPostingJsonLd(post: { title: string; summary: string; date: string; cover_image?: string; tags?: string[] }, path: string) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    image: post.cover_image ? new URL(post.cover_image, SITE_URL).toString() : OG_IMAGE,
    keywords: post.tags?.join(', '),
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#person` },
  }
  return JSON.stringify(json).replace(/</g, '\u003c')
}
