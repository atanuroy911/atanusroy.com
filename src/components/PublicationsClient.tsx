'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Link as LinkIcon, BookOpen, Presentation, Quote } from 'lucide-react'

type PublicationEntry = {
  type: string
  id: string
  raw: string
  title?: string
  author?: string
  journal?: string
  booktitle?: string
  venue?: string
  year?: string
  doi?: string
  pdf?: string
  url?: string
  [key: string]: string | undefined
}

// Simple regex parser for BibTeX
function parseBibtex(bibtex: string) {
  const entries: PublicationEntry[] = []
  // Matches @type{id, body}
  const entryRegex = /@(\w+)\s*{\s*([^,]+),\s*([\s\S]*?)\n\s*}/g
  let match

  while ((match = entryRegex.exec(bibtex)) !== null) {
    const [, type, id, body] = match
    const entry: PublicationEntry = { type: type.toLowerCase(), id, raw: match[0].trim() }
    
    // Parse fields like key={value} or key="value" or key=value
    const fieldRegex = /([a-zA-Z0-9_]+)\s*=\s*(?:{([^}]*)}|"([^"]*)"|([^,]*))/g
    let fieldMatch
    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      const key = fieldMatch[1].toLowerCase()
      const value = fieldMatch[2] || fieldMatch[3] || fieldMatch[4]
      if (value) {
        entry[key] = value.trim()
      }
    }
    entries.push(entry)
  }
  return entries
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PublicationsClient({ content }: { content: any }) {
  const bibtexStr = content?.academic?.publications_bibtex || ''
  const entries = parseBibtex(bibtexStr)
  const [year, setYear] = useState<string>('all')
  const [citeEntry, setCiteEntry] = useState<PublicationEntry | null>(null)

  const years = useMemo(
    () => [...new Set(entries.map((entry) => entry.year).filter(Boolean))].sort((a, b) => (parseInt(String(b ?? '0')) || 0) - (parseInt(String(a ?? '0')) || 0)),
    [entries]
  )

  const normalizedCategory = (entry: PublicationEntry) => (entry.type === 'article' || entry.type === 'journal' ? 'journal' : 'conference')
  const filteredEntries = entries
    .filter((entry) => year === 'all' || String(entry.year) === year)
    .sort((a, b) => (parseInt(String(b.year ?? '0')) || 0) - (parseInt(String(a.year ?? '0')) || 0))

  const conferenceEntries = filteredEntries.filter((entry) => normalizedCategory(entry) === 'conference')
  const journalEntries = filteredEntries.filter((entry) => normalizedCategory(entry) === 'journal')

  const renderEntry = (entry: PublicationEntry, i: number) => (
    <motion.div
      key={entry.id || i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="rounded-xl border border-slate-200 bg-white p-3 md:p-4 mb-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-950 relative pl-4 border-l-4"
      style={{ borderLeftColor: '#2563eb' }}
    >
      <h3 className="font-bold text-slate-800 text-[0.92rem] md:text-[1rem] leading-snug mb-2 dark:text-slate-100">
        {entry.title}
      </h3>
      <p className="text-slate-600 text-[0.72rem] md:text-sm mb-2 leading-relaxed dark:text-slate-300">{entry.author}</p>
      <div className="flex flex-wrap items-center gap-3 text-[11px] md:text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <BookOpen size={14} className="text-blue-700" />
          {entry.journal || entry.booktitle || entry.venue}
        </span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-700">{entry.year}</span>
        {(entry.pdf || entry.url) && (
          <a href={entry.pdf || entry.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-700 hover:underline">
            <LinkIcon size={12} />
            PDF
          </a>
        )}
        <button
          type="button"
          onClick={() => setCiteEntry(entry)}
          className="flex items-center gap-1 text-slate-600 hover:text-blue-700 transition-colors"
        >
          <Quote size={12} />
          Cite
        </button>
      </div>
    </motion.div>
  )

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Publications
          </h1>
          <div className="h-1 w-16 mt-3 bg-blue-600" />
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            My published research work filtered by year and grouped into Conference and Journal sections.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 shadow-sm dark:border-blue-900/40 dark:bg-slate-950/60">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">Year</span>
          <button
            type="button"
            onClick={() => setYear('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${year === 'all' ? 'border-blue-700 bg-blue-700 text-white' : 'border-blue-200 bg-white text-blue-700 hover:border-blue-700 hover:bg-blue-50'}`}
          >
            All
          </button>
          {years.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setYear(String(value))}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${year === String(value) ? 'border-blue-700 bg-blue-700 text-white' : 'border-blue-200 bg-white text-blue-700 hover:border-blue-700 hover:bg-blue-50'}`}
            >
              {value}
            </button>
          ))}
        </div>

        <section id="conference" className="scroll-mt-24 mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Presentation className="text-blue-700" />
            <h2 className="text-xl md:text-2xl font-bold text-blue-800">Conference</h2>
          </div>
          {conferenceEntries.length > 0 ? conferenceEntries.map((entry, index) => renderEntry(entry, index)) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center text-sm text-slate-500">
              No conference publications match the selected year.
            </div>
          )}
        </section>

        <section id="journal" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="text-blue-700" />
            <h2 className="text-xl md:text-2xl font-bold text-blue-800">Journal</h2>
          </div>
          {journalEntries.length > 0 ? journalEntries.map((entry, index) => renderEntry(entry, index)) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
              No journal publications match the selected year.
            </div>
          )}
        </section>
      </div>

      {citeEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button aria-label="Close citation" onClick={() => setCiteEntry(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">BibTeX</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">{citeEntry.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setCiteEntry(null)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600 hover:border-blue-700 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                Close
              </button>
            </div>
            <pre className="max-h-[65vh] overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">{citeEntry.raw}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
