'use client'

import { useState, useEffect } from 'react'
import { Quote } from '@/types/quote'
import QuoteDisplay from '@/components/QuoteDisplay'
import RefreshButton from '@/components/RefreshButton'
import FavoriteButton from '@/components/FavoriteButton'
import FavoritesView from '@/components/FavoritesView'
import ThemeToggle from '@/components/ThemeToggle'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { TIMING, UI } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  const { favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites } = useFavorites()

  const fetchQuote = async () => {
    try {
      setIsTransitioning(true)
      setError(null)

      // Fetch quote (network request happens in parallel with CSS fade-out)
      const response = await fetch('/api/quotes/random')
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }

      const data: Quote = await response.json()
      setQuote(data)
      setIsLoading(false)

      // Use requestAnimationFrame to ensure DOM update completes before fade-in
      requestAnimationFrame(() => {
        setIsTransitioning(false)
      })
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
    <main className="min-h-screen gradient-bg-light dark:gradient-bg-dark flex items-center justify-center p-4">
      <div className="absolute top-6 right-6 z-10 flex gap-3">
        <Button
          onClick={() => setShowFavorites(true)}
          size="icon"
          variant="secondary"
          className={cn(
            "relative transition-all duration-200",
            UI.BUTTON_SIZES.medium,
            UI.ICON_BUTTON_BASE,
            "hover:scale-105 active:scale-95",
            "shadow-sm hover:shadow-md"
          )}
          aria-label="View favorites"
        >
          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
          {favorites.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-6 w-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold shadow-md animate-in zoom-in duration-200">
              {favorites.length}
            </span>
          )}
        </Button>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-3xl px-4">
        <Card className="glass-card border-0 shadow-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-12">
            <CardTitle className="text-4xl md:text-5xl font-bold tracking-tight">
              Quote of the Day
            </CardTitle>
            <CardDescription className="text-base mt-3 opacity-60">
              Curated with care
            </CardDescription>
          </CardHeader>

          <CardContent className="min-h-[280px] flex items-center justify-center px-8 md:px-16 pb-4">
            {isLoading && !quote ? (
              <div className="text-center py-16">
                <div className="elegant-pulse text-muted-foreground text-lg font-light tracking-wide">
                  Loading...
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16 space-y-6">
                <div className="text-destructive text-lg">{error}</div>
                <Button onClick={fetchQuote} variant="secondary" className="px-8 py-6 text-base">
                  Try Again
                </Button>
              </div>
            ) : quote ? (
              <QuoteDisplay quote={quote} isTransitioning={isTransitioning} />
            ) : null}
          </CardContent>

          <CardFooter className="flex justify-center gap-6 pt-4 pb-10">
            <FavoriteButton
              isFavorite={quote ? isFavorite(quote.id) : false}
              onClick={() => quote && toggleFavorite(quote)}
            />
            <RefreshButton onClick={fetchQuote} isLoading={isTransitioning} />
          </CardFooter>
        </Card>
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
