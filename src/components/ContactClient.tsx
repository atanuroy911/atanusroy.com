'use client'

import { motion } from 'framer-motion'
import { useMode } from '@/providers/ModeProvider'
import { Mail, MapPin, BookOpen, UserCircle2 } from 'lucide-react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

const Github = (props: any) => <GitHubLogoIcon width={props.size || 24} height={props.size || 24} {...props} />
const Linkedin = (props: any) => <LinkedInLogoIcon width={props.size || 24} height={props.size || 24} {...props} />
import { Button } from '@/components/ui/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ContactClient({ content }: { content: any }) {
  const { mode } = useMode()
  const isDev = mode === 'developer'

  const p = content?.personal
  const ac = content?.academic

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for actual form submission
    alert('Contact form submission would happen here.')
  }

  if (isDev) {
    return (
      <div className="port pt-40 pb-32 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-24 text-center">
            <div className="sec-label">// ping_me</div>
            <div className="sec-title">Get in Touch</div>
            <div className="sec-sub max-w-2xl mx-auto">Whether you have a project idea, want to collaborate on research, or just want to chat about tech.</div>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-3">
              <form onSubmit={handleSubmit} className="service-card w-full space-y-8 !p-8">
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div className="space-y-3 w-full">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Name</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-5 py-3 focus:outline-none focus:border-blue-500 transition-colors text-base" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-3 w-full">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Email</label>
                    <input type="email" className="w-full bg-white border border-gray-200 rounded-lg px-5 py-3 focus:outline-none focus:border-blue-500 transition-colors text-base" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="space-y-3 w-full">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Message</label>
                  <textarea className="w-full bg-white border border-gray-200 rounded-lg px-5 py-3 focus:outline-none focus:border-blue-500 transition-colors text-base min-h-[200px]" placeholder="Hello Atanu..." required />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg transition-colors text-lg">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-8">
              <div className="service-card w-full h-full flex flex-col justify-center space-y-10 !p-8">
                <a href={`mailto:${p?.email}`} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Email</div>
                    <div className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors truncate max-w-[200px] sm:max-w-xs">{p?.email}</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-6 group cursor-default">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-green-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Location</div>
                    <div className="text-lg font-medium text-gray-800">{p?.location}</div>
                  </div>
                </div>

                <div className="pt-10 border-t border-gray-100 flex justify-start gap-6">
                  {[
                    { href: p?.github, icon: Github },
                    { href: p?.linkedin, icon: Linkedin },
                    { href: p?.google_scholar, icon: BookOpen }
                  ].map((social, i) => social.href && (
                    <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:border-gray-300 hover:text-blue-600 hover:-translate-y-1 transition-all">
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
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
                      <Linkedin size={16} className="text-blue-600" /> LinkedIn
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
