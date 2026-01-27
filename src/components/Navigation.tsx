import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLanguageFromPath, removeLanguagePrefix, addLanguagePrefix } from '@/lib/utils'
import { Button } from './ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
// Import logo
import logoImage from '../public/images/home/logo.png'

export function Navigation() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const currentLang = getLanguageFromPath(location.pathname)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en'
    const pathWithoutLang = removeLanguagePrefix(location.pathname)
    const newPath = addLanguagePrefix(pathWithoutLang, newLang)
    navigate(newPath)
  }

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'terms', path: '/terms' },
    { key: 'gallery', path: '/gallery' },
    { key: 'contact', path: '/contact' },
  ]

  const whatsappNumber = '+212 653 890 162'
  const whatsappNumberRaw = '212653890162'
  const whatsappLink = `https://wa.me/${whatsappNumberRaw}`

  const programSubmenuItems = [
    { key: 'babyTennis', path: '/programs/baby-tennis' },
    { key: 'miniTennis', path: '/programs/mini-tennis' },
    { key: 'kidsAfternoon', path: '/programs/kids-afternoon' },
    { key: 'individualLessons', path: '/programs/individual-lessons' },
    { key: 'playAtClub', path: '/programs/play-at-club' },
    { key: 'camps', path: '/programs/camps' },
  ]

  const getLocalizedPath = (path: string) => {
    return addLanguagePrefix(path, currentLang)
  }

  const isProgramsActive = location.pathname.includes('/programs')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-primary/20 shadow-sm">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
          <Link to={getLocalizedPath('/')} className="flex items-center flex-shrink-0 mr-4 hover:opacity-80 transition-opacity">
            <img
              src={logoImage}
              alt="Tennis Academy Marrakech"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-5 xl:space-x-6 flex-1 justify-end">
            <Link
              to={getLocalizedPath('/')}
              className={`text-xs lg:text-sm font-medium transition-colors relative group whitespace-nowrap ${
                location.pathname === getLocalizedPath('/') || 
                location.pathname.endsWith('/en') ||
                location.pathname.endsWith('/fr')
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {t('nav.home')}
              {(location.pathname === getLocalizedPath('/') || 
                location.pathname.endsWith('/en') ||
                location.pathname.endsWith('/fr')) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </Link>

            {/* Programs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`text-xs lg:text-sm font-medium transition-colors relative group flex items-center gap-1 whitespace-nowrap ${
                    isProgramsActive 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {t('nav.programs')}
                  <ChevronDown size={14} className="mt-0.5" />
                  {isProgramsActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {programSubmenuItems.map((item) => (
                  <DropdownMenuItem key={item.key} asChild>
                    <Link
                      to={getLocalizedPath(item.path)}
                      className="cursor-pointer"
                    >
                      {t(`nav.programsSubmenu.${item.key}`)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => {
              const isActive = location.pathname === getLocalizedPath(link.path)
              return (
                <Link
                  key={link.key}
                  to={getLocalizedPath(link.path)}
                  className={`text-xs lg:text-sm font-medium transition-colors relative group whitespace-nowrap ${
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
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              WhatsApp: {whatsappNumber}
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="ml-2 flex-shrink-0"
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
              <Link
                to={getLocalizedPath('/')}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.home')}
              </Link>
              
              <div className="flex flex-col space-y-2 pl-4 border-l-2 border-border">
                <div className="text-sm font-semibold text-primary py-1">
                  {t('nav.programs')}
                </div>
                {programSubmenuItems.map((item) => (
                  <Link
                    key={item.key}
                    to={getLocalizedPath(item.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-1 pl-4"
                  >
                    {t(`nav.programsSubmenu.${item.key}`)}
                  </Link>
                ))}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.key}
                  to={getLocalizedPath(link.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
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
