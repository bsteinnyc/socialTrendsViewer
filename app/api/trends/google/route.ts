import { type NextRequest, NextResponse } from "next/server"
import type { Trend } from "@/lib/types"

const googleTrendsData: Record<string, Trend[]> = {
  "2024-12": [
    {
      id: "g_2024_12_1",
      name: "ChatGPT alternatives",
      platform: "google",
      date: "2024-12-10",
      category: "Technology",
      engagement: 8900000,
      rank: 1,
      posts: [
        {
          id: "g_post_2024_12_1",
          username: "tech_comparison",
          date: "Dec 10, 2024",
          content: "Comprehensive comparison of ChatGPT vs Claude vs Gemini - which AI assistant is best for you?",
          likes: 67890,
          shares: 23450,
          comments: 8970,
          url: "https://techblog.com/ai-comparison-2024",
        },
      ],
    },
    {
      id: "g_2024_12_2",
      name: "Christmas gift ideas 2024",
      platform: "google",
      date: "2024-12-15",
      category: "Shopping",
      engagement: 12500000,
      rank: 2,
      posts: [
        {
          id: "g_post_2024_12_2",
          username: "gift_guide",
          date: "Dec 15, 2024",
          content: "50 Best Christmas Gift Ideas for 2024 - From Tech Gadgets to Personalized Presents",
          likes: 89450,
          shares: 34560,
          comments: 12340,
          url: "https://giftguide.com/christmas-2024",
        },
      ],
    },
  ],
  "2024-11": [
    {
      id: "g_2024_11_1",
      name: "Black Friday deals 2024",
      platform: "google",
      date: "2024-11-29",
      category: "Shopping",
      engagement: 15600000,
      rank: 1,
      posts: [
        {
          id: "g_post_2024_11_1",
          username: "deal_hunter",
          date: "Nov 29, 2024",
          content: "Live Black Friday 2024 Deals: Best discounts on electronics, fashion, and home goods",
          likes: 123450,
          shares: 45670,
          comments: 18900,
          url: "https://deals.com/black-friday-2024",
        },
      ],
    },
  ],
  "2023-07": [
    {
      id: "g_2023_07_1",
      name: "Threads app",
      platform: "google",
      date: "2023-07-06",
      category: "Technology",
      engagement: 18900000,
      rank: 1,
      posts: [
        {
          id: "g_post_2023_07_1",
          username: "social_media_news",
          date: "Jul 6, 2023",
          content: "Meta's Threads app hits 10 million users in 7 hours - Is this the Twitter killer?",
          likes: 234560,
          shares: 89450,
          comments: 34560,
          url: "https://socialnews.com/threads-launch-2023",
        },
      ],
    },
  ],
  "2020-03": [
    {
      id: "g_2020_03_1",
      name: "Coronavirus symptoms",
      platform: "google",
      date: "2020-03-15",
      category: "Health",
      engagement: 45600000,
      rank: 1,
      posts: [
        {
          id: "g_post_2020_03_1",
          username: "health_authority",
          date: "Mar 15, 2020",
          content: "COVID-19 Symptoms: What to watch for and when to seek medical attention - Official WHO guidelines",
          likes: 567890,
          shares: 234560,
          comments: 89450,
          url: "https://health.gov/covid-symptoms",
        },
      ],
    },
  ],
  "2016-11": [
    {
      id: "g_2016_11_1",
      name: "Election results 2016",
      platform: "google",
      date: "2016-11-08",
      category: "Politics",
      engagement: 28900000,
      rank: 1,
      posts: [
        {
          id: "g_post_2016_11_1",
          username: "election_tracker",
          date: "Nov 8, 2016",
          content: "Live Election Results 2016: Real-time vote counts and electoral college updates",
          likes: 445670,
          shares: 156780,
          comments: 67890,
          url: "https://elections.com/results-2016",
        },
      ],
    },
  ],
  "2015-04": [
    {
      id: "g_2015_04_1",
      name: "Apple Watch",
      platform: "google",
      date: "2015-04-24",
      category: "Technology",
      engagement: 12300000,
      rank: 1,
      posts: [
        {
          id: "g_post_2015_04_1",
          username: "tech_reviewer",
          date: "Apr 24, 2015",
          content: "Apple Watch Review: Is Apple's first smartwatch worth the hype? Complete hands-on analysis",
          likes: 189000,
          shares: 67890,
          comments: 23450,
          url: "https://techreview.com/apple-watch-2015",
        },
      ],
    },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get("month") || "2024-12"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "25")

  await new Promise((resolve) => setTimeout(resolve, 700))

  try {
    const trends = googleTrendsData[month] || []

    const additionalTrends: Trend[] = Array.from({ length: Math.max(0, 25 - trends.length) }, (_, i) => ({
      id: `g_${month}_${i + trends.length + 1}`,
      name: `Search Term ${i + trends.length + 1}`,
      platform: "google" as const,
      date: month + "-15",
      category: ["Technology", "Entertainment", "Shopping", "Health", "Travel", "Education"][i % 6],
      engagement: Math.floor(Math.random() * 5000000) + 1000000,
      rank: i + trends.length + 1,
      posts: [
        {
          id: `g_post_${month}_${i + trends.length + 1}`,
          username: `search_result_${i + 1}`,
          date: month.split("-")[1] + " " + month.split("-")[0],
          content: `Top search result for trend ${i + trends.length + 1}`,
          likes: Math.floor(Math.random() * 50000),
          shares: Math.floor(Math.random() * 15000),
          comments: Math.floor(Math.random() * 3000),
          url: `https://example.com/search-result-${i + trends.length + 1}`,
        },
      ],
    }))

    const allTrends = [...trends, ...additionalTrends]
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTrends = allTrends.slice(startIndex, endIndex)

    return NextResponse.json({
      trends: paginatedTrends,
      total: allTrends.length,
      page,
      hasMore: endIndex < allTrends.length,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Google trends", code: "FETCH_ERROR", status: 500 },
      { status: 500 },
    )
  }
}
