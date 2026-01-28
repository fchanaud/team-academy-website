import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function FAQ() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/faq`

  // Placeholder FAQs - in a real app, these would come from translations
  const faqs = [
    {
      question: 'What are your opening hours?',
      answer: 'We are open daily. Please contact us for specific hours.',
    },
    {
      question: 'Do you offer lessons for beginners?',
      answer: 'Yes, we welcome players of all levels, from beginners to advanced.',
    },
    {
      question: 'Can I rent a court?',
      answer: 'Yes, court rental is available. Please contact us to book.',
    },
    {
      question: 'Do you provide equipment?',
      answer: 'Rackets can be rented, and we offer stringing services.',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <Helmet>
        <title>{t('nav.faq')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Frequently asked questions about Tennis Academy Marrakech." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/faq`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/faq`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <Hero title={t('nav.faq')} />

      <ContentBlock>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const colorIndex = index % 3
            const isRed = colorIndex === 0
            const isGreen = colorIndex === 1
            
            const colorClasses = {
              border: isRed ? 'hover:border-primary/30' : 
                       isGreen ? 'hover:border-secondary/30' : 
                       'hover:border-tertiary/30',
              hover: isRed ? 'hover:bg-accent/50' : 
                      isGreen ? 'hover:bg-accent-green/50' : 
                      'hover:bg-accent-blue/50',
              icon: isRed ? 'text-primary' : 
                    isGreen ? 'text-secondary' : 
                    'text-tertiary',
              content: isRed ? 'bg-accent/30' : 
                       isGreen ? 'bg-accent-green/30' : 
                       'bg-accent-blue/30',
            }
            
            return (
              <Card 
                key={index} 
                className={`border-2 border-transparent transition-all ${colorClasses.border}`}
              >
                <div className={`h-0.5 ${isRed ? 'bg-primary' : isGreen ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                <CardHeader
                  className={`cursor-pointer transition-colors ${colorClasses.hover}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-foreground">{faq.question}</CardTitle>
                    <ChevronDown
                      className={`transition-transform ${colorClasses.icon} ${openIndex === index ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </div>
                </CardHeader>
                {openIndex === index && (
                  <CardContent className={colorClasses.content}>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </ContentBlock>
    </>
  )
}
