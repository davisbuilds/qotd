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
        "transition-all duration-500",
        isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
      )}
    >
      <blockquote className="text-center space-y-6">
        <p className="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed text-foreground">
          {quote.quote}
        </p>
        <footer className="text-base md:text-lg text-muted-foreground">
          {quote.author}
        </footer>
      </blockquote>
    </div>
  )
}
