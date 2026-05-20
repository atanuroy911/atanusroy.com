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
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <Navbar content={content} locale={locale as Locale} isDev={false} />
          <div className="flex flex-1 flex-col md:flex-row">
            {/* Left Sidebar (Profile & TOC) */}
            <aside className="w-full md:w-60 lg:w-64 bg-secondary/30 border-r border-border p-6 md:p-4 flex flex-col items-start text-left md:fixed md:ml-4 lg:ml-6 md:h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="flex w-full items-start justify-between gap-3 md:block mb-4">
                <div className="flex min-w-0 flex-1 items-start gap-3 md:flex md:flex-col md:items-start md:gap-0 md:text-left">
                  <div className="w-14 h-14 overflow-hidden rounded-full border-4 border-background shadow-lg md:w-20 md:h-20 md:mb-2.5 md:self-center">
                    <img src={p.academic_photo || "/images/profile.jpg"} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 md:w-full">
                    <h1 className="text-base font-bold text-foreground leading-tight md:text-xl md:mb-0.5">{p.name}</h1>
                    <p className="text-[11px] leading-snug text-muted-foreground md:text-xs">{acH.role}</p>
                    <p className="text-[10px] mt-0.5 leading-snug text-muted-foreground md:text-[11px]">{acH.institution}</p>
                    <div className="mt-2 space-y-1 text-[11px] text-foreground md:hidden">
                      <div className="flex items-center justify-start gap-2 text-left">
                        <MapPin size={15} className="text-muted-foreground shrink-0" />
                        <span>{p.location}</span>
                      </div>
                      <div className="flex items-center justify-start gap-2 break-all text-left">
                        <Mail size={15} className="text-muted-foreground shrink-0" />
                        <a href={`mailto:${p.email}`} className="hover:text-primary transition-colors">{p.email}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <details className="relative shrink-0 md:hidden">
                  <summary className="flex cursor-pointer list-none items-center rounded-full border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-muted [&::-webkit-details-marker]:hidden">
                    Follow
                  </summary>
                  <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-border bg-background p-2 shadow-lg">
                    <div className="flex flex-col gap-1">
                      <SocialLink href={p.researchgate} label="ResearchGate">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <ResearchGate size={16} />
                          <span>ResearchGate</span>
                        </span>
                      </SocialLink>
                      <SocialLink href={p.linkedin} label="LinkedIn">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <Linkedin size={16} />
                          <span>LinkedIn</span>
                        </span>
                      </SocialLink>
                      <SocialLink href={p.instagram} label="Instagram">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <Instagram size={16} />
                          <span>Instagram</span>
                        </span>
                      </SocialLink>
                      <SocialLink href={p.github} label="GitHub">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <Github size={16} />
                          <span>GitHub</span>
                        </span>
                      </SocialLink>
                      <SocialLink href={p.youtube} label="YouTube">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <Youtube size={16} />
                          <span>YouTube</span>
                        </span>
                      </SocialLink>
                      <SocialLink href={p.google_scholar} label="Google Scholar">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <GoogleScholar size={16} />
                          <span>Scholar</span>
                        </span>
                      </SocialLink>
                      <SocialLink href={p.orcid} label="ORCID">
                        <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted">
                          <Orcid size={16} />
                          <span>ORCID</span>
                        </span>
                      </SocialLink>
                    </div>
                  </div>
                </details>
              </div>

              <div className="hidden md:block space-y-2.5 mb-3 text-[11px] md:text-xs text-foreground w-full">
                <div className="flex items-center justify-start gap-2 text-left">
                  <MapPin size={15} className="text-muted-foreground text-center shrink-0" />
                  <span>{p.location}</span>
                </div>
                <div className="flex items-center justify-start gap-2 break-all text-left">
                  <Mail size={15} className="text-muted-foreground shrink-0" />
                  <a href={`mailto:${p.email}`} className="hover:text-primary transition-colors">{p.email}</a>
                </div>
              </div>

              <div className="hidden md:block w-full">
                <TableOfContents locale={locale as string} />
              </div>

              <div className="mt-auto hidden w-full border-t border-border pt-4 md:block">
                <div className="flex flex-wrap items-center justify-start gap-2.5 md:gap-3">
                  <SocialLink href={p.researchgate} label="ResearchGate">
                    <ResearchGate size={16} />
                  </SocialLink>
                  <SocialLink href={p.linkedin} label="LinkedIn">
                    <Linkedin size={16} />
                  </SocialLink>
                  <SocialLink href={p.instagram} label="Instagram">
                    <Instagram size={16} />
                  </SocialLink>
                  <SocialLink href={p.github} label="GitHub">
                    <Github size={16} />
                  </SocialLink>
                  <SocialLink href={p.youtube} label="YouTube">
                    <Youtube size={16} />
                  </SocialLink>
                  <SocialLink href={p.google_scholar} label="Google Scholar">
                    <GoogleScholar size={16} />
                  </SocialLink>
                  <SocialLink href={p.orcid} label="ORCID">
                    <Orcid size={16} />
                  </SocialLink>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 lg:ml-80 p-8 md:p-8 lg:p-8 max-w-4xl">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ModeProvider>
  )
}
