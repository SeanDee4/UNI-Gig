'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GigCard } from '@/components/gig-card'
import { CategoryCard } from '@/components/category-card'
import {
  BookOpen,
  Printer,
  Scissors,
  Palette,
  ShoppingBag,
  Shirt,
  CheckCircle,
  FileText,
  MessageSquare,
  Star,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

export default function Home() {
  const categories = [
    { name: 'Tutoring', icon: BookOpen, count: 142 },
    { name: 'Typing & Printing', icon: Printer, count: 89 },
    { name: 'Hair & Beauty', icon: Scissors, count: 67 },
    { name: 'Graphic Design', icon: Palette, count: 54 },
    { name: 'Errands', icon: ShoppingBag, count: 103 },
    { name: 'Laundry', icon: Shirt, count: 78 },
  ]

  const featuredGigs = [
    {
      id: '1',
      title: 'NCC Computing L4 & L5 Tutoring',
      description: 'One-on-one tutoring for NCC Computing students. Coursework help, exam prep, and project guidance.',
      category: 'Tutoring',
      price: 150,
      posterName: 'Chama M.',
      posterAvatar: '',
      rating: 4.9,
      reviews: 23,
      campus: 'ZCAS',
    },
    {
      id: '2',
      title: 'Resume Typing & Formatting',
      description: 'Professional resume typing and formatting service. CV ready in 24 hours.',
      category: 'Typing',
      price: 100,
      posterName: 'Siyanda K.',
      posterAvatar: '',
      rating: 4.8,
      reviews: 18,
      campus: 'ZCAS',
    },
    {
      id: '3',
      title: 'Logo & Branding Design',
      description: 'Creative logo design for student projects, clubs, and small businesses.',
      category: 'Design',
      price: 250,
      posterName: 'Mbewe N.',
      posterAvatar: '',
      rating: 5.0,
      reviews: 31,
      campus: 'ZCAS',
    },
    {
      id: '4',
      title: 'Laundry & Ironing Service',
      description: 'Reliable laundry and ironing. Same-day service available for orders before 10am.',
      category: 'Laundry',
      price: 75,
      posterName: 'Grace T.',
      posterAvatar: '',
      rating: 4.7,
      reviews: 45,
      campus: 'UNZA',
    },
  ]

  const steps = [
    {
      icon: BookOpen,
      title: 'Sign Up',
      description: 'Create your free UNI-Gig account in minutes.',
    },
    {
      icon: FileText,
      title: 'Post or Browse',
      description: 'Share your skills or find the gig you need.',
    },
    {
      icon: MessageSquare,
      title: 'Connect on Campus',
      description: 'Chat with students and make the deal happen.',
    },
  ]

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-background py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 glow-radial pointer-events-none" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left fade-in-up">
            <span className="inline-flex items-center px-3 py-1 mb-6 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider rounded-full live-dot">
              Live on ZCAS campus
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 text-balance leading-[1.05]">
              Find help. Offer skills.
              <br />
              <span className="text-primary">All on campus.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-9 text-balance lg:max-w-xl mx-auto lg:mx-0 leading-relaxed">
              UNI-Gig is the student services marketplace built for ZCAS and other Zambian campuses.
              Tutoring, typing, design work, errands — connect with skilled students ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/browse">
                <Button className="btn-sheen w-full sm:w-auto bg-primary text-white hover:bg-[#083843] rounded-[10px] px-8 py-6 text-base font-medium shadow-[0_8px_24px_-12px_rgba(13,79,92,0.5)]">
                  Browse Gigs
                </Button>
              </Link>
              <Link href="/post">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-secondary rounded-[10px] px-8 py-6 text-base font-medium"
                >
                  Post a Gig
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">200+</p>
                <p className="text-xs text-muted-foreground mt-1">Active students</p>
              </div>
              <div className="border-x border-border">
                <p className="text-2xl md:text-3xl font-bold text-foreground">6</p>
                <p className="text-xs text-muted-foreground mt-1">Gig categories</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">24h</p>
                <p className="text-xs text-muted-foreground mt-1">Avg. response</p>
              </div>
            </div>
          </div>

          {/* Floating preview card stack */}
          <div className="hidden lg:block lg:col-span-5 relative h-[440px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background card */}
              <div className="absolute right-12 top-2 w-[280px] bg-card border border-border rounded-[14px] p-5 shadow-[0_20px_50px_-20px_rgba(13,79,92,0.25)] rotate-[6deg] opacity-90">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-primary/8 text-primary text-[10px] font-semibold uppercase tracking-wider rounded-full">
                    Typing
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-semibold text-foreground">4.8</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">Resume Typing & Formatting</p>
                <p className="text-xs text-muted-foreground line-clamp-2">CV ready in 24 hours.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-[#083843] text-white flex items-center justify-center text-xs font-semibold">
                      S
                    </div>
                    <span className="text-xs text-muted-foreground">Siyanda K.</span>
                  </div>
                  <span className="text-base font-bold text-primary">K100</span>
                </div>
              </div>

              {/* Foreground hero card */}
              <div className="relative w-[320px] bg-card border border-border rounded-[16px] p-6 shadow-[0_30px_60px_-25px_rgba(13,79,92,0.4)] -rotate-[3deg] float-soft z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 bg-primary/8 text-primary text-[11px] font-semibold uppercase tracking-wider rounded-full">
                    Tutoring
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-semibold text-foreground">4.9</span>
                    <span className="text-[10px] text-muted-foreground">(23)</span>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1.5 leading-snug">
                  NCC Computing L4 & L5 Tutoring
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-5">
                  Coursework help, exam prep, and project guidance for NCC students.
                </p>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[#083843] text-white flex items-center justify-center text-sm font-semibold">
                      C
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-tight">Chama M.</p>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>ZCAS</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground font-medium leading-none mb-0.5">FROM</p>
                    <p className="text-lg font-bold text-primary leading-none">K150</p>
                  </div>
                </div>

                {/* Booked! confirmation chip floating off corner */}
                <div className="absolute -bottom-3 -right-3 bg-green-500 text-white text-xs font-semibold rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Booked!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-card py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find gigs in your area of interest
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Reveal key={cat.name} delay={idx * 60}>
                <CategoryCard
                  name={cat.name}
                  icon={cat.icon}
                  count={cat.count}
                  href={`/browse?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-background py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              How UNI-Gig Works
            </h2>
            <p className="text-muted-foreground">
              Get started in 3 simple steps
            </p>
          </Reveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connector line behind icons (desktop) */}
            <div
              aria-hidden
              className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(13,79,92,0.25) 20%, rgba(13,79,92,0.25) 80%, transparent)',
              }}
            />
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <Reveal key={idx} delay={idx * 120}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-5 flex-shrink-0 shadow-[0_8px_24px_-8px_rgba(13,79,92,0.5)]">
                      <Icon className="w-7 h-7 text-white" />
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-[11px] font-bold text-primary">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Gigs Section */}
      <section className="bg-card py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Gigs
              </h2>
              <p className="text-muted-foreground">
                Check out what students are offering
              </p>
            </div>
            <Link href="/browse" className="hidden md:block">
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary rounded-[8px]"
              >
                View All
              </Button>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGigs.map((gig, idx) => (
              <Reveal key={gig.id} delay={idx * 80}>
                <GigCard {...gig} />
              </Reveal>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/browse">
              <Button className="bg-primary text-white hover:bg-[#083843] rounded-[8px] px-8 py-3">
                See All Gigs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-primary text-white py-12 md:py-16 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.18) 0%, transparent 65%), radial-gradient(40% 40% at 100% 100%, rgba(255,255,255,0.10) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join hundreds of students already using UNI-Gig to find help and offer their skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="btn-sheen w-full sm:w-auto bg-white text-primary hover:bg-gray-100 rounded-[8px] px-8 py-3 text-base font-medium shadow-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/login">
              <Button className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 rounded-[8px] px-8 py-3 text-base font-medium">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
