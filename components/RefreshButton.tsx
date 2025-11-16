'use client'

import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UI } from '@/lib/constants'

interface RefreshButtonProps {
  onClick: () => void
  isLoading: boolean
}

export default function RefreshButton({ onClick, isLoading }: RefreshButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="icon"
      variant="secondary"
      className={cn("group relative", UI.BUTTON_SIZES.large, UI.ICON_BUTTON_BASE, "hover:scale-110")}
      aria-label="Refresh quote"
    >
      <RefreshCw
        className={cn(
          "h-6 w-6 transition-transform duration-500",
          isLoading ? 'animate-spin' : 'group-hover:rotate-180'
        )}
      />
    </Button>
  )
}
