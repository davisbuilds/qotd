'use client'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  isFavorite: boolean
  onClick: () => void
}

export default function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="secondary"
      className="group relative h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className={cn(
          "h-6 w-6 transition-all duration-300",
          isFavorite
            ? 'fill-yellow-400 text-yellow-400 scale-110'
            : 'fill-none group-hover:scale-110'
        )}
      />
    </Button>
  )
}
