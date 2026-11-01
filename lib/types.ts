export type Game = {
  id: string
  name: string
  genre: string
  studio: string
  players: string
  playersValue: number
  peak: string
  likes: string
  update: string
  trend: string
  description: string
  color: string
}

export type Studio = { id: string; name: string; games: number; players: string; focus: string; color: string }
export type Opportunity = { title: string; body: string; score: string; tone: string }
