import { Card, CardHeader, CardContent } from "../ui/Card"

interface BreakEvenChartProps {
  data?: {
    revenue: number[]
    costs: number[]
    breakEvenPoint: number
  }
}

export function BreakEvenChart({ data }: BreakEvenChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-900">Break-Even Analysis</h3>
        </div>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="h-[300px]">
            {/* Chart will be implemented here */}
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
            Break-even chart will be displayed here
          </div>
        )}
        <div className="mt-4 text-xs text-gray-500">
          Recommendations based on historical attendance patterns, weather data, and break-even thresholds.
        </div>
      </CardContent>
    </Card>
  )
} 