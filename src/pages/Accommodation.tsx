import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function Accommodation() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/accommodation`

  return (
    <>
      <Helmet>
        <title>{t('nav.accommodation')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Accommodation options near Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en/accommodation`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr/accommodation`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.accommodation')} />

      <ContentBlock>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground">
            Information about accommodation options will be available here.
          </p>
        </div>
      </ContentBlock>
    </>
  )
}
