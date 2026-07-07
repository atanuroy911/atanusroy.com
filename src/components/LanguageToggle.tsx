'use client'

import { usePathname, useRouter } from 'next/navigation'

interface LanguageToggleProps {
  locale: 'en' | 'bn'
  className?: string
}

export function LanguageToggle({ locale, className = '' }: LanguageToggleProps) {
  const pathname = usePathname()
  const router = useRouter()

  const goTo = (target: 'en' | 'bn') => {
    if (target === locale) return
    router.push(pathname.replace(`/${locale}`, `/${target}`))
  }

  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label="Switch language">
      <button
        type="button"
        onClick={() => goTo('en')}
        className={`lang-toggle-seg ${locale === 'en' ? 'is-active' : ''}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => goTo('bn')}
        className={`lang-toggle-seg ${locale === 'bn' ? 'is-active' : ''}`}
      >
        বাং
      </button>
    </div>
  )
}
