import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { getLanguageFromPath } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import patrickImage from '../public/images/home/patrick.jpg'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/contact`
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('idle')
      
      // Using Formspree - free email service
      // 1. Go to https://formspree.io and sign up (free)
      // 2. Create a new form with email: franklin.dechanaud@gmail.com
      // 3. Copy your form endpoint (looks like: https://formspree.io/f/xxxxxxxxxx)
      // 4. Replace 'YOUR_FORMSPREE_ENDPOINT' below with your endpoint
      
      const FORMSPREE_ENDPOINT = 'YOUR_FORMSPREE_ENDPOINT' // e.g., 'https://formspree.io/f/xxxxxxxxxx'
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
      
      // Fallback: Use mailto link if API fails
      const mailtoLink = `mailto:franklin.dechanaud@gmail.com?subject=Contact from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(`From: ${data.email}\n\nMessage:\n${data.message}`)}`
      window.location.href = mailtoLink
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('contact.title'),
    description: t('meta.contact.description'),
  }

  return (
    <>
      <Helmet>
        <title>{t('meta.contact.title')}</title>
        <meta name="description" content={t('meta.contact.description')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={t('meta.contact.title')} />
        <meta property="og:description" content={t('meta.contact.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        {lang === 'fr' && <link rel="alternate" hreflang="en" href={`https://www.tennisacademymarrakech.com/en/contact`} />}
        {lang === 'en' && <link rel="alternate" hreflang="fr" href={`https://www.tennisacademymarrakech.com/fr/contact`} />}
        <link rel="alternate" hreflang={lang} href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero title={t('contact.title')} />

      <ContentBlock>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-2 border-secondary/20">
              <CardHeader className="bg-accent-green/30">
                <CardTitle className="text-secondary">{t('contact.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="mt-1 text-secondary" size={20} />
                  <div>
                    <p className="font-medium">{t('contact.phone')}</p>
                    <a
                      href="tel:00212653890162"
                      className="text-secondary hover:underline font-medium"
                    >
                      +212 653 890 162
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="mt-1 text-secondary" size={20} />
                  <div>
                    <p className="font-medium">{t('contact.address')}</p>
                    <p className="text-muted-foreground">{t('contact.location')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Map */}
            <div className="w-full">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-border">
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

          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-primary">{t('contact.form.send')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
                    {t('contact.form.success')}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
                    {t('contact.form.error')}
                  </div>
                )}
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </ContentBlock>

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
    </>
  )
}
