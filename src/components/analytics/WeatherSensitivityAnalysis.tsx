import React, { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { 
  LineChart, 
  BarChart 
} from "@/components/ui/charts"
import { 
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ClockIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline"

interface GuestSegmentSensitivity {
  segment: string
  weatherCondition: string
  sensitivity: number
  attendanceImpact: number
  spendingImpact: number
  recommendations: string[]
}

interface StaffingRecommendation {
  department: string
  currentStaff: number
  recommendedStaff: number
  adjustment: number
  reason: string
  priority: "high" | "medium" | "low"
}

// Sample data for guest segment sensitivity
const guestSegmentData: GuestSegmentSensitivity[] = [
  {
    segment: "Family with Children",
    weatherCondition: "Rain",
    sensitivity: 0.85,
    attendanceImpact: -0.25,
    spendingImpact: -0.15,
    recommendations: [
      "Increase indoor attraction capacity",
      "Add family-friendly indoor activities",
      "Promote indoor dining options"
    ]
  },
  {
    segment: "Young Adults",
    weatherCondition: "Rain",
    sensitivity: 0.65,
    attendanceImpact: -0.15,
    spendingImpact: -0.10,
    recommendations: [
      "Enhance indoor entertainment options",
      "Promote indoor social spaces",
      "Offer weather-based discounts"
    ]
  },
  {
    segment: "Senior Citizens",
    weatherCondition: "Extreme Heat",
    sensitivity: 0.90,
    attendanceImpact: -0.30,
    spendingImpact: -0.20,
    recommendations: [
      "Increase shaded seating areas",
      "Provide cooling stations",
      "Adjust operating hours"
    ]
  }
]

// Sample data for staffing recommendations
const staffingData: StaffingRecommendation[] = [
  {
    department: "Ride Operations",
    currentStaff: 45,
    recommendedStaff: 35,
    adjustment: -10,
    reason: "Expected reduced attendance due to rain forecast",
    priority: "high"
  },
  {
    department: "Food & Beverage",
    currentStaff: 30,
    recommendedStaff: 25,
    adjustment: -5,
    reason: "Shift to indoor dining expected",
    priority: "medium"
  },
  {
    department: "Guest Services",
    currentStaff: 20,
    recommendedStaff: 25,
    adjustment: 5,
    reason: "Increased indoor activity support needed",
    priority: "high"
  }
]

export default function WeatherSensitivityAnalysis() {
  const [activeTab, setActiveTab] = useState<string>("segments")

  // Prepare data for charts
  const sensitivityData = guestSegmentData.map(segment => ({
    segment: segment.segment,
    sensitivity: segment.sensitivity * 100,
    attendanceImpact: segment.attendanceImpact * 100,
    spendingImpact: segment.spendingImpact * 100
  }))

  const staffingChartData = staffingData.map(dept => ({
    department: dept.department,
    current: dept.currentStaff,
    recommended: dept.recommendedStaff
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weather Sensitivity Analysis</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="segments">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            Guest Segments
          </TabsTrigger>
          <TabsTrigger value="staffing">
            <BuildingOfficeIcon className="h-4 w-4 mr-2" />
            Staffing Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Segment Weather Sensitivity</CardTitle>
              <CardDescription>
                Analysis of how different guest segments respond to weather conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <BarChart
                  data={sensitivityData}
                  xField="segment"
                  yFields={["sensitivity", "attendanceImpact", "spendingImpact"]}
                  colors={["#3b82f6", "#10b981", "#f59e0b"]}
                  labels={["Sensitivity", "Attendance Impact", "Spending Impact"]}
                />
              </div>
              <div className="space-y-4">
                {guestSegmentData.map((segment, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{segment.segment}</h3>
                          <p className="text-sm text-gray-500">
                            Weather Condition: {segment.weatherCondition}
                          </p>
                        </div>
                        <Badge className={`
                          ${segment.sensitivity > 0.8 ? "bg-red-100 text-red-800" : 
                            segment.sensitivity > 0.6 ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          Sensitivity: {formatPercent(segment.sensitivity)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Attendance Impact</p>
                          <p className="font-medium">{formatPercent(segment.attendanceImpact)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Spending Impact</p>
                          <p className="font-medium">{formatPercent(segment.spendingImpact)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Recommendations:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {segment.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staffing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Staffing Recommendations</CardTitle>
              <CardDescription>
                Weather-based staffing adjustments and rationale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <BarChart
                  data={staffingChartData}
                  xField="department"
                  yFields={["current", "recommended"]}
                  colors={["#3b82f6", "#10b981"]}
                  labels={["Current Staff", "Recommended Staff"]}
                />
              </div>
              <div className="space-y-4">
                {staffingData.map((dept, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{dept.department}</h3>
                          <p className="text-sm text-gray-500">{dept.reason}</p>
                        </div>
                        <Badge className={`
                          ${dept.priority === "high" ? "bg-red-100 text-red-800" : 
                            dept.priority === "medium" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          {dept.priority.toUpperCase()} Priority
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Staff</p>
                          <p className="font-medium">{dept.currentStaff}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Recommended Staff</p>
                          <p className="font-medium">{dept.recommendedStaff}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Adjustment</p>
                          <p className={`font-medium ${dept.adjustment > 0 ? "text-green-600" : "text-red-600"}`}>
                            {dept.adjustment > 0 ? "+" : ""}{dept.adjustment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to format percentages
function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
} 