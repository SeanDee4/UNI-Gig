import { Star, MapPin } from 'lucide-react'
import Link from 'next/link'

interface GigCardProps {
  id: string
  title: string
  description: string
  category: string
  price: number
  posterName: string
  posterAvatar: string
  rating: number
  reviews: number
  campus?: string
}

export function GigCard({
  id,
  title,
  description,
  category,
  price,
  posterName,
  posterAvatar,
  rating,
  reviews,
  campus,
}: GigCardProps) {
  return (
    <Link href={`/gig/${id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-[10px]">
      <div className="tilt-card bg-card rounded-[10px] border border-border p-5 hover:border-primary/40 cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="inline-flex items-center px-2.5 py-1 bg-primary/8 text-primary text-[11px] font-semibold uppercase tracking-wider rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-1.5 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        <div className="border-t border-border pt-4 mt-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {posterAvatar ? (
                <img
                  src={posterAvatar}
                  alt={posterName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-card shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[#083843] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 shadow-sm">
                  {posterName?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{posterName}</p>
                {campus && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{campus}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-muted-foreground font-medium leading-none mb-0.5">FROM</p>
              <p className="text-lg font-bold text-primary leading-none">K{price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
