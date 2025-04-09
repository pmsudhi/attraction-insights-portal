"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BellAlertIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  DocumentTextIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

type ViewMode = "month" | "quarter" | "year"

export function TaxComplianceCalendar(): JSX.Element {
  const [currentMonth] = useState("April 2025")
  const [viewMode, setViewMode] = useState<ViewMode>("month")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Tax Compliance Calendar</h2>
            <p className="text-sm text-gray-500">Track tax filing deadlines and compliance status</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              <span className="flex items-center">
                Month
              </span>
            </Button>
            <Button
              variant={viewMode === "quarter" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("quarter")}
            >
              <span className="flex items-center">
                Quarter
              </span>
            </Button>
            <Button
              variant={viewMode === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("year")}
            >
              <span className="flex items-center">
                Year
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </span>
          </Button>
          <h3 className="text-lg font-medium text-gray-900">{currentMonth}</h3>
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 mr-2" />
              Next
            </span>
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
              <div key={i} className="px-2 py-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 auto-rows-fr">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3 // Adjust for month start on Thursday
              return (
                <div
                  key={i}
                  className={`min-h-[100px] p-1 border-r border-b relative ${
                    day < 1 || day > 30 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {day > 0 && day <= 30 && (
                    <>
                      <div className="text-sm font-medium text-gray-700 mb-1">{day}</div>
                      {day === 10 && (
                        <div className="p-1 text-xs bg-warning-100 text-warning-800 rounded mb-1 truncate">
                          JP Tax Filing
                        </div>
                      )}
                      {day === 15 && (
                        <div className="p-1 text-xs bg-danger-100 text-danger-800 rounded mb-1 truncate">
                          US Tax Deadline
                        </div>
                      )}
                      {day === 20 && (
                        <div className="p-1 text-xs bg-primary-100 text-primary-800 rounded mb-1 truncate">
                          UK VAT Return
                        </div>
                      )}
                      {day === 30 && (
                        <div className="p-1 text-xs bg-secondary-100 text-secondary-800 rounded mb-1 truncate">
                          FR Tax Filing
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Upcoming Deadlines</h3>
              <Badge variant="secondary">
                4 Upcoming
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-warning-50 border border-warning-200 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-warning-100 rounded-md">
                    <ExclamationTriangleIcon className="h-5 w-5 text-warning-600" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900">Japan Corporate Tax Return</h4>
                      <Badge variant="secondary" className="ml-2">
                        6 days left
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">Due: April 10, 2025</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-danger-50 border border-danger-200 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-danger-100 rounded-md">
                    <BellAlertIcon className="h-5 w-5 text-danger-600" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900">US Federal Tax Return</h4>
                      <Badge variant="destructive" className="ml-2">
                        11 days left
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">Due: April 15, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Recently Completed</h3>
              <Badge variant="default">
                3 Completed
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-success-50 border border-success-200 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-success-100 rounded-md">
                    <CheckCircleIcon className="h-5 w-5 text-success-600" />
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900">UK VAT Return</h4>
                      <Badge variant="default" className="ml-2">
                        Completed
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">Filed: March 31, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Add Event
            </span>
          </Button>

          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Generate Report
            </span>
          </Button>

          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <DocumentMagnifyingGlassIcon className="h-4 w-4 mr-2" />
              View Details
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

