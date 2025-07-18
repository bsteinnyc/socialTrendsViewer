import { type NextRequest, NextResponse } from "next/server"
import type { Trend } from "@/lib/types"

const twitterTrendsData: Record<string, Trend[]> = {
  "2024-12": [
    {
      id: "tw_2024_12_1",
      name: "#Election2024Results",
      platform: "twitter",
      date: "2024-12-05",
      category: "Politics",
      engagement: 15200000,
      rank: 1,
      posts: [
        {
          id: "tw_post_2024_12_1",
          username: "political_analyst",
          date: "Dec 5, 2024",
          content: "Historic voter turnout in #Election2024Results - democracy in action! 🗳️ Analysis thread below 👇",
          likes: 234560,
          shares: 89450,
          comments: 45670,
          url: "https://twitter.com/analyst/status/election2024",
        },
      ],
    },
    {
      id: "tw_2024_12_2",
      name: "#ClimateAction",
      platform: "twitter",
      date: "2024-12-12",
      category: "Environment",
      engagement: 8900000,
      rank: 2,
      posts: [
        {
          id: "tw_post_2024_12_2",
          username: "climate_scientist",
          date: "Dec 12, 2024",
          content:
            "COP29 results are in - significant progress on renewable energy commitments! 🌱 #ClimateAction #COP29",
          likes: 156780,
          shares: 67890,
          comments: 23450,
          url: "https://twitter.com/scientist/status/climate2024",
        },
      ],
    },
  ],
  "2024-11": [
    {
      id: "tw_2024_11_1",
      name: "#ThanksgivingTravel",
      platform: "twitter",
      date: "2024-11-27",
      category: "Travel",
      engagement: 4500000,
      rank: 1,
      posts: [
        {
          id: "tw_post_2024_11_1",
          username: "travel_updates",
          date: "Nov 27, 2024",
          content:
            "Airport delays across the country as millions travel for Thanksgiving 🛫 Check your flight status! #ThanksgivingTravel",
          likes: 78900,
          shares: 34560,
          comments: 12340,
          url: "https://twitter.com/travel/status/thanksgiving2024",
        },
      ],
    },
  ],
  "2023-12": [
    {
      id: "tw_2023_12_1",
      name: "#ChatGPT",
      platform: "twitter",
      date: "2023-12-08",
      category: "Technology",
      engagement: 12800000,
      rank: 1,
      posts: [
        {
          id: "tw_post_2023_12_1",
          username: "ai_researcher",
          date: "Dec 8, 2023",
          content:
            "One year since #ChatGPT launched and it's completely transformed how we work, learn, and create. The AI revolution is here! 🤖",
          likes: 445670,
          shares: 156780,
          comments: 89450,
          url: "https://twitter.com/ai/status/chatgpt2023",
        },
      ],
    },
  ],
  "2020-05": [
    {
      id: "tw_2020_05_1",
      name: "#BlackLivesMatter",
      platform: "twitter",
      date: "2020-05-30",
      category: "Social Justice",
      engagement: 25600000,
      rank: 1,
      posts: [
        {
          id: "tw_post_2020_05_1",
          username: "civil_rights",
          date: "May 30, 2020",
          content:
            "Justice for George Floyd. Justice for all. The fight for equality continues. #BlackLivesMatter #JusticeForGeorge",
          likes: 1234560,
          shares: 567890,
          comments: 234560,
          url: "https://twitter.com/rights/status/blm2020",
        },
      ],
    },
  ],
  "2016-11": [
    {
      id: "tw_2016_11_1",
      name: "#Election2016",
      platform: "twitter",
      date: "2016-11-08",
      category: "Politics",
      engagement: 18900000,
      rank: 1,
      posts: [
        {
          id: "tw_post_2016_11_1",
          username: "election_news",
          date: "Nov 8, 2016",
          content: "Historic election night! Record social media engagement as America votes #Election2016 🇺🇸",
          likes: 678900,
          shares: 234560,
          comments: 123450,
          url: "https://twitter.com/news/status/election2016",
        },
      ],
    },
  ],
  "2015-01": [
    {
      id: "tw_2015_01_1",
      name: "#JeSuisCharlie",
      platform: "twitter",
      date: "2015-01-07",
      category: "News",
      engagement: 14500000,
      rank: 1,
      posts: [
        {
          id: "tw_post_2015_01_1",
          username: "solidarity_voice",
          date: "Jan 7, 2015",
          content: "Standing with France and freedom of expression. Unity in the face of terror. #JeSuisCharlie 🇫🇷",
          likes: 456780,
          shares: 189000,
          comments: 67890,
          url: "https://twitter.com/solidarity/status/charlie2015",
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

  await new Promise((resolve) => setTimeout(resolve, 600))

  try {
    const trends = twitterTrendsData[month] || []

    const additionalTrends: Trend[] = Array.from({ length: Math.max(0, 25 - trends.length) }, (_, i) => ({
      id: `tw_${month}_${i + trends.length + 1}`,
      name: `#TwitterTrend${i + trends.length + 1}`,
      platform: "twitter" as const,
      date: month + "-15",
      category: ["Politics", "Sports", "Entertainment", "Technology", "News", "Social"][i % 6],
      engagement: Math.floor(Math.random() * 2000000) + 500000,
      rank: i + trends.length + 1,
      posts: [
        {
          id: `tw_post_${month}_${i + trends.length + 1}`,
          username: `twitter_user_${i + 1}`,
          date: month.split("-")[1] + " " + month.split("-")[0],
          content: `Sample tweet content for trend ${i + trends.length + 1}`,
          likes: Math.floor(Math.random() * 100000),
          shares: Math.floor(Math.random() * 20000),
          comments: Math.floor(Math.random() * 5000),
          url: `https://twitter.com/user/status/example${i + trends.length + 1}`,
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
      { message: "Failed to fetch Twitter trends", code: "FETCH_ERROR", status: 500 },
      { status: 500 },
    )
  }
}
