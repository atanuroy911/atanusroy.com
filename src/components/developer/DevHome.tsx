import Link from 'next/link'
import Image from 'next/image'
import { DevWorkTiles } from './DevWorkTiles'

// Developer home, Apple-style: one idea per section, big type, content first.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = any

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export function DevHome({ content, locale }: { content: Content; locale: string }) {
  const { hero, services, process, quote, cta, projects = [] } = content.developer
  // CertSend lives on the Projects page, not here
  const featured = projects.filter((p: Content) => p.featured && p.title !== 'CertSend').slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="ap-hero" aria-labelledby="dev-hero-title">
        <p className="ap-hero-eyebrow ap-rise">Atanu Shuvam Roy</p>
        <h1 id="dev-hero-title" className="ap-hero-title ap-rise ap-rise-2">
          Software that <span>ships.</span>
        </h1>
        <p className="ap-hero-sub ap-rise ap-rise-3">{hero.tagline}</p>
        <div className="ap-hero-ctas ap-rise ap-rise-4">
          <a href={hero.cta_primary_link} {...external} className="btn-primary">
            Book a free call<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href={`/${locale}/developer/projects`} className="ap-link">See my work</Link>
        </div>
        <div className="ap-hero-photo ap-rise ap-rise-4">
          <Image src={hero.photo_url} alt="Atanu Shuvam Roy" width={840} height={1050} priority unoptimized />
          {hero.status_badge && <span className="ap-status">{hero.status_badge}</span>}
        </div>
      </section>

      {/* Numbers */}
      {hero.stats?.length > 0 && (
        <section className="ap-section ap-section-alt" aria-label="At a glance">
          <dl className="ap-stats">
            {hero.stats.map((s: Content) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd className="ap-stat-n">{s.n}</dd>
                <dd className="ap-stat-l" aria-hidden="true">{s.l}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Selected work */}
      <section id="projects" className="ap-section" aria-labelledby="work-title">
        <div className="ap-wrap">
          <div className="ap-head">
            <h2 id="work-title" className="sec-title">Selected work.</h2>
            <p className="sec-sub">Production sites and apps, built end to end.</p>
          </div>
          <DevWorkTiles projects={featured} />
          <p className="ap-more">
            <Link href={`/${locale}/developer/projects`} className="ap-link">See all projects</Link>
          </p>
        </div>
      </section>

      {/* What I do */}
      <section className="ap-section ap-section-alt" aria-labelledby="caps-title">
        <div className="ap-wrap">
          <div className="ap-head">
            <p className="sec-label">{services.label}</p>
            <h2 id="caps-title" className="sec-title">{services.title}.</h2>
          </div>
          <div className="ap-caps">
            {services.items.map((s: Content) => (
              <div key={s.title} className="ap-cap">
                <h3 className="ap-cap-title">{s.title}</h3>
                <p className="ap-cap-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="ap-section" aria-labelledby="process-title">
        <div className="ap-wrap">
          <div className="ap-head">
            <p className="sec-label">{process.label}</p>
            <h2 id="process-title" className="sec-title">{process.title}.</h2>
          </div>
          <ol className="ap-steps">
            {process.steps.map((s: Content, i: number) => (
              <li key={s.title}>
                <p className="ap-step-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="ap-step-title">{s.title}</h3>
                <p className="ap-step-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quote */}
      {quote?.text && (
        <section className="ap-section ap-section-alt" aria-label="Quote">
          <figure className="ap-quote">
            <blockquote
              dangerouslySetInnerHTML={{
                __html: `“${String(quote.text)
                  .replace(/[<>&]/g, '')
                  .replace(/\*([^*]+)\*/g, '<em>$1</em>')}”`,
              }}
            />
            <figcaption>{quote.author}</figcaption>
          </figure>
        </section>
      )}

      {/* Closing call to action */}
      <section className="ap-section ap-section-dark" aria-labelledby="cta-title">
        <div className="ap-wrap ap-cta">
          <h2 id="cta-title" className="ap-cta-title">{cta.title}.</h2>
          <p className="ap-cta-sub">{cta.sub}</p>
          <div className="ap-hero-ctas">
            <a href={cta.btn_primary_link} {...external} className="btn-primary">
              Book a free call<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href={`/${locale}/developer/hire-me`} className="ap-link">Why hire me</Link>
          </div>
          {cta.reply_text && <p className="ap-cta-note">{cta.reply_text}</p>}
        </div>
      </section>
    </>
  )
}
