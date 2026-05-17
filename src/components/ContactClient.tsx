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
      <div className="py-24 bg-white dark:bg-black min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <span className="font-mono-dev text-sm text-black dark:text-black uppercase font-bold mb-2 block tracking-widest bg-[#00d9ff] w-fit px-2 py-0.5 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] mx-auto">// ping_me</span>
            <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">Get in Touch</h1>
            <div className="h-2 w-24 mt-4 bg-black dark:bg-white mx-auto" />
            <p className="mt-6 text-black dark:text-white font-medium bg-[#ffde00] p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] max-w-lg mx-auto dark:text-black">
              Whether you have a project idea, want to collaborate on research, or just want to chat about tech.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3">
              <form onSubmit={handleSubmit} className="dev-glass rounded-none p-8 dev-border-glow bg-white dark:bg-black space-y-6 border-[3px] border-[#ff3366] dark:border-[#00d9ff]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono-dev font-bold uppercase tracking-widest text-xs text-black dark:text-white">Name</label>
                    <input type="text" className="w-full bg-white dark:bg-black border-2 border-black dark:border-white rounded-none px-4 py-3 text-black dark:text-white focus:outline-none focus:shadow-[4px_4px_0px_#00d9ff] dark:focus:shadow-[4px_4px_0px_#ffde00] transition-all font-mono-dev text-sm" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono-dev font-bold uppercase tracking-widest text-xs text-black dark:text-white">Email</label>
                    <input type="email" className="w-full bg-white dark:bg-black border-2 border-black dark:border-white rounded-none px-4 py-3 text-black dark:text-white focus:outline-none focus:shadow-[4px_4px_0px_#00d9ff] dark:focus:shadow-[4px_4px_0px_#ffde00] transition-all font-mono-dev text-sm" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono-dev font-bold uppercase tracking-widest text-xs text-black dark:text-white">Message</label>
                  <textarea className="w-full bg-white dark:bg-black border-2 border-black dark:border-white rounded-none px-4 py-3 text-black dark:text-white focus:outline-none focus:shadow-[4px_4px_0px_#00d9ff] dark:focus:shadow-[4px_4px_0px_#ffde00] transition-all font-mono-dev text-sm min-h-[150px]" placeholder="Hello Atanu..." required />
                </div>
                <Button type="submit" className="w-full rounded-none font-mono-dev bg-[#00d9ff] dark:bg-[#ff3366] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] text-black dark:text-white border-2 border-black dark:border-white font-bold py-6 uppercase tracking-widest transition-all">
                  &gt; Send_Message
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
              <div className="dev-glass rounded-none p-8 dev-border-glow bg-white dark:bg-black h-full flex flex-col justify-center space-y-8">
                <a href={`mailto:${p?.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-none bg-[#ffde00] flex items-center justify-center border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] group-hover:shadow-[4px_4px_0px_#000] dark:group-hover:shadow-[4px_4px_0px_#fff] group-hover:-translate-y-1 transition-all">
                    <Mail className="text-black" />
                  </div>
                  <div>
                    <div className="font-mono-dev font-bold uppercase tracking-widest text-[10px] text-black dark:text-white mb-1">Email</div>
                    <div className="text-black dark:text-white group-hover:text-[#ff3366] dark:group-hover:text-[#00d9ff] transition-colors font-black text-sm">{p?.email}</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-none bg-[#00d9ff] dark:bg-[#ff3366] flex items-center justify-center border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
                    <MapPin className="text-black dark:text-white" />
                  </div>
                  <div>
                    <div className="font-mono-dev font-bold uppercase tracking-widest text-[10px] text-black dark:text-white mb-1">Location</div>
                    <div className="text-black dark:text-white font-black text-sm">{p?.location}</div>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-black dark:border-white flex justify-center gap-4">
                  {[
                    { href: p?.github, icon: Github },
                    { href: p?.linkedin, icon: Linkedin },
                    { href: p?.google_scholar, icon: BookOpen }
                  ].map((social, i) => social.href && (
                    <a key={i} href={social.href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-none bg-white dark:bg-black flex items-center justify-center text-black dark:text-white hover:bg-[#ffde00] dark:hover:bg-[#ff3366] hover:text-black dark:hover:text-black transition-all border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff]">
                      <social.icon size={18} />
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
