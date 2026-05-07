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
      <div className="group bg-card rounded-[10px] border border-border p-6 text-center hover:border-primary hover:bg-secondary hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col items-center gap-3">
        <Icon className="w-8 h-8 text-primary transition-transform duration-200 group-hover:scale-110" />
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
