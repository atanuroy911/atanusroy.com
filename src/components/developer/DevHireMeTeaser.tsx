import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function DevHireMeTeaser({ locale = 'en' }: { locale?: string }) {
  return (
    <div className="hire-teaser">
      <div>
        <div className="hire-teaser-title">Thinking about hiring me?</div>
        <div className="hire-teaser-sub">
          Full stack, DevOps, and ML — one engineer, no handoffs, direct communication. See real
          case studies and why clients pick me over an agency.
        </div>
      </div>
      <Link href={`/${locale}/developer/hire-me`} className="btn-primary">
        Why hire me <ArrowRight size={15} />
      </Link>
    </div>
  )
}
