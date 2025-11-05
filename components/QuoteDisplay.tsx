'use client'

import { Quote } from '@/types/quote'

interface QuoteDisplayProps {
  quote: Quote
  isTransitioning: boolean
}

export default function QuoteDisplay({ quote, isTransitioning }: QuoteDisplayProps) {
  return (
    <div
      className={`transition-all duration-500 ${
        isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
      }`}
    >
      {/* Quote Text */}
      <blockquote className="text-center mb-6">
        <p className="text-xl md:text-2xl lg:text-3xl font-serif text-white leading-relaxed mb-6 px-4">
          "{quote.quote}"
        </p>
        <footer className="text-base md:text-lg text-white/80 italic">
          — {quote.author}
        </footer>
      </blockquote>
    </div>
  )
}
