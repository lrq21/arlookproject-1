'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BarChart3, Bell, ChevronDown, Compass, FlaskConical, Gamepad2, Home, Menu, Settings, Sparkles, Users, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const mainLinks = [
  { label: 'Overview', href: '/', icon: Home },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: 'Developers', href: '/developers', icon: Users },
  { label: 'Idea Researcher', href: '/research', icon: FlaskConical },
]

export function DashboardShell({ children, title, eyebrow = 'Overview' }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(true)
  return <div className="min-h-screen bg-[#fafafa] text-[#16151c]">
    <aside className={cn('fixed inset-y-0 left-0 z-20 flex w-[246px] flex-col border-r border-[#e9e8ec] bg-white px-5 py-6 transition-transform lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
      <div className="mb-10 flex items-center justify-between px-2"><Link href="/" className="flex items-center gap-2.5 text-[18px] font-semibold tracking-[-0.04em]"><span className="grid size-7 place-items-center rounded-[9px] bg-[#7565e8] text-white"><Sparkles className="size-4" /></span>Airlook</Link><button onClick={() => setOpen(false)} className="lg:hidden"><X className="size-4" /></button></div>
      <nav className="flex flex-1 flex-col gap-1"><p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a4a1aa]">Main</p>{mainLinks.map(({ label, href, icon: Icon }) => <div key={href}><Link onClick={() => setOpen(false)} href={href} className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#77747e] transition-colors hover:bg-[#f5f3ff] hover:text-[#5d50c7]', pathname === href && 'bg-[#f1efff] text-[#6152d4]')}><Icon className="size-[17px]" />{label}</Link>{label === 'Explore' && <><button onClick={() => setExploreOpen(!exploreOpen)} className="absolute ml-[205px] mt-[-30px] text-[#aaa7b0]"><ChevronDown className={cn('size-3.5 transition-transform', !exploreOpen && '-rotate-90')} /></button>{exploreOpen && <div className="ml-9 mt-1 flex flex-col gap-1 border-l border-[#e6e3f5] pl-3"><Link href="/explore?tab=trending" className="py-1 text-[12px] text-[#9996a0] hover:text-[#6152d4]">Trending now</Link><Link href="/explore?tab=rising" className="py-1 text-[12px] text-[#9996a0] hover:text-[#6152d4]">Rising fast</Link><Link href="/explore?tab=legends" className="py-1 text-[12px] text-[#9996a0] hover:text-[#6152d4]">Legends</Link></div>}</>}</div>)}</nav>
      <div className="flex flex-col gap-1 border-t border-[#efedf1] pt-5"><Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#77747e] hover:bg-[#f5f3ff]"><Settings className="size-[17px]" />Settings</Link><Link href="/notifications" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#77747e] hover:bg-[#f5f3ff]"><Bell className="size-[17px]" />Notifications<span className="ml-auto size-1.5 rounded-full bg-[#7565e8]" /></Link><div className="mt-6 flex items-center gap-3 px-2"><div className="grid size-8 place-items-center rounded-full bg-[#eeeaff] text-xs font-semibold text-[#7565e8]">JD</div><div><p className="text-xs font-semibold">Jordan Davis</p><p className="text-[10px] text-[#aaa7b0]">Creator workspace</p></div></div></div>
    </aside>
    {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-10 bg-black/10 lg:hidden" />}
    <main className="lg:pl-[246px]"><header className="flex h-[76px] items-center justify-between border-b border-[#eeedf0] bg-white px-6 sm:px-10"><button onClick={() => setOpen(true)} className="lg:hidden"><Menu className="size-5" /></button><div className="hidden sm:block"><p className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#aaa7b0]">{eyebrow}</p><h1 className="mt-1 text-[20px] font-semibold tracking-[-0.03em]">{title}</h1></div><div className="flex items-center gap-3 sm:ml-auto"><PeriodSelector /><div className="hidden h-7 w-px bg-[#eceaef] sm:block" /><span className="grid size-8 place-items-center rounded-full bg-[#eeeaff] text-xs font-semibold text-[#7565e8]">JD</span></div></header><div className="p-5 sm:p-8 lg:p-10">{children}</div></main>
  </div>
}

function PeriodSelector() { const [period, setPeriod] = useState('7d'); return <div className="flex rounded-lg border border-[#e8e6eb] bg-white p-0.5 text-[11px] font-medium text-[#9996a0]">{['24h','7d','30d'].map(item => <button key={item} onClick={() => setPeriod(item)} className={cn('rounded-md px-2.5 py-1.5', period === item && 'bg-[#f1efff] text-[#6656d7]')}>{item}</button>)}</div> }

export function StatCard({ label, value, detail, tone = 'purple' }: { label: string; value: string; detail: string; tone?: string }) { return <div className="rounded-2xl border border-[#ebe9ee] bg-white p-5 shadow-[0_2px_10px_rgba(32,27,55,0.02)]"><div className="flex items-center justify-between"><p className="text-[12px] text-[#96939d]">{label}</p><span className={cn('rounded-full px-2 py-1 text-[10px] font-semibold', tone === 'green' ? 'bg-[#e8f7ef] text-[#45a56f]' : 'bg-[#f0edff] text-[#7565e8]')}>{detail}</span></div><p className="mt-4 text-[25px] font-semibold tracking-[-0.05em]">{value}</p><div className="mt-3 h-1 rounded-full bg-[#f0eff3]"><div className={cn('h-full rounded-full', tone === 'green' ? 'w-[74%] bg-[#8cd4a7]' : 'w-[62%] bg-[#9a8ff0]')} /></div></div> }

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) { return <div className="mb-5 flex items-center justify-between"><h2 className="text-[15px] font-semibold tracking-[-0.02em]">{title}</h2>{action}</div> }
