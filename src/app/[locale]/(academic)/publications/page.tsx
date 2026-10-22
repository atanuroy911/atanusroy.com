import { permanentRedirect } from 'next/navigation'

// The full list lives on Google Scholar; selected papers are on the home page.
export default async function PublicationsRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}#publications`)
}
