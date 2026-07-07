import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getContent, type Locale } from '@/lib/content'
import { ModeProvider } from '@/providers/ModeProvider'
import { DevThemeProvider } from '@/providers/DevThemeProvider'
import { CursorGlow } from '@/components/developer/CursorGlow'
import { ScrollToTop } from '@/components/developer/ScrollToTop'
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
      <DevThemeProvider>
        <div className="flex flex-col dev-layout">
          <CursorGlow />
          <ScrollToTop />
          <Navbar content={content} locale={locale as Locale} isDev={true} />
          <main>{children}</main>
          <Footer content={content} isDev={true} />
        </div>
      </DevThemeProvider>
    </ModeProvider>
  )
}
