import Link from 'next/link'
import type { Ebook } from '@/lib/ebooks'

// Cover + title cards linking to each ebook's page (which has the share preview, read and download)
export function EbookCards({ ebooks, locale }: { ebooks: Ebook[]; locale: string }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {ebooks.map((b) => (
        <li key={b.slug}>
          <Link
            href={`/${locale}/ebooks/${b.slug}`}
            className="ac-paper group flex h-full gap-4 rounded-xl p-4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.cover} alt="" loading="lazy" decoding="async" className="w-20 shrink-0 self-start rounded shadow-md" />
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">Free ebook</span>
              <span className="mt-0.5 block font-bold leading-snug text-slate-900 group-hover:underline underline-offset-4 dark:text-slate-100">
                {b.title}
              </span>
              <span className="mt-0.5 block text-sm text-slate-600 dark:text-slate-400">{b.subtitle}</span>
              <span className="mt-2 block text-xs text-slate-500 dark:text-slate-400">{b.pages} pages · PDF</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
