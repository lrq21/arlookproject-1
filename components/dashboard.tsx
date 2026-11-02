import { cn } from '@/lib/utils'

/** Page content wrapper. The header, nav and background live in AppChrome (layout). */
export function DashboardShell({ children, title, eyebrow = 'Overview' }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  return (
    <main className="relative z-10 px-4 pb-32 pt-8 sm:px-8 md:pb-12 lg:px-10">
      <div className="page-in mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c4b5fd]">{eyebrow}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{title}</h1>
          </div>
          <div className="glass-icon hidden !w-auto px-3 text-[11px] text-slate-300 sm:flex">Last updated&nbsp;<span className="text-white">just now</span></div>
        </div>
        {children}
      </div>
    </main>
  )
}

export function StatCard({ label, value, detail, tone = 'purple' }: { label: string; value: string; detail: string; tone?: string }) {
  return (
    <div className="liquid lift p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-slate-300/80">{label}</p>
        <span className={cn('rounded-full px-2 py-1 text-[10px] font-semibold', tone === 'green' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-violet-400/15 text-violet-200')}>{detail}</span>
      </div>
      <p className="mt-4 text-[27px] font-semibold tracking-[-0.05em] text-white">{value}</p>
      <div className="mt-3 h-1 rounded-full bg-white/10"><div className={cn('grow-x h-full rounded-full', tone === 'green' ? 'w-[74%] bg-emerald-400' : 'w-[62%] bg-linear-to-r from-[#7c3aed] to-[#e879f9]')} /></div>
    </div>
  )
}

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return <div className="mb-5 flex items-center justify-between"><h2 className="text-[15px] font-semibold tracking-[-0.02em] text-white">{title}</h2>{action}</div>
}
