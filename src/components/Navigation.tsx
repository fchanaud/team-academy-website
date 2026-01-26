import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLanguageFromPath, removeLanguagePrefix, addLanguagePrefix } from '@/lib/utils'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const currentLang = getLanguageFromPath(location.pathname)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en'
    const pathWithoutLang = removeLanguagePrefix(location.pathname)
    const newPath = addLanguagePrefix(pathWithoutLang, newLang)
    window.location.href = newPath
  }

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'programs', path: '/programs' },
    { key: 'registrations', path: '/registrations' },
    { key: 'about', path: '/about' },
    { key: 'terms', path: '/terms' },
    { key: 'gallery', path: '/gallery' },
    { key: 'contact', path: '/contact' },
  ]

  const getLocalizedPath = (path: string) => {
    return addLanguagePrefix(path, currentLang)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-primary/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={getLocalizedPath('/')} className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold text-primary">
              Tennis Academy Marrakech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === getLocalizedPath(link.path) || 
                               (link.path === '/' && location.pathname.endsWith('/en')) ||
                               (link.path === '/' && location.pathname.endsWith('/fr'))
              return (
                <Link
                  key={link.key}
                  to={getLocalizedPath(link.path)}
                  className={`text-sm font-medium transition-colors relative group ${
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
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="ml-4"
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
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={getLocalizedPath(link.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
