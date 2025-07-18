import { type NextRequest, NextResponse } from "next/server"
import type { Trend } from "@/lib/types"

const youtubeTrendsData: Record<string, Trend[]> = {
  "2024-12": [
    {
      id: "yt_2024_12_1",
      name: "MrBeast $1 Million Challenge",
      platform: "youtube",
      date: "2024-12-08",
      category: "Entertainment",
      engagement: 45600000,
      rank: 1,
      posts: [
        {
          id: "yt_post_2024_12_1",
          username: "MrBeast",
          date: "Dec 8, 2024",
          content: "I Gave Away $1,000,000 In This Video - biggest giveaway ever! 💰",
          likes: 2345600,
          shares: 567890,
          comments: 234560,
          url: "https://youtube.com/watch?v=mrbeast2024",
          thumbnail: "/placeholder.svg?height=180&width=320&text=MrBeast",
        },
      ],
    },
    {
      id: "yt_2024_12_2",
      name: "Mariah Carey - All I Want for Christmas",
      platform: "youtube",
      date: "2024-12-15",
      category: "Music",
      engagement: 28900000,
      rank: 2,
      posts: [
        {
          id: "yt_post_2024_12_2",
          username: "MariahCareyVEVO",
          date: "Dec 15, 2024",
          content: "The Christmas classic returns to #1 for the 6th year running! 🎄✨",
          likes: 1234560,
          shares: 345670,
          comments: 123450,
          url: "https://youtube.com/watch?v=mariah2024",
          thumbnail: "/placeholder.svg?height=180&width=320&text=Mariah",
        },
      ],
    },
  ],
  "2024-07": [
    {
      id: "yt_2024_07_1",
      name: "Olympics 2024 Paris Highlights",
      platform: "youtube",
      date: "2024-07-28",
      category: "Sports",
      engagement: 67800000,
      rank: 1,
      posts: [
        {
          id: "yt_post_2024_07_1",
          username: "Olympics",
          date: "Jul 28, 2024",
          content: "Paris 2024 Opening Ceremony - Most watched Olympic ceremony in history! 🏅🇫🇷",
          likes: 3456700,
          shares: 890120,
          comments: 456780,
          url: "https://youtube.com/watch?v=olympics2024",
          thumbnail: "/placeholder.svg?height=180&width=320&text=Olympics",
        },
      ],
    },
  ],
  "2023-05": [
    {
      id: "yt_2023_05_1",
      name: "PewDiePie Returns",
      platform: "youtube",
      date: "2023-05-15",
      category: "Gaming",
      engagement: 34500000,
      rank: 1,
      posts: [
        {
          id: "yt_post_2023_05_1",
          username: "PewDiePie",
          date: "May 15, 2023",
          content: "I'm Back! What I've been doing for the past year... 👑",
          likes: 1567890,
          shares: 234560,
          comments: 189000,
          url: "https://youtube.com/watch?v=pewdiepie2023",
          thumbnail: "/placeholder.svg?height=180&width=320&text=PewDiePie",
        },
      ],
    },
  ],
  "2020-04": [
    {
      id: "yt_2020_04_1",
      name: "Tiger King Documentary",
      platform: "youtube",
      date: "2020-04-10",
      category: "Documentary",
      engagement: 89000000,
      rank: 1,
      posts: [
        {
          id: "yt_post_2020_04_1",
          username: "Netflix",
          date: "Apr 10, 2020",
          content: "Tiger King: Murder, Mayhem and Madness - The wildest true crime story ever told 🐅",
          likes: 4567890,
          shares: 1234560,
          comments: 567890,
          url: "https://youtube.com/watch?v=tigerking2020",
          thumbnail: "/placeholder.svg?height=180&width=320&text=TigerKing",
        },
      ],
    },
  ],
  "2017-01": [
    {
      id: "yt_2017_01_1",
      name: "Logan Paul Japan Controversy",
      platform: "youtube",
      date: "2017-01-02",
      category: "Controversy",
      engagement: 156000000,
      rank: 1,
      posts: [
        {
          id: "yt_post_2017_01_1",
          username: "LoganPaul",
          date: "Jan 2, 2017",
          content: "So sorry. (This video has been removed)",
          likes: 234560,
          shares: 89450,
          comments: 567890,
          url: "https://youtube.com/watch?v=removed",
          thumbnail: "/placeholder.svg?height=180&width=320&text=Removed",
        },
      ],
    },
  ],
  "2015-02": [
    {
      id: "yt_2015_02_1",
      name: "The Dress - Blue/Black or White/Gold",
      platform: "youtube",
      date: "2015-02-26",
      category: "Viral",
      engagement: 78900000,
      rank: 1,
      posts: [
        {
          id: "yt_post_2015_02_1",
          username: "BuzzFeedVideo",
          date: "Feb 26, 2015",
          content: "What Color Is This Dress? The internet is divided! 👗",
          likes: 2345600,
          shares: 567890,
          comments: 345670,
          url: "https://youtube.com/watch?v=thedress2015",
          thumbnail: "/placeholder.svg?height=180&width=320&text=TheDress",
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

  await new Promise((resolve) => setTimeout(resolve, 900))

  try {
    const trends = youtubeTrendsData[month] || []

    const additionalTrends: Trend[] = Array.from({ length: Math.max(0, 25 - trends.length) }, (_, i) => ({
      id: `yt_${month}_${i + trends.length + 1}`,
      name: `YouTube Video ${i + trends.length + 1}`,
      platform: "youtube" as const,
      date: month + "-15",
      category: ["Music", "Gaming", "Comedy", "Education", "Vlogs", "Sports"][i % 6],
      engagement: Math.floor(Math.random() * 10000000) + 2000000,
      rank: i + trends.length + 1,
      posts: [
        {
          id: `yt_post_${month}_${i + trends.length + 1}`,
          username: `youtuber_${i + 1}`,
          date: month.split("-")[1] + " " + month.split("-")[0],
          content: `Popular YouTube video ${i + trends.length + 1}`,
          likes: Math.floor(Math.random() * 1000000),
          shares: Math.floor(Math.random() * 200000),
          comments: Math.floor(Math.random() * 50000),
          url: `https://youtube.com/watch?v=example${i + trends.length + 1}`,
          thumbnail: `/placeholder.svg?height=180&width=320&text=Video${i + trends.length + 1}`,
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
      { message: "Failed to fetch YouTube trends", code: "FETCH_ERROR", status: 500 },
      { status: 500 },
    )
  }
}
