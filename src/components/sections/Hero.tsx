import { ChevronDown } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle?: string
  subtitleLink?: string
  description?: string
  image?: string
  imageAlt?: string
}

export function Hero({ title, subtitle, subtitleLink, description, image, imageAlt }: HeroProps) {
  const scrollToNext = () => {
    // Try to find the next section by id first, then fallback to next sibling
    const nextSection = document.getElementById('next-section') || 
      document.querySelector('section:not(:first-of-type)') as HTMLElement
    
    if (nextSection) {
      const offset = 100 // Account for fixed navbar
      const elementPosition = nextSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className={`relative ${image ? 'min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh]' : 'pt-12 pb-8 md:pt-16 md:pb-12'} flex items-center justify-center overflow-hidden`}>
      {image && (
        <>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-[140%] object-cover object-top"
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
          </div>
        </>
      )}
      <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${image ? 'py-12 md:py-16 lg:py-20' : ''}`}>
        <div className="inline-block mb-2">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="h-1 w-12 bg-primary rounded-full"></div>
            <div className="h-1 w-12 bg-secondary rounded-full"></div>
            <div className="h-1 w-12 bg-tertiary rounded-full"></div>
          </div>
        </div>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 md:mb-4 fade-in ${image ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]' : 'text-primary'}`}>
          {title}
        </h1>
        {subtitle && (
          <h2 className={`text-xl md:text-2xl font-heading mb-4 md:mb-5 fade-in ${image ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]' : 'text-foreground'}`}>
            {subtitleLink ? (
              <a
                href={subtitleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                {subtitle}
              </a>
            ) : (
              subtitle
            )}
          </h2>
        )}
        {description && (
          <p className={`text-lg max-w-2xl mx-auto fade-in ${image ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-muted-foreground'}`}>
            {description}
          </p>
        )}
      </div>
      {image && (
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20 flex justify-center">
          <button
            onClick={scrollToNext}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 animate-bounce"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          </button>
        </div>
      )}
    </section>
  )
}
