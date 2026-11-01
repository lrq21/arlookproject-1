'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, Compass, Crown, FlaskConical, Home, Rocket, Search, Settings, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const browseLinks = [
  { label: 'Trending now', href: '/explore?tab=trending', icon: TrendingUp },
  { label: 'Rising fast', href: '/explore?tab=rising', icon: Rocket },
  { label: 'Legends', href: '/explore?tab=legends', icon: Crown },
]

const nav = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Browse', href: '/explore', icon: Compass, menu: true },
  { label: 'Developers', href: '/developers', icon: Users },
  { label: 'Idea Maker', href: '/research', icon: FlaskConical },
]

function NavItems({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const item = (active: boolean) => cn(
    'flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-400 transition hover:bg-white/10 hover:text-white',
    compact && 'flex-col gap-1 px-4 py-1.5 text-[10px]',
    active && 'bg-[#2563eb]/25 text-white shadow-[0_0_22px_rgba(59,130,246,.35)] ring-1 ring-[#60a5fa]/40',
  )

  return (
    <div ref={ref} className={cn('flex items-center gap-1', compact && 'w-full justify-around')}>
      {nav.map(({ label, href, icon: Icon, menu }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href) || (menu && pathname.startsWith('/games'))
        if (!menu) return <Link key={href} href={href} className={item(!!active)}><Icon className="size-4" />{label}</Link>
        return (
          <div key={href} className="relative">
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={item(!!active)}>
              <Icon className="size-4" />
              <span className="flex items-center gap-1">{label}<ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} /></span>
            </button>
            {open && (
              <div className={cn('absolute left-0 z-50 w-48 rounded-2xl border border-white/12 bg-[#0b1426]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,.6),0_0_40px_rgba(37,99,235,.15)] backdrop-blur-xl', compact ? 'bottom-16' : 'top-12')}>
                {browseLinks.map(({ label: l, href: h, icon: I }) => (
                  <Link key={h} href={h} onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] text-slate-300 transition hover:bg-[#2563eb]/25 hover:text-white"><I className="size-4 text-[#60a5fa]" />{l}</Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function DashboardShell({ children, title, eyebrow = 'Overview' }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  return <div className="min-h-screen bg-[#050b18] text-white selection:bg-[#2c8dff]/30">
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="ab-orb left-[-12%] top-[-18%] size-[620px] bg-[#1d6bff]/30" />
      <div className="ab-orb ab-orb-2 right-[-10%] top-[8%] size-[520px] bg-[#5b34ff]/25" />
      <div className="ab-floor" />
      <div className="ab-vignette" />
    </div>
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050b18]/70 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3"><span className="grid size-9 overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_0_25px_rgba(36,141,255,.35)]"><img src="/airlook-logo.jpg" alt="Airlook logo" className="size-full object-cover" /></span><span className="hidden text-[17px] font-semibold tracking-[-0.04em] sm:block">Airlook</span></Link>
        <nav className="hidden md:block"><NavItems /></nav>
        <div className="ml-auto flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-400 lg:flex"><Search className="size-3.5" /><span className="text-[11px]">Search games</span><kbd className="ml-5 rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-slate-500">⌘ K</kbd></div><Link href="/notifications" className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white"><Bell className="size-4" /></Link><Link href="/settings" className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white"><Settings className="size-4" /></Link><div className="ml-1 grid size-9 place-items-center rounded-full border border-[#2b8dff]/40 bg-[#12315e] text-xs font-semibold text-[#8cc6ff]">JD</div></div>
      </div>
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050b18]/85 px-2 py-2 backdrop-blur-xl md:hidden"><NavItems compact /></nav>
    <main className="relative z-10 px-5 py-8 pb-28 sm:px-8 md:pb-8 lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="mb-8 flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a9cff]">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{title}</h1></div><div className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-400 sm:block">Last updated <span className="text-slate-200">just now</span></div></div>{children}</div></main>
  </div>
}

export function StatCard({ label, value, detail, tone = 'purple' }: { label: string; value: string; detail: string; tone?: string }) { return <div className="glass lift rounded-2xl border border-white/10 bg-white/[.045] p-5 shadow-[0_16px_50px_rgba(0,0,0,.14)] backdrop-blur-sm"><div className="flex items-center justify-between"><p className="text-[12px] text-slate-400">{label}</p><span className={cn('rounded-full px-2 py-1 text-[10px] font-semibold', tone === 'green' ? 'bg-emerald-400/12 text-emerald-300' : 'bg-[#428fff]/12 text-[#8cc6ff]')}>{detail}</span></div><p className="mt-4 text-[27px] font-semibold tracking-[-0.05em] text-white">{value}</p><div className="mt-3 h-1 rounded-full bg-white/8"><div className={cn('h-full rounded-full', tone === 'green' ? 'w-[74%] bg-emerald-400' : 'w-[62%] bg-[#4b9eff]')} /></div></div> }

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) { return <div className="mb-5 flex items-center justify-between"><h2 className="text-[15px] font-semibold tracking-[-0.02em] text-white">{title}</h2>{action}</div> }
