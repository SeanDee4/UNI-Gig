'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}

/**
 * Reveals its children with a fade-up when scrolled into view.
 * Honours prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const Cmp = Tag as React.ElementType
  return (
    <Cmp
      ref={ref as never}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        opacity: visible ? 1 : 0,
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </Cmp>
  )
}
