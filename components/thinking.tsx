'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEP_MS = 900

/** "AI is thinking" state: animated dot grid + scanning glow + step list. */
export function ThinkingOverlay({ steps, className }: { steps: string[]; className?: string }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => Math.min(v + 1, steps.length - 1)), STEP_MS)
    return () => clearInterval(t)
  }, [steps.length])

  return (
    <div className={cn('liquid relative min-h-[420px] overflow-hidden', className)} role="status" aria-live="polite">
      <div className="think-dots absolute inset-0" />
      <div className="think-dots think-scan absolute inset-0" />
      <div className="think-vignette absolute inset-0" />
      <div className="relative z-10 grid min-h-[420px] place-items-center p-8 text-center">
        <div>
          <div className="think-orb mx-auto mb-6 grid size-16 place-items-center rounded-full">
            <Sparkles className="size-6 text-white" />
          </div>
          <p key={i} className="think-step text-sm font-medium text-white">{steps[i]}…</p>
          <div className="mx-auto mt-5 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <div className="grow-x h-full rounded-full bg-linear-to-r from-[#7c3aed] to-[#e879f9]" style={{ animationDuration: `${steps.length * (STEP_MS / 1000)}s`, animationDelay: '0s', animationTimingFunction: 'linear' }} />
          </div>
          <div className="mt-4 flex justify-center gap-1.5">
            {steps.map((_, n) => <i key={n} className={cn('size-1.5 rounded-full transition-colors duration-300', n <= i ? 'bg-[#c4b5fd]' : 'bg-white/15')} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
