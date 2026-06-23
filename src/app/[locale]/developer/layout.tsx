import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getContent, type Locale } from '@/lib/content'
import { ModeProvider } from '@/providers/ModeProvider'
import './DevStyles.css'

export default async function DevLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  return (
    <ModeProvider forcedMode="developer">
      <div className="min-h-screen flex flex-col dev-layout">
        <Navbar content={content} locale={locale as Locale} isDev={true} />
        <main className="flex-1">{children}</main>
        <Footer content={content} isDev={true} />
      </div>
    </ModeProvider>
  )
}
