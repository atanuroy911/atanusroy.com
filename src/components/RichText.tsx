import Link from 'next/link'
import type { ReactNode } from 'react'

// Renders short content text with [label](url) links and **bold**, one <p> per paragraph.
// Links starting with "/" are site pages and get the locale prefix.

const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g
const linkClass =
  'font-medium text-[color:var(--ac-navy)] underline decoration-[color:var(--ac-navy)]/40 underline-offset-4 hover:decoration-2 dark:text-blue-300 dark:decoration-blue-300/50'

function inline(text: string, locale: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const [, label, url, bold] = m
    if (bold) {
      out.push(<strong key={m.index} className="font-semibold text-slate-900 dark:text-slate-100">{bold}</strong>)
    } else if (url.startsWith('/')) {
      out.push(<Link key={m.index} href={`/${locale}${url}`} className={linkClass}>{label}</Link>)
    } else {
      out.push(
        <a key={m.index} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function RichText({ text, locale, className }: { text?: string; locale: string; className?: string }) {
  if (!text) return null
  return (
    <>
      {text
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className={className}>
            {inline(p, locale)}
          </p>
        ))}
    </>
  )
}
