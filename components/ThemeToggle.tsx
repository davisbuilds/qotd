'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'

  if (!mounted) {
    return (
      <button
        disabled
        className={cn(
          "group relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-out focus:outline-none",
          'bg-white/5 border border-white/10'
        )}
        style={{ boxShadow: '0 4px 16px rgba(255,255,255,0.1)' }}
      >
        <Sun className="h-4 w-4 text-white/60" strokeWidth={1.5} />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        "group relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-out focus:outline-none elegant-hover",
        isDark
          ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
          : 'bg-black/5 hover:bg-black/10 border border-black/10 hover:border-black/20'
      )}
      style={{ boxShadow: isDark ? '0 4px 16px rgba(255,255,255,0.1)' : '0 4px 16px rgba(0,0,0,0.1)' }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-500 ease-out",
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100',
          isDark ? 'text-white/60' : 'text-black/60'
        )}
        strokeWidth={1.5}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-500 ease-out",
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0',
          isDark ? 'text-white/60' : 'text-black/60'
        )}
        strokeWidth={1.5}
      />
    </button>
  )
}
