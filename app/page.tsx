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
import { Sparkles, Heart } from 'lucide-react'
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
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          onClick={() => setShowFavorites(true)}
          size="icon"
          variant="secondary"
          className={cn("relative", UI.BUTTON_SIZES.small, UI.ICON_BUTTON_BASE)}
          aria-label="View favorites"
        >
          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          )}
        </Button>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl">
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6" />
              quote of the day
              <Sparkles className="h-6 w-6" />
            </CardTitle>
            <CardDescription className="text-base">
              by Davis & Claude
            </CardDescription>
          </CardHeader>

          <CardContent className="min-h-[200px] flex items-center justify-center">
            {isLoading && !quote ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
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
          </CardContent>

          <CardFooter className="flex justify-center gap-4 pt-2">
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
