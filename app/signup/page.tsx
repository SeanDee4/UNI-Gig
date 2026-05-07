'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { createUser, setSession } from '@/lib/storage'

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    campus: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const campuses = [
    'ZCAS',
    'UNZA',
    'Copperbelt University',
    'Mulungushi University',
    'ZAOU',
    'Other',
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      campus: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    if (!agreedToTerms) {
      setErrorMsg('You must agree to the terms and conditions.')
      return
    }

    const result = createUser({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      campus: formData.campus,
    })

    if (!result.ok) {
      setErrorMsg(result.error)
      return
    }

    setSession(result.user.id)
    setSubmitted(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  }

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.campus &&
    formData.password === formData.confirmPassword &&
    agreedToTerms

  return (
    <>
      <Navbar isLoggedIn={false} />

      <main className="relative bg-background min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 glow-radial pointer-events-none" />
        <div className="relative w-full max-w-5xl fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col justify-center">
              <div className="bg-primary rounded-[16px] p-12 text-white shadow-[0_30px_60px_-30px_rgba(13,79,92,0.45)]">
                <div className="text-4xl font-bold mb-4">
                  <span className="text-white">UNI</span>
                  <span className="text-white">-Gig</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  Find help. Offer skills. All on campus.
                </h2>
                <p className="text-lg opacity-90 mb-8 leading-relaxed">
                  Join thousands of students earning money by sharing their skills.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✓</span>
                    <span className="text-base">
                      Free to join and easy to use
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✓</span>
                    <span className="text-base">
                      Set your own rates and schedule
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl mt-1">✓</span>
                    <span className="text-base">
                      Get reviews and build your reputation
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full max-w-md">
              <div className="bg-card rounded-[10px] border border-border p-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Create Account
                </h1>
                <p className="text-muted-foreground mb-6">
                  Join UNI-Gig and start making money today
                </p>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-[8px] p-4 mb-6 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-semibold mb-1">Account Created!</p>
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
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Student Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@unza.edu.zm"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  {/* Campus */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Campus
                    </label>
                    <Select value={formData.campus} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-secondary border-border rounded-[8px] text-foreground">
                        <SelectValue placeholder="Select your campus" />
                      </SelectTrigger>
                      <SelectContent>
                        {campuses.map((campus) => (
                          <SelectItem key={campus} value={campus}>
                            {campus}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Password
                    </label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                      required
                    />
                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">
                          Passwords do not match
                        </p>
                      )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-border cursor-pointer mt-1"
                    />
                    <label htmlFor="terms" className="text-xs text-foreground cursor-pointer">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:text-[#083843]">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary hover:text-[#083843]">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-primary text-white hover:bg-[#083843] rounded-[8px] py-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    Create Account
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-foreground">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:text-[#083843] transition-colors"
                  >
                    Log in
                  </Link>
                </p>
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-[8px] p-4 mt-6 flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-blue-900">
                  Your account is secure. We use industry-standard encryption to protect your data.
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
