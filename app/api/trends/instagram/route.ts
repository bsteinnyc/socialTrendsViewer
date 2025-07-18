import { type NextRequest, NextResponse } from "next/server"
import type { Trend } from "@/lib/types"

// Real Instagram trends by year and month
const instagramTrendsData: Record<string, Trend[]> = {
  "2024-12": [
    {
      id: "ig_2024_12_1",
      name: "#ChristmasVibes",
      platform: "instagram",
      date: "2024-12-15",
      category: "Holiday",
      engagement: 2850000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2024_12_1",
          username: "holiday_decorator",
          date: "Dec 15, 2024",
          content: "Christmas tree is finally up! ✨🎄 The kids are so excited! #ChristmasVibes #HolidayMagic",
          likes: 45620,
          shares: 1240,
          comments: 892,
          url: "https://instagram.com/p/christmas2024",
        },
      ],
      demographics: {
        ageGroups: [
          { range: "18-24", percentage: 32 },
          { range: "25-34", percentage: 38 },
          { range: "35-44", percentage: 22 },
          { range: "45+", percentage: 8 },
        ],
        regions: [
          { name: "North America", percentage: 52 },
          { name: "Europe", percentage: 28 },
          { name: "Asia", percentage: 15 },
          { name: "Other", percentage: 5 },
        ],
      },
    },
    {
      id: "ig_2024_12_2",
      name: "#YearInReview",
      platform: "instagram",
      date: "2024-12-28",
      category: "Year-End",
      engagement: 3200000,
      rank: 2,
      posts: [
        {
          id: "ig_post_2024_12_2",
          username: "life_moments",
          date: "Dec 28, 2024",
          content: "2024 was incredible! Swipe to see my top 9 moments ➡️ #YearInReview #2024Memories",
          likes: 67890,
          shares: 2340,
          comments: 1456,
          url: "https://instagram.com/p/2024review",
        },
      ],
    },
  ],
  "2024-11": [
    {
      id: "ig_2024_11_1",
      name: "#Thanksgiving2024",
      platform: "instagram",
      date: "2024-11-28",
      category: "Holiday",
      engagement: 1950000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2024_11_1",
          username: "grateful_chef",
          date: "Nov 28, 2024",
          content: "Grateful for family, friends, and this amazing feast! 🦃🍂 #Thanksgiving2024 #Grateful",
          likes: 34560,
          shares: 890,
          comments: 567,
          url: "https://instagram.com/p/thanksgiving2024",
        },
      ],
    },
  ],
  "2023-12": [
    {
      id: "ig_2023_12_1",
      name: "#AIArt",
      platform: "instagram",
      date: "2023-12-10",
      category: "Technology",
      engagement: 4200000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2023_12_1",
          username: "digital_artist",
          date: "Dec 10, 2023",
          content: "Created this masterpiece using AI! The future of art is here 🎨✨ #AIArt #DigitalArt #Midjourney",
          likes: 89450,
          shares: 3240,
          comments: 2180,
          url: "https://instagram.com/p/aiart2023",
        },
      ],
    },
  ],
  "2020-03": [
    {
      id: "ig_2020_03_1",
      name: "#QuarantineLife",
      platform: "instagram",
      date: "2020-03-20",
      category: "Lifestyle",
      engagement: 8500000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2020_03_1",
          username: "stay_home_mom",
          date: "Mar 20, 2020",
          content:
            "Day 7 of quarantine: Teaching kids, working from home, and somehow still smiling! #QuarantineLife #StayHome",
          likes: 156780,
          shares: 8940,
          comments: 4560,
          url: "https://instagram.com/p/quarantine2020",
        },
      ],
    },
  ],
  "2019-12": [
    {
      id: "ig_2019_12_1",
      name: "#DecadeChallenge",
      platform: "instagram",
      date: "2019-12-30",
      category: "Year-End",
      engagement: 6800000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2019_12_1",
          username: "transformation_tuesday",
          date: "Dec 30, 2019",
          content:
            "2010 vs 2019 - what a decade it's been! Can't believe how much has changed 📸 #DecadeChallenge #2010vs2019",
          likes: 234560,
          shares: 12340,
          comments: 8970,
          url: "https://instagram.com/p/decade2019",
        },
      ],
    },
  ],
  "2018-06": [
    {
      id: "ig_2018_06_1",
      name: "#WorldCup2018",
      platform: "instagram",
      date: "2018-06-15",
      category: "Sports",
      engagement: 12500000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2018_06_1",
          username: "football_fanatic",
          date: "Jun 15, 2018",
          content: "GOOOAL! What an incredible match! Russia is bringing the energy ⚽🇷🇺 #WorldCup2018 #Russia2018",
          likes: 445670,
          shares: 23450,
          comments: 15670,
          url: "https://instagram.com/p/worldcup2018",
        },
      ],
    },
  ],
  "2016-07": [
    {
      id: "ig_2016_07_1",
      name: "#PokemonGO",
      platform: "instagram",
      date: "2016-07-10",
      category: "Gaming",
      engagement: 15200000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2016_07_1",
          username: "pokemon_trainer",
          date: "Jul 10, 2016",
          content: "Just caught a Pikachu in Central Park! This game is addictive ⚡🎮 #PokemonGO #GottaCatchEmAll",
          likes: 567890,
          shares: 34560,
          comments: 23450,
          url: "https://instagram.com/p/pokemongo2016",
        },
      ],
    },
  ],
  "2015-06": [
    {
      id: "ig_2015_06_1",
      name: "#LoveWins",
      platform: "instagram",
      date: "2015-06-26",
      category: "Social",
      engagement: 9800000,
      rank: 1,
      posts: [
        {
          id: "ig_post_2015_06_1",
          username: "equality_advocate",
          date: "Jun 26, 2015",
          content: "Historic day! Marriage equality is now the law of the land 🏳️‍🌈❤️ #LoveWins #MarriageEquality",
          likes: 345670,
          shares: 18900,
          comments: 12340,
          url: "https://instagram.com/p/lovewins2015",
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

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  try {
    const trends = instagramTrendsData[month] || []

    // Generate additional trends to fill the list
    const additionalTrends: Trend[] = Array.from({ length: Math.max(0, 25 - trends.length) }, (_, i) => ({
      id: `ig_${month}_${i + trends.length + 1}`,
      name: `#InstagramTrend${i + trends.length + 1}`,
      platform: "instagram" as const,
      date: month + "-15",
      category: ["Lifestyle", "Fashion", "Food", "Travel", "Art", "Fitness", "Beauty"][i % 7],
      engagement: Math.floor(Math.random() * 1000000) + 100000,
      rank: i + trends.length + 1,
      posts: [
        {
          id: `ig_post_${month}_${i + trends.length + 1}`,
          username: `user_${i + 1}`,
          date: month.split("-")[1] + " " + month.split("-")[0],
          content: `Sample content for trend ${i + trends.length + 1}`,
          likes: Math.floor(Math.random() * 50000),
          shares: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 500),
          url: `https://instagram.com/p/example${i + trends.length + 1}`,
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
      { message: "Failed to fetch Instagram trends", code: "FETCH_ERROR", status: 500 },
      { status: 500 },
    )
  }
}
