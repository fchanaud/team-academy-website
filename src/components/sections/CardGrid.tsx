import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

interface CardGridProps {
  cards: Array<{
    title: string
    description?: string
    content?: ReactNode
  }>
  columns?: 1 | 2 | 3
}

export function CardGrid({ cards, columns = 3 }: CardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {cards.map((card, index) => {
        // Alternate between red, green, and blue for visual harmony
        const colorIndex = index % 3
        const isRed = colorIndex === 0
        const isGreen = colorIndex === 1
        const isBlue = colorIndex === 2
        
        const colorClasses = {
          border: isRed ? 'border-primary/20 hover:border-primary/40' : 
                   isGreen ? 'border-secondary/20 hover:border-secondary/40' : 
                   'border-tertiary/20 hover:border-tertiary/40',
          headerBg: isRed ? 'bg-accent/50' : 
                    isGreen ? 'bg-accent-green/50' : 
                    'bg-accent-blue/50',
          title: isRed ? 'text-primary' : 
                 isGreen ? 'text-secondary' : 
                 'text-tertiary',
          accent: isRed ? 'border-primary/30' : 
                  isGreen ? 'border-secondary/30' : 
                  'border-tertiary/30',
        }
        
        return (
          <Card 
            key={index} 
            className={`fade-in border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${colorClasses.border}`}
          >
            <div className={`h-1 ${isRed ? 'bg-primary' : isGreen ? 'bg-secondary' : 'bg-tertiary'}`}></div>
            <CardHeader className={colorClasses.headerBg}>
              <CardTitle className={colorClasses.title}>
                {card.title}
              </CardTitle>
              {card.description && (
                <CardDescription className="text-sm mt-1">
                  {card.description}
                </CardDescription>
              )}
            </CardHeader>
            {card.content && (
              <CardContent className="space-y-3">
                {card.content}
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
