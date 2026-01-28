import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function About() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/about`

  return (
    <>
      <Helmet>
        <title>{t('nav.about')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Learn about Tennis Academy Marrakech and our professional coaching team." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/about`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/about`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.about')} />

      <ContentBlock>
        <div className="prose prose-lg max-w-none">
          <Card className="mb-6 border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl text-primary">{t('home.coach.name')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-foreground mb-2 font-medium">{t('home.coach.title')}</p>
              <p className="text-sm text-muted-foreground">{t('home.coach.certification')}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-foreground">{t('home.professional')}</p>
            <p className="text-muted-foreground">{t('home.facility.description')}</p>
          </div>
        </div>
      </ContentBlock>
    </>
  )
}
