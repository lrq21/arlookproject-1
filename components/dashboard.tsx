'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bell, ChevronDown, Compass, FlaskConical, Gamepad2, Home, Search, Settings, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const browseLinks = [
  { label: 'Trending now', href: '/explore?tab=trending' },
  { label: 'Rising fast', href: '/explore?tab=rising' },
  { label: 'Legends', href: '/explore?tab=legends' },
]

export function DashboardShell({ children, title, eyebrow = 'Overview' }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  const pathname = usePathname()
  const [browseOpen, setBrowseOpen] = useState(false)
  const nav = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Browse', href: '/explore', icon: Compass, menu: true },
    { label: 'Developers', href: '/developers', icon: Users },
    { label: 'Idea Maker', href: '/research', icon: FlaskConical },
  ]
  return <div className="min-h-screen bg-[#050b18] text-white selection:bg-[#2c8dff]/30">
    <div className="pointer-events-none fixed inset-0 overflow-hidden"><div className="absolute left-[-12%] top-[-18%] h-[620px] w-[620px] rounded-full bg-[#0b5dd7]/20 blur-[110px]" /><div className="absolute right-[-10%] top-[18%] h-[520px] w-[520px] rounded-full bg-[#5f2cff]/16 blur-[120px]" /><div className="absolute bottom-[-25%] left-[35%] h-[620px] w-[620px] rounded-full bg-[#0b75d8]/12 blur-[130px]" /></div>
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050b18]/78 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3"><span className="grid size-9 overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_0_25px_rgba(36,141,255,.28)]"><img src="/airlook-logo.jpg" alt="Airlook logo" className="size-full object-cover" /></span><span className="hidden text-[17px] font-semibold tracking-[-0.04em] sm:block">Airlook</span></Link>
        <nav className="hidden items-center gap-1 md:flex">{nav.map(({ label, href, icon: Icon, menu }) => <div key={href} className="relative"><Link href={href} onClick={() => menu && setBrowseOpen(!browseOpen)} className={cn('flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-400 transition hover:bg-white/8 hover:text-white', (pathname === href || (menu && pathname === '/explore')) && 'bg-white/10 text-white')}><Icon className="size-4" />{label}{menu && <ChevronDown className={cn('size-3 transition-transform', browseOpen && 'rotate-180')} />}</Link>{menu && browseOpen && <div className="absolute left-0 top-12 w-44 rounded-2xl border border-white/12 bg-[#101b30]/96 p-2 shadow-2xl backdrop-blur-xl">{browseLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setBrowseOpen(false)} className="block rounded-xl px-3 py-2.5 text-[12px] text-slate-300 transition hover:bg-[#1c5fb0]/30 hover:text-white">{item.label}</Link>)}</div>}</div>)}</nav>
        <div className="ml-auto flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-400 lg:flex"><Search className="size-3.5" /><span className="text-[11px]">Search games</span><kbd className="ml-5 rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-slate-500">⌘ K</kbd></div><Link href="/notifications" className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white"><Bell className="size-4" /></Link><Link href="/settings" className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white"><Settings className="size-4" /></Link><div className="ml-1 grid size-9 place-items-center rounded-full border border-[#2b8dff]/40 bg-[#12315e] text-xs font-semibold text-[#8cc6ff]">JD</div></div>
      </div>
    </header>
    <main className="relative z-10 px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="mb-8 flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a9cff]">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{title}</h1></div><div className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-400 sm:block">Last updated <span className="text-slate-200">just now</span></div></div>{children}</div></main>
  </div>
}

export function StatCard({ label, value, detail, tone = 'purple' }: { label: string; value: string; detail: string; tone?: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.045] p-5 shadow-[0_16px_50px_rgba(0,0,0,.14)] backdrop-blur-sm"><div className="flex items-center justify-between"><p className="text-[12px] text-slate-400">{label}</p><span className={cn('rounded-full px-2 py-1 text-[10px] font-semibold', tone === 'green' ? 'bg-emerald-400/12 text-emerald-300' : 'bg-[#428fff]/12 text-[#8cc6ff]')}>{detail}</span></div><p className="mt-4 text-[27px] font-semibold tracking-[-0.05em] text-white">{value}</p><div className="mt-3 h-1 rounded-full bg-white/8"><div className={cn('h-full rounded-full', tone === 'green' ? 'w-[74%] bg-emerald-400' : 'w-[62%] bg-[#4b9eff]')} /></div></div> }

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) { return <div className="mb-5 flex items-center justify-between"><h2 className="text-[15px] font-semibold tracking-[-0.02em] text-white">{title}</h2>{action}</div> }
