import { getContent, type Locale } from '@/lib/content'
import { ContactClient } from '@/components/ContactClient'
import type { Metadata } from 'next'
import { buildMetadata, getDevContactSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevContactSEO(locale as Locale))
}

export default async function DevContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  return <ContactClient content={content} />
}
