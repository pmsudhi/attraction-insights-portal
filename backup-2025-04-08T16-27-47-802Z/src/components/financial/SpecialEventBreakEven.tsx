import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { LineChart } from "@/components/ui/charts"
import { CalendarIcon, UsersIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"

interface SpecialEvent {
  id: string
  name: string
  date: string
  type: "holiday" | "festival" | "concert" | "sports" | "other"
  expectedAttendance: number
  breakEvenAttendance: number
  ticketPrice: number
  additionalRevenue: number
  additionalCosts: number
  weatherForecast: {
    temperature: number
    condition: string
    impact: number
  }
}

const specialEvents: SpecialEvent[] = [
  {
    id: "summer-fest-2024",
    name: "Summer Music Festival",
    date: "2024-07-15",
    type: "festival",
    expectedAttendance: 15000,
    breakEvenAttendance: 12000,
    ticketPrice: 89.99,
    additionalRevenue: 450000,
    additionalCosts: 280000,
    weatherForecast: {
      temperature: 82,
      condition: "sunny",
      impact: 1.15,
    },
  },
  {
    id: "halloween-2024",
    name: "Halloween Horror Nights",
    date: "2024-10-31",
    type: "holiday",
    expectedAttendance: 18000,
    breakEvenAttendance: 14000,
    ticketPrice: 79.99,
    additionalRevenue: 520000,
    additionalCosts: 320000,
    weatherForecast: {
      temperature: 68,
      condition: "cloudy",
      impact: 0.95,
    },
  },
  {
    id: "winter-gala-2024",
    name: "Winter Holiday Gala",
    date: "2024-12-25",
    type: "holiday",
    expectedAttendance: 20000,
    breakEvenAttendance: 16000,
    ticketPrice: 99.99,
    additionalRevenue: 600000,
    additionalCosts: 380000,
    weatherForecast: {
      temperature: 72,
      condition: "sunny",
      impact: 1.05,
    },
  },
]

export const SpecialEventBreakEven = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {specialEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <Badge
                    variant={
                      event.type === "holiday"
                        ? "primary"
                        : event.type === "festival"
                        ? "success"
                        : event.type === "concert"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {event.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expected Attendance</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {new Intl.NumberFormat("en-US").format(event.expectedAttendance)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Break-even: {new Intl.NumberFormat("en-US").format(event.breakEvenAttendance)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ticket Price</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(event.ticketPrice)}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Weather Impact</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {event.weatherForecast.temperature}°F, {event.weatherForecast.condition}
                      </p>
                    </div>
                    <Badge variant={event.weatherForecast.impact > 1 ? "success" : "warning"}>
                      {(event.weatherForecast.impact * 100 - 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Additional Revenue</p>
                      <p className="mt-1 text-lg font-semibold text-success-600">
                        +{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(event.additionalRevenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Additional Costs</p>
                      <p className="mt-1 text-lg font-semibold text-danger-600">
                        -{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(event.additionalCosts)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
        <CardTitle>Special Event Performance Comparison</CardTitle>
        <CardDescription>Break-even analysis across different event types</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={{
                labels: specialEvents.map((e) => e.name),
                datasets: [
                  {
                    label: "Expected Attendance",
                    data: specialEvents.map((e) => e.expectedAttendance),
                    borderColor: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                  },
                  {
                    label: "Break-Even Attendance",
                    data: specialEvents.map((e) => e.breakEvenAttendance),
                    borderColor: "#EF4444",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    fill: true,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Attendance",
                    },
                  },
                },
              }}
              ariaLabel="Special event attendance comparison"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 