import Image from "next/image"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Trend } from "@/lib/types"

interface TrendDetailsProps {
  trend: Trend
}

export function TrendDetails({ trend }: TrendDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">Category: {trend.category}</span>
          <h3 className="text-lg font-medium">{trend.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-sm text-muted-foreground">Engagement</span>
          <p className="font-semibold">{trend.engagement.toLocaleString()}</p>
        </div>
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="posts">Popular Posts</TabsTrigger>
          <TabsTrigger value="stats">Trend Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4 mt-4">
          {trend.posts &&
            trend.posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={`${post.username} content`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src={`/placeholder.svg?height=64&width=64&text=${post.username.charAt(0)}`}
                          alt={post.username}
                          fill
                          className="object-cover"
                        />
                      )}
                      {trend.platform === "youtube" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">@{post.username}</h4>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{post.content}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>❤️ {post.likes.toLocaleString()}</span>
                        <span>🔄 {post.shares.toLocaleString()}</span>
                        <span>💬 {post.comments.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent" asChild>
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                        View Original
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="stats" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Trend Growth</h4>
              <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Growth chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
          {trend.demographics && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Demographics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium mb-1">Age Groups</h5>
                    <div className="space-y-1">
                      {trend.demographics.ageGroups.map((group, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between text-sm">
                            <span>{group.range}</span>
                            <span>{group.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${group.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-1">Regions</h5>
                    <div className="space-y-1">
                      {trend.demographics.regions.map((region, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between text-sm">
                            <span>{region.name}</span>
                            <span>{region.percentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${region.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
