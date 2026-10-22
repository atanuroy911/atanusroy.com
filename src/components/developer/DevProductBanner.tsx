import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DevProductBanner({ product, locale = 'en' }: { product: any; locale?: string }) {
  if (!product) return null

  return (
    <div className="product-banner">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.icon} alt="" width={56} height={56} className="product-banner-icon" />
      <div className="product-banner-text">
        <div className="product-banner-title">{product.banner_title}</div>
        <div className="product-banner-sub">{product.banner_sub}</div>
      </div>
      <div className="product-banner-btns">
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {product.cta_primary} <ExternalLink size={15} />
        </a>
        <Link href={`/${locale}/developer/certsend`} className="btn-ghost">
          {product.learn_more} <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
