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
import { useState, useMemo, useRef, useEffect } from 'react'
import useWeb3Forms from '@web3forms/react'
import { FormModal } from '@/components/FormModal'
import patrickImage from '../public/images/home/patrick.jpg'

export function Contact() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)
  const canonicalUrl = `https://www.tennisacademymarrakech.com/${lang === 'fr' ? 'fr' : 'en'}/contact`
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formCardRef = useRef<HTMLDivElement>(null)
  const contactCardRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapHeight, setMapHeight] = useState<number | null>(null)

  // Create schema with translated error messages
  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t('contact.form.validation.nameMin')),
        email: z
          .string()
          .min(1, t('contact.form.validation.emailInvalid'))
          .email(t('contact.form.validation.emailInvalid')),
        whatsapp: z
          .string()
          .optional()
          .refine(
            (val) => {
              if (!val || val.trim() === '') return true
              // Remove spaces, dashes, parentheses for validation
              const cleaned = val.replace(/[\s\-\(\)]/g, '')
              // Check if it starts with + and has digits, or just digits
              return /^\+?[1-9]\d{8,14}$/.test(cleaned)
            },
            t('contact.form.validation.whatsappInvalid')
          ),
        message: z.string().min(10, t('contact.form.validation.messageMin')),
        botcheck: z.boolean().optional(),
      }),
    [t, lang]
  )

  type ContactFormData = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  // Web3Forms Access Key
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '8bea463e-5b26-4109-a0b5-3c565acd5a03'

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: 'Tennis Academy Marrakech Contact Form',
      subject: 'New Contact Message from Tennis Academy Marrakech Website',
    },
    onSuccess: () => {
      setSubmitStatus('success')
      reset()
    },
    onError: () => {
      setSubmitStatus('error')
    },
  })

  const handleCloseModal = () => {
    setSubmitStatus('idle')
  }

  // Match left column (contact card + map) height to form card height
  useEffect(() => {
    const updateMapHeight = () => {
      if (formCardRef.current && contactCardRef.current && mapContainerRef.current && leftColumnRef.current) {
        const formHeight = formCardRef.current.offsetHeight
        const contactCardHeight = contactCardRef.current.offsetHeight
        // Gap between contact card and map is space-y-6 (1.5rem = 24px)
        const gap = 24
        // Calculate map height: form height - contact card height - gap
        // Ensure map doesn't exceed form height, but allow contact card to be fully visible
        const calculatedMapHeight = Math.max(300, formHeight - contactCardHeight - gap)
        // Only update if we have valid measurements
        if (formHeight > 0 && contactCardHeight > 0) {
          setMapHeight(calculatedMapHeight)
        }
      }
    }

    // Initial measurement with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateMapHeight, 100)

    // Update on window resize
    window.addEventListener('resize', updateMapHeight)
    
    // Use ResizeObserver for more accurate tracking
    let formResizeObserver: ResizeObserver | null = null
    let contactResizeObserver: ResizeObserver | null = null
    
    if (formCardRef.current && window.ResizeObserver) {
      formResizeObserver = new ResizeObserver(updateMapHeight)
      formResizeObserver.observe(formCardRef.current)
    }
    
    if (contactCardRef.current && window.ResizeObserver) {
      contactResizeObserver = new ResizeObserver(updateMapHeight)
      contactResizeObserver.observe(contactCardRef.current)
    }

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateMapHeight)
      if (formResizeObserver) {
        formResizeObserver.disconnect()
      }
      if (contactResizeObserver) {
        contactResizeObserver.disconnect()
      }
    }
  }, [])

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
        {lang === 'fr' && <link rel="alternate" hrefLang="en" href={`https://www.tennisacademymarrakech.com/en/contact`} />}
        {lang === 'en' && <link rel="alternate" hrefLang="fr" href={`https://www.tennisacademymarrakech.com/fr/contact`} />}
        <link rel="alternate" hrefLang={lang} href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero title={t('contact.title')} />

      <ContentBlock reduceBottomPadding>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-end">
            <div ref={leftColumnRef} className="space-y-6 order-2 md:order-1 flex flex-col">
              <Card ref={contactCardRef} className="border-2 border-secondary/20">
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
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Club+du+COS-ONE,+route+de+Targa,+Marrakech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-secondary hover:underline transition-colors"
                    >
                      {t('contact.location')}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Map */}
            <div className="w-full">
              <div 
                ref={mapContainerRef} 
                className="relative w-full rounded-lg overflow-hidden shadow-lg border border-border" 
                style={mapHeight ? { height: `${mapHeight}px`, maxHeight: `${mapHeight}px` } : { minHeight: '400px', aspectRatio: '4/3' }}
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

            <div className="flex flex-col order-1 md:order-2">
            <Card ref={formCardRef} className="border-2 border-primary/20 flex flex-col">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-primary">{t('contact.form.send')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1 flex flex-col">
                {/* Hidden botcheck field for spam protection */}
                <input
                  type="checkbox"
                  id="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  {...register('botcheck', { value: false })}
                />
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
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
                    {t('contact.form.whatsapp')} <span className="text-muted-foreground font-normal">({t('contact.form.optional')})</span>
                  </label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder={t('contact.form.whatsappPlaceholder')}
                    {...register('whatsapp')}
                    className={errors.whatsapp ? 'border-destructive' : ''}
                  />
                  {errors.whatsapp && (
                    <p className="text-sm text-destructive mt-1">{errors.whatsapp.message}</p>
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

                <div className="mt-auto">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
            </div>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock variant="muted" className="py-4 md:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl lg:text-2xl mb-3 mt-3 md:mb-4 text-foreground font-semibold text-center">{t('home.professional')}</p>
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

      {/* Success Modal */}
      <FormModal
        isOpen={submitStatus === 'success'}
        onClose={handleCloseModal}
        type="success"
        title={t('contact.form.modal.success.title')}
        message={t('contact.form.modal.success.message')}
        closeText={t('contact.form.modal.success.close')}
      />

      {/* Error Modal */}
      <FormModal
        isOpen={submitStatus === 'error'}
        onClose={handleCloseModal}
        type="error"
        title={t('contact.form.modal.error.title')}
        message={t('contact.form.modal.error.message')}
        closeText={t('contact.form.modal.error.close')}
      />
    </>
  )
}
