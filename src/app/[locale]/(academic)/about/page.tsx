import { getContent, type Locale } from '@/lib/content'
import type { Metadata } from 'next'
import { buildMetadata, getAcademicAboutSEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getAcademicAboutSEO(locale as Locale))
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word: string) => word[0]?.toUpperCase())
      .join('')

  return (
    <div className="space-y-14 pb-16">
      <section id="about" className="space-y-5">
        <h2 className="text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>About Me</h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap max-w-3xl">
          {content.academic.bio}
        </p>
        <div className="pt-3">
          <h3 className="font-bold text-lg md:text-xl mb-3">Research Interests</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {content.academic.research_interests?.map((ri: string) => (
              <li key={ri} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span>{ri}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="space-y-5">
        <h2 className="text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>
          Experience
        </h2>
        <div className="space-y-4">
          {content.academic.experience?.map((exp: any, idx: number) => (
            <div key={idx} className="relative pl-7 border-l-2 border-slate-200 pb-1 last:border-0 last:pb-0">
              <div className="absolute -left-2.5 top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
              <div className="space-y-1.5">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 items-start md:items-center">
                  <h3 className="text-base md:text-lg font-bold text-slate-800">{exp.role}</h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm md:text-lg font-medium leading-snug" style={{ color: 'var(--ac-navy)' }}>
                    {exp.org}
                    <span className="text-slate-400 font-normal text-xs md:text-sm ml-2">({exp.location})</span>
                  </div>
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={`${exp.org} logo`}
                      className="hidden md:block w-12 h-12 rounded-lg border border-slate-200 bg-white object-contain p-1 shrink-0"
                    />
                  ) : (
                    <span className="hidden md:flex w-12 h-12 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold items-center justify-center text-slate-600 shrink-0">
                      {initials(exp.org)}
                    </span>
                  )}
                </div>

                <ul className="list-disc pl-5 space-y-1 text-slate-600 mt-1.5 text-sm">
                  {exp.bullets?.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="space-y-5">
        <h2 className="text-3xl font-bold border-b border-border pb-2" style={{ color: 'var(--ac-navy)' }}>
          Education
        </h2>
        <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
          {content.academic.education?.map((edu: any, idx: number) => (
            <div key={idx} className="py-3.5 md:py-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm md:text-base font-semibold text-slate-800 leading-snug">{edu.degree}</h3>
                  <p className="text-xs md:text-sm font-medium" style={{ color: 'var(--ac-navy)' }}>
                    {edu.institution}
                  </p>
                  <p className="text-[11px] md:text-xs text-slate-500 mt-0.5">{edu.location}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 shrink-0 md:min-w-36">
                  <div className="text-left md:text-right">
                    <p className="text-xs md:text-sm font-semibold text-slate-700">{edu.period}</p>
                    <p className="text-[11px] md:text-sm text-slate-600 mt-0.5">{edu.grade}</p>
                  </div>
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={`${edu.institution} logo`}
                      className="hidden md:block w-16 h-16 rounded-lg border border-slate-200 bg-white object-contain p-2 shrink-0"
                    />
                  ) : (
                    <span className="hidden md:flex w-16 h-16 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold items-center justify-center text-slate-600 shrink-0">
                      {initials(edu.institution)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="awards" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-border pb-2">Awards &amp; Honors</h2>
        <div className="space-y-2 text-sm md:text-base text-slate-700">
          {content.academic.awards?.map((aw: any, idx: number) => (
            <p key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>
                <span className="font-semibold text-slate-800">{aw.year}:</span> {aw.title} · {aw.org}
              </span>
            </p>
          ))}
        </div>
      </section>
    </div>
  )
}
