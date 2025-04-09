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

  // Add break-even data
  const breakEvenData = [
    { date: "2024-01", attendance: 7500, breakEvenThreshold: 6800 },
    { date: "2024-02", attendance: 8200, breakEvenThreshold: 6800 },
    { date: "2024-03", attendance: 7800, breakEvenThreshold: 6800 },
    { date: "2024-04", attendance: 8500, breakEvenThreshold: 6800 },
    { date: "2024-05", attendance: 9200, breakEvenThreshold: 6800 },
    { date: "2024-06", attendance: 8900, breakEvenThreshold: 6800 },
  ];

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
                  { x: "Jan", attendance: 8500, revenue: 65 },
                  { x: "Feb", attendance: 9200, revenue: 72 },
                  { x: "Mar", attendance: 10500, revenue: 85 },
                  { x: "Apr", attendance: 12000, revenue: 98 },
                  { x: "May", attendance: 13500, revenue: 115 },
                  { x: "Jun", attendance: 15000, revenue: 132 }
                ]}
                xField="x"
                yFields={["attendance", "revenue"]}
              />
            </div>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <span className="text-sm">Daily Attendance (Left Axis)</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm">Revenue in $10,000s (Right Axis)</span>
              </div>
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

      {/* Property performance table card */}
      <Card>
        <CardHeader>
          <CardTitle>Property Performance</CardTitle>
          <CardDescription>Attendance and revenue by property</CardDescription>
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

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">WACC</h3>
              <p className="mt-1 text-2xl font-semibold">8.5%</p>
              <p className="text-xs text-red-500">-0.7pp vs Target</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cash Conversion</h3>
              <p className="mt-1 text-2xl font-semibold">85%</p>
              <p className="text-xs text-green-500">+3% YOY</p>
            </div>
            <div className="p-2 bg-green-50 rounded-full">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-500">Working Capital</h3>
                <span className="ml-1">Ratio</span>
              </div>
              <p className="mt-1 text-2xl font-semibold">1.8x</p>
              <p className="text-xs text-green-500">+0.2x YOY</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-full">
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Risk Coverage</h3>
              <p className="mt-1 text-2xl font-semibold">75%</p>
              <p className="text-xs text-red-500">-5% YOY</p>
            </div>
            <div className="p-2 bg-red-50 rounded-full">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Safety and Risk Management Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Safety Metrics */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Safety and Risk Management</CardTitle>
              <CardDescription>Comprehensive safety metrics, risk assessment, and incident tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-medium text-gray-900">Safety Incidents</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold">12</p>
                    <p className="ml-2 text-xs text-red-500">-25%</p>
                  </div>
                  <p className="text-xs text-gray-500">Total reportable incidents this quarter</p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-medium text-gray-900">Response Time</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold">4.2min</p>
                    <p className="ml-2 text-xs text-red-500">-15%</p>
                  </div>
                  <p className="text-xs text-gray-500">Average emergency response time</p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-medium text-gray-900">Training Completion</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold">98%</p>
                    <p className="ml-2 text-xs text-green-500">+2%</p>
                  </div>
                  <p className="text-xs text-gray-500">Safety training completion rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Risk Assessment */}
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Recent incidents and risk levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Operational Risk</h4>
                    <Badge variant="outline">Score: 65</Badge>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Safety Risk</h4>
                    <Badge variant="outline">Score: 30</Badge>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">Environmental Risk</h4>
                    <Badge variant="outline">Score: 75</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Capital Structure and Financial Trends */}
      <div className="grid grid-cols-12 gap-6">
        {/* Capital Structure */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Capital Structure Optimization</CardTitle>
              <CardDescription>Current vs. optimal capital structure analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-base font-medium mb-4">Current Structure</h3>
                    <div className="relative">
                      <div className="h-48 w-48 mx-auto relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-full bg-red-500 h-[45%] rounded-t-full"></div>
                          <div className="w-full bg-cyan-500 h-[55%] rounded-b-full"></div>
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-4">
                          <span className="text-sm font-medium text-white">45</span>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4">
                          <span className="text-sm font-medium text-white">55</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm">Debt</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                          <span className="text-sm">Equity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-4">Target Structure</h3>
                    <div className="relative">
                      <div className="h-48 w-48 mx-auto relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-full bg-red-500 h-[40%] rounded-t-full"></div>
                          <div className="w-full bg-cyan-500 h-[60%] rounded-b-full"></div>
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-4">
                          <span className="text-sm font-medium text-white">40</span>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4">
                          <span className="text-sm font-medium text-white">60</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-sm">Debt</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></div>
                          <span className="text-sm">Equity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Debt/E</p>
                    <p className="text-lg font-medium">0.82x</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Coverage</p>
                    <p className="text-lg font-medium">4.2x</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Debt/EBITDA</p>
                    <p className="text-lg font-medium">2.4x</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">WACC Optimization</p>
                      <span className="text-xs text-gray-500">-0.7pp</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Long-term Financial Trends */}
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Long-term Financial Trends</CardTitle>
              <CardDescription>5-year historical performance and projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart
                  data={[
                    { year: "2019", value: 28 },
                    { year: "2020", value: 29 },
                    { year: "2021", value: 30 },
                    { year: "2022", value: 31 },
                    { year: "2023", value: 32 },
                    { year: "2024", value: 36 }
                  ]}
                  xField="year"
                  yFields={["value"]}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
                <Button variant="outline" className="w-full">
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Break-even analysis and Weather forecast */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Break-Even Analysis</CardTitle>
            <CardDescription>Daily attendance vs. break-even threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart 
                data={breakEvenData}
                xField="date"
                yFields={["attendance", "breakEvenThreshold"]}
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

