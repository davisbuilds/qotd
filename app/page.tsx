'use client'

import { useState, useEffect } from 'react'
import { Quote } from '@/types/quote'
import QuoteDisplay from '@/components/QuoteDisplay'
import RefreshButton from '@/components/RefreshButton'
import ThemeToggle from '@/components/ThemeToggle'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const fetchQuote = async () => {
    try {
      setIsTransitioning(true)
      setError(null)

      // Wait for fade-out animation
      await new Promise(resolve => setTimeout(resolve, 300))

      const response = await fetch('/api/quotes/random')
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }

      const data: Quote = await response.json()
      setQuote(data)
      setIsLoading(false)

      // Wait for fade-in animation
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

    // Auto-refresh every minute (60000ms)
    const interval = setInterval(fetchQuote, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen gradient-bg-light dark:gradient-bg-dark flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10">
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

          <CardFooter className="flex justify-center pt-2">
            <RefreshButton onClick={fetchQuote} isLoading={isTransitioning} />
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
