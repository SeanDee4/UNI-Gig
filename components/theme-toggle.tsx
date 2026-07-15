'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const THEME_KEY = 'unigig.theme'

function applyTheme(dark: boolean) {
  const root = document.documentElement
  // Enable smooth transition only during an explicit toggle
  root.classList.add('theme-transition')
  root.classList.toggle('dark', dark)
  window.setTimeout(() => root.classList.remove('theme-transition'), 350)
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    applyTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
    } catch {
      /* storage unavailable */
    }
  }

  // Render a stable placeholder until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        aria-hidden
        className={`w-14 h-8 rounded-full bg-secondary border border-border ${className}`}
      />
    )
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className={`relative w-14 h-8 rounded-full border transition-colors duration-300 cursor-pointer
        ${dark
          ? 'bg-[#141414] border-white/10'
          : 'bg-secondary border-border'}
        hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
        ${className}`}
    >
      {/* Track icons */}
      <Sun
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300
          ${dark ? 'opacity-30 text-muted-foreground scale-90' : 'opacity-100 text-amber-500 scale-100'}`}
      />
      <Moon
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300
          ${dark ? 'opacity-100 text-[#7dd3e0] scale-100' : 'opacity-30 text-muted-foreground scale-90'}`}
      />
      {/* Sliding thumb */}
      <span
        className={`absolute top-1 h-6 w-6 rounded-full shadow-md transition-all duration-300 ease-out
          ${dark
            ? 'left-[calc(100%-1.75rem)] bg-gradient-to-br from-[#1a7a8a] to-[#0d4f5c] shadow-[0_0_10px_rgba(26,122,138,0.5)]'
            : 'left-1 bg-white'}`}
      />
    </button>
  )
}
