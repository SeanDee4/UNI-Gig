import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold mb-4">
              <span className="text-foreground">UNI</span>
              <span className="text-primary">-Gig</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Student gigs, made simple.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/browse"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link
                  href="/post"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Post a Gig
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Account
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 UNI-Gig. Built by students, for students.
          </p>
        </div>
      </div>
    </footer>
  )
}
