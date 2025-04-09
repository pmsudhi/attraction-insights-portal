"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, CalendarIcon } from "@heroicons/react/24/outline"

interface PromotionEvent {
  id: string
  name: string
  description: string
  type: "discount" | "bundle" | "seasonal" | "special"
  status: "active" | "scheduled" | "completed"
  startDate: string
  endDate: string
  budget: number
  targetAudience: string[]
  channels: string[]
  goals: {
    revenue: number
    conversions: number
    roi: number
  }
}

const promotionEvents: PromotionEvent[] = [
  {
    id: "spring-break",
    name: "Spring Break Promo",
    description: "20% off family packages during spring break",
    type: "seasonal",
    status: "scheduled",
    startDate: "2023-04-05",
    endDate: "2023-04-15",
    budget: 50000,
    targetAudience: ["Families", "Students"],
    channels: ["Email", "Social Media", "Display Ads"],
    goals: {
      revenue: 250000,
      conversions: 1000,
      roi: 400,
    },
  },
  {
    id: "family-weekend",
    name: "Family Weekend",
    description: "Special family activities and discounts",
    type: "special",
    status: "scheduled",
    startDate: "2023-04-12",
    endDate: "2023-04-14",
    budget: 30000,
    targetAudience: ["Families"],
    channels: ["Email", "Social Media"],
    goals: {
      revenue: 150000,
      conversions: 500,
      roi: 400,
    },
  },
  {
    id: "flash-sale",
    name: "Flash Sale",
    description: "24-hour flash sale with 30% off",
    type: "discount",
    status: "scheduled",
    startDate: "2023-04-15",
    endDate: "2023-04-16",
    budget: 20000,
    targetAudience: ["All"],
    channels: ["Email", "Push Notifications", "Social Media"],
    goals: {
      revenue: 100000,
      conversions: 400,
      roi: 400,
    },
  },
  {
    id: "earth-week",
    name: "Earth Week Special",
    description: "Eco-friendly activities and green initiatives",
    type: "special",
    status: "scheduled",
    startDate: "2023-04-20",
    endDate: "2023-04-25",
    budget: 40000,
    targetAudience: ["All"],
    channels: ["Email", "Social Media", "Display Ads"],
    goals: {
      revenue: 200000,
      conversions: 800,
      roi: 400,
    },
  },
]

export const PromotionCalendar = () => {
  const [viewMode, setViewMode] = useState("month")
  const [currentMonth, setCurrentMonth] = useState("April 2023")
  const [selectedEvent, setSelectedEvent] = useState<PromotionEvent | null>(null)

  const getEventsForDay = (day: number) => {
    return promotionEvents.filter((event) => {
      const startDate = new Date(event.startDate)
      const endDate = new Date(event.endDate)
      const currentDate = new Date(2023, 3, day) // April 2023
      return currentDate >= startDate && currentDate <= endDate
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Promotion Calendar</CardTitle>
            <div className="text-sm text-gray-500">Manage promotional activities</div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Month</Button>
            <Button variant="outline" size="sm">Quarter</Button>
            <Button variant="outline" size="sm">Year</Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <span className="sr-only">Previous month</span>
              ←
            </Button>
            <h2 className="text-lg font-semibold">{currentMonth}</h2>
            <Button variant="outline" size="icon">
              <span className="sr-only">Next month</span>
              →
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="default">Active: 2</Badge>
            <Badge variant="outline">Scheduled: 4</Badge>
            <Badge variant="outline">Completed: 8</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr">
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 3 // Adjust for month start on Thursday
            const events = getEventsForDay(day)
            return (
              <div
                key={i}
                className={`min-h-[100px] p-1 border-r border-b relative ${
                  day < 1 || day > 30 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {day > 0 && day <= 30 && (
                  <>
                    <div className="text-xs font-medium text-gray-700 mb-1">{day}</div>
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`p-1 text-xs rounded mb-1 truncate cursor-pointer ${
                          event.type === "discount"
                            ? "bg-blue-100 text-blue-800"
                            : event.type === "bundle"
                            ? "bg-green-100 text-green-800"
                            : event.type === "seasonal"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        {event.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {selectedEvent && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{selectedEvent.name}</h4>
                <p className="text-sm text-gray-500">{selectedEvent.description}</p>
              </div>
              <Badge
                variant={
                  selectedEvent.type === "discount"
                    ? "default"
                    : selectedEvent.type === "bundle"
                    ? "default"
                    : selectedEvent.type === "seasonal"
                    ? "default"
                    : "secondary"
                }
              >
                {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700">Target Audience</h5>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedEvent.targetAudience.map((audience) => (
                    <Badge key={audience} variant="default">
                      {audience}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700">Channels</h5>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedEvent.channels.map((channel) => (
                    <Badge key={channel} variant="default">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-700">Goals</h5>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                      selectedEvent.goals.revenue
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conversions</p>
                  <p className="text-lg font-medium text-gray-900">{selectedEvent.goals.conversions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="text-lg font-medium text-gray-900">{selectedEvent.goals.roi}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button variant="secondary" size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Promotion
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

