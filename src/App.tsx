import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLanguageFromPath } from './lib/utils'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { CampBanner } from './components/CampBanner'
import { WhatsAppWidget } from './components/WhatsAppWidget'
import { useScrollToTop } from './hooks/useScrollToTop'
import { Home } from './pages/Home'
import { Programs } from './pages/Programs'
import { Registrations } from './pages/Registrations'
import { About } from './pages/About'
import { Terms } from './pages/Terms'
import { Gallery } from './pages/Gallery'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import './i18n'

const queryClient = new QueryClient()

function LanguageRouter() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = getLanguageFromPath(location.pathname)
    i18n.changeLanguage(lang)
  }, [location.pathname, i18n])

  return null
}

function AppRoutes() {
  useScrollToTop()

  return (
    <Routes>
      {/* Redirect root to /en */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* English routes */}
      <Route path="/en" element={<Home />} />
      <Route path="/en/programs" element={<Programs />} />
      <Route path="/en/registrations" element={<Registrations />} />
      <Route path="/en/about" element={<About />} />
      <Route path="/en/terms" element={<Terms />} />
      <Route path="/en/gallery" element={<Gallery />} />
      <Route path="/en/contact" element={<Contact />} />

      {/* French routes */}
      <Route path="/fr" element={<Home />} />
      <Route path="/fr/programs" element={<Programs />} />
      <Route path="/fr/registrations" element={<Registrations />} />
      <Route path="/fr/about" element={<About />} />
      <Route path="/fr/terms" element={<Terms />} />
      <Route path="/fr/gallery" element={<Gallery />} />
      <Route path="/fr/contact" element={<Contact />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <LanguageRouter />
          <div className="min-h-screen flex flex-col">
            <CampBanner />
            <Navigation />
            <main className="flex-1 pt-16">
              <AppRoutes />
            </main>
            <Footer />
            <WhatsAppWidget />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
