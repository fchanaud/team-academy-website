import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContentBlockProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'muted'
}

export function ContentBlock({ children, className, variant = 'default' }: ContentBlockProps) {
  return (
    <section
      className={cn(
        'py-12 md:py-16 lg:py-20',
        variant === 'muted' && 'bg-muted/50',
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
