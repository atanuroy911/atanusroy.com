import { getContent, type Locale } from '@/lib/content'
import { TeachingClient } from './TeachingClient'

export default async function TeachingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return <TeachingClient content={content} />
}
