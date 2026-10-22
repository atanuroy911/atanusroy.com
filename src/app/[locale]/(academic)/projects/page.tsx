import { permanentRedirect } from 'next/navigation'

// Projects were folded into Publications.
export default async function ProjectsRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/publications`)
}
