import { getContent, type Locale } from '@/lib/content'
import { GalleryGrid } from '@/components/GalleryGrid'
import type { Metadata } from 'next'
import { buildMetadata, getDevJourneySEO } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(getDevJourneySEO(locale as Locale))
}

export default async function DevJourney({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as Locale)
  const journey = content.developer.journey

  return (
    <div className="pt-24 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
      <section className="space-y-4 pb-6 mb-12">
        <span className="font-mono-dev text-sm text-black dark:text-white uppercase font-bold mb-2 block tracking-widest bg-[#ffde00] dark:bg-[#ff3366] w-fit px-2 py-0.5 border-2 border-black dark:border-white">// my_journey</span>
        <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">
          {journey?.title || 'Developer Journey'}
        </h1>
        <div className="h-2 w-24 mt-3 bg-black dark:bg-white" />
        <p className="text-xl font-medium text-black dark:text-white max-w-2xl mt-4 bg-[#00d9ff] p-2 border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
          {journey?.description}
        </p>
      </section>
      <GalleryGrid images={journey?.images || []} isDev={true} />
    </div>
  )
}
