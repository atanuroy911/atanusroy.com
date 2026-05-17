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
