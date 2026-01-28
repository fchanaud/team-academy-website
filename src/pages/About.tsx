import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Users, Target, Calendar, Award } from 'lucide-react'

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

      <ContentBlock reduceBottomPadding>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction Section */}
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              {t('about.intro.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              {t('about.intro.description')}
            </p>
            <p className="text-base md:text-lg text-foreground max-w-3xl mx-auto">
              {t('about.intro.welcome')}
            </p>
          </section>

          {/* School Section */}
          <Card className="border-2 border-primary/20 shadow-md">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-3">
                    {t('about.school.title')}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground mb-3">
                    {t('about.school.description')}
                  </p>
                  <p className="text-base text-muted-foreground mb-3">
                    {t('about.school.approach')}
                  </p>
                  <div className="flex items-start gap-2 mt-4">
                    <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-base text-muted-foreground">
                      {t('about.school.location')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Courses Section */}
          <section>
            <div className="text-center mb-6">
              <div className="inline-block mb-3">
                <div className="h-1 w-16 bg-primary mx-auto"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4">
                {t('about.courses.title')}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-secondary/20 shadow-md">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-base md:text-lg text-foreground">
                      {t('about.courses.description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-tertiary/20 shadow-md">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-tertiary flex-shrink-0 mt-0.5" />
                    <p className="text-base md:text-lg text-primary font-semibold italic">
                      {t('about.courses.tagline')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Coaches Section */}
          <section>
            <div className="text-center mb-6">
              <div className="inline-block mb-3">
                <div className="h-1 w-16 bg-primary mx-auto"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-4">
                {t('about.coaches.title')}
              </h3>
            </div>
            <div className="space-y-5">
              <Card className="border-2 border-primary/20 shadow-md">
                <CardContent className="p-5 md:p-6">
                  <p className="text-base md:text-lg text-muted-foreground mb-4">
                    {t('about.coaches.description')}
                  </p>
                  <p className="text-base text-muted-foreground">
                    {t('about.coaches.formulas')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/20 shadow-md">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-base md:text-lg text-foreground font-semibold">
                      {t('about.coaches.segmentation')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-5">
                <Card className="border-2 border-primary/20 shadow-md">
                  <CardContent className="p-5 md:p-6">
                    <p className="text-base text-muted-foreground">
                      {t('about.coaches.organization')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-tertiary/20 shadow-md">
                  <CardContent className="p-5 md:p-6">
                    <p className="text-base text-muted-foreground">
                      {t('about.coaches.planning')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </ContentBlock>
    </>
  )
}
