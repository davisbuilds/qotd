'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UI } from '@/lib/constants'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button size="icon" variant="secondary" className={cn(UI.BUTTON_SIZES.medium, UI.ICON_BUTTON_BASE)} disabled>
        <Sun className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="icon"
      variant="secondary"
      className={cn("group", UI.BUTTON_SIZES.medium, UI.ICON_BUTTON_BASE, "hover:scale-110")}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-6 w-6 transition-transform group-hover:rotate-12" />
      ) : (
        <Sun className="h-6 w-6 transition-transform group-hover:rotate-90" />
      )}
    </Button>
  )
}
