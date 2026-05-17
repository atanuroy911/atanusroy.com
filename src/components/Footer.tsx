'use client'

import Link from 'next/link'
import { useMode } from '@/providers/ModeProvider'
import { Mail, BookOpen } from 'lucide-react'
import { GitHubLogoIcon as Github, LinkedInLogoIcon as Linkedin } from '@radix-ui/react-icons'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Footer({ content, isDev }: { content: any; isDev?: boolean }) {
  const { mode } = useMode()
  const _isDev = isDev !== undefined ? isDev : mode === 'developer'
  const p = content?.personal
  const f = content?.footer

  return (
    <footer className={`border-t py-8 mt-16 ${
      _isDev
        ? 'border-black bg-white dark:bg-black border-2 border-x-0 border-b-0'
        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm ${
            _isDev 
              ? 'font-mono-dev font-bold tracking-widest uppercase text-black dark:text-white' 
              : 'text-slate-500'
          }`}>
            © {new Date().getFullYear()} {f?.copyright} · {f?.built_with}
          </p>
          <div className="flex items-center gap-4">
            {p?.github && (
              <Link href={p.github} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${
                  _isDev ? 'text-black dark:text-white hover:text-[#ff3366]' : 'text-slate-500 hover:text-slate-800'
                }`}>
                <Github width={18} height={18} />
              </Link>
            )}
            {p?.linkedin && (
              <Link href={p.linkedin} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${
                  _isDev ? 'text-black dark:text-white hover:text-[#00d9ff]' : 'text-slate-500 hover:text-blue-700'
                }`}>
                <Linkedin width={18} height={18} />
              </Link>
            )}
            {p?.google_scholar && (
              <Link href={p.google_scholar} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${
                  _isDev ? 'text-black dark:text-white hover:text-[#ffde00]' : 'text-slate-500 hover:text-slate-800'
                }`}>
                <BookOpen size={18} />
              </Link>
            )}
            {p?.email && (
              <Link href={`mailto:${p.email}`}
                className={`transition-colors ${
                  _isDev ? 'text-black dark:text-white hover:text-[#ff3366]' : 'text-slate-500 hover:text-slate-800'
                }`}>
                <Mail size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

