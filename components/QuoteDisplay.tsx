'use client'

import { Quote } from '@/types/quote'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface QuoteDisplayProps {
  quote: Quote
  isTransitioning: boolean
}

export default function QuoteDisplay({ quote, isTransitioning }: QuoteDisplayProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out relative",
        isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
      )}
    >
      {/* Decorative quotation marks */}
      <span className={cn("quote-mark quote-mark-open", isDark ? 'text-white' : 'text-black')} aria-hidden="true">"</span>
      <span className={cn("quote-mark quote-mark-close", isDark ? 'text-white' : 'text-black')} aria-hidden="true">"</span>

      <blockquote className="text-center space-y-8 md:space-y-10 relative z-10">
        {/* The quote text - hero element */}
        <p className={cn(
          "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-relaxed tracking-tight px-4 md:px-8 max-w-4xl mx-auto",
          isDark ? 'text-white/90' : 'text-black/90'
        )}>
          {quote.quote}
        </p>

        {/* Visual separator */}
        <div className="flex justify-center">
          <div className={cn(
            "h-[1px] w-12",
            isDark
              ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-black/30 to-transparent'
          )} />
        </div>

        {/* Author attribution */}
        <footer className="flex flex-col items-center space-y-2">
          <cite className={cn(
            "not-italic text-sm md:text-base lg:text-lg font-light tracking-wide",
            isDark ? 'text-white/70' : 'text-black/70'
          )}>
            {quote.author}
          </cite>
        </footer>
      </blockquote>
    </div>
  )
}
