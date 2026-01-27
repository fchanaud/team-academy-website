import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function IndividualLessons() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/programs/individual-lessons`

  return (
    <>
      <Helmet>
        <title>{t('nav.programsSubmenu.individualLessons')} | Tennis Academy Marrakech</title>
        <meta name="description" content={t('programs.individualLessons.description')} />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en/programs/individual-lessons`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr/programs/individual-lessons`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.programsSubmenu.individualLessons')} />

      <ContentBlock>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground">{t('programs.individualLessons.content')}</p>
        </div>
      </ContentBlock>
    </>
  )
}
