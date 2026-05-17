import { getContent, type Locale } from '@/lib/content'
import { HeroSection } from '@/components/home/HeroSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ProjectsPreview } from '@/components/home/ProjectsPreview'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { EducationSection } from '@/components/home/EducationSection'
import { AwardsSection } from '@/components/home/AwardsSection'
import { ModeOverlay } from '@/components/ModeOverlay'
import type { Metadata } from 'next'
import { buildMetadata, getDevHomeSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevHomeSEO(locale as Locale))
}

export default async function DevHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return (
    <>
      <ModeOverlay />
      <HeroSection content={content} locale={locale} />
      <ProjectsPreview content={content} locale={locale} />
      <AboutSection content={content} />
      <ExperienceSection content={content} />
      <EducationSection content={content} />
      <AwardsSection content={content} />
    </>
  )
}
