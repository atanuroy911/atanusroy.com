import { getContent, type Locale } from '@/lib/content'

export type Ebook = {
  slug: string
  title: string
  subtitle: string
  series: string
  pages: number
  year: number
  description: string
  contents: string[]
  cover: string
  share_image: string
  link: string
  companion?: string
}

export function getEbooks(locale: Locale): Ebook[] {
  return getContent(locale).academic.free_ebooks || []
}

export function getEbook(locale: Locale, slug: string): Ebook | undefined {
  return getEbooks(locale).find((b) => b.slug === slug)
}
