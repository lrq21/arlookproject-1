import Link from 'next/link'
import { cn } from '@/lib/utils'

/** Liquid-glass card. Pass `i` to get the staggered entrance animation. */
export function GlassCard({ i, className, children }: { i?: number; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn('liquid', i !== undefined && 'reveal', className)}
      style={i !== undefined ? ({ '--i': i } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}

/** Raised 3D glass button as a link. */
export function GlassLink({ href, className, ghost, children }: { href: string; className?: string; ghost?: boolean; children: React.ReactNode }) {
  return <Link href={href} className={cn('glass-btn', ghost && 'glass-btn-ghost', className)}>{children}</Link>
}

/** Raised 3D glass button. */
export function GlassButton({ className, ghost, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { ghost?: boolean }) {
  return <button className={cn('glass-btn', ghost && 'glass-btn-ghost', className)} {...props} />
}
