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
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-[12px]">
      <div className="tilt-card group bg-card rounded-[12px] border border-border p-5 text-center hover:border-primary cursor-pointer flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center transition-all duration-200 group-hover:bg-primary group-hover:scale-110">
          <Icon className="w-6 h-6 text-primary transition-colors duration-200 group-hover:text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">{name}</h3>
          {count !== undefined && (
            <p className="text-xs text-muted-foreground mt-0.5">{count} gigs</p>
          )}
        </div>
      </div>
    </Link>
  )
}
