import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath, addLanguagePrefix } from '@/lib/utils'
import { Facebook, Instagram, ExternalLink } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  const currentLang = getLanguageFromPath(location.pathname)

  const getLocalizedPath = (path: string) => {
    return addLanguagePrefix(path, currentLang)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white mt-10 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              Tennis Academy Marrakech
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              {t('home.tagline')}
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Club+du+COS-ONE,+route+de+Targa,+Marrakech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 hover:text-primary transition-colors inline-block"
            >
              COS-ONE Club, route de Targa<br />
              Marrakech, Morocco
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={getLocalizedPath('/programs')}
                  className="text-sm text-slate-300 hover:text-primary transition-colors"
                >
                  {t('nav.programs')}
                </Link>
              </li>
              <li>
                <Link
                  to={getLocalizedPath('/gallery')}
                  className="text-sm text-slate-300 hover:text-primary transition-colors"
                >
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link
                  to={getLocalizedPath('/contact')}
                  className="text-sm text-slate-300 hover:text-primary transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Partners */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              {t('footer.followUs')}
            </h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.facebook.com/TennisAcademyMarrakech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/tennisacademymarrakech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-tertiary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.tripadvisor.fr/Attraction_Review-g293734-d7721316-Reviews-Tennis_Academy_Marrakech-Marrakech_Marrakech_Tensift_El_Haouz_Region.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-secondary transition-colors flex items-center space-x-1"
                aria-label="TripAdvisor"
              >
                <span className="text-sm">TripAdvisor</span>
                <ExternalLink size={16} />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">{t('footer.partners')}</h4>
              <a
                href="http://www.kidakech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 hover:text-primary transition-colors flex items-center space-x-1"
              >
                <span>Kidakech</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} Tennis Academy Marrakech. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}
