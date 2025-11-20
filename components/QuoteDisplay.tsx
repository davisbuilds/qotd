'use client'

import { Quote } from '@/types/quote'
import { cn } from '@/lib/utils'

interface QuoteDisplayProps {
  quote: Quote
  isTransitioning: boolean
}

export default function QuoteDisplay({ quote, isTransitioning }: QuoteDisplayProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        isTransitioning ? 'opacity-0 transform translate-y-2 scale-98' : 'opacity-100 transform translate-y-0 scale-100'
      )}
    >
      <blockquote className="text-center space-y-8">
        <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-foreground tracking-tight">
          {quote.quote}
        </p>
        <footer className="text-lg md:text-xl text-muted-foreground font-light tracking-wide pt-2">
          {quote.author}
        </footer>
      </blockquote>
    </div>
  )
}
