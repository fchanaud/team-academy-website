import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { ImageCarousel } from '@/components/ImageCarousel'
import { useState } from 'react'

// Import all images from src/public/images
// Using glob pattern relative to this file (src/pages -> src/public/images)
const imageModules = import.meta.glob('../public/images/**/*.{jpg,jpeg,png}', { 
  eager: true,
  import: 'default'
})

const galleryImages = Object.values(imageModules)
  .map((url: any) => {
    // The glob returns the imported URL directly
    return typeof url === 'string' ? url : ''
  })
  .filter((url: string) => {
    if (!url) return false
    // Filter out non-image files like logos and icons
    const filename = url.toLowerCase()
    return !filename.includes('logo') && 
           !filename.includes('fb.png') && 
           !filename.includes('tripadvisor') &&
           !filename.includes('kidakech') &&
           !filename.includes('brand') &&
           !filename.includes('a4e59ec16cbb406192a1c16db275eadd') && // TripAdvisor icon
           !filename.includes('b1cd13f9d4dfb1450bbb325285106177') && // Facebook icon
           !filename.includes('ta_brand') // Brand logo
  })
  .sort()
  .slice(2) // Remove first 2 images that don't show up

export function Gallery() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/gallery`
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <Helmet>
        <title>{t('nav.gallery')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Photo gallery of Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/gallery`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/gallery`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.gallery')} />

      <ContentBlock>
        {/* Mobile Carousel */}
        <div className="md:hidden mb-6">
          <ImageCarousel images={galleryImages} autoPlayInterval={4000} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index < 6 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={selectedImage}
              alt="Full size gallery image"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </ContentBlock>
    </>
  )
}
