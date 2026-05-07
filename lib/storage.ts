// Client-side persistence layer for UNI-Gig.
// Backed by localStorage so the artefact runs without a backend.
// All functions are SSR-safe: they no-op (or return defaults) when window is undefined.

export type User = {
  id: string
  name: string
  email: string
  password: string
  campus: string
  avatar: string
  createdAt: number
}

export type Gig = {
  id: string
  ownerId: string
  title: string
  description: string
  category: string
  price: number
  campus: string
  posterName: string
  posterAvatar: string
  rating: number
  reviews: number
  createdAt: number
}

export type Booking = {
  id: string
  gigId: string
  buyerId: string
  status: 'pending' | 'accepted' | 'completed' | 'cancelled'
  createdAt: number
}

const KEYS = {
  users: 'unigig.users',
  gigs: 'unigig.gigs',
  bookings: 'unigig.bookings',
  session: 'unigig.session',
  seeded: 'unigig.seeded',
} as const

const isBrowser = () => typeof window !== 'undefined'

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

// ---------- Users ----------

export function getUsers(): User[] {
  return read<User[]>(KEYS.users, [])
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id)
}

export function createUser(input: {
  name: string
  email: string
  password: string
  campus: string
}): { ok: true; user: User } | { ok: false; error: string } {
  const users = getUsers()
  const email = input.email.trim().toLowerCase()
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  const user: User = {
    id: uid(),
    name: input.name.trim(),
    email,
    password: input.password,
    campus: input.campus,
    avatar: '',
    createdAt: Date.now(),
  }
  write(KEYS.users, [...users, user])
  return { ok: true, user }
}

export function verifyLogin(email: string, password: string): User | null {
  const e = email.trim().toLowerCase()
  const user = getUsers().find((u) => u.email === e && u.password === password)
  return user ?? null
}

// ---------- Session ----------

export function setSession(userId: string): void {
  write(KEYS.session, userId)
}

export function clearSession(): void {
  if (!isBrowser()) return
  window.localStorage.removeItem(KEYS.session)
}

export function getSessionUserId(): string | null {
  return read<string | null>(KEYS.session, null)
}

export function getCurrentUser(): User | null {
  const id = getSessionUserId()
  if (!id) return null
  return getUserById(id) ?? null
}

// ---------- Gigs ----------

export function getGigs(): Gig[] {
  ensureSeeded()
  return read<Gig[]>(KEYS.gigs, [])
}

export function getGigById(id: string): Gig | undefined {
  return getGigs().find((g) => g.id === id)
}

export function getGigsByOwner(ownerId: string): Gig[] {
  return getGigs().filter((g) => g.ownerId === ownerId)
}

export function createGig(input: {
  ownerId: string
  posterName: string
  posterAvatar: string
  title: string
  description: string
  category: string
  price: number
  campus: string
}): Gig {
  const gigs = getGigs()
  const gig: Gig = {
    id: uid(),
    ownerId: input.ownerId,
    posterName: input.posterName,
    posterAvatar: input.posterAvatar,
    title: input.title,
    description: input.description,
    category: input.category,
    price: input.price,
    campus: input.campus,
    rating: 0,
    reviews: 0,
    createdAt: Date.now(),
  }
  write(KEYS.gigs, [gig, ...gigs])
  return gig
}

export function deleteGig(id: string, ownerId: string): boolean {
  const gigs = getGigs()
  const target = gigs.find((g) => g.id === id)
  if (!target || target.ownerId !== ownerId) return false
  write(
    KEYS.gigs,
    gigs.filter((g) => g.id !== id),
  )
  return true
}

// ---------- Bookings ----------

export function getBookings(): Booking[] {
  return read<Booking[]>(KEYS.bookings, [])
}

export function getBookingsByBuyer(buyerId: string): Booking[] {
  return getBookings().filter((b) => b.buyerId === buyerId)
}

export function getBookingsForOwner(ownerId: string): Booking[] {
  const ownedGigIds = new Set(getGigsByOwner(ownerId).map((g) => g.id))
  return getBookings().filter((b) => ownedGigIds.has(b.gigId))
}

export function createBooking(gigId: string, buyerId: string): Booking {
  const booking: Booking = {
    id: uid(),
    gigId,
    buyerId,
    status: 'pending',
    createdAt: Date.now(),
  }
  write(KEYS.bookings, [booking, ...getBookings()])
  return booking
}

export function updateBookingStatus(id: string, status: Booking['status']): void {
  write(
    KEYS.bookings,
    getBookings().map((b) => (b.id === id ? { ...b, status } : b)),
  )
}

// ---------- Seed data ----------

function ensureSeeded(): void {
  if (!isBrowser()) return
  if (window.localStorage.getItem(KEYS.seeded) === '1') return

  const seedGigs: Gig[] = [
    {
      id: 'seed-1',
      ownerId: 'seed-user-1',
      title: 'ACCA F1-F4 Tutoring',
      description: 'Expert tutoring in ACCA Fundamentals papers F1 to F4. Past-paper drills and exam technique.',
      category: 'Tutoring',
      price: 150,
      campus: 'ZCAS',
      posterName: 'Chama M.',
      posterAvatar: '',
      rating: 4.9,
      reviews: 23,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
    },
    {
      id: 'seed-2',
      ownerId: 'seed-user-2',
      title: 'Resume Typing & Formatting',
      description: 'Professional resume typing and formatting service. CV ready in 24 hours.',
      category: 'Typing & Printing',
      price: 100,
      campus: 'ZCAS',
      posterName: 'Siyanda K.',
      posterAvatar: '',
      rating: 4.8,
      reviews: 18,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    },
    {
      id: 'seed-3',
      ownerId: 'seed-user-3',
      title: 'Logo & Branding Design',
      description: 'Creative logo design for student projects, clubs, and small businesses.',
      category: 'Graphic Design',
      price: 250,
      campus: 'ZCAS',
      posterName: 'Mbewe N.',
      posterAvatar: '',
      rating: 5.0,
      reviews: 31,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    },
    {
      id: 'seed-4',
      ownerId: 'seed-user-4',
      title: 'Laundry & Ironing Service',
      description: 'Reliable laundry and ironing. Same-day service available for orders before 10am.',
      category: 'Laundry',
      price: 75,
      campus: 'ZCAS',
      posterName: 'Bwalya T.',
      posterAvatar: '',
      rating: 4.7,
      reviews: 42,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    },
    {
      id: 'seed-5',
      ownerId: 'seed-user-5',
      title: 'Hair Braiding & Styling',
      description: 'Affordable braiding and styling done in your dorm. Box braids, cornrows, twists.',
      category: 'Hair & Beauty',
      price: 200,
      campus: 'ZCAS',
      posterName: 'Mwila P.',
      posterAvatar: '',
      rating: 4.9,
      reviews: 27,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: 'seed-6',
      ownerId: 'seed-user-6',
      title: 'Campus Errands & Deliveries',
      description: 'Quick errands around campus: pickups, drop-offs, printing collection.',
      category: 'Errands',
      price: 50,
      campus: 'ZCAS',
      posterName: 'Kabwe J.',
      posterAvatar: '',
      rating: 4.6,
      reviews: 15,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    },
  ]

  write(KEYS.gigs, seedGigs)
  window.localStorage.setItem(KEYS.seeded, '1')
}
