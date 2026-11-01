'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, ChevronDown, Compass, FlaskConical, Home, Menu, Search, Settings, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const browseLinks = [
  { label: 'Trending now', href: '/explore?tab=trending', icon: Sparkles },
  { label: 'Rising fast', href: '/explore?tab=rising', icon: Compass },
  { label: 'Legends', href: '/explore?tab=legends', icon: FlaskConical },
]

const nav = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Developers', href: '/developers', icon: Users },
  { label: 'Idea Maker', href: '/research', icon: FlaskConical },
]

function NavLink({ label, href, icon: Icon, active }: { label: string; href: string; icon: typeof Home; active: boolean }) {
  return <Link href={href} className={cn('flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-400 transition hover:bg-white/10 hover:text-white', active && 'bg-[#2563eb]/25 text-white shadow-[0_0_22px_rgba(37,99,235,.22)]')}><Icon className="size-4" />{label}</Link>
}

export function DashboardShell({ children, title, eyebrow = 'Overview' }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  const pathname = usePathname()
  const browseActive = pathname === '/explore'

  return <div className="min-h-screen overflow-hidden bg-[#050b18] text-white selection:bg-[#2c8dff]/30">
    <div className="airlook-orbs pointer-events-none fixed inset-0" aria-hidden="true"><div className="airlook-orb airlook-orb-one" /><div className="airlook-orb airlook-orb-two" /><div className="airlook-orb airlook-orb-three" /><div className="airlook-grid" /></div>
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050b18]/65 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4">
        <Link href="/" className="group flex shrink-0 items-center gap-3"><span className="grid size-9 overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_0_25px_rgba(36,141,255,.28)]"><img src="/airlook-logo.jpg" alt="Airlook logo" className="size-full object-cover" /></span><span className="hidden text-[17px] font-semibold tracking-[-0.04em] sm:block">Airlook</span></Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink label="Home" href="/" icon={Home} active={pathname === '/'} />
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className={cn('gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-400 hover:bg-white/10 hover:text-white', browseActive && 'bg-[#2563eb]/25 text-white shadow-[0_0_22px_rgba(37,99,235,.22)]')}><Compass className="size-4" />Browse<ChevronDown className="size-3 transition-transform data-[state=open]:rotate-180" /></Button></DropdownMenuTrigger><DropdownMenuContent align="start" className="w-48 border-white/10 bg-[#101b30]/95 p-2 text-slate-300 backdrop-blur-xl">{browseLinks.map(({ label, href, icon: Icon }) => <DropdownMenuItem key={href} asChild className="rounded-xl focus:bg-[#2563eb]/25 focus:text-white"><Link href={href}><Icon className="mr-2 size-3.5" />{label}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
          {nav.slice(1).map(item => <NavLink key={item.href} {...item} active={pathname === item.href} />)}
        </nav>
        <div className="ml-auto flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-400 lg:flex"><Search className="size-3.5" /><span className="text-[11px]">Search games</span><kbd className="ml-5 rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-slate-500">⌘ K</kbd></div><Link href="/notifications" aria-label="Notifications" className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white"><Bell className="size-4" /></Link><Link href="/settings" aria-label="Settings" className="hidden size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white sm:grid"><Settings className="size-4" /></Link><div className="ml-1 grid size-9 place-items-center rounded-full border border-[#2b8dff]/40 bg-[#12315e] text-xs font-semibold text-[#8cc6ff]">JD</div><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="text-slate-300 md:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger><SheetContent className="border-white/10 bg-[#071225] text-white"><SheetHeader><SheetTitle className="text-left">Airlook</SheetTitle></SheetHeader><div className="mt-8 flex flex-col gap-2"><NavLink label="Home" href="/" icon={Home} active={pathname === '/'} /><details className="group"><summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300"><Compass className="size-4" />Browse<ChevronDown className="ml-auto size-4 transition group-open:rotate-180" /></summary><div className="ml-6 mt-1 flex flex-col gap-1">{browseLinks.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-white/10 hover:text-white"><Icon className="size-3.5" />{label}</Link>)}</div></details>{nav.slice(1).map(item => <NavLink key={item.href} {...item} active={pathname === item.href} />)}</div></SheetContent></Sheet></div>
      </div>
    </header>
    <main className="relative z-10 px-5 py-8 sm:px-8 lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="mb-8 flex items-end justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a9cff]">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{title}</h1></div><div className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-400 sm:block">Last updated <span className="text-slate-200">just now</span></div></div>{children}</div></main>
  </div>
}

export function StatCard({ label, value, detail, tone = 'purple' }: { label: string; value: string; detail: string; tone?: string }) { return <div className="dashboard-surface rounded-2xl border border-white/10 bg-white/[.045] p-5 shadow-[0_16px_50px_rgba(0,0,0,.14)] backdrop-blur-sm"><div className="flex items-center justify-between"><p className="text-[12px] text-slate-400">{label}</p><span className={cn('rounded-full px-2 py-1 text-[10px] font-semibold', tone === 'green' ? 'bg-emerald-400/12 text-emerald-300' : 'bg-[#428fff]/12 text-[#8cc6ff]')}>{detail}</span></div><p className="mt-4 text-[27px] font-semibold tracking-[-0.05em] text-white">{value}</p><div className="mt-3 h-1 rounded-full bg-white/8"><div className={cn('h-full rounded-full', tone === 'green' ? 'w-[74%] bg-emerald-400' : 'w-[62%] bg-[#4b9eff]')} /></div></div> }

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) { return <div className="mb-5 flex items-center justify-between"><h2 className="text-[15px] font-semibold tracking-[-0.02em] text-white">{title}</h2>{action}</div> }
