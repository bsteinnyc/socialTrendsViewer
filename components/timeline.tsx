"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TimelineProps {
  selectedMonth: string
  onSelectMonth: (month: string) => void
  platform: string
}

export function Timeline({ selectedMonth, onSelectMonth, platform }: TimelineProps) {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const [visibleYear, setVisibleYear] = useState(2024)

  const months = [
    { name: "Jan", value: "01" },
    { name: "Feb", value: "02" },
    { name: "Mar", value: "03" },
    { name: "Apr", value: "04" },
    { name: "May", value: "05" },
    { name: "Jun", value: "06" },
    { name: "Jul", value: "07" },
    { name: "Aug", value: "08" },
    { name: "Sep", value: "09" },
    { name: "Oct", value: "10" },
    { name: "Nov", value: "11" },
    { name: "Dec", value: "12" },
  ]

  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i)

  const handlePreviousYear = () => {
    if (visibleYear > years[0]) {
      setVisibleYear(visibleYear - 1)
    }
  }

  const handleNextYear = () => {
    if (visibleYear < years[years.length - 1]) {
      setVisibleYear(visibleYear + 1)
    }
  }

  const handleMonthSelect = (year: number, month: string) => {
    // Don't allow selection of future months
    if (year === currentYear && Number.parseInt(month) > currentMonth) {
      return
    }
    onSelectMonth(`${year}-${month}`)
  }

  const isMonthDisabled = (year: number, month: string) => {
    return year === currentYear && Number.parseInt(month) > currentMonth
  }

  const [selectedYear, selectedMonthValue] = selectedMonth.split("-")

  const getButtonVariant = (isSelected: boolean) => {
    if (!isSelected) return "outline"

    switch (platform) {
      case "instagram":
        return "default"
      case "twitter":
        return "default"
      case "youtube":
        return "default"
      case "google":
        return "default"
      default:
        return "default"
    }
  }

  const getYearButtonClass = (isActive: boolean) => {
    const baseClass = "rounded-full transition-colors"
    if (!isActive) return `${baseClass} hover:bg-gray-100`

    switch (platform) {
      case "instagram":
        return `${baseClass} bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600`
      case "twitter":
        return `${baseClass} bg-[#1DA1F2] text-white hover:bg-[#1A91DA]`
      case "youtube":
        return `${baseClass} bg-[#FF0000] text-white hover:bg-[#CC0000]`
      case "google":
        return `${baseClass} bg-[#4285F4] text-white hover:bg-[#3367D6]`
      default:
        return `${baseClass} bg-gray-900 text-white`
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={handlePreviousYear} disabled={visibleYear <= years[0]}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Year</span>
        </Button>
        <h3 className="text-lg font-medium">{visibleYear}</h3>
        <Button variant="outline" size="sm" onClick={handleNextYear} disabled={visibleYear >= years[years.length - 1]}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Year</span>
        </Button>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
        {months.map((month) => {
          const isSelected = selectedYear === visibleYear.toString() && selectedMonthValue === month.value
          const isDisabled = isMonthDisabled(visibleYear, month.value)

          return (
            <Button
              key={month.value}
              variant={getButtonVariant(isSelected)}
              size="sm"
              className="h-10"
              disabled={isDisabled}
              onClick={() => handleMonthSelect(visibleYear, month.value)}
            >
              {month.name}
            </Button>
          )
        })}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex space-x-1 overflow-x-auto py-1 px-2 bg-gray-100 rounded-full">
          {years.map((year) => (
            <Button
              key={year}
              variant="ghost"
              size="sm"
              className={getYearButtonClass(visibleYear === year)}
              onClick={() => setVisibleYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
