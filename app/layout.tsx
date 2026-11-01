import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'Airlook — Roblox research dashboard', description: 'Research what works on Roblox before you build.', generator: 'Airlook' }
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#050b18' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html> }
