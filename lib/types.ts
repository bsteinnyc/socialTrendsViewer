export interface TrendPost {
  id: string
  username: string
  date: string
  content: string
  likes: number
  shares: number
  comments: number
  url: string
  thumbnail?: string
}

export interface Trend {
  id: string
  name: string
  platform: "instagram" | "twitter" | "google" | "youtube"
  date: string
  category: string
  engagement: number
  rank: number
  posts: TrendPost[]
  demographics?: {
    ageGroups: { range: string; percentage: number }[]
    regions: { name: string; percentage: number }[]
  }
  growth?: {
    daily: number[]
    peak: string
  }
}

export interface TrendsResponse {
  trends: Trend[]
  total: number
  page: number
  hasMore: boolean
}

export interface ApiError {
  message: string
  code: string
  status: number
}
