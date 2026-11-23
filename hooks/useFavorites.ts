'use client'

import { useState, useEffect } from 'react'
import { Quote } from '@/types/quote'
import { STORAGE_KEYS } from '@/lib/constants'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Quote[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // WHY: deferring the localStorage read to a macrotask keeps the setState calls
  // out of the synchronous effect body while still reading post-mount, which
  // avoids an SSR hydration mismatch.
  useEffect(() => {
    const load = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
        if (stored) {
          const parsed = JSON.parse(stored)
          setFavorites(parsed)
        }
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(load)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites:', error)
      }
    }
  }, [favorites, isLoaded])

  const isFavorite = (quoteId: number): boolean => {
    return favorites.some(fav => fav.id === quoteId)
  }

  const addFavorite = (quote: Quote) => {
    if (!isFavorite(quote.id)) {
      setFavorites(prev => [...prev, quote])
    }
  }

  const removeFavorite = (quoteId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== quoteId))
  }

  const toggleFavorite = (quote: Quote) => {
    if (isFavorite(quote.id)) {
      removeFavorite(quote.id)
    } else {
      addFavorite(quote)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    isLoaded,
  }
}
