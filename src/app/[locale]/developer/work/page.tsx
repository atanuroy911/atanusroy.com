import { permanentRedirect } from 'next/navigation'

// Old URL; /developer/projects has the same content, so send visitors (and search engines) there.
export default async function DevWorkRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/developer/projects`)
}
