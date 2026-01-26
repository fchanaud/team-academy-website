import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function Gallery() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/gallery`

  return (
    <>
      <Helmet>
        <title>{t('nav.gallery')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Photo and video gallery of Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en/gallery`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr/gallery`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.gallery')} />

      <ContentBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for gallery images */}
          {[1, 2, 3, 4, 5, 6].map((i) => {
            const colorIndex = i % 3
            const isRed = colorIndex === 0
            const isGreen = colorIndex === 1
            const isBlue = colorIndex === 2
            
            const borderColor = isRed ? 'hover:border-primary/40' : 
                               isGreen ? 'hover:border-secondary/40' : 
                               'hover:border-tertiary/40'
            
            return (
              <div
                key={i}
                className={`aspect-square bg-muted rounded-xl flex items-center justify-center border-2 border-border transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 overflow-hidden ${borderColor}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${isRed ? 'bg-primary' : isGreen ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                <span className="text-muted-foreground text-sm relative z-10">Photo {i}</span>
              </div>
            )
          })}
        </div>
      </ContentBlock>
    </>
  )
}
