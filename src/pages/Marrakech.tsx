import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function Marrakech() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/marrakech`

  return (
    <>
      <Helmet>
        <title>{t('nav.marrakech')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Discover Marrakech and combine tennis with an amazing travel experience." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/marrakech`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/marrakech`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.marrakech')} />

      <ContentBlock>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground">
            {t('home.facility.subtitle')}
          </p>
          <p className="text-muted-foreground">
            {t('home.facility.description')}
          </p>
        </div>
      </ContentBlock>
    </>
  )
}
