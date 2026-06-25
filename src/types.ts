export type ThemeName = 'light' | 'dark' | 'vice'

export interface ReleaseData {
  title: string
  shortTitle: string
  tagline: string
  releaseDateISO: string
  announcementDateISO: string
  displayDate: string
  publisher: string
  developer: string
  engine: string
  genre: string
  ageRating: string
  setting: string
  platforms: string[]
  gameModes: string[]
  protagonists: string[]
  trailerId: string
  officialUrl: string
}

export interface TimeLeft {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
  isReleased: boolean
  progress: number // 0..1 from announcement -> release
}

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
  badge?: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  status: 'done' | 'upcoming' | 'future'
  icon: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface GalleryItem {
  id: string
  type: 'screenshot' | 'artwork' | 'wallpaper' | 'video'
  title: string
  caption: string
  gradient: string[]
  youtubeId?: string
}

export interface NewsItem {
  id: string
  date: string
  tag: string
  title: string
  summary: string
}

export interface Wallpaper {
  id: string
  name: string
  gradient: string[]
}
