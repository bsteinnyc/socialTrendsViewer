"use client"

import { useState, useEffect } from "react"
import { trendsData, generateAdditionalTrends } from "../lib/data"

/**
 * Custom hook for fetching trends data
 * @param {Object} options - Hook options
 * @param {string} options.platform - Platform to fetch trends for
 * @param {string} options.month - Month to fetch trends for
 * @param {boolean} [options.enabled=true] - Whether to fetch data
 * @returns {Object} Hook return value
 */
export function useTrends({ platform, month, enabled = true }) {
  const [trends, setTrends] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTrends = async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const platformData = trendsData[platform] || {}
      const monthData = platformData[month] || []

      // Generate additional trends to fill the list
      const additionalTrends = generateAdditionalTrends(platform, month, monthData.length)
      const allTrends = [...monthData, ...additionalTrends]

      setTrends(allTrends)
    } catch (err) {
      const apiError = {
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
