import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContentBlockProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'muted'
  id?: string
  reduceBottomPadding?: boolean
}

export function ContentBlock({ children, className, variant = 'default', id, reduceBottomPadding = false }: ContentBlockProps) {
  return (
    <section
      id={id}
      className={cn(
        'pt-6 md:pt-8 lg:pt-10',
        reduceBottomPadding ? 'pb-4' : 'pb-6 md:pb-8 lg:pb-10',
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
