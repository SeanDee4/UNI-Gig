'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GigCard } from '@/components/gig-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { getGigs, type Gig } from '@/lib/storage'
import { Reveal } from '@/components/reveal'

export default function BrowseGigs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [allGigs, setAllGigs] = useState<Gig[]>([])

  useEffect(() => {
    setAllGigs(getGigs())
  }, [])

  const categories = [
    'All',
    'Tutoring',
    'Typing & Printing',
    'Hair & Beauty',
    'Graphic Design',
    'Errands',
    'Laundry',
  ]


  // Filter gigs
  let filteredGigs = allGigs
    .filter((gig) => {
      const matchesSearch = gig.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        gig.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === 'all' ||
        gig.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesPrice =
        gig.price >= priceRange[0] && gig.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt - a.createdAt
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const gigsPerPage = 12
  const totalPages = Math.ceil(filteredGigs.length / gigsPerPage)
  const startIdx = (currentPage - 1) * gigsPerPage
  const endIdx = startIdx + gigsPerPage
  const paginatedGigs = filteredGigs.slice(startIdx, endIdx)

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        {/* Page Header */}
        <section className="relative bg-card border-b border-border py-10 px-4 overflow-hidden">
          <div className="absolute inset-0 glow-radial pointer-events-none" />
          <div className="relative max-w-7xl mx-auto fade-in-up">
            <span className="inline-flex items-center px-3 py-1 mb-3 bg-primary/8 text-primary text-xs font-semibold uppercase tracking-wider rounded-full live-dot">
              Updated live
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Browse Gigs
            </h1>
            <p className="text-muted-foreground">
              <span className="text-foreground font-semibold">{filteredGigs.length}</span> gig{filteredGigs.length === 1 ? '' : 's'} available across all campuses
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-[10px] border border-border p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Filters
                  </h3>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Search
                  </label>
                  <div className="relative input-premium rounded-[8px] transition-all">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search gigs..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="pl-10 bg-secondary border-border rounded-[8px] focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat)
                          setCurrentPage(1)
                        }}
                        className={`w-full text-left px-3 py-2 rounded-[6px] text-sm transition-colors ${
                          selectedCategory === cat
                            ? 'bg-primary text-white'
                            : 'bg-secondary text-foreground hover:bg-muted'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground block mb-4">
                    Price Range: K{priceRange[0]} - K{priceRange[1]}
                  </label>
                  <Slider
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value as [number, number])
                      setCurrentPage(1)
                    }}
                    className="w-full"
                  />
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground block mb-2">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-secondary border-border rounded-[8px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset */}
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-secondary rounded-[8px]"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setPriceRange([0, 500])
                    setSortBy('newest')
                    setCurrentPage(1)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Gigs Grid */}
            <div className="lg:col-span-3">
              {paginatedGigs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedGigs.map((gig, idx) => (
                      <Reveal key={gig.id} delay={Math.min((idx % 6) * 50, 250)}>
                        <GigCard {...gig} />
                      </Reveal>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between py-6 border-t border-border">
                      <Button
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary rounded-[8px]"
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-[6px] text-sm font-medium transition-colors ${
                              currentPage === i + 1
                                ? 'bg-primary text-white'
                                : 'bg-card border border-border text-foreground hover:bg-secondary'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary rounded-[8px]"
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-card rounded-[10px] border border-border p-12 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No gigs found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    className="bg-primary text-white hover:bg-[#083843] rounded-[8px]"
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                      setPriceRange([0, 500])
                      setCurrentPage(1)
                    }}
                  >
                    Clear Filters
                  </Button>
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
