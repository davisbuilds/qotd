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
      <Button
        size="icon"
        variant="secondary"
        className={cn(UI.BUTTON_SIZES.medium, "rounded-full shadow-sm")}
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="icon"
      variant="secondary"
      className={cn(
        "group transition-all duration-200",
        UI.BUTTON_SIZES.medium,
        UI.ICON_BUTTON_BASE,
        "hover:scale-105 active:scale-95",
        "shadow-sm hover:shadow-md"
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-rotate-12" />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300 ease-out group-hover:rotate-90" />
      )}
    </Button>
  )
}
