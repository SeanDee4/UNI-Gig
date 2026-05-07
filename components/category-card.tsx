import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface CategoryCardProps {
  name: string
  icon: LucideIcon
  count?: number
  href?: string
}

export function CategoryCard({
  name,
  icon: Icon,
  count,
  href = '#',
}: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="bg-card rounded-[10px] border border-border p-6 text-center hover:border-primary hover:bg-secondary transition-all cursor-pointer flex flex-col items-center gap-3">
        <Icon className="w-8 h-8 text-primary" />
        <div>
          <h3 className="font-semibold text-foreground text-sm">{name}</h3>
          {count !== undefined && (
            <p className="text-xs text-muted-foreground mt-1">{count} gigs</p>
          )}
        </div>
      </div>
    </Link>
  )
}
