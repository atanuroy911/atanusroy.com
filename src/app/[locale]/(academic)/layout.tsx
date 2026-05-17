import { getContent, type Locale } from '@/lib/content'
import Link from 'next/link'
import Image from 'next/image'
import { ModeProvider } from '@/providers/ModeProvider'
import { FileText, MapPin, Mail, Globe, Sun, Moon } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Navbar } from '@/components/Navbar'
import { TableOfContents } from '@/components/TableOfContents'

const Github = (props: any) => <GitHubLogoIcon width={props.size || 24} height={props.size || 24} {...props} />
const Linkedin = (props: any) => <LinkedInLogoIcon width={props.size || 24} height={props.size || 24} {...props} />

export default async function AcademicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const p = content.personal
  const acH = content.academic.hero



  return (
    <ModeProvider forcedMode="academic">
      <div className="min-h-screen bg-background flex flex-col pt-16 ac-font-serif">
        <Navbar content={content} locale={locale as Locale} isDev={false} />
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Left Sidebar (Profile & TOC) */}
          <aside className="w-full md:w-72 lg:w-80 bg-secondary/30 border-r border-border p-8 flex flex-col md:fixed md:h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-background shadow-lg">
                <img src={p.academic_photo || "/images/profile.jpg"} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{p.name}</h1>
              <p className="text-sm text-muted-foreground">{acH.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{acH.institution}</p>
            </div>

          <div className="space-y-4 mb-4 text-sm text-foreground">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-muted-foreground" />
              <span>{p.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-muted-foreground" />
              <a href={`mailto:${p.email}`} className="hover:text-primary transition-colors">{p.email}</a>
            </div>
          </div>

          <TableOfContents locale={locale as string} />

          <div className="mt-8 pt-8 border-t border-border mt-auto">
            <div className="flex items-center justify-center gap-4">
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={18} />
              </a>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 lg:ml-80 p-8 md:p-12 lg:p-16 max-w-4xl">
          {children}
        </main>
      </div>
      </div>
    </ModeProvider>
  )
}
