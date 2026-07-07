import Link from 'next/link'
import {
  Layers, Server, Brain, Trophy, MessageCircle, ShieldCheck, type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  layers: Layers,
  server: Server,
  brain: Brain,
  trophy: Trophy,
  message: MessageCircle,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DevHireMe({ content, locale = 'en' }: { content: any; locale?: string }) {
  const hm = content.developer.hire_me

  return (
    <div className="port">
      <div className="hire-page">
        {/* Hero */}
        <div className="hire-hero">
          <div className="sec-label">// hire_me</div>
          <h1 className="sec-title">{hm.title}</h1>
          <p className="sec-sub">{hm.sub}</p>
          <div className="hero-btns" style={{ marginTop: 28 }}>
            <a href="https://calendly.com/atanusroy" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <Link href="#case-studies" className="btn-ghost">
              See proof
            </Link>
          </div>
        </div>

        {/* Stat strip */}
        <div className="hire-stats-strip">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {hm.stats.map((s: any, i: number) => (
            <div key={i} className="hire-stat">
              <div className="hire-stat-n">{s.n}</div>
              <div className="hire-stat-l">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="reasons-grid">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {hm.reasons.map((r: any, i: number) => {
            const Icon = ICONS[r.icon] || Layers
            return (
              <div key={i} className="reason-card">
                <div className="reason-icon">
                  <Icon size={19} />
                </div>
                <div className="reason-title">{r.title}</div>
                <div className="reason-desc">{r.desc}</div>
              </div>
            )
          })}
        </div>

        {/* Case studies */}
        <div id="case-studies">
          <div className="sec-label">// proof</div>
          <h2 className="project-title" style={{ marginBottom: 24 }}>Real projects, real results</h2>
          <div className="case-study-grid">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {hm.case_studies.map((cs: any, i: number) => (
              <div key={i} className="case-study-card">
                <div className="case-study-top">
                  <div className="case-study-title">{cs.title}</div>
                  <div className="case-study-client">{cs.client}</div>
                </div>
                <div className="case-study-rows">
                  <div>
                    <div className="cs-row-label">Problem</div>
                    <div className="cs-row-value">{cs.problem}</div>
                  </div>
                  <div>
                    <div className="cs-row-label">Solution</div>
                    <div className="cs-row-value">{cs.solution}</div>
                  </div>
                  <div>
                    <div className="cs-row-label">Result</div>
                    <div className="cs-row-value">{cs.result}</div>
                  </div>
                </div>
                <div className="tech-pills">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {cs.tags.map((t: string, ti: number) => (
                    <div key={ti} className="pill"><span>{t}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div>
          <div className="sec-label">// comparison</div>
          <h2 className="project-title" style={{ marginBottom: 24 }}>{hm.comparison.title}</h2>
          <div className="comparison-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Agency</th>
                  <th>Typical Freelancer</th>
                  <th className="col-me">Me</th>
                </tr>
              </thead>
              <tbody>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {hm.comparison.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td>{row.label}</td>
                    <td>{row.agency}</td>
                    <td>{row.freelancer}</td>
                    <td className="col-me">{row.me}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Guarantee */}
        <div className="guarantee-banner">
          <div className="guarantee-icon">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="guarantee-title">{hm.guarantee.title}</div>
            <div className="guarantee-sub">{hm.guarantee.sub}</div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="sec-label">// faq</div>
          <h2 className="project-title" style={{ marginBottom: 24 }}>Questions you might have</h2>
          <div className="faq-list">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {hm.faq.map((f: any, i: number) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col items-start gap-4 py-8">
          <div className="project-title" style={{ marginBottom: 0 }}>{hm.cta.title}</div>
          <p className="project-desc" style={{ marginTop: -8 }}>{hm.cta.sub}</p>
          <div className="hero-btns">
            <a href="https://calendly.com/atanusroy" target="_blank" rel="noopener noreferrer" className="btn-primary">
              {hm.cta.btn_primary}
            </a>
            <Link href={`/${locale}/developer/projects`} className="btn-ghost">
              {hm.cta.btn_secondary}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
