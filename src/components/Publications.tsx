'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check, FileText, Newspaper, Quote, X } from 'lucide-react'

export type Publication = {
  title: string
  year: number
  type: 'journal' | 'conference' | 'chapter'
  venue: string
  venue_full?: string
  authors: string[]
  image?: string
  image_alt?: string
  tldr: string
  abstract?: string
  figures?: { src: string; alt: string; caption?: string }[]
  doi?: string
  url?: string
  open_access?: boolean
  post?: string
}

const ME = /\bRoy\b/
const TYPE_LABEL: Record<Publication['type'], string> = { journal: 'Journal', conference: 'Conference', chapter: 'Book chapter' }

const paperUrl = (p: Publication) => (p.doi ? `https://doi.org/${p.doi}` : p.url)

function bibtex(p: Publication) {
  const first = p.authors[0]?.split(' ').pop()?.toLowerCase() || 'paper'
  const word = p.title.split(/\W+/).find((w) => w.length > 3)?.toLowerCase() || 'paper'
  const kind = p.type === 'journal' ? 'article' : p.type === 'chapter' ? 'incollection' : 'inproceedings'
  const where = p.type === 'journal' ? 'journal' : 'booktitle'
  const authors = p.authors
    .map((a) => {
      const parts = a.split(' ')
      return `${parts.pop()}, ${parts.join(' ')}`
    })
    .join(' and ')
  const lines = [
    `@${kind}{${first}${p.year}${word},`,
    `  title={${p.title}},`,
    `  author={${authors}},`,
    `  ${where}={${p.venue_full || p.venue}},`,
    `  year={${p.year}},`,
    p.doi ? `  doi={${p.doi}},` : p.url ? `  url={${p.url}},` : '',
    '}',
  ]
  return lines.filter(Boolean).join('\n')
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="text-sm text-slate-600 dark:text-slate-400">
      {authors.map((a, i) => (
        <span key={a}>
          {ME.test(a) ? <strong className="font-semibold text-slate-900 dark:text-slate-100">{a}</strong> : a}
          {i < authors.length - 1 && ', '}
        </span>
      ))}
    </p>
  )
}

const btn =
  'relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-md border border-slate-300 px-3 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:border-slate-500 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-300 dark:hover:text-white'

function PaperLinks({ pub, locale, withCite }: { pub: Publication; locale: string; withCite?: boolean }) {
  const [copied, setCopied] = useState(false)
  const href = paperUrl(pub)
  return (
    <div className="flex flex-wrap gap-2">
      {href && (
        <a href={href} target="_blank" rel="noopener noreferrer" className={btn}>
          <FileText size={14} aria-hidden="true" /> Paper<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {pub.post && (
        <Link href={`/${locale}/blog/${pub.post}`} className={btn}>
          <Newspaper size={14} aria-hidden="true" /> Blog post
        </Link>
      )}
      {withCite && (
        <button
          type="button"
          className={btn}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(bibtex(pub))
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            } catch {}
          }}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Quote size={14} aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'BibTeX copied' : 'Cite'}</span>
        </button>
      )}
    </div>
  )
}

function Badges({ pub }: { pub: Publication }) {
  const tag = 'rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide'
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`${tag} bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200`}>
        {pub.venue} {pub.year}
      </span>
      {pub.open_access && (
        <span className={`${tag} bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200`}>Open access</span>
      )}
    </div>
  )
}

/** Paper cards; each opens a dialog with the abstract, figures and citation. */
export function PublicationList({ pubs, locale }: { pubs: Publication[]; locale: string }) {
  const [open, setOpen] = useState<Publication | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)

  // Native <dialog> gives focus trapping, Esc to close and an inert background
  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!open && d.open) d.close()
  }, [open])

  const handleClose = () => {
    document.body.style.overflow = ''
    setOpen(null)
    openerRef.current?.focus()
  }

  return (
    <>
      <ul className="space-y-5">
        {pubs.map((pub) => (
          <li key={pub.title}>
            <article
              className="ac-paper group relative flex flex-col gap-5 rounded-xl p-4 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 sm:flex-row sm:p-5"
              style={{ '--tw-ring-color': 'var(--ac-navy)' } as React.CSSProperties}
            >
              {pub.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pub.image}
                  alt={pub.image_alt || ''}
                  loading="lazy"
                  className="h-44 w-full shrink-0 rounded-lg border border-slate-200 bg-white object-contain sm:h-36 sm:w-56 dark:border-slate-700"
                />
              )}
              <div className="min-w-0 flex-1 space-y-2.5">
                <h3 className="ac-font-serif text-lg font-bold leading-snug text-slate-900 dark:text-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      openerRef.current = e.currentTarget
                      setOpen(pub)
                    }}
                    aria-haspopup="dialog"
                    className="text-left after:absolute after:inset-0 after:rounded-xl focus:outline-none group-hover:underline underline-offset-4"
                  >
                    {pub.title}
                  </button>
                </h3>
                <Badges pub={pub} />
                <Authors authors={pub.authors} />
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-blue-800 dark:text-blue-300">TL;DR </span>
                  {pub.tldr}
                </p>
                <PaperLinks pub={pub} locale={locale} />
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="pub-dialog-title"
        onClose={handleClose}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="m-auto w-[min(52rem,calc(100vw-2rem))] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-black/60 dark:bg-slate-900 dark:text-slate-200"
      >
        {open && (
          <div className="space-y-5 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <Badges pub={open} />
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="-m-1 rounded-full p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <h2 id="pub-dialog-title" className="ac-font-serif text-2xl font-bold leading-snug text-slate-900 dark:text-white">
              {open.title}
            </h2>
            {open.figures?.map((f) => (
              <figure key={f.src} className="space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.alt} className="w-full rounded-lg border border-slate-200 bg-white dark:border-slate-700" />
                {f.caption && <figcaption className="text-xs text-slate-600 dark:text-slate-400">{f.caption}</figcaption>}
              </figure>
            ))}
            <Authors authors={open.authors} />
            {open.venue_full && (
              <p className="text-sm italic text-slate-600 dark:text-slate-400">
                {TYPE_LABEL[open.type]} · {open.venue_full}, {open.year}
              </p>
            )}
            <section aria-labelledby="pub-dialog-abstract">
              <h3 id="pub-dialog-abstract" className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                {open.abstract ? 'Abstract' : 'Summary'}
              </h3>
              <p className="leading-relaxed">{open.abstract || open.tldr}</p>
              {!open.abstract && paperUrl(open) && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The full abstract is on the publisher&apos;s page.</p>
              )}
            </section>
            <PaperLinks pub={open} locale={locale} withCite />
          </div>
        )}
      </dialog>
    </>
  )
}

/** Full list for the Publications page, grouped by year with a type filter. */
export function PublicationsPage({ pubs, locale }: { pubs: Publication[]; locale: string }) {
  const [type, setType] = useState<'all' | Publication['type']>('all')
  const shown = type === 'all' ? pubs : pubs.filter((p) => p.type === type)
  const years = [...new Set(shown.map((p) => p.year))].sort((a, b) => b - a)
  const types = (['journal', 'conference', 'chapter'] as const).filter((t) => pubs.some((p) => p.type === t))

  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
        {(['all', ...types] as const).map((t) => {
          const active = type === t
          const count = t === 'all' ? pubs.length : pubs.filter((p) => p.type === t).length
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setType(t)}
              className={`min-h-9 px-3.5 rounded-full text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                  : 'text-slate-700 border-slate-300 hover:border-slate-500 dark:text-slate-300 dark:border-slate-600'
              }`}
            >
              {t === 'all' ? 'All' : TYPE_LABEL[t]} ({count})
            </button>
          )
        })}
      </div>
      {years.map((year) => (
        <section key={year} id={`year-${year}`} aria-labelledby={`pubs-${year}`} className="space-y-4 scroll-mt-24">
          <h2 id={`pubs-${year}`} className="text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400">
            {year}
          </h2>
          <PublicationList pubs={shown.filter((p) => p.year === year)} locale={locale} />
        </section>
      ))}
    </div>
  )
}
