'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Download, Loader2, X, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react'
import type { PDFDocumentProxy } from 'pdfjs-dist'

// Opens same-site PDF links in a modal instead of the browser's PDF tab.
// Pages are drawn with pdf.js, so it looks the same on phones and desktops
// (iOS Safari can't show embedded PDFs well). pdf.js only loads on first open.

const MIN_ZOOM = 0.5
const MAX_ZOOM = 3

function fileName(url: string) {
  return decodeURIComponent(url.split('/').pop() || 'document.pdf')
}

function PdfPage({ doc, num, width, zoom }: { doc: PDFDocumentProxy; num: number; width: number; zoom: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(num <= 2)
  const [ratio, setRatio] = useState(1.414) // A4 until the real size is known

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: '600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  useEffect(() => {
    if (!visible || !width) return
    let cancelled = false
    let task: { cancel: () => void; promise: Promise<void> } | null = null
    doc.getPage(num).then((page) => {
      if (cancelled || !canvasRef.current) return
      const base = page.getViewport({ scale: 1 })
      setRatio(base.height / base.width)
      const cssWidth = width * zoom
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const viewport = page.getViewport({ scale: (cssWidth / base.width) * dpr })
      const canvas = canvasRef.current
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      task = page.render({ canvas, viewport })
      task.promise.catch(() => {})
    })
    return () => {
      cancelled = true
      task?.cancel()
    }
  }, [doc, num, visible, width, zoom])

  const cssWidth = width * zoom
  return (
    <div
      ref={ref}
      className="mx-auto bg-white shadow-md"
      style={{ width: cssWidth, height: cssWidth * ratio }}
      role="img"
      aria-label={`Page ${num}`}
    >
      {visible && <canvas ref={canvasRef} className="block h-full w-full" />}
    </div>
  )
}

export function PdfViewerHost() {
  const [url, setUrl] = useState<string | null>(null)
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null)
  const [error, setError] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [width, setWidth] = useState(0)
  const [page, setPage] = useState(1)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  // Catch clicks on any same-site .pdf link (new-tab clicks still work as usual)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.hasAttribute('download') || a.dataset.noViewer !== undefined) return
      const target = new URL(a.href, location.href)
      if (target.origin !== location.origin || !/\.pdf$/i.test(target.pathname)) return
      e.preventDefault()
      openerRef.current = a
      setUrl(target.pathname)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Load the document when a link is opened
  useEffect(() => {
    if (!url) return
    let cancelled = false
    let task: { destroy: () => Promise<void> } | null = null
    setDoc(null)
    setError(false)
    setZoom(1)
    setPage(1)
    dialogRef.current?.showModal()
    document.body.style.overflow = 'hidden'
    ;(async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()
        const loading = pdfjs.getDocument({ url })
        task = loading
        const loaded = await loading.promise
        if (!cancelled) setDoc(loaded)
      } catch {
        if (!cancelled) setError(true)
      }
    })()
    return () => {
      cancelled = true
      task?.destroy()
    }
  }, [url])

  // Fit pages to the available width
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !url) return
    const ro = new ResizeObserver(() => setWidth(Math.min(el.clientWidth - 32, 900)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [url])

  // Track which page is in view
  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || !doc) return
    const pages = el.querySelectorAll<HTMLElement>('[data-page]')
    const mid = el.scrollTop + el.clientHeight / 3
    let current = 1
    pages.forEach((p) => {
      if (p.offsetTop <= mid) current = Number(p.dataset.page)
    })
    setPage(current)
  }, [doc])

  const close = () => dialogRef.current?.close()
  const onClose = () => {
    document.body.style.overflow = ''
    setUrl(null)
    setDoc(null)
    openerRef.current?.focus()
  }

  const zoomBy = (d: number) => setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round((z + d) * 100) / 100)))
  const name = url ? fileName(url) : ''
  const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40'

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={name ? `PDF viewer: ${name}` : 'PDF viewer'}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/80 sm:m-auto sm:h-[92vh] sm:w-[min(64rem,94vw)] sm:rounded-2xl"
    >
      <div className="flex h-full flex-col overflow-hidden bg-slate-800 sm:rounded-2xl">
        {/* Toolbar */}
        <div className="flex items-center gap-1 border-b border-white/10 bg-slate-900 px-2 py-1.5 text-slate-100 sm:px-3">
          <p className="min-w-0 flex-1 truncate px-2 text-sm font-medium" title={name}>{name}</p>
          {doc && (
            <span className="hidden px-2 text-xs tabular-nums text-slate-300 sm:inline" aria-live="polite">
              Page {page} of {doc.numPages}
            </span>
          )}
          <button type="button" className={iconBtn} onClick={() => zoomBy(-0.25)} disabled={!doc || zoom <= MIN_ZOOM} aria-label="Zoom out">
            <ZoomOut size={18} aria-hidden="true" />
          </button>
          <span className="w-12 text-center text-xs tabular-nums text-slate-300" aria-live="polite">{Math.round(zoom * 100)}%</span>
          <button type="button" className={iconBtn} onClick={() => zoomBy(0.25)} disabled={!doc || zoom >= MAX_ZOOM} aria-label="Zoom in">
            <ZoomIn size={18} aria-hidden="true" />
          </button>
          {url && (
            <a href={url} download={name} data-no-viewer className={iconBtn} aria-label={`Download ${name}`}>
              <Download size={18} aria-hidden="true" />
            </a>
          )}
          <button type="button" className={iconBtn} onClick={close} aria-label="Close PDF viewer">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Pages */}
        <div ref={scrollRef} onScroll={onScroll} className="flex-1 overflow-auto overscroll-contain py-4" tabIndex={0} aria-label="PDF pages">
          {error ? (
            <div className="mx-auto max-w-sm space-y-4 px-4 py-16 text-center text-slate-200">
              <p>This PDF couldn&apos;t be shown here.</p>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" data-no-viewer className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                  Open it in a new tab <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          ) : !doc || !width ? (
            <div className="flex items-center justify-center gap-2 py-24 text-slate-300" role="status">
              <Loader2 size={20} className="animate-spin" aria-hidden="true" /> Loading PDF…
            </div>
          ) : (
            <div className="space-y-4 px-4" style={{ minWidth: width * zoom + 32 }}>
              {Array.from({ length: doc.numPages }, (_, i) => (
                <div key={i} data-page={i + 1}>
                  <PdfPage doc={doc} num={i + 1} width={width} zoom={zoom} />
                </div>
              ))}
            </div>
          )}
        </div>

        {doc && (
          <p className="border-t border-white/10 bg-slate-900 py-1.5 text-center text-xs tabular-nums text-slate-300 sm:hidden">
            Page {page} of {doc.numPages}
          </p>
        )}
      </div>
    </dialog>
  )
}
