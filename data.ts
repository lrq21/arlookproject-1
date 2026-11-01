import type { Game, Opportunity, Studio } from '@/lib/types'

export const games: Game[] = [
  { id: 'brookhaven', name: 'Brookhaven RP', genre: 'Roleplay', studio: 'Wolfpaq', players: '640K', playersValue: 640, peak: '820K', likes: '91%', update: '2h ago', trend: '+18.4%', description: 'A social roleplay world built around freedom, identity, and everyday stories.', color: '#e8e1ff' },
  { id: 'blox-fruits', name: 'Blox Fruits', genre: 'RPG', studio: 'Gamer Robot', players: '412K', playersValue: 412, peak: '680K', likes: '89%', update: '5h ago', trend: '+12.8%', description: 'Train to become the strongest fighter across a sprawling anime-inspired world.', color: '#dceeff' },
  { id: 'adopt-me', name: 'Adopt Me!', genre: 'Simulator', studio: 'Uplift Games', players: '385K', playersValue: 385, peak: '510K', likes: '92%', update: '1d ago', trend: '+8.2%', description: 'Collect, care for, and trade pets in a warm social neighborhood.', color: '#ffe7c7' },
  { id: 'doors', name: 'DOORS', genre: 'Horror', studio: 'LSPLASH', players: '204K', playersValue: 204, peak: '390K', likes: '94%', update: '3h ago', trend: '+24.1%', description: 'Escape an ever-changing hotel where every door hides a new threat.', color: '#d9f5e5' },
  { id: 'tower-defense', name: 'Tower Defense X', genre: 'Strategy', studio: 'Kloon', players: '96K', playersValue: 96, peak: '152K', likes: '88%', update: '8h ago', trend: '+31.6%', description: 'Build, upgrade, and coordinate defenses against relentless waves.', color: '#f9d9e4' },
  { id: 'bee-swarm', name: 'Bee Swarm Simulator', genre: 'Simulator', studio: 'Onett', players: '82K', playersValue: 82, peak: '125K', likes: '90%', update: '4d ago', trend: '+4.6%', description: 'Grow your hive, collect pollen, and unlock a world of friendly bees.', color: '#fff0bc' },
]

export const studios: Studio[] = [
  { id: 'wolfpaq', name: 'Wolfpaq', games: 3, players: '710K', focus: 'Social worlds', color: '#e8e1ff' },
  { id: 'uplift', name: 'Uplift Games', games: 5, players: '412K', focus: 'Collection & care', color: '#ffe7c7' },
  { id: 'lsplash', name: 'LSPLASH', games: 2, players: '238K', focus: 'Horror systems', color: '#d9f5e5' },
  { id: 'kloon', name: 'Kloon', games: 4, players: '175K', focus: 'Strategy', color: '#f9d9e4' },
]

export const opportunities: Opportunity[] = [
  { title: 'Cozy co-op is under-served', body: 'Social simulators have strong session depth, but few games combine decorating with small-group goals.', score: 'High potential', tone: 'lavender' },
  { title: 'Horror retention is rising', body: 'Short horror loops are pulling players back weekly when updates introduce one memorable new threat.', score: 'Watch closely', tone: 'mint' },
  { title: 'Progression feels too linear', body: 'Top RPGs leave room for player-owned builds and more expressive paths through the first 30 minutes.', score: 'Open space', tone: 'peach' },
]

export const genres = [
  { label: 'Simulator', value: 32, color: '#8b7cf6' },
  { label: 'Obby', value: 23, color: '#b4a9ff' },
  { label: 'RPG', value: 19, color: '#d5cffd' },
  { label: 'Horror', value: 14, color: '#e7e2ff' },
  { label: 'Tycoon', value: 12, color: '#f0edff' },
]

export const chartSeries = [48, 52, 49, 58, 63, 60, 72, 68, 77, 84, 82, 91, 88, 96, 104, 111, 108, 122, 130, 126, 144]
