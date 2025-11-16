'use client'

import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UI } from '@/lib/constants'

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
      className={cn("group relative", UI.BUTTON_SIZES.large, UI.ICON_BUTTON_BASE, "hover:scale-110")}
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
