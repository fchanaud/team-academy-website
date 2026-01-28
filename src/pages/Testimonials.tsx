import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

export function Testimonials() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/testimonials`

  // Placeholder testimonials - in a real app, these would come from translations or API
  const testimonials = [
    {
      text: 'Excellent coaching and facilities. Patrick is a wonderful instructor.',
      author: 'John D.',
      location: 'UK',
    },
    {
      text: 'Un cadre magnifique et un enseignement de qualité. Je recommande vivement!',
      author: 'Marie L.',
      location: 'France',
    },
    {
      text: 'Great experience for my kids. They loved the Kids Afternoon program.',
      author: 'Sarah M.',
      location: 'USA',
    },
  ]

  return (
    <>
      <Helmet>
        <title>{t('nav.testimonials')} | Tennis Academy Marrakech</title>
        <meta name="description" content="Read testimonials from our students and visitors." />
        <link rel="canonical" href={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/testimonials`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/testimonials`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
      </Helmet>

      <Hero title={t('nav.testimonials')} />

      <ContentBlock>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const colorIndex = index % 3
            const isRed = colorIndex === 0
            const isGreen = colorIndex === 1
            
            const colorClasses = {
              border: isRed ? 'border-primary/20 hover:border-primary/40' : 
                       isGreen ? 'border-secondary/20 hover:border-secondary/40' : 
                       'border-tertiary/20 hover:border-tertiary/40',
              icon: isRed ? 'text-primary' : 
                    isGreen ? 'text-secondary' : 
                    'text-tertiary',
            }
            
            return (
              <Card 
                key={index} 
                className={`fade-in border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${colorClasses.border}`}
              >
                <div className={`h-1 ${isRed ? 'bg-primary' : isGreen ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                <CardContent className="pt-6">
                  <Quote className={`${colorClasses.icon} mb-4`} size={24} />
                  <p className="text-muted-foreground mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="text-sm pt-2 border-t border-border/50">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ContentBlock>
    </>
  )
}
