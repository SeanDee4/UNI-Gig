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
    <Link href={`/gig/${id}`}>
      <div className="bg-card rounded-[10px] border border-border p-4 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-2.5 py-1 bg-secondary text-primary text-xs font-medium rounded-[6px]">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-4 mt-auto">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={posterAvatar}
                alt={posterName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {posterName}
                </p>
                {campus && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{campus}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary">K{price}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
