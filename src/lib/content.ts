import { readFileSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

export type Locale = 'en' | 'bn'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SiteContent = any

let cache: Record<string, SiteContent> = {}

export function getContent(locale: Locale): SiteContent {
  if (cache[locale]) return cache[locale]
  
  try {
    const localeDir = join(process.cwd(), 'content', locale)
    const readYamlDir = (dirName: string) => {
      const dirPath = join(localeDir, dirName)
      try {
        const { readdirSync, readFileSync } = require('fs')
        const files = readdirSync(dirPath).filter((f: string) => f.endsWith('.yaml'))
        let merged = {}
        for (const file of files) {
          const content = yaml.load(readFileSync(join(dirPath, file), 'utf8')) as object
          merged = { ...merged, ...content }
        }
        return merged
      } catch (e) {
        return {}
      }
    }
    
    const common = readYamlDir('common')
    const academic = readYamlDir('academic')
    const developer = readYamlDir('developer')
    
    const parsed = { ...common, academic, developer }
    cache[locale] = parsed
    return parsed
  } catch (e) {
    // Fallback to English if locale file missing
    if (locale !== 'en') return getContent('en')
    console.error('Failed to load content for locale:', locale, e)
    throw new Error('Failed to load content files')
  }
}

export function getStaticLocaleParams() {
  return [{ locale: 'en' }, { locale: 'bn' }]
}

export const LOCALES: Locale[] = ['en', 'bn']
export const DEFAULT_LOCALE: Locale = 'en'
