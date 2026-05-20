import { getContent, type Locale } from '@/lib/content'
import Link from 'next/link'
import Image from 'next/image'
import { ModeProvider } from '@/providers/ModeProvider'
import { FileText, MapPin, Mail, Globe } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Navbar } from '@/components/Navbar'
import { TableOfContents } from '@/components/TableOfContents'

const Github = (props: any) => <GitHubLogoIcon width={props.size || 24} height={props.size || 24} {...props} />
const Linkedin = (props: any) => <LinkedInLogoIcon width={props.size || 24} height={props.size || 24} {...props} />
const Instagram = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
  </svg>
)
const Youtube = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 9.5V14.5L15 12L10 9.5Z" fill="currentColor" />
  </svg>
)
const ResearchGate = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M7.2 6.2h4.2c2.1 0 3.6 1.3 3.6 3.2 0 1.5-.8 2.6-2.2 3l2.5 4.4h-2.2l-2.3-4H9.2v4H7.2V6.2Zm2 1.7v3.3h1.9c1.2 0 1.9-.6 1.9-1.7s-.7-1.6-1.9-1.6H9.2Z" fill="currentColor" />
    <path d="M17.2 8.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" fill="currentColor" />
  </svg>
)
const GoogleScholar = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="8" r="3.2" fill="currentColor" />
    <path d="M12 10.8 6.2 14.1 12 17.4l5.8-3.3L12 10.8Z" fill="currentColor" opacity="0.9" />
    <path d="M6.4 14.3V17.1L12 20l5.6-2.9v-2.8L12 17.2 6.4 14.3Z" fill="currentColor" opacity="0.6" />
  </svg>
)
const Orcid = ({ size = 24, className, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="8" fill="currentColor" />
    <path d="M10.1 7.8h1.1v8.4h-1.1V7.8Zm2.4 0h2.7c1.9 0 3.2 1.4 3.2 4.2s-1.3 4.2-3.2 4.2h-2.7V7.8Zm1.1 1v6.4h1.4c1.3 0 2-.9 2-3.2s-.7-3.2-2-3.2h-1.4Z" fill="#fff" />
  </svg>
)

const SocialLink = ({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) => {
  if (!href) return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label} className="text-muted-foreground hover:text-primary transition-colors">
      {children}
    </a>
  )
}

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

          <div className="mt-auto pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <SocialLink href={p.researchgate} label="ResearchGate">
                <ResearchGate size={18} />
              </SocialLink>
              <SocialLink href={p.linkedin} label="LinkedIn">
                <Linkedin size={18} />
              </SocialLink>
              <SocialLink href={p.instagram} label="Instagram">
                <Instagram size={18} />
              </SocialLink>
              <SocialLink href={p.github} label="GitHub">
                <Github size={18} />
              </SocialLink>
              <SocialLink href={p.youtube} label="YouTube">
                <Youtube size={18} />
              </SocialLink>
              <SocialLink href={p.google_scholar} label="Google Scholar">
                <GoogleScholar size={18} />
              </SocialLink>
              <SocialLink href={p.orcid} label="ORCID">
                <Orcid size={18} />
              </SocialLink>
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
