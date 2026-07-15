'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { createGig, getCurrentUser, type User } from '@/lib/storage'
import { Reveal } from '@/components/reveal'

export default function PostGig() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const u = getCurrentUser()
    setCurrentUser(u)
    setAuthChecked(true)
    if (!u) router.replace('/login')
  }, [router])

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    contactMethod: 'phone',
    contactInfo: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const categories = [
    'Tutoring',
    'Typing & Printing',
    'Hair & Beauty',
    'Graphic Design',
    'Errands',
    'Laundry',
    'Other',
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      category: value,
    }))
  }

  const handleContactMethodChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      contactMethod: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!currentUser) {
      router.replace('/login')
      return
    }

    const priceNum = parseFloat(formData.price)
    if (Number.isNaN(priceNum) || priceNum < 10) {
      setErrorMsg('Please enter a valid price (minimum K10).')
      return
    }

    const gig = createGig({
      ownerId: currentUser.id,
      posterName: currentUser.name,
      posterAvatar: currentUser.avatar,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      price: priceNum,
      campus: currentUser.campus,
    })

    setSubmitted(true)
    setTimeout(() => {
      router.push(`/gig/${gig.id}`)
    }, 700)
  }

  const isFormValid =
    formData.title &&
    formData.category &&
    formData.description &&
    formData.price &&
    formData.contactInfo

  if (!authChecked || !currentUser) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground pulse-soft">Checking your session…</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        {/* Page Header */}
        <section className="relative bg-card border-b border-border py-10 px-4 overflow-hidden">
          <div className="absolute inset-0 glow-radial pointer-events-none" />
          <div className="relative max-w-3xl mx-auto fade-in-up">
            <Link
              href="/"
              className="text-primary hover:text-[#083843] font-medium text-sm mb-4 inline-block"
            >
              ← Back Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Post a Gig
            </h1>
            <p className="text-muted-foreground">
              Share your skills with other students on campus
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {errorMsg && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-[8px] p-4 mb-6 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800 dark:text-red-300">{errorMsg}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Gig Title */}
                <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)]">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Gig Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. 'Biology Tutoring for 3rd Year Students'"
                    className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Be clear and specific about what you&apos;re offering
                  </p>
                </div>

                {/* Category */}
                <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)]">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select value={formData.category} onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-secondary border-border rounded-[8px] text-foreground">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    Choose the category that best describes your gig
                  </p>
                </div>

                {/* Description */}
                <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)]">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your gig in detail. Include what you offer, your experience, turnaround time, etc."
                    rows={6}
                    className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Price */}
                <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)]">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Price (Kwacha) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-foreground mr-2">
                      K
                    </span>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 150"
                      className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground flex-1"
                      required
                      min="10"
                      max="10000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Set a fair price for your service
                  </p>
                </div>

                {/* Contact Method */}
                <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)]">
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    How should students contact you?{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === 'phone'}
                        onChange={(e) =>
                          handleContactMethodChange(e.target.value)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-foreground">
                        Phone Number
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === 'email'}
                        onChange={(e) =>
                          handleContactMethodChange(e.target.value)
                        }
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-foreground">Email</span>
                    </label>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-card rounded-[12px] border border-border p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_2px_8px_-4px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)]">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Your {formData.contactMethod === 'phone' ? 'Phone Number' : 'Email'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder={
                      formData.contactMethod === 'phone'
                        ? '+260 XXX XXXXXX'
                        : 'your.email@unza.edu.zm'
                    }
                    className="bg-secondary border-border rounded-[8px] text-foreground placeholder:text-muted-foreground"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Students will use this to contact you about your gig
                  </p>
                </div>

                {/* Submit Button */}
                <div className="bg-card rounded-[12px] border border-border p-4 shadow-[0_4px_12px_-4px_rgba(13,79,92,0.12)] sticky bottom-4">
                  <div className="flex items-center gap-3">
                    <Link href="/" className="flex-shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary rounded-[8px] py-5 px-6"
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={!isFormValid}
                      className="btn-sheen flex-1 bg-primary text-white hover:bg-[#083843] rounded-[8px] py-5 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_24px_-12px_rgba(13,79,92,0.5)]"
                    >
                      {isFormValid ? 'Post Gig' : 'Fill all required fields'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tips Card */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-[10px] p-6 sticky top-24">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-4">
                  Tips for a Great Gig Post
                </h3>
                <ul className="space-y-3 text-sm text-blue-800">
                  <li className="flex gap-2">
                    <span className="font-bold flex-shrink-0">✓</span>
                    <span>
                      Use a clear, descriptive title that explains what you offer
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold flex-shrink-0">✓</span>
                    <span>
                      Be detailed in your description - include experience and
                      turnaround time
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold flex-shrink-0">✓</span>
                    <span>Set a fair price based on your experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold flex-shrink-0">✓</span>
                    <span>
                      Always meet students on campus or in safe public spaces
                    </span>
                  </li>
                </ul>
              </div>

              {/* Info Card */}
              {submitted && (
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-[10px] p-6 mt-6 animate-pulse">
                  <div className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-1">
                        Gig Posted!
                      </h4>
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Your gig is now live and students can see it in their search.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
