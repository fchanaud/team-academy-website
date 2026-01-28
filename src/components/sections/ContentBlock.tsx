import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContentBlockProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'muted'
  id?: string
}

export function ContentBlock({ children, className, variant = 'default', id }: ContentBlockProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-6 md:py-8 lg:py-10',
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
