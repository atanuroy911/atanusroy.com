'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Mail, MapPin, BookOpen, UserCircle2, Send } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

const GithubIcon = (props: any) => <GitHubLogoIcon width={props.size || 18} height={props.size || 18} />
const LinkedinIcon = (props: any) => <LinkedInLogoIcon width={props.size || 18} height={props.size || 18} />

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContactClient({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'

  const p = content?.personal
  const ac = content?.academic

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Contact form submission would happen here.')
  }

  if (isDev) {
    return (
      <div className="port">
        <div className="dev-contact-page">
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div className="sec-label">// ping_me</div>
            <h1 className="sec-title">Get in Touch</h1>
            <p className="sec-sub" style={{ maxWidth: 520 }}>
              Have a project idea? Let&apos;s talk. I reply within 24 hours.
            </p>
          </div>

          <div className="dev-contact-grid">
            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="dev-contact-form-card">
                <form onSubmit={handleSubmit}>
                  <div className="dev-form-row">
                    <div className="dev-form-group" style={{ marginBottom: 0 }}>
                      <label className="dev-form-label">Name</label>
                      <input
                        type="text"
                        className="dev-form-input"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="dev-form-group" style={{ marginBottom: 0 }}>
                      <label className="dev-form-label">Email</label>
                      <input
                        type="email"
                        className="dev-form-input"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="dev-form-group">
                    <label className="dev-form-label">Subject</label>
                    <input
                      type="text"
                      className="dev-form-input"
                      placeholder="Project inquiry / collaboration / say hi"
                    />
                  </div>

                  <div className="dev-form-group">
                    <label className="dev-form-label">Message</label>
                    <textarea
                      className="dev-form-textarea"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  <button type="submit" className="dev-form-submit">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Side info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="dev-contact-side"
            >
              {/* Contact info card */}
              <div className="dev-contact-info-card">
                <a href={`mailto:${p?.email}`} className="dev-contact-item">
                  <div
                    className="dev-contact-icon-wrap"
                    style={{ background: 'var(--dev-accent-light)', border: '1px solid var(--dev-accent-border)' }}
                  >
                    <Mail size={20} color="var(--dev-accent)" />
                  </div>
                  <div>
                    <div className="dev-contact-label">Email</div>
                    <div className="dev-contact-value" style={{ wordBreak: 'break-all' }}>
                      {p?.email}
                    </div>
                  </div>
                </a>

                <div className="dev-contact-item" style={{ cursor: 'default' }}>
                  <div
                    className="dev-contact-icon-wrap"
                    style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
                  >
                    <MapPin size={20} color="#16a34a" />
                  </div>
                  <div>
                    <div className="dev-contact-label">Location</div>
                    <div className="dev-contact-value">{p?.location}</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="dev-socials-card">
                <div className="dev-socials-title">Find me online</div>
                <div className="dev-socials-row">
                  {p?.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="dev-social-btn">
                      <GithubIcon size={16} />
                      GitHub
                    </a>
                  )}
                  {p?.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="dev-social-btn">
                      <LinkedinIcon size={16} />
                      LinkedIn
                    </a>
                  )}
                  {p?.google_scholar && (
                    <a href={p.google_scholar} target="_blank" rel="noreferrer" className="dev-social-btn">
                      <BookOpen size={16} />
                      Scholar
                    </a>
                  )}
                </div>
              </div>

              {/* Availability note */}
              <div
                style={{
                  background: 'var(--dev-accent-light)',
                  border: '1px solid var(--dev-accent-border)',
                  borderRadius: 'var(--r-lg)',
                  padding: '20px 24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: '#16a34a',
                      boxShadow: '0 0 0 3px rgba(22,163,74,0.2)',
                      animation: 'pulse-dot 2s infinite',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--dev-accent)', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    Open to projects
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--dev-text-3)', lineHeight: 1.6 }}>
                  Currently available for freelance work and short-term contracts. Response time is typically within 24 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-24 dark:bg-slate-950" style={{ background: 'var(--ac-bg)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="ac-font-serif text-5xl font-bold dark:text-white" style={{ color: 'var(--ac-text)' }}>
            Contact
          </h1>
          <div className="h-0.5 w-20 mt-4 mx-auto" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I am always open to discussing research collaborations, teaching opportunities, and academic inquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="ac-paper rounded-xl p-8 mb-8">
              <h3 className="ac-font-serif text-2xl font-bold mb-6" style={{ color: 'var(--ac-navy)' }}>Get in Touch</h3>
              <div className="space-y-6">
                <a href={`mailto:${p?.email}`} className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-blue-700" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Email Address</div>
                    <div className="text-slate-600 dark:text-slate-400">{p?.email}</div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-green-700" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Current Location</div>
                    <div className="text-slate-600 dark:text-slate-400">{p?.location}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">Academic Profiles</h4>
                <div className="flex flex-wrap gap-3">
                  {p?.google_scholar && (
                    <a href={p.google_scholar} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-white dark:bg-slate-900 text-sm font-medium transition-colors">
                      <BookOpen size={16} style={{ color: 'var(--ac-navy)' }} /> Scholar
                    </a>
                  )}
                  {p?.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-white dark:bg-slate-900 text-sm font-medium transition-colors">
                      <LinkedinIcon size={16} /> LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="ac-paper rounded-xl p-8">
              <h3 className="ac-font-serif text-2xl font-bold mb-6" style={{ color: 'var(--ac-navy)' }}>Academic Referees</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                The following individuals can provide references regarding my academic performance and research capabilities.
              </p>

              <div className="space-y-4">
                {ac?.referees?.map((ref: { name: string; affiliation: string; email: string }, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <UserCircle2 size={24} className="text-slate-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{ref.name}</h4>
                      <div className="text-sm text-slate-600 mt-0.5">{ref.affiliation}</div>
                      <a href={`mailto:${ref.email}`} className="text-sm text-blue-600 hover:underline mt-1 inline-block">{ref.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
