import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { CardGrid } from '@/components/sections/CardGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import patrickImage from '../public/images/home/patrick.jpg'

export function Home() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Tennis Academy Marrakech',
    description: t('meta.home.description'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'COS-ONE Club, route de Targa',
      addressLocality: 'Marrakech',
      addressCountry: 'MA',
    },
    telephone: '+212653890162',
    url: 'https://www.tennisacademymarrakech.com',
    sameAs: [
      'https://www.facebook.com/TennisAcademyMarrakech/',
      'https://www.tripadvisor.fr/Attraction_Review-g293734-d7721316-Reviews-Tennis_Academy_Marrakech-Marrakech_Marrakech_Tensift_El_Haouz_Region.html',
    ],
  }

  return (
    <>
      <Helmet>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('meta.home.description')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('meta.home.title')} />
        <meta property="og:description" content={t('meta.home.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.home.title')} />
        <meta name="twitter:description" content={t('meta.home.description')} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero
        title={t('home.welcome')}
        subtitle={t('home.subtitle')}
        description={t('home.tagline')}
      />

      <ContentBlock>
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-primary mx-auto"></div>
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">{t('home.whatWeOffer')}</h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-8">
            <span className="px-4 py-1.5 bg-accent text-accent-foreground rounded-full font-medium shadow-sm">{t('home.children')}</span>
            <span className="px-4 py-1.5 bg-accent-green text-accent-green-foreground rounded-full font-medium shadow-sm">{t('home.adults')}</span>
            <span className="px-4 py-1.5 bg-accent-blue text-accent-blue-foreground rounded-full font-medium shadow-sm">{t('home.seniors')}</span>
          </div>
        </div>

        <div className="mb-6 text-center text-sm text-muted-foreground">
          <p>{t('home.services.annualOrOccasional')}</p>
          <p className="mt-1 font-medium">{t('home.services.forAllLevels')}</p>
        </div>

        <CardGrid
          cards={[
            {
              title: t('home.services.lessons'),
              description: t('home.services.title'),
            },
            {
              title: t('home.services.camps'),
              description: t('home.services.title'),
            },
            {
              title: t('home.services.kidsAfternoon'),
              description: t('home.services.title'),
            },
            {
              title: t('home.services.rental'),
            },
            {
              title: t('home.services.stringing'),
            },
          ]}
        />
      </ContentBlock>

      <ContentBlock variant="muted">
        <div className="mb-8">
          <p className="text-lg mb-6 text-foreground font-medium text-center">{t('home.professional')}</p>
          <Card className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto border-2 border-primary/20 shadow-lg overflow-hidden">
            <CardHeader className="bg-primary/5 py-4">
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-primary">{t('home.coach.name')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 md:pt-5">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
                <div className="w-full md:w-48 lg:w-56 xl:w-64 flex-shrink-0">
                  <img
                    src={patrickImage}
                    alt={t('home.coach.name')}
                    className="w-full h-auto rounded-lg object-cover shadow-md max-h-64 md:max-h-72 lg:max-h-80"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-foreground mb-2 font-medium text-base md:text-lg lg:text-xl">{t('home.coach.title')}</p>
                  <p className="text-sm md:text-base text-muted-foreground">{t('home.coach.certification')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentBlock>

      <ContentBlock>
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-secondary mx-auto"></div>
          </div>
          <h2 className="text-3xl font-heading font-bold mb-2 text-foreground">{t('home.facility.title')}</h2>
          <p className="text-xl text-muted-foreground mb-6">{t('home.facility.subtitle')}</p>
        </div>

        <div className="mb-8">
          <p className="text-lg mb-4">{t('home.facility.description')}</p>
          <ul className="space-y-3 text-muted-foreground max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span>{t('home.facility.features.airy')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-2 font-bold">•</span>
              <span>{t('home.facility.features.courts')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-tertiary mr-2 font-bold">•</span>
              <span>{t('home.facility.features.basketball')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2 font-bold">•</span>
              <span>{t('home.facility.features.parking')}</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <a
            href="tel:00212653890162"
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <span>Whatsapp: +212 653 890 162</span>
          </a>
        </div>
      </ContentBlock>
    </>
  )
}
