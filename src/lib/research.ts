import { getContent, type Locale } from '@/lib/content'
import type { Publication } from '@/components/Publications'

export type ResearchArea = {
  slug: string
  title: string
  status: string
  summary: string
  intro: string
  questions?: string[]
  image?: string
  image_alt?: string
  papers?: string[]
  related?: string[]
}

export function getResearchAreas(locale: Locale): { intro: string; areas: ResearchArea[] } {
  const c = getContent(locale)
  return { intro: c.academic.research_intro || '', areas: c.academic.research_areas || [] }
}

// Look papers up by DOI, or by title for papers without one
export function findPapers(locale: Locale, refs: string[] = []): Publication[] {
  const all: Publication[] = getContent(locale).academic.publications || []
  return refs
    .map((ref) => all.find((p) => p.doi?.toLowerCase() === ref.toLowerCase() || p.title === ref))
    .filter((p): p is Publication => !!p)
}
