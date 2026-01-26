import { useTranslation } from 'react-i18next'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  image?: string
  imageAlt?: string
}

export function Hero({ title, subtitle, description, image, imageAlt }: HeroProps) {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-20">
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary rounded-full"></div>
            <div className="h-1 w-12 bg-secondary rounded-full"></div>
            <div className="h-1 w-12 bg-tertiary rounded-full"></div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-4 fade-in">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-xl md:text-2xl font-heading text-foreground mb-6 fade-in">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
