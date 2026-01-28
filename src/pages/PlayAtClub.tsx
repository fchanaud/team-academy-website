import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function PlayAtClub() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/programs/play-at-club`

  return (
    <>
      <Helmet>
        <title>{t('nav.programsSubmenu.playAtClub')} | Tennis Academy Marrakech</title>
        <meta name="description" content={t('programs.playAtClub.description')} />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/programs/play-at-club`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/programs/play-at-club`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.programsSubmenu.playAtClub')} />

      <ContentBlock>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground">{t('programs.playAtClub.content')}</p>
        </div>
      </ContentBlock>
    </>
  )
}
