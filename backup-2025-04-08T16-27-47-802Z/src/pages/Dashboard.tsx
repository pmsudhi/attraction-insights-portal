"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { StatsCard } from "../components/ui/StatsCard"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import {
  UsersIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ShoppingBagIcon,
  CalendarIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  CloudIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import { LineChart, BarChart } from "@/components/ui/charts"

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enterprise Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of your attraction operations and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4" />
              Apr 1 - Apr 30, 2025
            </Button>
            <Button variant="outline" size="sm">
              <ArrowPathIcon className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          <Button variant="default" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Weather alert */}
      <div className="bg-warning-50 border-l-4 border-warning-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-warning-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-warning-700">
              <strong>Weather Alert:</strong> Thunderstorms forecasted for Adventure Park tomorrow. Contingency plans
              recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Attendance"
          value="24,389"
          change={12}
          changeLabel="from yesterday"
          trend="up"
          trendColor="green"
          icon={<UsersIcon className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Revenue"
          value="$187,429"
          change={8.2}
          changeLabel="from yesterday"
          trend="up"
          trendColor="green"
          icon={<CurrencyDollarIcon className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Ticket Sales"
          value="3,842"
          change={-2.3}
          changeLabel="from yesterday"
          trend="down"
          trendColor="red"
          icon={<TicketIcon className="h-6 w-6 text-primary-600" />}
        />
        <StatsCard
          title="Per Capita Spending"
          value="$76.85"
          change={5.4}
          changeLabel="from yesterday"
          trend="up"
          trendColor="green"
          icon={<ShoppingBagIcon className="h-6 w-6 text-primary-600" />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance & Revenue Trends</CardTitle>
            <CardDescription>Daily attendance and revenue for the past 30 days</CardDescription>
            <div className="flex items-center space-x-2">
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("7d")}
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                30D
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("90d")}
              >
                90D
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart 
                data={[
                  { x: "Jan", y: 100 },
                  { x: "Feb", y: 120 },
                  { x: "Mar", y: 150 },
                  { x: "Apr", y: 180 },
                  { x: "May", y: 200 },
                  { x: "Jun", y: 220 }
                ]}
                xField="x"
                yFields={["y"]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Breakdown of revenue streams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={[
                  { category: "Attractions", value: 40 },
                  { category: "Food & Beverage", value: 30 },
                  { category: "Merchandise", value: 20 },
                  { category: "Other", value: 10 }
                ]}
                xField="category"
                yFields={["value"]}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property performance */}
      <Card>
        <CardHeader>
        <CardTitle>Property Performance</CardTitle>
        <CardDescription>Attendance and revenue by property</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            <ChevronDownIcon className="h-4 w-4" />
            All Properties
          </Button>
        </div>
      </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Attendance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Revenue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Per Capita
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    YOY Change
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-md flex items-center justify-center">
                        <span className="text-primary-700 font-bold">AP</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Adventure Park</div>
                        <div className="text-sm text-gray-500">Orlando, FL</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">12,458</div>
                    <div className="text-xs text-gray-500">+8.2% from yesterday</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$984,250</div>
                    <div className="text-xs text-gray-500">+10.5% from yesterday</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$78.92</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-success-600">+12.4%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="default">
                      Open
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-secondary-100 rounded-md flex items-center justify-center">
                        <span className="text-secondary-700 font-bold">WP</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Water Paradise</div>
                        <div className="text-sm text-gray-500">Tampa, FL</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">8,245</div>
                    <div className="text-xs text-gray-500">-2.1% from yesterday</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$576,120</div>
                    <div className="text-xs text-gray-500">-1.8% from yesterday</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$69.87</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-success-600">+8.7%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="destructive">
                      Closed
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-success-100 rounded-md flex items-center justify-center">
                        <span className="text-success-700 font-bold">SF</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Safari Kingdom</div>
                        <div className="text-sm text-gray-500">San Diego, CA</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">3,686</div>
                    <div className="text-xs text-gray-500">+5.3% from yesterday</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$312,310</div>
                    <div className="text-xs text-gray-500">+6.2% from yesterday</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$84.73</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-success-600">+15.2%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="default">
                      Maintenance
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Break-even analysis */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
        <CardTitle>Break-Even Analysis</CardTitle>
        <CardDescription>Daily attendance vs. break-even threshold</CardDescription>
      </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart 
                data={{
                  labels: ["Q1", "Q2", "Q3", "Q4"],
                  datasets: [{
                    label: "Revenue",
                    data: [1200, 1900, 1500, 2100],
                    backgroundColor: "#3b82f6"
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
                ariaLabel="Quarterly Revenue Chart"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>5-day forecast for all properties</CardDescription>
      </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CloudIcon className="h-8 w-8 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Adventure Park</p>
                    <p className="text-xs text-gray-500">Orlando, FL</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">84°F</p>
                  <p className="text-xs text-warning-600">Thunderstorms</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CloudIcon className="h-8 w-8 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Water Paradise</p>
                    <p className="text-xs text-gray-500">Tampa, FL</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">82°F</p>
                  <p className="text-xs text-warning-600">Scattered Showers</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <CloudIcon className="h-8 w-8 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Safari Kingdom</p>
                    <p className="text-xs text-gray-500">San Diego, CA</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">76°F</p>
                  <p className="text-xs text-success-600">Sunny</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard;

