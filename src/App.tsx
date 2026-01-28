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
import { BabyTennis } from './pages/BabyTennis'
import { MiniTennis } from './pages/MiniTennis'
import { KidsAfternoon } from './pages/KidsAfternoon'
import { IndividualLessons } from './pages/IndividualLessons'
import { PlayAtClub } from './pages/PlayAtClub'
import { Camps } from './pages/Camps'
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
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang).catch((err) => {
        console.error('Error changing language:', err)
      })
    }
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
      <Route path="/en/programs/baby-tennis" element={<BabyTennis />} />
      <Route path="/en/programs/mini-tennis" element={<MiniTennis />} />
      <Route path="/en/programs/kids-afternoon" element={<KidsAfternoon />} />
      <Route path="/en/programs/individual-lessons" element={<IndividualLessons />} />
      <Route path="/en/programs/play-at-club" element={<PlayAtClub />} />
      <Route path="/en/programs/camps" element={<Camps />} />
      <Route path="/en/terms" element={<Terms />} />
      <Route path="/en/gallery" element={<Gallery />} />
      <Route path="/en/contact" element={<Contact />} />

      {/* French routes */}
      <Route path="/fr" element={<Home />} />
      <Route path="/fr/programs" element={<Programs />} />
      <Route path="/fr/programs/baby-tennis" element={<BabyTennis />} />
      <Route path="/fr/programs/mini-tennis" element={<MiniTennis />} />
      <Route path="/fr/programs/kids-afternoon" element={<KidsAfternoon />} />
      <Route path="/fr/programs/individual-lessons" element={<IndividualLessons />} />
      <Route path="/fr/programs/play-at-club" element={<PlayAtClub />} />
      <Route path="/fr/programs/camps" element={<Camps />} />
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
            <main className="flex-1 pt-20 sm:pt-24 md:pt-28">
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
