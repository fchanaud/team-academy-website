import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'

export function Terms() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/terms`

  return (
    <>
      <Helmet>
        <title>{t('nav.terms')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Terms and conditions for Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/terms`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/terms`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.terms')} />

      <ContentBlock reduceBottomPadding>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Information Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{t('terms.information.title')}</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  {t('terms.information.location').includes(':') ? (
                    <>
                      {t('terms.information.location').split(':')[0]}:{' '}
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Club+du+COS-ONE,+route+de+Targa,+Marrakech"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline transition-colors"
                      >
                        {t('terms.information.location').split(':')[1]?.trim()}
                      </a>
                    </>
                  ) : (
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Club+du+COS-ONE,+route+de+Targa,+Marrakech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline transition-colors"
                    >
                      {t('terms.information.location')}
                    </a>
                  )}
                </strong>
              </p>
              <p>{t('terms.information.description')}</p>
              <p>{t('terms.information.schedule')}</p>
              <p>{t('terms.information.holidays')}</p>
            </div>
          </section>

          {/* Registration Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{t('terms.registration.title')}</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>{t('terms.registration.forms')}</p>
              <p>{t('terms.registration.rates')}</p>
              <p>{t('terms.registration.commitment')}</p>
              <p>{t('terms.registration.includes')}</p>
              <p>{t('terms.registration.insurance')}</p>
              <p>{t('terms.registration.payment')}</p>
              <p>{t('terms.registration.familyDiscount')}</p>
            </div>
          </section>

          {/* Absences Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{t('terms.absences.title')}</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>{t('terms.absences.noRefund')}</p>
              <p>{t('terms.absences.medicalAbsence')}</p>
              <p>{t('terms.absences.notice')}</p>
              <p>{t('terms.absences.weather')}</p>
            </div>
          </section>

          {/* Various Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{t('terms.various.title')}</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>{t('terms.various.imageRights')}</p>
              <p>{t('terms.various.equipment')}</p>
            </div>
          </section>

          {/* Remarks Section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">{t('terms.remarks.title')}</h2>
            <p className="text-muted-foreground">{t('terms.remarks.content')}</p>
          </section>
        </div>
      </ContentBlock>
    </>
  )
}
