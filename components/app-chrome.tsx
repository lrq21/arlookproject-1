'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, Compass, Crown, FlaskConical, Home, Rocket, Settings, TrendingUp, Users } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const items = [
  { value: 'home', label: 'Home', href: '/', icon: Home },
  { value: 'browse', label: 'Browse', href: '/explore', icon: Compass },
  { value: 'developers', label: 'Developers', href: '/developers', icon: Users },
  { value: 'idea', label: 'Idea Maker', href: '/research', icon: FlaskConical },
]

const browse = [
  { label: 'Trending now', href: '/explore?tab=trending', icon: TrendingUp },
  { label: 'Rising fast', href: '/explore?tab=rising', icon: Rocket },
  { label: 'Legends', href: '/explore?tab=legends', icon: Crown },
]

function currentTab(path: string) {
  if (path === '/') return 'home'
  if (path.startsWith('/explore') || path.startsWith('/games')) return 'browse'
  if (path.startsWith('/developers')) return 'developers'
  if (path.startsWith('/research')) return 'idea'
  return ''
}

function GlassNav({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const value = currentTab(pathname)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [box, setBox] = useState<Record<string, { x: number; w: number }>>({})
  const wrap = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    const next: Record<string, { x: number; w: number }> = {}
    list.current?.querySelectorAll<HTMLElement>('[data-nav]').forEach((el) => {
      next[el.dataset.nav as string] = { x: el.offsetLeft, w: el.offsetWidth }
    })
    setBox(next)
  }, [])

  useLayoutEffect(() => {
    measure()
    const raf = requestAnimationFrame(() => setReady(true))
    const ro = new ResizeObserver(measure)
    if (list.current) ro.observe(list.current)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [measure])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const close = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  const pill = (key: string | null, cls: string) => {
    const b = key ? box[key] : undefined
    return <span aria-hidden data-ready={ready} className={cn('nav-pill', cls)} style={{ transform: `translateX(${b?.x ?? 0}px)`, width: b?.w ?? 0, opacity: b ? 1 : 0 }} />
  }

  return (
    <div ref={wrap} className={cn('relative', compact && 'w-full')}>
      <Tabs
        value={value}
        activationMode="manual"
        onValueChange={(v) => {
          const t = items.find((n) => n.value === v)
          if (t && v !== 'browse') router.push(t.href)
        }}
      >
        <TabsList
          ref={list}
          onPointerLeave={() => setHover(null)}
          className={cn('relative h-auto gap-0.5 bg-transparent p-0 text-white', compact ? 'grid w-full grid-cols-4' : 'flex')}
        >
          {pill(hover !== value ? hover : null, 'nav-pill-hover')}
          {pill(value || null, 'nav-pill-active')}
          {items.map(({ value: v, label, icon: Icon, href }) => (
            <TabsTrigger
              key={v}
              value={v}
              data-nav={v}
              aria-haspopup={v === 'browse' ? 'menu' : undefined}
              aria-expanded={v === 'browse' ? open : undefined}
              onPointerEnter={() => { setHover(v); router.prefetch(href) }}
              onClick={v === 'browse' ? () => setOpen((o) => !o) : undefined}
              className={cn(
                'relative z-10 gap-2 rounded-[18px] px-4 py-2.5 text-[12.5px] text-white/65 hover:text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none',
                compact && 'flex-col gap-1 px-2 py-2 text-[10.5px]',
              )}
            >
              <Icon className="size-4" />
              <span className="flex items-center gap-1">
                {label}
                {v === 'browse' && <ChevronDown className={cn('size-3 transition-transform duration-300', open && 'rotate-180')} />}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {open && (
        <div
          role="menu"
          className={cn('liquid glass-pop absolute z-50 w-52 rounded-[22px] bg-[#1a0836]/95 p-1.5', compact ? 'bottom-[calc(100%+14px)]' : 'top-[calc(100%+14px)]')}
          style={{ left: box.browse?.x ?? 0 }}
        >
          {browse.map(({ label, href, icon: Icon }, n) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              style={{ '--i': n } as React.CSSProperties}
              className="glass-item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[12.5px] text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <span className="grid size-8 place-items-center rounded-xl bg-violet-400/20 text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,.3)]"><Icon className="size-4" /></span>
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function AppChrome() {
  return (
    <>
      <div aria-hidden className="app-bg">
        <div className="app-glow app-glow-1" />
        <div className="app-glow app-glow-2" />
        <div className="app-floor" />
      </div>

      <header className="sticky top-3 z-40 px-3 sm:px-6">
        <div className="liquid nav3d mx-auto flex max-w-[1440px] items-center gap-3 rounded-[28px] px-3 py-2.5 sm:gap-5 sm:px-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="grid size-10 overflow-hidden rounded-2xl bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_0_26px_rgba(168,85,247,.55)] ring-1 ring-white/20">
              <img src="/airlook-logo.jpg" alt="Airlook logo" className="size-full object-cover" />
            </span>
            <span className="hidden text-[17px] font-semibold tracking-[-0.04em] sm:block">Airlook</span>
          </Link>
          <nav className="hidden md:block"><GlassNav /></nav>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/notifications" aria-label="Notifications" className="glass-icon"><Bell className="size-4" /></Link>
            <Link href="/settings" aria-label="Settings" className="glass-icon"><Settings className="size-4" /></Link>
            <div className="ml-1 grid size-10 place-items-center rounded-2xl bg-linear-to-b from-[#c4b5fd] to-[#6d28d9] text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.55),0_4px_0_rgba(46,16,101,.7),0_8px_20px_rgba(124,58,237,.45)]">JD</div>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <div className="liquid nav3d rounded-[26px] p-1.5"><GlassNav compact /></div>
      </nav>
    </>
  )
}
