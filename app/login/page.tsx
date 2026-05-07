'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { verifyLogin, setSession } from '@/lib/storage'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    const user = verifyLogin(email, password)
    if (!user) {
      setErrorMsg('Invalid email or password.')
      return
    }

    setSession(user.id)
    setSubmitted(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 600)
  }

  const isFormValid = email && password

  return (
    <>
      <Navbar isLoggedIn={false} />

      <main className="relative bg-background min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 glow-radial pointer-events-none" />
        <div className="relative w-full max-w-5xl fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col justify-center">
              <div className="bg-primary rounded-[16px] p-12 text-white shadow-[0_30px_60px_-30px_rgba(13,79,92,0.45)]">
                <div className="text-4xl font-bold mb-4">
                  <span className="text-white">UNI</span>
                  <span className="text-white">-Gig</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Student gigs, made simple.
                </h2>
                <p className="text-lg opacity-90 mb-8 leading-relaxed">
                  Connect with other students on campus. Find help with tutoring, typing,
                  design, and more. Or offer your skills and earn.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✓</span>
                    <span className="text-base">
                      Browse hundreds of gigs from students like you
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✓</span>
                    <span className="text-base">
                      Post your skills and start earning today
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✓</span>
                    <span className="text-base">
                      Safe and secure on-campus transactions
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md">
              <div className="bg-card rounded-[10px] border border-border p-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground mb-6">
                  Log in to your UNI-Gig account
                </p>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-[8px] p-4 mb-6 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-semibold mb-1">Login Successful!</p>
                      <p>Redirecting to your dashboard...</p>
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-[8px] p-4 mb-6 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{errorMsg}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@unza.edu.zm"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-border cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-foreground cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-primary text-white hover:bg-[#083843] rounded-[8px] py-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    Log In
                  </Button>
                </form>

                {/* Forgot Password */}
                <div className="text-center mt-4">
                  <a
                    href="#"
                    className="text-sm text-primary hover:text-[#083843] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-foreground">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    className="font-semibold text-primary hover:text-[#083843] transition-colors"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-[8px] p-4 mt-6 flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-blue-900">
                  We never share your information. Your data is secure and private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
