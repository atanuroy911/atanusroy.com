'use client'

import { usePathname } from 'next/navigation'

export function TableOfContents({ locale }: { locale: string }) {
  const pathname = usePathname()

  let sections: { id: string; label: string }[] = []

  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    sections = [
      { id: 'about', label: 'About Me' },
      { id: 'education', label: 'Education' },
      { id: 'experience', label: 'Experience' },
      { id: 'awards', label: 'Awards' },
    ]
  } else if (pathname === `/${locale}/research`) {
    sections = [
      { id: 'research', label: 'Research' },
    ]
  } else if (pathname === `/${locale}/publications`) {
    sections = [
      { id: 'publications', label: 'Publications' },
    ]
  } else if (pathname === `/${locale}/projects`) {
    sections = [
      { id: 'projects', label: 'Projects' },
    ]
  } else if (pathname === `/${locale}/teaching`) {
    sections = [
      { id: 'teaching', label: 'Teaching & Mentorship' },
    ]
  } else if (pathname === `/${locale}/students`) {
    sections = [
      { id: 'students', label: 'Students' },
    ]
  } else if (pathname === `/${locale}/contact`) {
    sections = [
      { id: 'contact', label: 'Contact' },
    ]
  } else if (pathname === `/${locale}/journey`) {
    sections = [
      { id: 'journey', label: 'Journey' },
    ]
  } else if (pathname === `/${locale}/blog`) {
    sections = [
      { id: 'blog', label: 'News & Updates' },
    ]
  }

  if (sections.length === 0) return null

  return (
    <nav className="hidden md:flex flex-col gap-2 mt-3 flex-1 text-left">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">On this page</h3>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="py-2 pr-2 text-sm text-foreground hover:bg-secondary/50 hover:text-primary transition-all cursor-pointer border-l-2 border-transparent hover:border-primary"
        >
          {section.label}
        </a>
      ))}
    </nav>
  )
}
