'use client'

import { useState, useEffect } from 'react'
import { Quote } from '@/types/quote'
import QuoteDisplay from '@/components/QuoteDisplay'
import RefreshButton from '@/components/RefreshButton'
import FavoriteButton from '@/components/FavoriteButton'
import FavoritesView from '@/components/FavoritesView'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Sparkles, Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { TIMING } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const { theme } = useTheme()

  const { favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites } = useFavorites()

  // Default to dark mode during hydration to match defaultTheme
  const isDark = theme !== 'light'

  const fetchQuote = async () => {
    try {
      setIsTransitioning(true)
      setError(null)

      // Small delay for transition
      await new Promise(resolve => setTimeout(resolve, 400))

      // Fetch quote
      const response = await fetch('/api/quotes/random')
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }

      const data: Quote = await response.json()
      setQuote(data)
      setIsLoading(false)

      // Small delay before fade-in
      await new Promise(resolve => setTimeout(resolve, 100))
      setIsTransitioning(false)
    } catch (err) {
      console.error('Error fetching quote:', err)
      setError('Failed to load quote. Please try again.')
      setIsLoading(false)
      setIsTransitioning(false)
    }
  }

  useEffect(() => {
    // Initial quote fetch
    fetchQuote()

    // Auto-refresh every minute
    const interval = setInterval(fetchQuote, TIMING.AUTO_REFRESH_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className={cn(
      "min-h-screen flex items-center justify-center p-6 md:p-8 relative overflow-hidden",
      isDark ? 'elegant-bg-dark' : 'elegant-bg-light'
    )}>
      {/* Subtle ambient light effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Theme toggle and favorites - top right */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex gap-2">
        <Button
          onClick={() => setShowFavorites(true)}
          className={cn(
            "group relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-out focus:outline-none elegant-hover",
            isDark
              ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'
          )}
          style={{ boxShadow: isDark ? '0 4px 16px rgba(255,255,255,0.1)' : '0 4px 16px rgba(0,0,0,0.1)' }}
          aria-label="View favorites"
        >
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          )}
        </Button>
        <ThemeToggle />
      </div>

      {/* Main content container */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Header - elegant and minimal */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className={cn(
            "text-3xl md:text-4xl font-bold flex items-center justify-center gap-2 mb-3",
            isDark ? 'text-white/90' : 'text-black/90'
          )}>
            <Sparkles className="h-6 w-6" />
            quote of the day
            <Sparkles className="h-6 w-6" />
          </h1>
          <div className={cn(
            "h-[1px] w-16 mx-auto mb-3",
            isDark
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'
          )} />
          <p className={cn(
            "text-xs tracking-wider",
            isDark ? 'text-white/40' : 'text-black/40'
          )}>
            by Davis & Claude
          </p>
        </div>

        {/* Quote container with refined glass effect */}
        <div className={cn(
          "px-8 py-16 md:px-16 md:py-20 rounded-2xl relative",
          isDark ? 'refined-glass-dark' : 'refined-glass-light'
        )}>
          {/* Content */}
          <div className="min-h-[280px] md:min-h-[320px] flex items-center justify-center">
            {isLoading && !quote ? (
              <div className="text-center">
                <div className={cn(
                  "loading-shimmer text-sm tracking-wider",
                  isDark ? 'text-white/40' : 'text-black/40'
                )}>
                  Gathering wisdom...
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-destructive">{error}</div>
                <Button onClick={fetchQuote} variant="secondary">
                  Try Again
                </Button>
              </div>
            ) : quote ? (
              <QuoteDisplay quote={quote} isTransitioning={isTransitioning} />
            ) : null}
          </div>

          {/* Buttons - bottom center */}
          <div className="flex justify-center gap-4 mt-12">
            <FavoriteButton
              isFavorite={quote ? isFavorite(quote.id) : false}
              onClick={() => quote && toggleFavorite(quote)}
            />
            <RefreshButton onClick={fetchQuote} isLoading={isTransitioning} />
          </div>
        </div>
      </div>

      {showFavorites && (
        <FavoritesView
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          onRemove={removeFavorite}
          onClear={() => {
            if (confirm('Are you sure you want to clear all favorites?')) {
              clearFavorites()
            }
          }}
        />
      )}
    </main>
  )
}
