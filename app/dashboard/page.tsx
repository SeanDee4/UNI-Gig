'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GigCard } from '@/components/gig-card'
import { EmptyState } from '@/components/empty-state'
import {
  FileText,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  Inbox,
} from 'lucide-react'
import {
  clearSession,
  deleteGig as deleteGigFromStore,
  getBookings,
  getCurrentUser,
  getGigById,
  getGigs,
  getGigsByOwner,
  updateBookingStatus,
  type Booking,
  type Gig,
  type User,
} from '@/lib/storage'
import { Reveal } from '@/components/reveal'

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'gigs' | 'incoming' | 'mybookings' | 'settings'>('gigs')
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const u = getCurrentUser()
    setUser(u)
    setAuthChecked(true)
    if (!u) router.replace('/login')
  }, [router])

  const refresh = () => setRefreshKey((k) => k + 1)

  const userGigs = useMemo<Gig[]>(() => {
    if (!user) return []
    return getGigsByOwner(user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshKey])

  const incomingBookings = useMemo<Booking[]>(() => {
    if (!user) return []
    const ownedIds = new Set(getGigsByOwner(user.id).map((g) => g.id))
    return getBookings().filter((b) => ownedIds.has(b.gigId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshKey])

  const myBookings = useMemo<Booking[]>(() => {
    if (!user) return []
    return getBookings().filter((b) => b.buyerId === user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshKey])

  if (!authChecked || !user) {
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground pulse-soft">Loading your dashboard…</p>
        </main>
        <Footer />
      </>
    )
  }

  const totalBookings = incomingBookings.length
  const acceptedBookings = incomingBookings.filter((b) => b.status === 'accepted' || b.status === 'completed').length

  const handleDeleteGig = (id: string) => {
    if (!confirm('Delete this gig? This cannot be undone.')) return
    deleteGigFromStore(id, user.id)
    refresh()
  }

  const handleBookingStatus = (id: string, status: Booking['status']) => {
    updateBookingStatus(id, status)
    refresh()
  }

  const handleSignOut = () => {
    clearSession()
    router.push('/')
  }

  const stats = {
    totalGigs: userGigs.length,
    totalBookings,
    acceptedBookings,
  }

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        {/* Page Header */}
        <section className="relative bg-card border-b border-border py-10 px-4 overflow-hidden">
          <div className="absolute inset-0 glow-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto fade-in-up">
            <span className="inline-flex items-center px-3 py-1 mb-3 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
              {user.campus}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Manage your gigs and bookings from your dashboard
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Reveal delay={0}><StatCard label="Your Gigs" value={stats.totalGigs} icon={FileText} tint="blue" /></Reveal>
            <Reveal delay={80}><StatCard label="Booking Requests" value={stats.totalBookings} icon={Inbox} tint="green" /></Reveal>
            <Reveal delay={160}><StatCard label="Accepted / Completed" value={stats.acceptedBookings} icon={Star} tint="yellow" /></Reveal>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-t-[12px] flex items-center gap-2 p-2 overflow-x-auto shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <TabButton active={activeTab === 'gigs'} onClick={() => setActiveTab('gigs')}>
              My Gigs
            </TabButton>
            <TabButton active={activeTab === 'incoming'} onClick={() => setActiveTab('incoming')}>
              Incoming Requests ({totalBookings})
            </TabButton>
            <TabButton active={activeTab === 'mybookings'} onClick={() => setActiveTab('mybookings')}>
              My Bookings ({myBookings.length})
            </TabButton>
            <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              Settings
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-b-[12px] border border-t-0 border-border p-6 shadow-[0_4px_12px_-8px_rgba(15,23,42,0.05)]">
            {activeTab === 'gigs' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Your Posted Gigs</h2>
                  <Link href="/post">
                    <Button className="bg-primary text-white hover:bg-[#083843] rounded-[8px] flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Post New Gig
                    </Button>
                  </Link>
                </div>

                {userGigs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userGigs.map((gig, idx) => (
                      <Reveal key={gig.id} delay={Math.min(idx * 50, 250)}>
                        <div className="relative">
                          <GigCard {...gig} />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              onClick={() => handleDeleteGig(gig.id)}
                              className="w-8 h-8 bg-white dark:bg-[#1f1f1f] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                              title="Delete gig"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={FileText}
                    title="No gigs yet"
                    description="Post your first gig and start earning money by sharing your skills."
                    action={{ label: 'Post Your First Gig', href: '/post' }}
                  />
                )}
              </div>
            )}

            {activeTab === 'incoming' && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Incoming Booking Requests</h2>
                {incomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {incomingBookings.map((booking, idx) => (
                      <Reveal key={booking.id} delay={Math.min(idx * 60, 240)}>
                        <BookingRow
                          booking={booking}
                          showOwnerActions
                          onAccept={() => handleBookingStatus(booking.id, 'accepted')}
                          onDecline={() => handleBookingStatus(booking.id, 'cancelled')}
                          onComplete={() => handleBookingStatus(booking.id, 'completed')}
                        />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={Inbox}
                    title="No requests yet"
                    description="When students book your gigs, their requests will appear here."
                  />
                )}
              </div>
            )}

            {activeTab === 'mybookings' && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Gigs You&apos;ve Booked</h2>
                {myBookings.length > 0 ? (
                  <div className="space-y-4">
                    {myBookings.map((booking, idx) => (
                      <Reveal key={booking.id} delay={Math.min(idx * 60, 240)}>
                        <BookingRow booking={booking} />
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={MessageSquare}
                    title="You haven't booked any gigs yet"
                    description="Browse gigs and tap 'Request to Book' to start."
                    action={{ label: 'Browse Gigs', href: '/browse' }}
                  />
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-foreground mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <Field label="Full Name" value={user.name} />
                  <Field label="Email" value={user.email} />
                  <Field label="Campus" value={user.campus} />

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Sign Out</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Sign out of your account on this device.
                    </p>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-[8px]"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string
  value: number
  icon: typeof FileText
  tint: 'blue' | 'green' | 'yellow'
}) {
  const tintClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400',
  }[tint]
  return (
    <div className="depth-card rounded-[10px] border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tintClasses}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2.5 px-4 font-medium text-sm rounded-[8px] transition-all whitespace-nowrap ${
        active
          ? 'bg-primary text-white shadow-[0_4px_12px_-4px_rgba(13,79,92,0.4)]'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-6">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  )
}

function BookingRow({
  booking,
  showOwnerActions = false,
  onAccept,
  onDecline,
  onComplete,
}: {
  booking: Booking
  showOwnerActions?: boolean
  onAccept?: () => void
  onDecline?: () => void
  onComplete?: () => void
}) {
  const gig = getGigById(booking.gigId)
  const date = new Date(booking.createdAt).toLocaleDateString('en-GB')

  const statusColor = {
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300',
  }[booking.status]

  return (
    <div className="border border-border rounded-[10px] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="font-semibold text-foreground">
              {gig ? gig.title : 'Gig no longer available'}
            </h3>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>
              {booking.status}
            </span>
          </div>
          {gig && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{gig.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {gig && <span className="text-primary font-semibold">K{gig.price}</span>}
            <span className="text-muted-foreground">Requested {date}</span>
          </div>
        </div>
      </div>

      {showOwnerActions && booking.status === 'pending' && (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={onAccept}
            className="bg-primary text-white hover:bg-[#083843] rounded-[8px] text-sm gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Accept
          </Button>
          <Button
            onClick={onDecline}
            variant="outline"
            className="border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-[8px] text-sm gap-2"
          >
            <XCircle className="w-4 h-4" />
            Decline
          </Button>
        </div>
      )}
      {showOwnerActions && booking.status === 'accepted' && (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={onComplete}
            variant="outline"
            className="border-border text-foreground hover:bg-secondary rounded-[8px] text-sm gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Mark Completed
          </Button>
        </div>
      )}
    </div>
  )
}

// Suppress unused-import warnings for icons referenced only via type usage above
void getGigs
void Settings
