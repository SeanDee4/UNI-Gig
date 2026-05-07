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
} from 'lucide-react'

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
      title: 'Biology Tutoring - 3rd Year',
      description: 'Expert tutoring in cellular biology and genetics for 3rd year students.',
      category: 'Tutoring',
      price: 150,
      posterName: 'Chama M.',
      posterAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 4.9,
      reviews: 23,
      campus: 'UNZA',
    },
    {
      id: '2',
      title: 'Resume Typing & Formatting',
      description: 'Professional resume typing and formatting service. CV ready in 24 hours.',
      category: 'Typing',
      price: 100,
      posterName: 'Siyanda K.',
      posterAvatar: 'https://i.pravatar.cc/150?img=2',
      rating: 4.8,
      reviews: 18,
      campus: 'Copperbelt University',
    },
    {
      id: '3',
      title: 'Logo & Branding Design',
      description: 'Creative logo design for student projects, clubs, and small businesses.',
      category: 'Design',
      price: 250,
      posterName: 'Mbewe N.',
      posterAvatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5.0,
      reviews: 31,
      campus: 'UNZA',
    },
    {
      id: '4',
      title: 'Laundry & Ironing Service',
      description: 'Reliable laundry and ironing. Same-day service available for orders before 10am.',
      category: 'Laundry',
      price: 75,
      posterName: 'Grace T.',
      posterAvatar: 'https://i.pravatar.cc/150?img=4',
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
      <section className="bg-background py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Find help. Offer skills. All on campus.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            UNI-Gig is your campus marketplace for student services. Whether you need tutoring,
            typing, design work, or errands done—we connect you with skilled students ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/browse">
              <Button className="w-full sm:w-auto bg-primary text-white hover:bg-[#083843] rounded-[8px] px-8 py-3 text-base font-medium">
                Browse Gigs
              </Button>
            </Link>
            <Link href="/post">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-secondary rounded-[8px] px-8 py-3 text-base font-medium"
              >
                Post a Gig
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-card py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find gigs in your area of interest
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                icon={cat.icon}
                count={cat.count}
                href={`/browse?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-background py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              How UNI-Gig Works
            </h2>
            <p className="text-muted-foreground">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Gigs Section */}
      <section className="bg-card py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} />
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
      <section className="bg-primary text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join hundreds of students already using UNI-Gig to find help and offer their skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 rounded-[8px] px-8 py-3 text-base font-medium">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-[#083843] rounded-[8px] px-8 py-3 text-base font-medium"
              >
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
