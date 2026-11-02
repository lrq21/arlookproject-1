import Link from 'next/link'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { games, opportunities } from '@/data'
import { DashboardShell, SectionTitle } from '@/components/dashboard'
import { GlassCard, GlassLink } from '@/components/glass'
import { AdvancedStats } from '@/components/advanced-stats'

export default function Page() {
  return (
    <DashboardShell title="Good morning, Jordan">
      <div className="mb-7 flex items-end justify-between gap-4">
        <p className="text-sm text-slate-300/80">Here&apos;s what&apos;s happening across Roblox today.</p>
        <GlassLink href="/research" className="hidden sm:inline-flex">Research an idea <ArrowUpRight className="size-3.5" /></GlassLink>
      </div>

      <AdvancedStats />

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <GlassCard i={8} className="p-6">
          <SectionTitle title="Top games" action={<Link href="/explore" className="flex items-center gap-1 text-[11px] font-semibold text-[#c4b5fd]">View all <ChevronRight className="size-3" /></Link>} />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[590px] text-left text-[12px]">
              <thead className="border-b border-white/10 text-[10px] uppercase tracking-[.08em] text-slate-400">
                <tr><th className="pb-3 font-medium">Game</th><th className="pb-3 font-medium">Players now</th><th className="pb-3 font-medium">Peak</th><th className="pb-3 font-medium">Likes</th><th className="pb-3 font-medium">Updated</th></tr>
              </thead>
              <tbody>
                {games.slice(0, 4).map((game) => (
                  <tr key={game.id} className="border-b border-white/5 transition hover:bg-white/5 last:border-0">
                    <td className="py-3"><Link href={`/games/${game.id}`} className="flex items-center gap-3 font-semibold hover:text-[#c4b5fd]"><span className="grid size-8 place-items-center rounded-xl text-[10px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.4)]" style={{ background: game.color }}>{game.name.slice(0, 2).toUpperCase()}</span>{game.name}</Link></td>
                    <td className="py-3 font-medium">{game.players}</td>
                    <td className="py-3 text-slate-400">{game.peak}</td>
                    <td className="py-3 text-emerald-400">{game.likes}</td>
                    <td className="py-3 text-slate-400">{game.update}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard i={9} className="p-6">
          <SectionTitle title="Opportunity signals" action={<span className="rounded-full bg-violet-400/20 px-2 py-1 text-[10px] font-semibold text-violet-200">3 new</span>} />
          <div className="flex flex-col gap-3">
            {opportunities.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/5 p-3.5 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="flex items-start justify-between gap-2"><p className="text-xs font-semibold">{item.title}</p><ArrowUpRight className="size-3.5 shrink-0 text-[#c4b5fd]" /></div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-300/70">{item.body}</p>
                <Link href="/research" className="mt-3 block text-[11px] font-semibold text-[#c4b5fd]">Research this →</Link>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardShell>
  )
}
