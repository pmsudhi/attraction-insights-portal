import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LineChart, BarChart } from "@/components/ui/charts";
import {
  UsersIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ShoppingBagIcon,
  CalendarIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { StatsCard } from "./StatsCard";
import { PropertyPerformanceTable } from "./PropertyPerformanceTable";
import { useDashboard } from "../hooks/useDashboard";

export const Dashboard = () => {
  const {
    timeRange,
    setTimeRange,
    attendanceData,
    revenueCategories,
    propertyPerformance,
    breakEvenData
  } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Enterprise Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Overview of your attraction operations and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-white">
              <CalendarIcon className="h-4 w-4 mr-1.5" />
              Apr 1 - Apr 30, 2025
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <ArrowPathIcon className="h-4 w-4 mr-1.5" />
              Refresh
            </Button>
          </div>
          <Button variant="default" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Weather alert */}
      <div className="bg-warning-50 border border-warning-200 p-4 rounded-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-warning-500" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-warning-800">
              <strong className="font-medium">Weather Alert:</strong> Thunderstorms forecasted for Adventure Park tomorrow. Contingency plans
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
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-semibold">Attendance & Revenue Trends</CardTitle>
            <CardDescription className="text-sm text-gray-600">Daily attendance and revenue for the past 30 days</CardDescription>
            <div className="flex items-center space-x-2 pt-2">
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                size="sm"
                className={timeRange === "7d" ? "" : "bg-white"}
                onClick={() => setTimeRange("7d")}
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                className={timeRange === "30d" ? "" : "bg-white"}
                onClick={() => setTimeRange("30d")}
              >
                30D
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "outline"}
                size="sm"
                className={timeRange === "90d" ? "" : "bg-white"}
                onClick={() => setTimeRange("90d")}
              >
                90D
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <LineChart 
                data={attendanceData}
                xField="month"
                yFields={["attendance", "revenue"]}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-semibold">Revenue by Category</CardTitle>
            <CardDescription className="text-sm text-gray-600">Breakdown of revenue streams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <BarChart 
                data={revenueCategories}
                xField="category"
                yFields={["revenue"]}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property performance */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Property Performance</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">Attendance and revenue by property</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-white">
              <ChevronDownIcon className="h-4 w-4 mr-1.5" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <PropertyPerformanceTable properties={propertyPerformance} />
        </CardContent>
      </Card>

      {/* Break-even analysis */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Break-Even Analysis</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">Daily attendance vs. break-even threshold</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-white">
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <LineChart 
              data={breakEvenData}
              xField="date"
              yFields={["attendance", "breakEvenThreshold"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 