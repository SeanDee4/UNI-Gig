# UNI-Gig

A student-to-student service marketplace built for **ZCAS** students, with support for other Zambian campuses (UNZA, Copperbelt, Mulungushi, ZAOU). Students post gigs (tutoring, typing, hair, design, errands, laundry) and other students browse and book them.

Built as the computing artefact for **NCC Education Level 5 Computing Project**.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components on Radix primitives
- **localStorage**-backed persistence layer (`lib/storage.ts`) — no backend required for the prototype

## Features

- Sign up / log in with session persistence
- Post a gig (auth-gated, validated)
- Browse gigs with search, category filter, price slider, and sort
- Gig detail page with "Request to Book" flow
- Owner controls: delete gig, accept / decline / complete booking requests
- Dashboard with stats, your gigs, incoming requests, and your bookings

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo flow

1. Sign up as User A → post a gig
2. Open a private window, sign up as User B → browse → request to book User A's gig
3. Log in as User A → Dashboard → Incoming Requests → Accept → Mark Completed
4. Log in as User B → Dashboard → My Bookings → status now reads "completed"

## Known limitations (documented for the project report)

- Data is stored in `localStorage` only (per-browser, per-device). A production version would use a server-side database.
- Passwords are stored in plaintext. A production version would hash with bcrypt and verify server-side.
- No email verification, no password reset, no real-time updates.
