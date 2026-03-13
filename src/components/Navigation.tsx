import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLanguageFromPath, removeLanguagePrefix, addLanguagePrefix } from '@/lib/utils'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
// Import logo
import logoImage from '../public/images/home/logo.png'

export function Navigation() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const currentLang = getLanguageFromPath(location.pathname)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en'
    const pathWithoutLang = removeLanguagePrefix(location.pathname)
    const newPath = addLanguagePrefix(pathWithoutLang, newLang)
    navigate(newPath)
  }

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'programs', path: '/programs' },
    { key: 'about', path: '/about' },
    { key: 'terms', path: '/terms' },
    { key: 'gallery', path: '/gallery' },
    { key: 'contact', path: '/contact' },
  ]

  const whatsappNumber = '+212 653 890 162'
  const whatsappNumberRaw = '212653890162'
  const whatsappLink = `https://wa.me/${whatsappNumberRaw}`

  const getLocalizedPath = (path: string) => {
    return addLanguagePrefix(path, currentLang)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    // Close menu when route changes
    const handleRouteChange = () => {
      setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('popstate', handleRouteChange)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [mobileMenuOpen])

  // Close menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-primary/20 shadow-sm">
      <div className="max-w-[95%] lg:max-w-[1200px] xl:max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
          <Link 
            to={getLocalizedPath('/')} 
            onClick={(e) => {
              // If already on home page, scroll to top; otherwise navigate normally
              const homePath = getLocalizedPath('/')
              if (location.pathname === homePath || 
                  location.pathname.endsWith('/en') ||
                  location.pathname.endsWith('/fr')) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center flex-shrink-0 mr-4 hover:opacity-80 transition-opacity"
          >
            <img
              src={logoImage}
              alt="Tennis Academy Marrakech"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5 flex-1 justify-end">
            {navLinks.map((link) => {
              let isActive = false
              if (link.key === 'home') {
                isActive = location.pathname === getLocalizedPath('/') || 
                          location.pathname.endsWith('/en') ||
                          location.pathname.endsWith('/fr')
              } else if (link.key === 'programs') {
                // Highlight if on /programs or any /programs/* subpage
                isActive = location.pathname.includes('/programs')
              } else {
                isActive = location.pathname === getLocalizedPath(link.path)
              }
              return (
                <Link
                  key={link.key}
                  to={getLocalizedPath(link.path)}
                  className={`text-xs lg:text-sm font-medium transition-colors relative group whitespace-nowrap px-1 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {t(`nav.${link.key}`)}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></span>
                  )}
                </Link>
              )
            })}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap flex-shrink-0"
            >
              WhatsApp: {whatsappNumber}
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="ml-2 flex-shrink-0 min-w-[44px]"
            >
              {currentLang === 'en' ? 'FR' : 'EN'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
            >
              {currentLang === 'en' ? 'FR' : 'EN'}
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                let isActive = false
                if (link.key === 'home') {
                  isActive = location.pathname === getLocalizedPath('/') || 
                            location.pathname.endsWith('/en') ||
                            location.pathname.endsWith('/fr')
                } else if (link.key === 'programs') {
                  // Highlight if on /programs or any /programs/* subpage
                  isActive = location.pathname.includes('/programs')
                } else {
                  isActive = location.pathname === getLocalizedPath(link.path)
                }
                return (
                  <Link
                    key={link.key}
                    to={getLocalizedPath(link.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors py-2 ${
                      isActive 
                        ? 'text-primary font-semibold' 
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                )
              })}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md mt-2"
              >
                WhatsApp: {whatsappNumber}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
