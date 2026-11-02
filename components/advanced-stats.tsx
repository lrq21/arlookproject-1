'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { chartSeries, genres } from '@/data'
import { GlassCard } from '@/components/glass'

const kpis = [
  { label: 'Total players now', value: '1.82M', change: '+12.4%', status: 'up' },
  { label: 'Top game today', value: 'Brookhaven', change: '640K', status: 'up' },
  { label: 'Rising games', value: '148', change: '+23', status: 'up' },
  { label: 'Market saturation', value: '64/100', change: 'Moderate', status: 'flat' },
] as const

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function ClippedAreaChart() {
  const n = chartSeries.length
  const max = Math.max(...chartSeries) * 1.12
  const pts = chartSeries.map((v, i) => [(i / (n - 1)) * 100, 100 - (v / max) * 100] as const)
  const line = pts.map(([x, y], i) => {
    if (i === 0) return `M ${x} ${y}`
    const mx = (pts[i - 1][0] + x) / 2
    return `C ${mx} ${pts[i - 1][1]}, ${mx} ${y}, ${x} ${y}`
  }).join(' ')
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div>
      <div
        className="relative h-[260px] overflow-hidden rounded-2xl bg-black/20 [background-image:radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:18px_18px]"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setHover(Math.max(0, Math.min(n - 1, Math.round(((e.clientX - r.left) / r.width) * (n - 1)))))
        }}
        onPointerLeave={() => setHover(null)}
      >
        <div className="chart-reveal absolute inset-0">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full overflow-visible">
            <defs>
              <linearGradient id="airlook-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c084fc" stopOpacity=".5" />
                <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${line} L 100 100 L 0 100 Z`} fill="url(#airlook-area)" />
            <path d={line} fill="none" stroke="#e9d5ff" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="drop-shadow-[0_0_8px_rgba(168,85,247,.9)]" />
          </svg>
        </div>
        {hover !== null && (
          <>
            <div className="pointer-events-none absolute inset-y-0 w-px bg-white/30" style={{ left: `${pts[hover][0]}%` }} />
            <div className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_#c084fc]" style={{ left: `${pts[hover][0]}%`, top: `${pts[hover][1]}%` }} />
            <div className="liquid pointer-events-none absolute bg-[#1a0836]/90 whitespace-nowrap -translate-x-1/2 -translate-y-[170%] rounded-xl px-2.5 py-1.5 text-[11px] font-semibold" style={{ left: `${Math.min(88, Math.max(12, pts[hover][0]))}%`, top: `${pts[hover][1]}%` }}>{chartSeries[hover]}K players</div>
          </>
        )}
      </div>
      <div className="mt-3 flex justify-between px-1 text-[10px] text-slate-400">{days.map((d) => <span key={d}>{d}</span>)}</div>
    </div>
  )
}

function GenreDonut() {
  let acc = 0
  const stops = genres.map((g) => { const s = `${g.color} ${acc}% ${acc + g.value}%`; acc += g.value; return s }).join(', ')
  return (
    <div className="flex items-center gap-5">
      <div className="relative size-[132px] shrink-0 rounded-full shadow-[0_0_30px_rgba(139,92,246,.35)]" style={{ background: `conic-gradient(${stops})` }}>
        <div className="absolute inset-[22px] grid place-items-center rounded-full bg-[#14002b]/85 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.2)]"><div><b className="block text-[18px]">1.8M</b><span className="text-[10px] text-slate-400">players</span></div></div>
      </div>
      <div className="flex flex-col gap-2.5">{genres.map((g) => <div key={g.label} className="flex items-center gap-2 text-[11px]"><i className="size-2 rounded-full" style={{ background: g.color }} /><span className="w-16 text-slate-300/80">{g.label}</span><b>{g.value}%</b></div>)}</div>
    </div>
  )
}

export function AdvancedStats() {
  return (
    <section className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard i={1} className="p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">Concurrent players</h2>
              <p className="mt-1 text-[11px] text-slate-400">Last 7 days · across tracked games</p>
            </div>
            <span className="whitespace-nowrap rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">+12.4% vs last week</span>
          </div>
          <ClippedAreaChart />
        </GlassCard>

        <div className="flex flex-col gap-4">
          <GlassCard i={2} className="flex flex-col justify-between p-6">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200/60">Market saturation</p>
              <h4 className="text-xl font-bold tracking-tight">Room to build</h4>
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-3xl font-semibold tracking-tighter">64<span className="text-base text-white/50"> / 100</span></span>
                <span className="mb-1 text-xs font-medium text-violet-200/70">Target: under 50</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="grow-x h-full w-[64%] rounded-full bg-linear-to-r from-[#7c3aed] to-[#e879f9]" /></div>
            </div>
          </GlassCard>
          <GlassCard i={3} className="p-6">
            <h3 className="mb-4 text-[15px] font-semibold tracking-[-0.02em]">Players by genre</h3>
            <GenreDonut />
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k, n) => (
          <GlassCard key={k.label} i={4 + n} className={cn('lift p-5 transition-colors', k.status === 'up' && 'hover:bg-emerald-400/10', k.status === 'flat' && 'hover:bg-violet-400/10')}>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">{k.label}</p>
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-2xl font-black tracking-tighter">{k.value}</p>
              <span className={cn('shrink-0 rounded px-1.5 py-0.5 text-xs font-bold', k.status === 'up' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-violet-400/15 text-violet-200')}>{k.change}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
