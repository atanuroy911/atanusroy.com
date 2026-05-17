'use client'

import { motion } from 'framer-motion'
import { FileText, Link as LinkIcon, BookOpen, Presentation } from 'lucide-react'

// Simple regex parser for BibTeX
function parseBibtex(bibtex: string) {
  const entries: any[] = []
  // Matches @type{id, body}
  const entryRegex = /@(\w+)\s*{\s*([^,]+),\s*([\s\S]*?)\n\s*}/g
  let match

  while ((match = entryRegex.exec(bibtex)) !== null) {
    const [, type, id, body] = match
    const entry: any = { type: type.toLowerCase(), id }
    
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

  // Group by type and then sort by year descending
  const journals = entries.filter(e => e.type === 'article' || e.type === 'journal').sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0))
  const conferences = entries.filter(e => e.type === 'inproceedings' || e.type === 'conference').sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0))

  const renderEntry = (entry: any, i: number) => (
    <motion.div
      key={entry.id || i}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="ac-paper rounded-xl p-4 mb-4 hover:shadow-md transition-shadow relative pl-4 border-l-4"
      style={{ borderLeftColor: 'var(--ac-gold)' }}
    >
      <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">
        {entry.title}
      </h3>
      <p className="text-slate-600 text-sm mb-2">{entry.author}</p>
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1">
          <BookOpen size={14} className="text-[var(--ac-navy)]" />
          {entry.journal || entry.booktitle || entry.venue}
        </span>
        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{entry.year}</span>
        {entry.doi && (
          <a href={`https://doi.org/${entry.doi}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
            <LinkIcon size={12} />
            DOI
          </a>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Publications
          </h1>
          <div className="h-1 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
            My published research work categorized by Journals and Conferences.
          </p>
        </motion.div>

        {journals.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-[var(--ac-navy)]" />
              <h2 className="text-2xl font-bold text-slate-800">Journal Articles</h2>
            </div>
            <div>{journals.map((e, i) => renderEntry(e, i))}</div>
          </div>
        )}

        {conferences.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Presentation className="text-[var(--ac-navy)]" />
              <h2 className="text-2xl font-bold text-slate-800">Conference Proceedings</h2>
            </div>
            <div>{conferences.map((e, i) => renderEntry(e, i))}</div>
          </div>
        )}
      </div>
    </div>
  )
}
