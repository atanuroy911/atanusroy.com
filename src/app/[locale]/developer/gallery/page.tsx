import { getContent, type Locale } from '@/lib/content'
import { DevGalleryGrid } from '@/components/developer/DevGalleryGrid'
import type { Metadata } from 'next'
import { buildMetadata, getDevGallerySEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevGallerySEO(locale as Locale))
}

export default async function DevGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const gallery = content.developer.gallery

  return (
    <div className="port">
      <div className="dev-gallery-page">
        <div className="mb-16 text-center">
          <div className="sec-label">// gallery</div>
          <div className="sec-title">{gallery?.title || 'Gallery'}</div>
          <div className="sec-sub max-w-2xl mx-auto">{gallery?.description}</div>
        </div>
        <DevGalleryGrid images={gallery?.images || []} />
      </div>
    </div>
  )
}
