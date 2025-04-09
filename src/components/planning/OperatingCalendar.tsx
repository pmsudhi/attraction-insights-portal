"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline"
import { LineChart } from "@/components/ui/charts"

// Event types
type EventType = "operating" | "special" | "maintenance" | "closed"

// Add new types for season and event management
type SeasonType = "peak" | "shoulder" | "off-season"
type ViewMode = "day" | "week" | "month" | "quarter" | "year"

interface Season {
  id: string
  name: string
  type: SeasonType
  startDate: string
  endDate: string
  description?: string
}

// Add new types for recurring events
interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly"
  interval: number // e.g., every 2 weeks
  endDate?: string
  endAfterOccurrences?: number
  daysOfWeek?: number[] // 0-6 for Sunday-Saturday
  dayOfMonth?: number // 1-31
  monthOfYear?: number // 0-11
}

interface CalendarEvent {
  id: string
  date: string
  type: EventType
  title: string
  hours?: string
  capacity?: number
  notes?: string
  seasonId?: string
  isDraggable?: boolean
  duration?: number // in hours
  maxCapacity?: number
  minCapacity?: number
  weatherDependent?: boolean
  maintenanceRequired?: boolean
  specialRequirements?: string[]
  recurringPattern?: RecurringPattern
}

// Add new types for holidays and school breaks
interface Holiday {
  id: string
  name: string
  date: string
  type: "national" | "regional" | "local"
  isRecurring: boolean
}

interface SchoolBreak {
  id: string
  name: string
  startDate: string
  endDate: string
  type: "spring" | "summer" | "winter" | "fall"
  region: string
}

// Add new types for drag and drop
interface DragState {
  isDragging: boolean
  dragStartDate: string | null
  selectedEvent: CalendarEvent | null
  dragOverDate: string | null
  conflicts: CalendarEvent[]
}

// Add new types for weather data
interface WeatherData {
  date: string
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "stormy"
  precipitation: number
  windSpeed: number
  humidity: number
}

// Sample calendar data
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Sample events
const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    date: "2025-04-01",
    type: "operating",
    title: "Regular Operating Day",
    hours: "10:00 AM - 8:00 PM",
    capacity: 25000,
  },
  {
    id: "evt-2",
    date: "2025-04-02",
    type: "operating",
    title: "Regular Operating Day",
    hours: "10:00 AM - 8:00 PM",
    capacity: 25000,
  },
  {
    id: "evt-3",
    date: "2025-04-03",
    type: "special",
    title: "Spring Festival",
    hours: "10:00 AM - 10:00 PM",
    capacity: 30000,
    notes: "Extended hours, special entertainment",
  },
  {
    id: "evt-4",
    date: "2025-04-04",
    type: "special",
    title: "Spring Festival",
    hours: "10:00 AM - 10:00 PM",
    capacity: 30000,
    notes: "Extended hours, special entertainment",
  },
  {
    id: "evt-5",
    date: "2025-04-05",
    type: "special",
    title: "Spring Festival",
    hours: "10:00 AM - 10:00 PM",
    capacity: 30000,
    notes: "Extended hours, special entertainment",
  },
  {
    id: "evt-6",
    date: "2025-04-10",
    type: "maintenance",
    title: "Ride Maintenance",
    hours: "Closed",
    notes: "Thrill Seeker and Splash Mountain closed for maintenance",
  },
  {
    id: "evt-7",
    date: "2025-04-15",
    type: "closed",
    title: "Closed",
    hours: "Closed",
  },
  {
    id: "evt-8",
    date: "2025-04-22",
    type: "maintenance",
    title: "Facility Maintenance",
    hours: "Closed",
    notes: "Water system maintenance",
  },
]

// Add sample seasons data
const sampleSeasons: Season[] = [
  {
    id: "season-1",
    name: "Peak Summer",
    type: "peak",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    description: "Main summer operating season with extended hours",
  },
  {
    id: "season-2",
    name: "Spring Shoulder",
    type: "shoulder",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    description: "Spring operating season with moderate attendance",
  },
  {
    id: "season-3",
    name: "Winter Off-Season",
    type: "off-season",
    startDate: "2025-12-01",
    endDate: "2025-02-28",
    description: "Limited operations during winter months",
  },
]

// Add sample data for holidays and school breaks
const sampleHolidays: Holiday[] = [
  {
    id: "hol-1",
    name: "New Year's Day",
    date: "2025-01-01",
    type: "national",
    isRecurring: true
  },
  {
    id: "hol-2",
    name: "Independence Day",
    date: "2025-07-04",
    type: "national",
    isRecurring: true
  },
  {
    id: "hol-3",
    name: "Christmas Day",
    date: "2025-12-25",
    type: "national",
    isRecurring: true
  }
]

const sampleSchoolBreaks: SchoolBreak[] = [
  {
    id: "sb-1",
    name: "Spring Break",
    startDate: "2025-03-15",
    endDate: "2025-03-23",
    type: "spring",
    region: "Northeast"
  },
  {
    id: "sb-2",
    name: "Summer Break",
    startDate: "2025-06-15",
    endDate: "2025-08-31",
    type: "summer",
    region: "All"
  }
]

// Add sample weather data
const sampleWeatherData: WeatherData[] = [
  {
    date: "2025-04-01",
    temperature: 75,
    condition: "sunny",
    precipitation: 0,
    windSpeed: 5,
    humidity: 45
  },
  {
    date: "2025-04-02",
    temperature: 72,
    condition: "cloudy",
    precipitation: 0.2,
    windSpeed: 8,
    humidity: 55
  },
  {
    date: "2025-04-03",
    temperature: 68,
    condition: "rainy",
    precipitation: 0.8,
    windSpeed: 12,
    humidity: 75
  }
]

export default function OperatingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)) // April 2025
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)
  const [seasons, setSeasons] = useState<Season[]>(sampleSeasons)
  const [holidays, setHolidays] = useState<Holiday[]>(sampleHolidays)
  const [schoolBreaks, setSchoolBreaks] = useState<SchoolBreak[]>(sampleSchoolBreaks)
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragStartDate: null,
    selectedEvent: null,
    dragOverDate: null,
    conflicts: []
  })
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)

  // Break-even chart data
  const breakEvenChartData = [
    { date: "9:00", attendance: 2500, breakEvenThreshold: 2150 },
    { date: "10:00", attendance: 2800, breakEvenThreshold: 2150 },
    { date: "11:00", attendance: 3200, breakEvenThreshold: 2150 },
    { date: "12:00", attendance: 3800, breakEvenThreshold: 3100 },
    { date: "13:00", attendance: 4200, breakEvenThreshold: 3100 },
    { date: "14:00", attendance: 4500, breakEvenThreshold: 3100 },
    { date: "15:00", attendance: 4200, breakEvenThreshold: 2995 },
    { date: "16:00", attendance: 3800, breakEvenThreshold: 2995 },
    { date: "17:00", attendance: 3200, breakEvenThreshold: 2995 },
    { date: "18:00", attendance: 2800, breakEvenThreshold: 2995 },
  ]

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    if (!day) return []

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  // Get event badge color
  const getEventBadgeColor = (type: EventType) => {
    switch (type) {
      case "operating":
        return "success"
      case "special":
        return "primary"
      case "maintenance":
        return "warning"
      case "closed":
        return "danger"
      default:
        return "gray"
    }
  }

  // Handle day click
  const handleDayClick = (day: number) => {
    if (!day) return

    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const dayEvents = events.filter((event) => event.date === dateStr)

    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0])
    } else {
      setSelectedEvent(null)
    }
  }

  // Add new event
  const addNewEvent = (event: CalendarEvent) => {
    const eventsToAdd = generateRecurringEvents(event)
    setEvents(prev => [...prev, ...eventsToAdd])
  }

  // Add new functions for season management
  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season)
  }

  const handleSeasonCreate = () => {
    // Implementation for creating new season
  }

  const handleSeasonEdit = (season: Season) => {
    // Implementation for editing season
  }

  // Add new function to check for conflicts
  const checkForConflicts = (date: string, event: CalendarEvent): CalendarEvent[] => {
    return events.filter(e => 
      e.id !== event.id && 
      e.date === date && 
      ((e.type === "operating" && event.type === "operating") ||
       (e.type === "special" && event.type === "special"))
    )
  }

  // Update drag handlers
  const handleDragStart = (event: CalendarEvent, date: string) => {
    setDragState({
      isDragging: true,
      dragStartDate: date,
      selectedEvent: event,
      dragOverDate: null,
      conflicts: []
    })
  }

  const handleDragOver = (date: string) => {
    if (dragState.isDragging && dragState.selectedEvent) {
      const conflicts = checkForConflicts(date, dragState.selectedEvent)
      setDragState(prev => ({
        ...prev,
        dragOverDate: date,
        conflicts
      }))
    }
  }

  const handleDragEnd = (date: string) => {
    if (dragState.isDragging && dragState.selectedEvent && dragState.conflicts.length === 0) {
      // Update event date
      const updatedEvents = events.map(event =>
        event.id === dragState.selectedEvent?.id ? { ...event, date } : event
      )
      setEvents(updatedEvents)
    }
    setDragState({
      isDragging: false,
      dragStartDate: null,
      selectedEvent: null,
      dragOverDate: null,
      conflicts: []
    })
  }

  // Add function to get season for a date
  const getSeasonForDate = (date: string) => {
    return seasons.find(
      season => date >= season.startDate && date <= season.endDate
    )
  }

  // Add function to get holidays for a date
  const getHolidaysForDate = (date: string) => {
    return holidays.filter(holiday => holiday.date === date)
  }

  // Add function to get school breaks for a date
  const getSchoolBreaksForDate = (date: string) => {
    return schoolBreaks.filter(break_ => date >= break_.startDate && date <= break_.endDate)
  }

  // Add function to get weather for a date
  const getWeatherForDate = (date: string): WeatherData | undefined => {
    return sampleWeatherData.find(w => w.date === date)
  }

  // Add function to get weather impact on attendance
  const getWeatherImpact = (weather: WeatherData): number => {
    let impact = 0

    // Temperature impact
    if (weather.temperature < 50) impact -= 20
    else if (weather.temperature < 60) impact -= 10
    else if (weather.temperature > 90) impact -= 15
    else if (weather.temperature > 80) impact -= 5

    // Precipitation impact
    if (weather.condition === "rainy") impact -= 30
    else if (weather.condition === "stormy") impact -= 50
    else if (weather.condition === "cloudy") impact -= 5

    // Wind impact
    if (weather.windSpeed > 15) impact -= 10
    else if (weather.windSpeed > 10) impact -= 5

    return impact
  }

  // Add function to render quarter view
  const renderQuarterView = () => {
    const quarter = Math.floor(currentMonth / 3)
    const startMonth = quarter * 3
    const months = []

    for (let i = 0; i < 3; i++) {
      const month = startMonth + i
      months.push(
        <div key={month} className="border rounded-lg p-2">
          <h3 className="text-sm font-medium text-gray-900 mb-2">{MONTHS[month]}</h3>
          {renderMonthDays(currentYear, month)}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-3 gap-4">
        {months}
      </div>
    )
  }

  // Add function to render year view
  const renderYearView = () => {
    const months = []

    for (let month = 0; month < 12; month++) {
      months.push(
        <div key={month} className="border rounded-lg p-2">
          <h3 className="text-sm font-medium text-gray-900 mb-2">{MONTHS[month]}</h3>
          {renderMonthDays(currentYear, month)}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-4 gap-4">
        {months}
      </div>
    )
  }

  // Update renderCalendar function to include new views
  const renderCalendar = () => {
    switch (viewMode) {
      case "day":
        return renderDayView()
      case "week":
        return renderWeekView()
      case "month":
        return renderMonthView()
      case "quarter":
        return renderQuarterView()
      case "year":
        return renderYearView()
      default:
        return renderMonthView()
    }
  }

  // Render calendar based on view mode
  const renderMonthView = () => {
    const days = generateCalendarDays()

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {DAYS.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-700">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : []
          const hasEvents = dayEvents.length > 0
          const mainEvent = hasEvents ? dayEvents[0] : null
          const dateStr = day ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : ""
          const season = dateStr ? getSeasonForDate(dateStr) : null
          const isDragOver = dragState.dragOverDate === dateStr
          const hasConflict = isDragOver && dragState.conflicts.length > 0
          const weather = getWeatherForDate(dateStr)
          const weatherImpact = weather ? getWeatherImpact(weather) : 0

          return (
            <div
              key={index}
              className={`
                p-1 min-h-24 border rounded-md
                ${day ? "cursor-pointer hover:bg-gray-50" : "bg-gray-50"}
                ${isDragOver ? "ring-2 ring-primary-500" : ""}
                ${hasConflict ? "bg-red-50" : ""}
                ${dragState.selectedEvent && mainEvent && dragState.selectedEvent.id === mainEvent.id ? "ring-2 ring-primary-500" : ""}
              `}
              onClick={() => day && handleDayClick(day)}
              onDragOver={(e) => {
                e.preventDefault()
                if (dragState.isDragging && day) {
                  handleDragOver(dateStr)
                }
              }}
              onDrop={(e) => {
                e.preventDefault()
                if (dragState.isDragging && day) {
                  handleDragEnd(dateStr)
                }
              }}
            >
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-700">{day}</div>
                  {season && (
                    <div className="text-xs text-gray-500 mt-1">
                      {season.name}
                    </div>
                  )}
                  {weather && (
                    <div className="mt-1 text-xs">
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-1 ${
                          weather.condition === "sunny" ? "bg-yellow-400" :
                          weather.condition === "cloudy" ? "bg-gray-400" :
                          weather.condition === "rainy" ? "bg-blue-400" :
                          "bg-purple-400"
                        }`} />
                        <span className="text-gray-600">{weather.temperature}°F</span>
                      </div>
                      {weatherImpact < 0 && (
                        <div className="text-red-600">
                          -{Math.abs(weatherImpact)}% attendance impact
                        </div>
                      )}
                    </div>
                  )}
                  {mainEvent && (
                    <div 
                      className="mt-1"
                      draggable={mainEvent.isDraggable}
                      onDragStart={() => handleDragStart(mainEvent, dateStr)}
                    >
                      <Badge variant={getEventBadgeColor(mainEvent.type)}>
                        {mainEvent.title}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">{mainEvent.hours}</div>
                      {mainEvent.capacity && (
                        <div className="text-xs text-gray-500">
                          Capacity: {mainEvent.capacity.toLocaleString()}
                          {weatherImpact < 0 && (
                            <span className="text-red-600 ml-1">
                              ({Math.round(mainEvent.capacity * (1 + weatherImpact / 100)).toLocaleString()})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {isDragOver && hasConflict && (
                    <div className="mt-1 text-xs text-red-600">
                      Conflicts with {dragState.conflicts.length} event(s)
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Add function to render month days
  const renderMonthDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div key={day} className="p-1 text-center text-xs font-medium text-gray-700">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : ""
          const dayEvents = day ? getEventsForDay(day) : []
          const holidays = dateStr ? getHolidaysForDate(dateStr) : []
          const schoolBreaks = dateStr ? getSchoolBreaksForDate(dateStr) : []
          const weather = getWeatherForDate(dateStr)
          const weatherImpact = weather ? getWeatherImpact(weather) : 0

          return (
            <div
              key={index}
              className={`
                p-1 min-h-16 border rounded-md text-xs
                ${day ? "cursor-pointer hover:bg-gray-50" : "bg-gray-50"}
                ${holidays.length > 0 ? "bg-red-50" : ""}
                ${schoolBreaks.length > 0 ? "bg-blue-50" : ""}
              `}
            >
              {day && (
                <>
                  <div className="font-medium text-gray-700">{day}</div>
                  {holidays.map(holiday => (
                    <div key={holiday.id} className="text-red-600 text-xs truncate">
                      {holiday.name}
                    </div>
                  ))}
                  {schoolBreaks.map(break_ => (
                    <div key={break_.id} className="text-blue-600 text-xs truncate">
                      {break_.name}
                    </div>
                  ))}
                  {weather && (
                    <div className="mt-1 text-xs">
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-1 ${
                          weather.condition === "sunny" ? "bg-yellow-400" :
                          weather.condition === "cloudy" ? "bg-gray-400" :
                          weather.condition === "rainy" ? "bg-blue-400" :
                          "bg-purple-400"
                        }`} />
                        <span className="text-gray-600">{weather.temperature}°F</span>
                      </div>
                      {weatherImpact < 0 && (
                        <div className="text-red-600">
                          -{Math.abs(weatherImpact)}% attendance impact
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Add function to render day view
  const renderDayView = () => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`
    const dayEvents = getEventsForDay(currentDate.getDate())
    const holidays = getHolidaysForDate(dateStr)
    const schoolBreaks = getSchoolBreaksForDate(dateStr)
    const weather = getWeatherForDate(dateStr)
    const weatherImpact = weather ? getWeatherImpact(weather) : 0

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {MONTHS[currentMonth]} {currentDate.getDate()}, {currentYear}
          </h3>
        </div>
        <div className="space-y-4">
          {holidays.map(holiday => (
            <div key={holiday.id} className="p-4 bg-red-50 rounded-lg">
              <h4 className="text-sm font-medium text-red-900">{holiday.name}</h4>
              <p className="text-sm text-red-700">National Holiday</p>
            </div>
          ))}
          {schoolBreaks.map(break_ => (
            <div key={break_.id} className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900">{break_.name}</h4>
              <p className="text-sm text-blue-700">{break_.region} Region</p>
            </div>
          ))}
          {weather && (
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-900">Weather</h4>
              <p className="text-sm text-yellow-700">
                {weather.condition} - {weather.temperature}°F
              </p>
              {weatherImpact < 0 && (
                <div className="mt-1 text-xs text-red-600">
                  -{Math.abs(weatherImpact)}% attendance impact
                </div>
              )}
            </div>
          )}
          {dayEvents.map(event => (
            <div key={event.id} className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
              <p className="text-sm text-gray-500">{event.hours}</p>
              {event.capacity && (
                <p className="text-sm text-gray-500">Capacity: {event.capacity.toLocaleString()}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Add function to render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    const days = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4">
          {days.map((date, index) => {
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
            const dayEvents = getEventsForDay(date.getDate())
            const holidays = getHolidaysForDate(dateStr)
            const schoolBreaks = getSchoolBreaksForDate(dateStr)
            const weather = getWeatherForDate(dateStr)
            const weatherImpact = weather ? getWeatherImpact(weather) : 0

            return (
              <div key={index} className="border rounded-lg p-2">
                <h4 className="text-sm font-medium text-gray-900">
                  {DAYS[date.getDay()]}
                </h4>
                <p className="text-xs text-gray-500">
                  {MONTHS[date.getMonth()]} {date.getDate()}
                </p>
                <div className="mt-2 space-y-2">
                  {holidays.map(holiday => (
                    <div key={holiday.id} className="text-xs text-red-600">
                      {holiday.name}
                    </div>
                  ))}
                  {schoolBreaks.map(break_ => (
                    <div key={break_.id} className="text-xs text-blue-600">
                      {break_.name}
                    </div>
                  ))}
                  {weather && (
                    <div className="text-xs">
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-1 ${
                          weather.condition === "sunny" ? "bg-yellow-400" :
                          weather.condition === "cloudy" ? "bg-gray-400" :
                          weather.condition === "rainy" ? "bg-blue-400" :
                          "bg-purple-400"
                        }`} />
                        <span className="text-gray-600">{weather.temperature}°F</span>
                      </div>
                      {weatherImpact < 0 && (
                        <div className="text-red-600">
                          -{Math.abs(weatherImpact)}% attendance impact
                        </div>
                      )}
                    </div>
                  )}
                  {dayEvents.map(event => (
                    <div key={event.id} className="text-xs">
                      <Badge variant={getEventBadgeColor(event.type)}>
                        {event.title}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Add function to generate recurring events
  const generateRecurringEvents = (event: CalendarEvent): CalendarEvent[] => {
    if (!event.recurringPattern) return [event]

    const events: CalendarEvent[] = [event]
    const startDate = new Date(event.date)
    const pattern = event.recurringPattern
    let currentDate = new Date(startDate)
    let occurrences = 1

    while (
      (!pattern.endDate || currentDate <= new Date(pattern.endDate)) &&
      (!pattern.endAfterOccurrences || occurrences < pattern.endAfterOccurrences)
    ) {
      switch (pattern.frequency) {
        case "daily":
          currentDate.setDate(currentDate.getDate() + pattern.interval)
          break
        case "weekly":
          if (pattern.daysOfWeek) {
            // Find next occurrence based on days of week
            const nextDate = new Date(currentDate)
            let found = false
            while (!found) {
              nextDate.setDate(nextDate.getDate() + 1)
              if (pattern.daysOfWeek.includes(nextDate.getDay())) {
                currentDate = nextDate
                found = true
              }
            }
          } else {
            currentDate.setDate(currentDate.getDate() + (7 * pattern.interval))
          }
          break
        case "monthly":
          if (pattern.dayOfMonth) {
            currentDate.setMonth(currentDate.getMonth() + pattern.interval)
            currentDate.setDate(pattern.dayOfMonth)
          } else {
            currentDate.setMonth(currentDate.getMonth() + pattern.interval)
          }
          break
        case "yearly":
          if (pattern.monthOfYear !== undefined && pattern.dayOfMonth) {
            currentDate.setFullYear(currentDate.getFullYear() + pattern.interval)
            currentDate.setMonth(pattern.monthOfYear)
            currentDate.setDate(pattern.dayOfMonth)
          } else {
            currentDate.setFullYear(currentDate.getFullYear() + pattern.interval)
          }
          break
      }

      if (
        (!pattern.endDate || currentDate <= new Date(pattern.endDate)) &&
        (!pattern.endAfterOccurrences || occurrences < pattern.endAfterOccurrences)
      ) {
        const newEvent: CalendarEvent = {
          ...event,
          id: `${event.id}-${occurrences}`,
          date: currentDate.toISOString().split('T')[0]
        }
        events.push(newEvent)
        occurrences++
      }
    }

    return events
  }

  // Add recurring event form component
  const RecurringEventForm = ({ onSave, onCancel }: { onSave: (event: CalendarEvent) => void, onCancel: () => void }) => {
    const [event, setEvent] = useState<CalendarEvent>({
      id: `evt-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: "operating",
      title: "",
      hours: "9:00 AM - 5:00 PM",
      capacity: 1000,
      isDraggable: true
    })

    const [isRecurring, setIsRecurring] = useState(false)
    const [pattern, setPattern] = useState<RecurringPattern>({
      frequency: "weekly",
      interval: 1,
      daysOfWeek: [1, 2, 3, 4, 5] // Monday to Friday
    })

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const eventToSave = {
        ...event,
        recurringPattern: isRecurring ? pattern : undefined
      }
      onSave(eventToSave)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title</label>
          <input
            id="eventTitle"
            type="text"
            value={event.title}
            onChange={e => setEvent(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
            aria-label="Event Title"
          />
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            id="eventType"
            value={event.type}
            onChange={e => setEvent(prev => ({ ...prev, type: e.target.value as EventType }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            aria-label="Event Type"
          >
            <option value="operating">Operating Day</option>
            <option value="special">Special Event</option>
            <option value="maintenance">Maintenance</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            id="startDate"
            type="date"
            value={event.date}
            onChange={e => setEvent(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
            aria-label="Start Date"
          />
        </div>

        <div>
          <label htmlFor="operatingHours" className="block text-sm font-medium text-gray-700">Operating Hours</label>
          <input
            id="operatingHours"
            type="text"
            value={event.hours}
            onChange={e => setEvent(prev => ({ ...prev, hours: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            aria-label="Operating Hours"
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            id="capacity"
            type="number"
            value={event.capacity}
            onChange={e => setEvent(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            aria-label="Capacity"
          />
        </div>

        <div className="flex items-center">
          <input
            id="isRecurring"
            type="checkbox"
            checked={isRecurring}
            onChange={e => setIsRecurring(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            aria-label="Make this a recurring event"
          />
          <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-900">Make this a recurring event</label>
        </div>

        {isRecurring && (
          <div className="space-y-4">
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
              <select
                id="frequency"
                value={pattern.frequency}
                onChange={e => setPattern(prev => ({ ...prev, frequency: e.target.value as RecurringPattern["frequency"] }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                aria-label="Frequency"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label htmlFor="interval" className="block text-sm font-medium text-gray-700">Interval</label>
              <input
                id="interval"
                type="number"
                min="1"
                value={pattern.interval}
                onChange={e => setPattern(prev => ({ ...prev, interval: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                aria-label="Interval"
              />
            </div>

            {pattern.frequency === "weekly" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Days of Week</label>
                <div className="mt-2 space-y-2">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={pattern.daysOfWeek?.includes(index)}
                        onChange={e => {
                          const newDays = e.target.checked
                            ? [...(pattern.daysOfWeek || []), index]
                            : (pattern.daysOfWeek || []).filter(d => d !== index)
                          setPattern(prev => ({ ...prev, daysOfWeek: newDays }))
                        }}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        aria-label={`Select ${day}`}
                      />
                      <span className="ml-2 text-sm text-gray-900">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
              <input
                id="endDate"
                type="date"
                value={pattern.endDate}
                onChange={e => setPattern(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                aria-label="End Date"
              />
            </div>

            <div>
              <label htmlFor="endAfterOccurrences" className="block text-sm font-medium text-gray-700">End After Occurrences (Optional)</label>
              <input
                id="endAfterOccurrences"
                type="number"
                min="1"
                value={pattern.endAfterOccurrences}
                onChange={e => setPattern(prev => ({ ...prev, endAfterOccurrences: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                aria-label="End After Occurrences"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="default" type="submit">Save Event</Button>
        </div>
      </form>
    )
  }

  // Add weather forecast section to the calendar
  const WeatherForecast = () => {
    return (
      <Card>
        <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>7-day weather forecast and impact on attendance</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {sampleWeatherData.map((weather, index) => {
              const date = new Date(weather.date)
              const impact = getWeatherImpact(weather)
              return (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {DAYS[date.getDay()]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {MONTHS[date.getMonth()]} {date.getDate()}
                  </div>
                  <div className="mt-2">
                    <div className={`inline-block w-8 h-8 rounded-full ${
                      weather.condition === "sunny" ? "bg-yellow-400" :
                      weather.condition === "cloudy" ? "bg-gray-400" :
                      weather.condition === "rainy" ? "bg-blue-400" :
                      "bg-purple-400"
                    }`} />
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-900">
                    {weather.temperature}°F
                  </div>
                  {impact < 0 && (
                    <div className="mt-1 text-xs text-red-600">
                      -{Math.abs(impact)}% attendance
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Update all Badge variants to use the correct types
  const getBadgeVariant = (status: string): "success" | "destructive" | "secondary" | "default" => {
    switch (status) {
      case "above":
        return "success"
      case "below":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // Update all Button variants to use the correct types
  const getButtonVariant = (type: string) => {
    switch (type) {
      case "primary":
        return "default"
      case "outline":
        return "outline"
      default:
        return "secondary"
    }
  }

  // Update event type badge colors
  const getEventBadgeVariant = (type: string): "success" | "destructive" | "secondary" | "default" => {
    switch (type) {
      case "holiday":
        return "success"
      case "maintenance":
        return "destructive"
      case "special":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Operating Calendar"
          subtitle="Manage operating days, special events, and maintenance periods"
          action={
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "day" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
              <Button
                variant={viewMode === "week" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "month" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "quarter" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("quarter")}
              >
                Quarter
              </Button>
              <Button
                variant={viewMode === "year" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("year")}
              >
                Year
              </Button>
            </div>
          }
        />
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={prevMonth} icon={<ChevronLeftIcon className="h-4 w-4" />}>
                Previous
              </Button>
              <h3 className="text-lg font-medium text-gray-900">
                {MONTHS[currentMonth]} {currentYear}
              </h3>
              <Button variant="outline" size="sm" onClick={nextMonth} icon={<ChevronRightIcon className="h-4 w-4" />}>
                Next
              </Button>
            </div>
            <Button variant={getButtonVariant("primary")} size="sm" onClick={() => setShowEventForm(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          <div className="mb-4">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-success-500 mr-2" />
                <span className="text-sm text-gray-700">Operating</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-primary-500 mr-2" />
                <span className="text-sm text-gray-700">Special Event</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-warning-500 mr-2" />
                <span className="text-sm text-gray-700">Maintenance</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-danger-500 mr-2" />
                <span className="text-sm text-gray-700">Closed</span>
              </div>
            </div>
          </div>

          {renderCalendar()}

          {/* Add holiday and school break indicators */}
          <div className="mt-4">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span className="text-sm text-gray-700">Holiday</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" />
                <span className="text-sm text-gray-700">School Break</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <WeatherForecast />

      {selectedEvent && (
        <Card>
          <CardHeader
            title="Event Details"
            subtitle={selectedEvent.date}
            action={
              <Button variant="outline" size="sm" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            }
          />
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 rounded-md mr-3 bg-gray-100">
                  {selectedEvent.type === "operating" && <CalendarIcon className="h-5 w-5 text-success-600" />}
                  {selectedEvent.type === "special" && <SparklesIcon className="h-5 w-5 text-primary-600" />}
                  {selectedEvent.type === "maintenance" && (
                    <WrenchScrewdriverIcon className="h-5 w-5 text-warning-600" />
                  )}
                  {selectedEvent.type === "closed" && <ClockIcon className="h-5 w-5 text-danger-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedEvent.title}</h3>
                  <div className="mt-1">
                    <Badge variant={getBadgeVariant(data.status)} size="sm">
                      {data.variance > 0 ? "+" : ""}{data.variance}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700">Operating Hours</p>
                  <p className="text-sm text-gray-900">{selectedEvent.hours}</p>
                </div>

                {selectedEvent.capacity && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Capacity</p>
                    <p className="text-sm text-gray-900">{selectedEvent.capacity.toLocaleString()} guests</p>
                  </div>
                )}

                {selectedEvent.notes && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-700">Notes</p>
                    <p className="text-sm text-gray-900">{selectedEvent.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
        <CardTitle>Operating Hour Optimization</CardTitle>
        <CardDescription>Optimize operating hours based on break-even analysis</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Recommended Operating Hours</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">Peak Season (Jun-Aug)</span>
                    <span>9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="text-xs text-success-600 mt-1">+$245K revenue impact</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">Shoulder Season (Apr-May, Sep-Oct)</span>
                    <span>10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="text-xs text-success-600 mt-1">+$120K revenue impact</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">Off Season (Nov-Mar)</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="text-xs text-success-600 mt-1">+$85K cost savings</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Break-Even Analysis</h3>
              <div className="h-48">
                <LineChart
                  data={breakEvenChartData}
                  xField="date"
                  yFields={["attendance", "breakEvenThreshold"]}
                  showLegend={true}
                  showGrid={true}
                  showTooltip={true}
                />
              </div>
              <div className="mt-3 text-xs text-gray-500">
                <p>Recommendations based on historical attendance patterns, weather data, and break-even thresholds.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Season management */}
      <Card>
        <CardHeader>
          <CardTitle>Season Management</CardTitle>
          <CardDescription>Define and manage operating seasons</CardDescription>
          <div className="flex justify-end">
            <Button variant={getButtonVariant("outline")} size="sm" onClick={handleSeasonCreate}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Season
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasons.map((season) => (
              <div
                key={season.id}
                className={`p-4 rounded-lg border ${
                  selectedSeason?.id === season.id ? "border-primary-500" : "border-gray-200"
                }`}
                onClick={() => handleSeasonSelect(season)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{season.name}</h3>
                    <p className="text-xs text-gray-500">{season.description}</p>
                  </div>
                  <Badge
                    variant={
                      season.type === "peak"
                        ? "success"
                        : season.type === "shoulder"
                        ? "warning"
                        : "gray"
                    }
                  >
                    {season.type}
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(season.startDate).toLocaleDateString()} -{" "}
                  {new Date(season.endDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Event</h3>
            <RecurringEventForm
              onSave={(event) => {
                addNewEvent(event)
                setShowEventForm(false)
              }}
              onCancel={() => setShowEventForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

