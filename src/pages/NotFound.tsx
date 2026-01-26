import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getLanguageFromPath, addLanguagePrefix } from '@/lib/utils'
import { Hero } from '@/components/sections/Hero'
import { ContentBlock } from '@/components/sections/ContentBlock'
import { Button } from '@/components/ui/button'

export function NotFound() {
  const location = useLocation()
  const lang = getLanguageFromPath(location.pathname)

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Tennis Academy Marrakech</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Hero
        title="404"
        subtitle="Page Not Found"
        description="The page you're looking for doesn't exist."
      />

      <ContentBlock>
        <div className="text-center">
          <Button asChild>
            <Link to={addLanguagePrefix('/', lang)}>Go Home</Link>
          </Button>
        </div>
      </ContentBlock>
    </>
  )
}
