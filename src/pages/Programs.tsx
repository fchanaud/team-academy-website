import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { CardGrid } from '@/components/sections/CardGrid'

export function Programs() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/programs`

  return (
    <>
      <Helmet>
        <title>{t('nav.programs')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Tennis programs and training options at Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/programs`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/programs`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.programs')} />

      <ContentBlock reduceBottomPadding>
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <div className="h-1 w-12 bg-secondary rounded-full"></div>
              <div className="h-1 w-12 bg-tertiary rounded-full"></div>
            </div>
          </div>
        </div>
        <CardGrid
          cards={[
            {
              title: t('home.services.lessons'),
              description: 'Annual or occasional lessons for all levels',
            },
            {
              title: t('home.services.camps'),
              description: 'Intensive tennis camps',
            },
            {
              title: t('home.services.kidsAfternoon'),
              description: 'Special program for children',
            },
          ]}
        />
      </ContentBlock>
    </>
  )
}
