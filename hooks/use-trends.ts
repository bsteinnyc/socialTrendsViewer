"use client"

import { useState, useEffect } from "react"
import type { Trend, TrendsResponse, ApiError } from "@/lib/types"

interface UseTrendsOptions {
  platform: string
  month: string
  enabled?: boolean
}

interface UseTrendsReturn {
  trends: Trend[]
  loading: boolean
  error: ApiError | null
  refetch: () => void
}

export function useTrends({ platform, month, enabled = true }: UseTrendsOptions): UseTrendsReturn {
  const [trends, setTrends] = useState<Trend[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchTrends = async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        month,
        limit: "25",
        page: "1",
      })

      const response = await fetch(`/api/trends/${platform}?${params}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch trends")
      }

      const data: TrendsResponse = await response.json()
      setTrends(data.trends)
    } catch (err) {
      const apiError: ApiError = {
        message: err instanceof Error ? err.message : "An unknown error occurred",
        code: "FETCH_ERROR",
        status: 500,
      }
      setError(apiError)
      setTrends([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrends()
  }, [platform, month, enabled])

  return {
    trends,
    loading,
    error,
    refetch: fetchTrends,
  }
}
