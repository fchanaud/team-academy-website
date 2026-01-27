import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function BabyTennis() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/programs/baby-tennis`

  return (
    <>
      <Helmet>
        <title>{t('nav.programsSubmenu.babyTennis')} | Tennis Academy Marrakech</title>
        <meta name="description" content={t('programs.babyTennis.description')} />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en/programs/baby-tennis`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr/programs/baby-tennis`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.programsSubmenu.babyTennis')} />

      <ContentBlock>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground">{t('programs.babyTennis.content')}</p>
        </div>
      </ContentBlock>
    </>
  )
}
