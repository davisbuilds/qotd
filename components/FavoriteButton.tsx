'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface FavoriteButtonProps {
  isFavorite: boolean
  onClick: () => void
}

export default function FavoriteButton({ isFavorite, onClick }: FavoriteButtonProps) {
  const { theme } = useTheme()
  // Default to dark mode during hydration to match defaultTheme
  const isDark = theme !== 'light'

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-center h-11 w-11 rounded-full transition-all duration-300 ease-out focus:outline-none elegant-hover",
        isDark
          ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
          : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'
      )}
      style={{ boxShadow: isDark ? '0 4px 16px rgba(255,255,255,0.1)' : '0 4px 16px rgba(0,0,0,0.1)' }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className={cn(
          "h-4 w-4 transition-all duration-300",
          isFavorite
            ? 'fill-yellow-400 text-yellow-400 scale-110'
            : isDark ? 'fill-none text-white/60' : 'fill-none text-black/60'
        )}
        strokeWidth={1.5}
      />

      {/* Subtle hover ring */}
      <span
        className={cn(
          "absolute inset-0 rounded-full scale-110 group-hover:scale-125 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100",
          isDark ? 'border border-white/20' : 'border border-black/20'
        )}
        aria-hidden="true"
      />
    </button>
  )
}
