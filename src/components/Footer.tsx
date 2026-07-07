'use client'

import { usePathname } from 'next/navigation'
import { useMode } from '@/providers/ModeProvider'
import { useOptionalDevTheme } from '@/providers/DevThemeProvider'
import { LanguageToggle } from '@/components/LanguageToggle'
import { Mail, BookOpen, Sun, Moon, ArrowUpRight } from 'lucide-react'
import { GitHubLogoIcon as Github, LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Footer({ content, isDev }: { content: any; isDev?: boolean }) {
  const { mode } = useMode()
  const devTheme = useOptionalDevTheme()
  const pathname = usePathname()
  const _isDev = isDev !== undefined ? isDev : mode === 'developer'
  const locale = (pathname.split('/')[1] || 'en') as 'en' | 'bn'
  const p = content?.personal
  const f = content?.footer

  const tagline = _isDev ? content?.developer?.hero?.tagline : content?.academic?.hero?.tagline

  const socials = [
    p?.github && { href: p.github, icon: <Github width={17} height={17} />, label: 'GitHub' },
    p?.linkedin && { href: p.linkedin, icon: <Linkedin width={17} height={17} />, label: 'LinkedIn' },
    p?.google_scholar && { href: p.google_scholar, icon: <BookOpen size={17} />, label: 'Google Scholar' },
    p?.email && { href: `mailto:${p.email}`, icon: <Mail size={17} />, label: 'Email' },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[]

  return (
    <footer
      className={
        _isDev
          ? 'footer-dev'
          : 'footer-academic'
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Brand */}
          <div>
            <div className={_isDev ? 'footer-brand-dev' : 'footer-brand-academic'}>
              {_isDev ? (
                <>ASR<span className="footer-brand-blink">_</span></>
              ) : (
                p?.name || 'Atanu Shuvam Roy'
              )}
            </div>
            {tagline && <p className="footer-tagline mt-3">{tagline}</p>}
          </div>

          {/* Connect */}
          <div className="sm:justify-self-end sm:text-right">
            <div className="footer-col-label">
              {_isDev ? '// connect' : 'Connect'}
            </div>
            <div className="flex items-center gap-3 mt-3 sm:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={s.label}
                  className="footer-icon-btn"
                >
                  {s.icon}
                </a>
              ))}
              {_isDev && devTheme?.mounted && (
                <button
                  onClick={devTheme.toggleDevTheme}
                  title="Toggle dark mode"
                  className="footer-icon-btn"
                >
                  {devTheme.devTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                </button>
              )}
            </div>
            <div className="mt-5 flex sm:justify-end">
              <LanguageToggle locale={locale} />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {f?.copyright}</p>
          <a
            href="https://github.com/atanuroy911"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-built-with"
          >
            {f?.built_with} <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}
