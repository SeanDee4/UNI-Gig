'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StarRating } from '@/components/star-rating'
import { MessageCircle, MapPin, Calendar, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'
import {
  getGigById,
  getCurrentUser,
  createBooking,
  deleteGig,
  type Gig,
  type User,
} from '@/lib/storage'

export default function GigDetail() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params?.id as string

  const [gig, setGig] = useState<Gig | null | undefined>(undefined)
  const [user, setUser] = useState<User | null>(null)
  const [bookingMsg, setBookingMsg] = useState<string | null>(null)

  useEffect(() => {
    setGig(getGigById(id) ?? null)
    setUser(getCurrentUser())
  }, [id])

  if (gig === undefined) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading…</p>
        </main>
        <Footer />
      </>
    )
  }

  if (gig === null) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-foreground mb-3">Gig not found</h1>
            <p className="text-muted-foreground mb-6">
              This gig may have been removed or the link is incorrect.
            </p>
            <Link href="/browse">
              <Button className="bg-primary text-white hover:bg-[#083843] rounded-[8px]">
                Back to Browse
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const isOwner = user?.id === gig.ownerId
  const joinedDate = new Date(gig.createdAt).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const handleContact = () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (isOwner) return
    createBooking(gig.id, user.id)
    setBookingMsg(
      `Request sent to ${gig.posterName}. They'll get back to you on the contact details once accepted.`,
    )
  }

  const handleDelete = () => {
    if (!user) return
    if (!confirm('Delete this gig? This cannot be undone.')) return
    if (deleteGig(gig.id, user.id)) {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            href="/browse"
            className="text-primary hover:text-[#083843] font-medium text-sm mb-6 inline-block"
          >
            ← Back to Browse
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="bg-card rounded-[10px] border border-border p-6 md:p-8 mb-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-secondary text-primary text-xs font-medium rounded-[6px]">
                    {gig.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {gig.title}
                </h1>

                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <StarRating rating={gig.rating} count={gig.reviews} size="md" />
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    K{gig.price}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-[10px] border border-border p-6 md:p-8 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  About This Gig
                </h2>
                <p className="text-foreground leading-relaxed mb-6 whitespace-pre-line">
                  {gig.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-secondary rounded-[8px] p-4">
                    <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">Category</p>
                      <p className="text-sm text-muted-foreground">{gig.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-secondary rounded-[8px] p-4">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">Posted</p>
                      <p className="text-sm text-muted-foreground">{joinedDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-card rounded-[10px] border border-border p-6 md:p-8 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Reviews ({gig.reviews})
                </h2>
                {gig.reviews === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No reviews yet. Be the first to book this gig.
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Reviews from past customers will appear here.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Poster Info Card */}
              <div className="bg-card rounded-[10px] border border-border p-6 sticky top-24 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  About the Student
                </h3>

                <div className="text-center mb-6">
                  {gig.posterAvatar ? (
                    <img
                      src={gig.posterAvatar}
                      alt={gig.posterName}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-secondary text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                      {gig.posterName?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {gig.posterName}
                  </h4>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {gig.campus}
                  </div>
                  <StarRating rating={gig.rating} count={gig.reviews} size="sm" />
                </div>

                {bookingMsg && (
                  <div className="bg-green-50 border border-green-200 rounded-[8px] p-4 mb-6 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">{bookingMsg}</p>
                  </div>
                )}

                {isOwner ? (
                  <>
                    <p className="bg-secondary text-foreground rounded-[8px] p-3 mb-3 text-sm text-center">
                      This is your gig.
                    </p>
                    <Button
                      onClick={handleDelete}
                      variant="outline"
                      className="w-full border-red-200 text-red-700 hover:bg-red-50 rounded-[8px] py-6 mb-3 text-base font-medium gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Gig
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleContact}
                    disabled={bookingMsg !== null}
                    className="w-full bg-primary text-white hover:bg-[#083843] rounded-[8px] py-6 mb-3 text-base font-medium disabled:opacity-60"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {user ? 'Request to Book' : 'Log in to Contact'}
                  </Button>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-4 flex gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-900">
                    Always communicate on campus or through the app to stay safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
