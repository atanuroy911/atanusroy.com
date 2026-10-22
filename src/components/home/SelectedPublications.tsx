'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FileText, Newspaper, X } from 'lucide-react'

export type SelectedPublication = {
  title: string
  venue: string
  authors: string[]
  image: string
  image_alt: string
  tldr: string
  abstract: string
  figures?: { src: string; alt: string; caption?: string }[]
  doi?: string
  open_access?: boolean
  post?: string
}

const ME = /\bRoy\b/

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

function PaperLinks({ pub, locale }: { pub: SelectedPublication; locale: string }) {
  const btn =
    'relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-md border border-slate-300 px-3 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:border-slate-500 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-300 dark:hover:text-white'
  return (
    <div className="flex flex-wrap gap-2">
      {pub.doi && (
        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className={btn}>
          <FileText size={14} aria-hidden="true" /> Paper<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {pub.post && (
        <Link href={`/${locale}/blog/${pub.post}`} className={btn}>
          <Newspaper size={14} aria-hidden="true" /> Blog post
        </Link>
      )}
    </div>
  )
}

function Venue({ pub }: { pub: SelectedPublication }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-blue-800 dark:bg-blue-950 dark:text-blue-200">
        {pub.venue}
      </span>
      {pub.open_access && (
        <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          Open access
        </span>
      )}
    </div>
  )
}

export function SelectedPublications({ pubs, locale }: { pubs: SelectedPublication[]; locale: string }) {
  const [open, setOpen] = useState<SelectedPublication | null>(null)
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pub.image}
                alt={pub.image_alt}
                loading="lazy"
                className="h-44 w-full shrink-0 rounded-lg border border-slate-200 bg-white object-contain sm:h-36 sm:w-52 dark:border-slate-700"
              />
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
                <Venue pub={pub} />
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
        className="m-auto w-[min(48rem,calc(100vw-2rem))] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-0 text-slate-800 shadow-2xl backdrop:bg-black/60 dark:bg-slate-900 dark:text-slate-200"
      >
        {open && (
          <div className="space-y-5 p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <Venue pub={open} />
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
            <section aria-labelledby="pub-dialog-abstract">
              <h3 id="pub-dialog-abstract" className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                Abstract
              </h3>
              <p className="leading-relaxed">{open.abstract}</p>
            </section>
            <PaperLinks pub={open} locale={locale} />
          </div>
        )}
      </dialog>
    </>
  )
}
