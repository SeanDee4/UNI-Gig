import Link from 'next/link'
import { Github, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border mt-16 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(13,79,92,0.4), transparent)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#083843] text-white flex items-center justify-center text-sm font-bold">
                UG
              </div>
              <div className="text-xl font-bold">
                <span className="text-foreground">UNI</span>
                <span className="text-primary">-Gig</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The student services marketplace for ZCAS and other Zambian campuses. Built by students, for students.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/SeanDee4/UNI-Gig"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@uni-gig.app"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Contact us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Platform</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link href="/post" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Post a Gig
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Account</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm">Campuses</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                ZCAS
              </li>
              <li>UNZA</li>
              <li>Copperbelt</li>
              <li>Mulungushi</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UNI-Gig. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
