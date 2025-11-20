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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <Card className="glass-card border-0 shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <CardHeader className="border-b border-border/30 pb-6 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="h-7 w-7 fill-rose-500 text-rose-500" />
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                Favorites
              </CardTitle>
            </div>
            <Button
              onClick={onClose}
              size="icon"
              variant="secondary"
              className="rounded-full h-11 w-11 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Close favorites"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription className="text-base mt-2 opacity-70">
            {favorites.length === 0
              ? 'No favorites yet — star a quote to save it here'
              : `${favorites.length} ${favorites.length === 1 ? 'quote' : 'quotes'} saved`}
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-y-auto flex-1 p-8">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Star className="h-20 w-20 mb-6 opacity-10" />
              <p className="text-center text-lg font-light">Start favoriting quotes to build your collection</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((quote) => (
                <div
                  key={quote.id}
                  className="p-6 rounded-xl bg-background/40 border border-border/30 hover:bg-background/60 hover:border-border/50 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <blockquote className="text-lg md:text-xl mb-3 leading-relaxed">
                        {quote.quote}
                      </blockquote>
                      <p className="text-base text-muted-foreground font-light tracking-wide">{quote.author}</p>
                    </div>
                    <Button
                      onClick={() => onRemove(quote.id)}
                      size="icon"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 h-9 w-9 flex-shrink-0 hover:bg-destructive/10"
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
          <div className="border-t border-border/30 p-6">
            <Button
              onClick={onClear}
              variant="outline"
              className="w-full py-6 text-base hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
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
