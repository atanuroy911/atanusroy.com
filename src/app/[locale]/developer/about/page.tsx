import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getDevHomeSEO } from '@/lib/seo'

import { WhyWorkWithMe } from '@/components/dev-home/WhyWorkWithMe'
import { FinalCTA } from '@/components/dev-home/FinalCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    ...getDevHomeSEO(locale as Locale),
    title: 'About | AI & Software Consulting',
    description: 'Learn more about my methodology, background, and approach to building scalable software.',
  })
}

export default async function DevAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // const content = getContent(locale as Locale)

  return (
    <>
      <div className="pt-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="mb-12">
             <span className="text-[#2563EB] font-semibold tracking-wide uppercase text-sm block mb-3">About Me</span>
             <h1 className="text-4xl md:text-6xl font-semibold text-[#0F172A] tracking-tight mb-6">Experience & Methodology</h1>
           </div>
        </div>
      </div>
      <WhyWorkWithMe />
      <FinalCTA locale={locale} />
    </>
  )
}
