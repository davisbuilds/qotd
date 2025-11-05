'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full" disabled>
        <Sun className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="icon"
      variant="secondary"
      className="group h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
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
