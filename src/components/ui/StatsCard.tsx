import type { ReactNode } from "react"
import { cn } from "../../lib/utils"
import { Card, CardContent } from "./Card"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"

type TrendType = "up" | "down" | "neutral"
type TrendColorType = "green" | "red" | "yellow" | "blue" | "gray"

const TREND_COLORS: Record<TrendColorType, string> = {
  blue: "text-blue-500",
  gray: "text-gray-500",
  green: "text-success-500",
  red: "text-danger-500",
  yellow: "text-yellow-500",
}

interface StatsCardProps {
  change?: number
  changeLabel?: string
  className?: string
  icon?: ReactNode
  title: string
  trend?: TrendType
  trendColor?: TrendColorType
  value: string | number
}

export const StatsCard = ({
  change,
  changeLabel,
  className,
  icon,
  title,
  trend = "neutral",
  trendColor = "gray",
  value,
}: StatsCardProps): JSX.Element => {
  const getTrendColor = (): string => {
    if (trend === "up") {
      return trendColor === "green" ? TREND_COLORS.green : TREND_COLORS.red
    }
    if (trend === "down") {
      return trendColor === "red" ? TREND_COLORS.red : TREND_COLORS.green
    }
    return TREND_COLORS.gray
  }

  const getTrendIcon = (): JSX.Element | null => {
    if (trend === "up") {
      return <ArrowUpIcon className="h-4 w-4" />
    }
    if (trend === "down") {
      return <ArrowDownIcon className="h-4 w-4" />
    }
    return null
  }

  return (
    <Card className={className}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          </div>
          {icon && (
            <div className="rounded-md bg-primary-50 p-2">{icon}</div>
          )}
        </div>

        {(change !== undefined || changeLabel) && (
          <div className="mt-4">
            <div className={cn("flex items-center text-sm", getTrendColor())}>
              {getTrendIcon()}
              <span className="font-medium">
                {change !== undefined && `${Math.abs(change)}%`} {changeLabel}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

