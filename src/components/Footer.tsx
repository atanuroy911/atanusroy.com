'use client'

import { useMode } from '@/providers/ModeProvider'
import { useOptionalDevTheme } from '@/providers/DevThemeProvider'
import { Mail, BookOpen, Sun, Moon } from 'lucide-react'
import { GitHubLogoIcon as Github, LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Footer({ content, isDev }: { content: any; isDev?: boolean }) {
  const { mode } = useMode()
  const devTheme = useOptionalDevTheme()
  const _isDev = isDev !== undefined ? isDev : mode === 'developer'
  const p = content?.personal
  const f = content?.footer

  const socials = [
    p?.github && { href: p.github, icon: <Github width={16} height={16} />, label: 'GitHub' },
    p?.linkedin && { href: p.linkedin, icon: <Linkedin width={16} height={16} />, label: 'LinkedIn' },
    p?.google_scholar && { href: p.google_scholar, icon: <BookOpen size={16} />, label: 'Google Scholar' },
    p?.email && { href: `mailto:${p.email}`, icon: <Mail size={16} />, label: 'Email' },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[]

  return (
    <footer className={_isDev ? 'footer-dev' : 'footer-academic'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand + copyright */}
          <div className="flex items-center gap-2.5">
            <span className={_isDev ? 'footer-brand-dev' : 'footer-brand-academic'}>
              {_isDev ? (
                <>ASR<span className="footer-brand-blink">_</span></>
              ) : (
                p?.name || 'Atanu Shuvam Roy'
              )}
            </span>
            <span className="footer-sep">·</span>
            <span className="footer-meta">© {new Date().getFullYear()} {f?.copyright}</span>
          </div>

          {/* Socials + toggles */}
          <div className="flex items-center gap-1.5">
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
                {devTheme.devTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
