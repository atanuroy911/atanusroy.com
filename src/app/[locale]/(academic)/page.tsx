import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicHomeSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicHomeSEO(locale as Locale))
}

export default async function AcademicHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w: string) => w[0]?.toUpperCase())
      .join('')

  return (
    <div className="space-y-24 pb-24">
      <section id="about" className="space-y-6">
        <h2 className="text-3xl font-bold border-b border-border pb-2">About Me</h2>
        <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {content.academic.bio}
        </p>
        <div className="pt-4">
          <h3 className="font-bold text-xl mb-4">Research Interests</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.academic.research_interests?.map((ri: string) => (
              <li key={ri} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{ri}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="space-y-6">
        <h2 className="text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>Experience</h2>
        <div className="space-y-6">
          {content.academic.experience?.map((exp: any, idx: number) => (
            <div key={idx} className="relative pl-8 border-l-2 border-slate-200 pb-2 last:border-0 last:pb-0">
              <div className="absolute -left-2.5 top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 items-start md:items-center">
                  <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold uppercase tracking-wider">{exp.period}</span>
                </div>

                <div className="text-lg font-medium flex items-center gap-3" style={{ color: 'var(--ac-navy)' }}>
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={`${exp.org} logo`}
                      className="w-7 h-7 rounded-md border border-slate-200 bg-white object-contain p-0.5"
                    />
                  ) : (
                    <span className="w-7 h-7 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-bold flex items-center justify-center text-slate-600">
                      {initials(exp.org)}
                    </span>
                  )}
                  {exp.org}
                  <span className="text-slate-400 font-normal text-sm ml-2">({exp.location})</span>
                </div>

                <ul className="list-disc pl-5 space-y-1.5 text-slate-600 mt-3">
                  {exp.bullets?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="space-y-6">
        <h2 className="text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>Education</h2>
        <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
          {content.academic.education?.map((edu: any, idx: number) => (
            <div key={idx} className="py-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="w-10 h-10 rounded-md border border-slate-200 bg-white object-contain p-1"
                    />
                  ) : (
                    <span className="w-10 h-10 rounded-md border border-slate-200 bg-slate-50 text-xs font-bold flex items-center justify-center text-slate-600">
                      {initials(edu.institution)}
                    </span>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 leading-snug">{edu.degree}</h3>
                    <p className="text-base font-medium" style={{ color: 'var(--ac-navy)' }}>{edu.institution}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{edu.location}</p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <p className="text-sm font-semibold text-slate-700">{edu.period}</p>
                  <p className="text-sm text-slate-600 mt-1">{edu.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="awards" className="space-y-6">
        <h2 className="text-3xl font-bold border-b border-border pb-2">Awards & Honors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.academic.awards?.map((aw: any, idx: number) => (
            <div key={idx} className="p-4 border border-border rounded-lg flex items-start gap-4">
              <div className="text-primary font-bold text-lg whitespace-nowrap">{aw.year}</div>
              <div>
                <h4 className="font-bold">{aw.title}</h4>
                <p className="text-sm text-muted-foreground">{aw.org}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
