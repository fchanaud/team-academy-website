import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export function Registrations() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/registrations`

  return (
    <>
      <Helmet>
        <title>{t('nav.registrations')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Register for tennis lessons and programs at Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en/registrations`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr/registrations`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.registrations')} />

      <ContentBlock>
        <Card className="max-w-2xl mx-auto border-2 border-secondary/20 shadow-lg">
          <CardHeader className="bg-accent-green/30">
            <CardTitle className="text-secondary">{t('nav.registrations')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To register for our programs, please contact us directly.
            </p>
            <div className="flex items-center justify-center pt-4">
              <Button asChild size="lg" className="gap-2 bg-secondary hover:bg-secondary/90">
                <a href="tel:00212653890162">
                  <Phone size={20} />
                  +212 653 890 162
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </ContentBlock>
    </>
  )
}
