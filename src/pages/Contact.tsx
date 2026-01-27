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
        {/* About Us Content */}
        <div className="mb-12">
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8 max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto border-2 border-primary/20 shadow-lg overflow-hidden">
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

            <div className="space-y-4">
              <p className="text-foreground">{t('home.professional')}</p>
              <p className="text-muted-foreground">{t('home.facility.description')}</p>
            </div>
          </div>
        </div>

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
    </>
  )
}
