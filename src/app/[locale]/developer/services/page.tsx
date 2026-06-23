import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getDevHomeSEO } from '@/lib/seo'

import { ServicesSection } from '@/components/dev-home/ServicesSection'
import { FinalCTA } from '@/components/dev-home/FinalCTA'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  // Use generic dev SEO or a specific one for services if we add it to seo.ts later
  return buildMetadata({
    ...getDevHomeSEO(locale as Locale),
    title: 'Services | AI & Software Consulting',
    description: 'Expertise in custom software development, artificial intelligence, computer vision, and automation.',
  })
}

export default async function DevServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  // const content = getContent(locale as Locale)

  return (
    <>
      <div className="pt-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           {/* Header block to make it feel like a dedicated page */}
           <div className="mb-12">
             <span className="text-[#2563EB] font-semibold tracking-wide uppercase text-sm block mb-3">Capabilities</span>
             <h1 className="text-4xl md:text-6xl font-semibold text-[#0F172A] tracking-tight mb-6">How I Can Help</h1>
           </div>
        </div>
      </div>
      <ServicesSection />
      <FinalCTA locale={locale} />
    </>
  )
}
