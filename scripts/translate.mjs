#!/usr/bin/env node
/**
 * Auto-translate content/en/*.yaml → content/bn/*.yaml using Google Translate (free API)
 * Usage: npm run translate
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { execSync } from 'child_process'
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
  'github_link', 'demo_link', 'blog_link', 'thumbnail',
  'researchgate', 'instagram', 'youtube', 'orcid',
  'featured_image', 'long_description',
  // Blog-specific keys
  'id', 'date', 'category', 'color', 'bg', 'tags',
  // Links, paths and ids added later
  'post', 'doi', 'url', 'dblp', 'image', 'video', 'poster', 'product_hunt',
  'slug', 'papers', 'related', 'photo',
])

// Keys whose values are proper nouns / tech terms (don't translate)
const PROPER_NOUN_KEYS = new Set([
  'institution', 'org', 'venue', 'authors', 'location', 'affiliation',
])

// Google Translate sometimes translates the url part of [label](url) links.
// Put the original urls back, in order, keeping only the translated labels.
export function restoreLinks(original, translated) {
  const urls = [...original.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1])
  if (!urls.length) return translated
  let i = 0
  const fixed = translated.replace(/\]\s*\(([^)]*)\)/g, (m) => (i < urls.length ? `](${urls[i++]})` : m))
  return i === urls.length ? fixed : translated
}

async function googleTranslate(text, from = 'en', to = 'bn') {
  if (!text || typeof text !== 'string' || text.trim() === '') return text
  
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
  
  try {
    const res = await fetch(url)
    const data = await res.json()
    return restoreLinks(text, data[0].map(item => item[0]).join(''))
  } catch (err) {
    console.warn(`  ⚠ Failed to translate: "${text.slice(0, 40)}..."`)
    return text
  }
}

// Text with [label](url) links: translate the text with numbered placeholders in place of
// the links, translate each label on its own, then put the links back. Keeps urls intact
// and stops links being merged or dropped.
async function translateWithLinks(text) {
  const links = [...text.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)]
  if (!links.length) return googleTranslate(text)
  let i = 0
  const masked = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, () => `[[${i++}]]`)
  let out = await googleTranslate(masked)
  for (let n = 0; n < links.length; n++) {
    await new Promise(r => setTimeout(r, 80))
    const label = await googleTranslate(links[n][1])
    const re = new RegExp(`\\[\\s*\\[\\s*${n}\\s*\\]\\s*\\]`)
    if (!re.test(out)) return text // placeholder lost: keep English rather than break links
    out = out.replace(re, `[${label}](${links[n][2]})`)
  }
  return out
}

async function translateValue(key, value) {
  if (SKIP_KEYS.has(key) || PROPER_NOUN_KEYS.has(key)) return value

  if (typeof value === 'string') {
    await new Promise(r => setTimeout(r, 80)) // rate limit
    const translated = value.includes('](') ? await translateWithLinks(value) : await googleTranslate(value)
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
  async function shouldSkip() {
    // env var override
    const ev = process.env.SKIP_TRANSLATE
    if (ev === '1' || ev === 'true') return true

    // try to detect skip token in last commit message
    try {
      const msg = execSync('git log -1 --pretty=%B', { cwd: ROOT, encoding: 'utf8' })
      if (/(\[skip-translate\]|\[no-translate\])/i.test(msg)) return true
    } catch (e) {
      // ignore if git not available
    }

    return false
  }

  if (await shouldSkip()) {
    console.log('⚠️  Skipping translation (SKIP_TRANSLATE or commit message flag detected)')
    return
  }
  const enDir = join(ROOT, 'content', 'en')
  const bnDir = join(ROOT, 'content', 'bn')
  
  await processDirectory(enDir, bnDir)
}

main().catch(err => {
  console.error('❌ Translation failed:', err)
  process.exit(1)
})
