import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation, Link } from 'react-router-dom'
import { getLanguageFromPath, addLanguagePrefix } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { ArrowRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import patrickImage from '../public/images/home/patrick.jpg'
import heroImage from '../public/images/home/uepsSEiv1v5F6YPL.jpg'

export function Home() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}`
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapHeight, setMapHeight] = useState<number | null>(null)

  // Match map height to left column height on iPad and desktop
  useEffect(() => {
    const updateMapHeight = () => {
      // Only apply on md (iPad) and larger screens
      if (window.innerWidth >= 768 && leftColumnRef.current && mapContainerRef.current) {
        const leftColumnHeight = leftColumnRef.current.offsetHeight
        setMapHeight(leftColumnHeight)
      } else {
        // Reset to auto/aspect ratio on mobile
        setMapHeight(null)
      }
    }

    // Initial measurement with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateMapHeight, 100)

    // Update on window resize
    window.addEventListener('resize', updateMapHeight)
    
    // Use ResizeObserver for more accurate tracking
    let resizeObserver: ResizeObserver | null = null
    if (leftColumnRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(updateMapHeight)
      resizeObserver.observe(leftColumnRef.current)
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateMapHeight)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

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
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero
        title={t('home.welcome')}
        subtitle={t('home.subtitle')}
        subtitleLink="https://www.google.com/maps/search/?api=1&query=Club+du+COS-ONE,+route+de+Targa,+Marrakech"
        description={t('home.tagline')}
        image={heroImage}
        imageAlt="Tennis Academy Marrakech"
      />

      <ContentBlock id="next-section">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-block mb-4">
            <div className="h-1 w-16 bg-primary mx-auto"></div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 md:mb-6 text-foreground">{t('home.whatWeOffer')}</h2>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-6">
            <span className="px-4 py-1.5 bg-accent text-accent-foreground rounded-full font-medium shadow-sm">{t('home.children')}</span>
            <span className="px-4 py-1.5 bg-accent-green text-accent-green-foreground rounded-full font-medium shadow-sm">{t('home.adults')}</span>
            <span className="px-4 py-1.5 bg-accent-blue text-accent-blue-foreground rounded-full font-medium shadow-sm">{t('home.seniors')}</span>
          </div>
        </div>

        <div className="mb-6 text-center text-sm text-muted-foreground">
          <p>{t('home.services.annualOrOccasional')}</p>
          <p className="mt-1 font-medium">{t('home.services.forAllLevels')}</p>
        </div>

        {/* Services as bullet points */}
        <div className="max-w-2xl mx-auto mb-6">
          <ul className="space-y-4 text-left">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl font-bold mt-0.5">•</span>
              <span className="text-foreground text-base md:text-lg font-medium">{t('home.services.lessons')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary text-xl font-bold mt-0.5">•</span>
              <span className="text-foreground text-base md:text-lg font-medium">{t('home.services.camps')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-tertiary text-xl font-bold mt-0.5">•</span>
              <span className="text-foreground text-base md:text-lg font-medium">{t('home.services.kidsAfternoon')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl font-bold mt-0.5">•</span>
              <span className="text-foreground text-base md:text-lg font-medium">{t('home.services.rental')}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-secondary text-xl font-bold mt-0.5">•</span>
              <span className="text-foreground text-base md:text-lg font-medium">{t('home.services.stringing')}</span>
            </li>
          </ul>
        </div>

        {/* Link to check rates */}
        <div className="text-center">
          <Link
            to={addLanguagePrefix('/programs', lang)}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-base md:text-lg transition-colors group"
          >
            <span>{t('home.services.checkRates')}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ContentBlock>

      {/* Red separator line */}
      <div className="flex justify-center py-2 md:py-3">
        <div className="h-1 w-16 bg-primary"></div>
      </div>

      <ContentBlock variant="muted" className="py-4 md:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 text-foreground font-semibold text-center">{t('home.professional')}</p>
          <div className="bg-white rounded-lg border-2 border-primary/20 shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="w-full md:w-48 lg:w-56 flex-shrink-0">
                <img
                  src={patrickImage}
                  alt={t('home.coach.name')}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              
              {/* Content Section */}
              <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">{t('home.coach.name')}</h3>
                  <p className="text-sm md:text-base font-semibold text-foreground mb-1">{t('home.coach.title')}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">{t('home.coach.certification')}</p>
                  
                  {/* Quote */}
                  <div className="border-l-4 border-primary/30 pl-4 md:pl-5">
                    <p className="text-sm md:text-base lg:text-lg text-foreground italic leading-relaxed">
                      "{t('home.coach.quote')}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content */}
          <div ref={leftColumnRef} className="order-1">
            <div className="text-center lg:text-left mb-4 md:mb-5">
              <div className="inline-block mb-3 md:mb-4">
                <div className="h-1 w-16 bg-secondary mx-auto lg:mx-0"></div>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 md:mb-3 text-foreground">{t('home.facility.title')}</h2>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 md:mb-6">{t('home.facility.subtitle')}</p>
            </div>

            <div className="mb-4 md:mb-5">
              <p className="text-lg mb-4">{t('home.facility.description')}</p>
              <ul className="space-y-3 text-muted-foreground">
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

            <div className="text-center lg:text-left">
              <a
                href="tel:00212653890162"
                className="inline-flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <span>Whatsapp: +212 653 890 162</span>
              </a>
            </div>
          </div>

          {/* Right Column - Google Map */}
          <div className="order-2">
            <div 
              ref={mapContainerRef}
              className="relative w-full rounded-lg overflow-hidden shadow-lg border border-border"
              style={mapHeight ? { height: `${mapHeight}px` } : { aspectRatio: '16/9' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.5!2d-7.981234567890!3d31.628901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafeeeb6677a635%3A0x2936795494e33117!2sTennis%20Academy%20Marrakech!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Tennis Academy Marrakech Location"
              />
            </div>
          </div>
        </div>
      </ContentBlock>
    </>
  )
}
