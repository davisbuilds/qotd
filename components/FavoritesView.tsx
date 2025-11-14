'use client'

import { Quote } from '@/types/quote'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Star, Trash2, Heart } from 'lucide-react'

interface FavoritesViewProps {
  favorites: Quote[]
  onClose: () => void
  onRemove: (quoteId: number) => void
  onClear: () => void
}

export default function FavoritesView({ favorites, onClose, onRemove, onClear }: FavoritesViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="glass-card border-0 shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 fill-red-500 text-red-500" />
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Favorite Quotes
              </CardTitle>
            </div>
            <Button
              onClick={onClose}
              size="icon"
              variant="secondary"
              className="rounded-full h-10 w-10"
              aria-label="Close favorites"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription>
            {favorites.length === 0
              ? 'No favorites yet. Star a quote to save it here!'
              : `${favorites.length} favorite ${favorites.length === 1 ? 'quote' : 'quotes'}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-y-auto flex-1 p-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Star className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-center">Start favoriting quotes to build your collection!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((quote) => (
                <div
                  key={quote.id}
                  className="p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <blockquote className="text-base md:text-lg mb-2">
                        "{quote.quote}"
                      </blockquote>
                      <p className="text-sm text-muted-foreground">— {quote.author}</p>
                    </div>
                    <Button
                      onClick={() => onRemove(quote.id)}
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex-shrink-0"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        {favorites.length > 0 && (
          <div className="border-t border-border/50 p-4">
            <Button
              onClick={onClear}
              variant="outline"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Favorites
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
