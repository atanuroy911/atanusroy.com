import contentData from './content-data.json'

export type Locale = 'en' | 'bn'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteContent = any

export function getContent(locale: Locale): SiteContent {
  return (contentData as any)[locale] || (contentData as any)['en']
}

export function getStaticLocaleParams() {
  return [{ locale: 'en' }, { locale: 'bn' }]
}

export const LOCALES: Locale[] = ['en', 'bn']
export const DEFAULT_LOCALE: Locale = 'en'

// Build a minimal content object holding only the given dot-paths, so client
// components don't receive (and serialize into the page) the whole locale.
export function pickContent(content: SiteContent, paths: string[]): SiteContent {
  const out: SiteContent = {}
  for (const path of paths) {
    const keys = path.split('.')
    let src = content
    let dst = out
    keys.forEach((k, i) => {
      if (src == null) return
      if (i === keys.length - 1) {
        if (src[k] !== undefined) dst[k] = src[k]
      } else {
        dst[k] = dst[k] || {}
        dst = dst[k]
      }
      src = src[k]
    })
  }
  return out
}
