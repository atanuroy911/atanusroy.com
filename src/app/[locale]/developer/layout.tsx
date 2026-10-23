import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getContent, pickContent, type Locale } from '@/lib/content'
import { ModeProvider } from '@/providers/ModeProvider'
import { DevThemeProvider } from '@/providers/DevThemeProvider'
import { ScrollToTop } from '@/components/developer/ScrollToTop'
import './DevStyles.css'
import './AppleStyles.css'

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
          <ScrollToTop />
          <Navbar content={pickContent(content, ['nav'])} locale={locale as Locale} isDev={true} />
          <main id="main" tabIndex={-1} className="focus:outline-none">{children}</main>
          <Footer content={pickContent(content, ['personal', 'footer'])} isDev={true} />
        </div>
      </DevThemeProvider>
    </ModeProvider>
  )
}
