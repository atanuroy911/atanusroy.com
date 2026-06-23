import { getContent, type Locale } from '@/lib/content'
import Image from 'next/image'
import { ModeProvider } from '@/providers/ModeProvider'
import { MapPin, Mail, FileText } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { Navbar } from '@/components/Navbar'

type SocialIconProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & { size?: number }

const Github = ({ size = 24, ...props }: SocialIconProps) => <GitHubLogoIcon width={size} height={size} {...props} />
const Linkedin = ({ size = 24, ...props }: SocialIconProps) => <LinkedInLogoIcon width={size} height={size} {...props} />
const Instagram = ({ size = 24, className, ...props }: SocialIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
  </svg>
)
const Youtube = ({ size = 24, className, ...props }: SocialIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="3" y="6" width="18" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 9.5V14.5L15 12L10 9.5Z" fill="currentColor" />
  </svg>
)
const ResearchGate = ({ size = 24, className, ...props }: SocialIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M7.2 6.2h4.2c2.1 0 3.6 1.3 3.6 3.2 0 1.5-.8 2.6-2.2 3l2.5 4.4h-2.2l-2.3-4H9.2v4H7.2V6.2Zm2 1.7v3.3h1.9c1.2 0 1.9-.6 1.9-1.7s-.7-1.6-1.9-1.6H9.2Z" fill="currentColor" />
    <path d="M17.2 8.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" fill="currentColor" />
  </svg>
)
const GoogleScholar = ({ size = 24, className, ...props }: SocialIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <circle cx="12" cy="8" r="3.2" fill="currentColor" />
    <path d="M12 10.8 6.2 14.1 12 17.4l5.8-3.3L12 10.8Z" fill="currentColor" opacity="0.9" />
    <path d="M6.4 14.3V17.1L12 20l5.6-2.9v-2.8L12 17.2 6.4 14.3Z" fill="currentColor" opacity="0.6" />
  </svg>
)
const Orcid = ({ size = 24, className, ...props }: SocialIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <rect x="4" y="4" width="16" height="16" rx="8" fill="currentColor" />
    <path d="M10.1 7.8h1.1v8.4h-1.1V7.8Zm2.4 0h2.7c1.9 0 3.2 1.4 3.2 4.2s-1.3 4.2-3.2 4.2h-2.7V7.8Zm1.1 1v6.4h1.4c1.3 0 2-.9 2-3.2s-.7-3.2-2-3.2h-1.4Z" fill="#fff" />
  </svg>
)
const XIcon = ({ size = 24, className, ...props }: SocialIconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" fill="currentColor" />
  </svg>
)

// Reusable sidebar button — clean pill style with left accent
const SidebarBtn = ({
  href,
  icon,
  label,
  accent = false,
  className = '',
}: {
  href?: string
  icon: React.ReactNode
  label: string
  accent?: boolean
  className?: string
}) => {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium transition-all
        ${accent
          ? 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200'
          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-200'
        } ${className}`}
    >
      <span className={`shrink-0 transition-colors ${accent ? 'text-indigo-500 group-hover:text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </a>
  )
}

// Mobile dropdown social link (unchanged style)
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

          {/* ── Mobile profile bar ──────────────────────────────── */}
          <div className="md:hidden flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-border shadow-sm shrink-0">
                <Image src={p.academic_photo || "/assets/placeholder-user-gray.svg"} alt={p.name} width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{acH.role}</p>
              </div>
            </div>
            <details className="relative shrink-0">
              <summary className="flex cursor-pointer list-none items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:bg-muted [&::-webkit-details-marker]:hidden">
                Follow
              </summary>
              <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-xl border border-border bg-background p-2 shadow-lg">
                <div className="flex flex-col gap-1">
                  <SocialLink href={p.google_scholar} label="Google Scholar">
                    <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"><GoogleScholar size={16} /><span>Google Scholar</span></span>
                  </SocialLink>
                  <SocialLink href={p.github} label="GitHub">
                    <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"><Github size={16} /><span>GitHub</span></span>
                  </SocialLink>
                  <SocialLink href={p.linkedin} label="LinkedIn">
                    <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"><Linkedin size={16} /><span>LinkedIn</span></span>
                  </SocialLink>
                  <SocialLink href={p.researchgate} label="ResearchGate">
                    <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"><ResearchGate size={16} /><span>ResearchGate</span></span>
                  </SocialLink>
                  <SocialLink href={p.orcid} label="ORCID">
                    <span className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-muted"><Orcid size={16} /><span>ORCID</span></span>
                  </SocialLink>
                </div>
              </div>
            </details>
          </div>

          {/* ── Desktop: sidebar + main ──────────────────────────── */}
          <div className="flex flex-1 flex-row">

            {/* Left Sidebar — sticky in flow, no fixed positioning */}
            <aside
              className="hidden md:flex shrink-0 flex-col bg-background border-r border-border"
              style={{ width: 'var(--sidebar-w)' }}
            >
              {/* Sticky scroll container */}
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 flex flex-col">

                {/* ── Photo + Name ──────────────────────────────── */}
                <div className="mb-4 flex flex-col items-center text-center">
                  <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-border shadow mb-3">
                    <Image src={p.academic_photo || "/assets/placeholder-user-gray.svg"} alt={p.name} width={96} height={96} className="w-full h-full object-cover" />
                  </div>
                  <h1 className="text-lg font-semibold text-foreground leading-tight mb-1">{p.name}</h1>
                  <p className="text-xs leading-snug text-muted-foreground">{acH.role}</p>
                  <p className="text-[11px] mt-0.5 leading-snug text-muted-foreground">{acH.department || acH.institution}</p>
                </div>

                {/* ── Location + Email ──────────────────────────── */}
                <div className="space-y-1.5 mb-4 text-xs text-foreground w-full">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-muted-foreground shrink-0" />
                    <span className="truncate">{p.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                    <a href={`mailto:${p.email}`} className="hover:text-primary transition-colors break-all text-[11px]">{p.email}</a>
                  </div>
                </div>

                <div className="w-full h-px bg-border mb-3" />

                {/* ── Social Buttons ────────────────────────────── */}
                <div className="flex flex-col gap-2 w-full">
                  <SidebarBtn href={p.google_scholar} icon={<GoogleScholar size={15} />} label="Google Scholar" accent className="w-full justify-start" />
                  <SidebarBtn href={p.github} icon={<Github size={15} />} label="GitHub" className="w-full justify-start" />
                  <SidebarBtn href={p.linkedin} icon={<Linkedin size={15} />} label="LinkedIn" className="w-full justify-start" />
                  <SidebarBtn href={p.researchgate} icon={<ResearchGate size={15} />} label="ResearchGate" className="w-full justify-start" />
                  <SidebarBtn href={p.orcid} icon={<Orcid size={15} />} label="ORCID" className="w-full justify-start" />

                  {p.cv_url && (
                    <a
                      href={p.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-indigo-700 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-indigo-800"
                    >
                      <FileText size={12} />
                      Curriculum Vitae
                    </a>
                  )}
                </div>

              </div>{/* end sticky */}
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0" style={{ padding: 'var(--gap)' }}>
              {children}
            </main>

          </div>
        </div>
      </div>
    </ModeProvider>
  )
}
