'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article'
  
  once?: boolean
}


export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  once = false,
}: RevealProps) {
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
            if (once) {
              obs.disconnect()
              return
            }
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once])

  const Cmp = Tag as React.ElementType
  return (
    <Cmp
      ref={ref as never}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        opacity: visible ? 1 : 0,
        transition: `opacity 520ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </Cmp>
  )
}
