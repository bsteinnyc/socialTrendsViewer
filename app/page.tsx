"use client"

import { useState } from "react"
import { Calendar, Instagram, Twitter, Youtube } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "@/components/timeline"
import { TrendDetails } from "@/components/trend-details"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"
import { useTrends } from "@/hooks/use-trends"
import type { Trend } from "@/lib/types"

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram")
  const [selectedMonth, setSelectedMonth] = useState("2024-12")
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { trends, loading, error, refetch } = useTrends({
    platform: selectedPlatform,
    month: selectedMonth,
  })

  const handleTrendClick = (trend: Trend) => {
    setSelectedTrend(trend)
    setIsDialogOpen(true)
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "google":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.5 12.5c0-.69-.06-1.35-.17-2H12v4h5.95c-.26 1.3-1.04 2.4-2.21 3.14v2.61h3.57c2.09-1.92 3.29-4.75 3.29-7.75z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )
      default:
        return null
    }
  }

  const getThemeClass = () => {
    switch (selectedPlatform) {
      case "instagram":
        return "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white"
      case "twitter":
        return "bg-[#1DA1F2] text-white"
      case "youtube":
        return "bg-[#FF0000] text-white"
      case "google":
        return "bg-white border border-gray-200"
      default:
        return "bg-white"
    }
  }

  const getHeaderClass = () => {
    switch (selectedPlatform) {
      case "instagram":
        return "bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 text-white"
      case "twitter":
        return "bg-[#1A91DA] text-white"
      case "youtube":
        return "bg-[#CC0000] text-white"
      case "google":
        return "bg-[#4285F4] text-white"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`p-6 ${getHeaderClass()}`}>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Social Media Trends Archive</h1>
          <p className="opacity-90">Explore historical trends across major social platforms before January 2020</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <Card className={`mb-8 ${getThemeClass()}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Select Time Period</h2>
            </div>
            <Timeline selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} platform={selectedPlatform} />
          </CardContent>
        </Card>

        <Tabs defaultValue="instagram" value={selectedPlatform} onValueChange={setSelectedPlatform} className="mb-8">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              <span className="hidden sm:inline">Twitter/X</span>
            </TabsTrigger>
            <TabsTrigger value="google" className="flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.5 12.5c0-.69-.06-1.35-.17-2H12v4h5.95c-.26 1.3-1.04 2.4-2.21 3.14v2.61h3.57c2.09-1.92 3.29-4.75 3.29-7.75z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="hidden sm:inline">Google</span>
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              <span className="hidden sm:inline">YouTube</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPlatform} className="mt-0">
            <Card className={getThemeClass()}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {getPlatformIcon(selectedPlatform)}
                  <h2 className="text-xl font-semibold">
                    Top 25 Trends on {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                  </h2>
                </div>

                <div className="bg-white rounded-lg overflow-hidden text-gray-900">
                  {loading ? (
                    <LoadingSpinner size="lg" text={`Loading ${selectedPlatform} trends...`} />
                  ) : error ? (
                    <ErrorMessage title="Failed to load trends" message={error.message} onRetry={refetch} />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Rank</TableHead>
                          <TableHead>Trend</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead className="text-right">Engagement</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trends.length > 0 ? (
                          trends.map((trend) => (
                            <TableRow
                              key={trend.id}
                              className="cursor-pointer hover:bg-gray-50"
                              onClick={() => handleTrendClick(trend)}
                            >
                              <TableCell className="font-medium">{trend.rank}</TableCell>
                              <TableCell>{trend.name}</TableCell>
                              <TableCell className="hidden md:table-cell">{trend.category}</TableCell>
                              <TableCell className="text-right">{trend.engagement.toLocaleString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-4">
                              No trends found for this period
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            {selectedTrend && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedTrend.name}</DialogTitle>
                  <DialogDescription>
                    Trending on {selectedTrend.platform.charAt(0).toUpperCase() + selectedTrend.platform.slice(1)} in{" "}
                    {selectedTrend.date}
                  </DialogDescription>
                </DialogHeader>
                <TrendDetails trend={selectedTrend} />
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
