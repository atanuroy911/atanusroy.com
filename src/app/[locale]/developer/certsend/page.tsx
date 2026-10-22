import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ExternalLink } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const p = getContent(locale as Locale).developer.certsend
  return buildMetadata({
    title: `${p.name}: ${p.tagline} — Atanu Shuvam Roy`,
    description: p.description,
    path: `/${locale}/developer/certsend`,
    locale,
    image: '/assets/certsend/og.png',
    keywords: ['CertSend', 'Certificate Maker', 'Free Certificate Generator', 'Bulk Certificates', 'Next.js', 'pdf-lib'],
  })
}

export default async function CertSendPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const p = getContent(locale as Locale).developer.certsend

  const appLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: p.name,
    url: p.link,
    description: p.description,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any (web browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': 'https://www.atanusroy.com/#person' },
  }

  return (
    <div className="port">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd).replace(/</g, '\u003c') }}
      />
      <div className="product-page">
        <header className="product-hero">
          <div className="sec-label">{p.label}</div>
          <h1 className="sec-title">{p.name}</h1>
          <p className="product-tagline">{p.tagline}</p>
          <p className="sec-sub">{p.description}</p>
          <div className="hero-btns">
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {p.cta_primary} <ExternalLink size={15} />
            </a>
            <a href={p.product_hunt} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {p.cta_secondary} <ExternalLink size={15} />
            </a>
          </div>
        </header>

        <div className="product-video">
          <video src={p.video} poster={p.poster} controls muted autoPlay loop playsInline preload="metadata" />
        </div>

        <section className="product-section">
          <h2 className="sec-title">{p.features_title}</h2>
          <div className="bento-grid">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {p.features.map((f: any, i: number) => (
              <div key={f.title} className="bento-card">
                <div className="bento-ghost-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="bento-title">{f.title}</div>
                <div className="bento-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="product-section">
          <h2 className="sec-title">{p.templates_title}</h2>
          <div className="product-templates">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {p.templates.map((t: any) => (
              <figure key={t.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={`${t.name} certificate template`} loading="lazy" />
                <figcaption>{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="product-section">
          <h2 className="sec-title">{p.stack_title}</h2>
          <div className="tech-pills">
            {p.stack.map((s: string) => (
              <div key={s} className="pill"><span>{s}</span></div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
