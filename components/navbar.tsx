'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { clearSession, getCurrentUser, type User } from '@/lib/storage'

export function Navbar(_props: { isLoggedIn?: boolean; userName?: string } = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    setUser(getCurrentUser())
  }, [pathname])

  const isLoggedIn = mounted && user !== null
  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'

  const handleLogout = () => {
    clearSession()
    setUser(null)
    setIsOpen(false)
    router.push('/')
  }

  return (
    <nav className="glass border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-foreground">UNI</span>
              <span className="text-primary">-Gig</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/browse"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Browse
            </Link>
            <Link
              href="/post"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Post a Gig
            </Link>
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-foreground hover:bg-secondary"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="group text-muted-foreground hover:bg-red-50 hover:text-red-600 rounded-[8px] gap-2 px-3 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  <span className="hidden lg:inline">Log out</span>
                </Button>
                <Link
                  href="/profile"
                  title={`${user?.name ?? ''} — view profile`}
                  className="group"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-card shadow-sm transition-all group-hover:ring-primary group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#083843] flex items-center justify-center text-white font-semibold shadow-sm ring-2 ring-card transition-all group-hover:ring-primary group-hover:scale-105">
                      {initial}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-foreground hover:bg-secondary"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary text-white hover:bg-[#083843] rounded-[8px]">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link
              href="/browse"
              className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2"
            >
              Browse
            </Link>
            <Link
              href="/post"
              className="block text-foreground hover:text-primary transition-colors text-sm font-medium py-2"
            >
              Post a Gig
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="block py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-secondary gap-2"
                  >
                    Profile ({user?.name})
                  </Button>
                </Link>
                <Link href="/dashboard" className="block py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-secondary"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:bg-red-50 gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-secondary"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="block py-2">
                  <Button className="w-full bg-primary text-white hover:bg-[#083843] rounded-[8px]">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
