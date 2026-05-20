#!/usr/bin/env node
/**
 * Auto-translate content/en/*.yaml → content/bn/*.yaml using Google Translate (free API)
 * Usage: npm run translate
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Fields that should NOT be translated (keep as-is)
const SKIP_KEYS = new Set([
  'email', 'phone', 'linkedin', 'github', 'google_scholar', 'cv_url',
  'website', 'code', 'year', 'period', 'grade', 'type', 'highlight',
  'value', 'proficiency', 'icon', 'academic_photo', 'developer_photo',
  'link', 'syllabus_link', 'src', 'paper_link', 'video_id', 'logo',
  'researchgate', 'instagram', 'youtube', 'orcid',
  'featured_image', 'long_description',
  // Blog-specific keys
  'id', 'date', 'category', 'color', 'bg', 'tags',
])

// Keys whose values are proper nouns / tech terms (don't translate)
const PROPER_NOUN_KEYS = new Set([
  'institution', 'org', 'venue', 'authors', 'location', 'affiliation',
])

async function googleTranslate(text, from = 'en', to = 'bn') {
  if (!text || typeof text !== 'string' || text.trim() === '') return text
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
  
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data[0].map(item => item[0]).join('')
  } catch (err) {
    console.warn(`  ⚠ Failed to translate: "${text.slice(0, 40)}..."`)
    return text
  }
}

async function translateValue(key, value) {
  if (SKIP_KEYS.has(key) || PROPER_NOUN_KEYS.has(key)) return value

  if (typeof value === 'string') {
    await new Promise(r => setTimeout(r, 80)) // rate limit
    const translated = await googleTranslate(value)
    console.log(`  ✓ ${key}: ${value.slice(0, 35)}... → ${translated.slice(0, 35)}...`)
    return translated
  }

  if (Array.isArray(value)) {
    const results = []
    for (const item of value) {
      if (typeof item === 'string') {
        await new Promise(r => setTimeout(r, 80))
        results.push(await googleTranslate(item))
      } else if (typeof item === 'object') {
        results.push(await translateObject(item))
      } else {
        results.push(item)
      }
    }
    return results
  }

  if (typeof value === 'object' && value !== null) {
    return await translateObject(value)
  }

  return value
}

async function translateObject(obj) {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = await translateValue(key, value)
  }
  return result
}

async function processDirectory(srcDir, destDir) {
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true })
  }

  const items = readdirSync(srcDir, { withFileTypes: true })

  for (const item of items) {
    const srcPath = join(srcDir, item.name)
    const destPath = join(destDir, item.name)

    if (item.isDirectory()) {
      await processDirectory(srcPath, destPath)
    } else if (item.name.endsWith('.yaml')) {
      console.log(`\n🌐 Reading ${srcPath}...`)
      const raw = readFileSync(srcPath, 'utf8')
      const en = yaml.load(raw)

      console.log(`🔄 Translating ${item.name} to Bengali via Google Translate...\n`)
      const bn = await translateObject(en)

      if (item.name === 'nav.yaml' && bn.nav) bn.nav.language = 'English'

      const output = `# AUTO-GENERATED — do not edit manually\n# Run: npm run translate to regenerate\n\n` + yaml.dump(bn, { 
        lineWidth: 120, 
        noRefs: true,
        quotingType: '"',
        forceQuotes: false,
      })

      writeFileSync(destPath, output, 'utf8')
      console.log(`✅ Saved ${destPath}`)
    }
  }
}

async function main() {
  const enDir = join(ROOT, 'content', 'en')
  const bnDir = join(ROOT, 'content', 'bn')
  
  await processDirectory(enDir, bnDir)
}

main().catch(err => {
  console.error('❌ Translation failed:', err)
  process.exit(1)
})
