'use client'

import { useState, useEffect } from 'react'
import { Quote } from '@/types/quote'
import QuoteDisplay from '@/components/QuoteDisplay'
import RefreshButton from '@/components/RefreshButton'
import ThemeToggle from '@/components/ThemeToggle'

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

    // Auto-refresh every 5 minutes (300000ms)
    const interval = setInterval(fetchQuote, 300000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen gradient-bg-light dark:gradient-bg-dark flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-2xl">
        <div className="glass rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ✨ quote of the day ✨
            </h1>
            <p className="text-sm md:text-base text-white/70">
              by Davis & Claude
            </p>
          </div>

          {/* Quote Display */}
          {isLoading && !quote ? (
            <div className="text-center py-12">
              <div className="animate-pulse text-white/80">Loading...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400">{error}</div>
              <button
                onClick={fetchQuote}
                className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : quote ? (
            <QuoteDisplay quote={quote} isTransitioning={isTransitioning} />
          ) : null}

          {/* Refresh Button */}
          <div className="mt-8 flex justify-center">
            <RefreshButton onClick={fetchQuote} isLoading={isTransitioning} />
          </div>
        </div>
      </div>
    </main>
  )
}
